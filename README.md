# EMBES · Plataforma Rank & Rent (Astro SSG)

Infraestructura web multilocal y multiservicio: 16 verticales × 30 ciudades (480 landings).
SSG estricto (`output: 'static'`), React + shadcn/ui (Radix) + Tailwind, filosofía Zero-JS,
SEO/Core Web Vitals como prioridad absoluta (LCP < 1.5s, CLS = 0).

## Estructura

```
src/
├── assets/hero.png              # activo ráster para <Image> AVIF/WebP (placeholder)
├── components/
│   ├── ui/{button,card,accordion,sheet}.tsx   # primitivas shadcn (Radix)
│   ├── SeoHead.astro            # centralizador <title>/canonical/JSON-LD (Fase 3)
│   ├── FaqAccordion.tsx         # isla React · client:visible (Fase 4 FAQ)
│   └── MobileNav.tsx            # isla React · client:idle (menú off-canvas)
├── content/
│   ├── config.ts                # colecciones `servicios`/`localidades` con Zod
│   ├── servicios/*.md           # 16 verticales (3 placeholders)
│   └── localidades/*.md         # 30 municipios (3 placeholders)
├── layouts/Base.astro           # <head> con SeoHead + Organization JSON-LD
├── lib/
│   ├── jsonld.ts                # motor Schema.org por schemaType (Fase 3)
│   ├── content-utils.ts         # localización de tokens {localidad} (anti-thin-content)
│   └── utils.ts                 # cn() de shadcn
├── pages/
│   ├── index.astro              # hub raíz (distribución de PageRank)
│   ├── servicios/index.astro    # hub de servicios
│   ├── localidades/index.astro  # hub de localidades
│   └── servicios/[servicio]/
│       ├── index.astro          # silo nacional por categoría
│       └── [localidad].astro     # LANDING TRANSACCIONAL (Rank & Rent) · getStaticPaths
└── styles/global.css            # tokens shadcn (HSL) + @tailwind
```

## Cómo se cablean los datos → getStaticPaths()

1. **Fuente única de verdad**: `src/content/{servicios,localidades}/*.md`. Cada archivo es
   validado al build por el esquema Zod de `src/content/config.ts` (title, metaDescription,
   h1Principal, schemaType, variables geográficas…). Si un documento omite un campo obligatorio,
   el build *falla* — defensa frente a contenidos incompletos.
2. **Producto cartesiano en build time**: `servicios/[servicio]/[localidad].astro::getStaticPaths()`
   carga ambas colecciones con `Promise.all([getCollection('servicios'), getCollection('localidades')])`
   y genera **una ruta por cada par (servicio, localidad)** — `params:{servicio, localidad}` con
   `props:{servicio, localidad}`. Con 16×30 = **480 rutas estáticas**.
3. **Render transaccional**: cada página recibe por `props` el par concreto y construye:
   - `metaTitle` + `metaDescription` + `canonical` (trailing slash) → `<SeoHead>`
   - los 3 bloques JSON-LD (negocio, breadcrumb, FAQ) vía `lib/jsonld.ts`
   - FAQ localizada con `localizeFaq()` (atr.: cada landing tiene texto único)
4. **Silo anti-canibalización**: cada landing solo enlaza a su categoría nacional
   (`/servicios/[servicio]/`) y al hub; los hubs (`index`, `servicios/`, `localidades/`)
   distribuyen autoridad hacia las landings, nunca entre landings hermanas para no competir.
5. **Sitemap**: `@astrojs/sitemap` rastrea las 480 rutas emitidas y genera `sitemap-index.xml`.

## Uso

```bash
npm install
npm run build        # SSG: genera dist/ con las 480 landings + sitemap
npm run preview      # sirve dist/ localmente
npm run dev          # modo desarrollo
npm run check        # typecheck de Astro/TS
```

## TODO tras desbloqueo de los Google Docs

- Sustituir los **3 servicios/3 localidades placeholder** por los 16 verticales y 30 ciudades reales con barrios/CP/distritos/bbox exactos.
- Reemplazar `--primary` y la paleta en `src/styles/global.css` por los colores **exactos de EMBES**.
- Apuntar `site` en `astro.config.mjs` y el `SITE` de `lib/jsonld.ts` al dominio final.
- Generar `logo.png` (referenciado en JSON-LD) y substituir `src/assets/hero.png`.
