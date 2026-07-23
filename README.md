# EMBES — Directorio de Profesionales Verificados en España

> **Empowering Modern Business & Everyday Services**

Directorio SEO Rank & Rent de profesionales verificados que genera ~510 páginas estáticas optimizadas para posicionamiento orgánico en Google. Construido con Next.js 16, Tailwind CSS 4 y shadcn/ui.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Latest-black)
![Bun](https://img.shields.io/badge/Bun-Runtime-orange?logo=bun)

---

## Tabla de contenidos

- [Que es EMBES](#-que-es-embes)
- [Estrategia SEO y modelo de negocio](#-estrategia-seo-y-modelo-de-negocio)
- [Tecnologias usadas](#-tecnologias-usadas)
- [Arquitectura del proyecto](#-arquitectura-del-proyecto)
- [Estructura de carpetas](#-estructura-de-carpetas)
- [Explicacion del codigo](#-explicacion-del-codigo)
  - [Capa de datos (data.ts)](#capa-de-datos-datats)
  - [Generador de contenido SEO (seo-content.ts)](#generador-de-contenido-seo-seo-contentts)
  - [Pagina principal (page.tsx)](#pagina-principal-pagetsx)
  - [Paginas dinamicas (slugpage-tsx)](#paginas-dinamicas-slugpagetsx)
  - [Layout y metadata (layout.tsx)](#layout-y-metatags-layouttsx)
  - [Sistema de temas (globals.css + theme-provider)](#sistema-de-temas-globalscss--theme-provider)
  - [Componentes de vista](#componentes-de-vista)
  - [Navbar con navegacion dual](#navbar-con-navegacion-dual)
  - [Footer](#footer)
- [Despliegue en Mac con chip M1 (Apple Silicon)](#-despliegue-en-mac-con-chip-m1-apple-silicon)
  - [1- Instalar Homebrew](#1--instalar-homebrew)
  - [2- Instalar Bun](#2--instalar-bun)
  - [3- Clonar el repositorio](#3--clonar-el-repositorio)
  - [4- Instalar dependencias](#4--instalar-dependencias)
  - [5- Configurar base de datos (Prisma + SQLite)](#5--configurar-base-de-datos-prisma--sqlite)
  - [6- Iniciar en modo desarrollo](#6--iniciar-en-modo-desarrollo)
  - [7- Compilar para produccion](#7--compilar-para-produccion)
  - [8- Ejecutar en produccion](#8--ejecutar-en-produccion)
  - [9- Configurar Caddy como proxy inverso (opcional)](#9--configurar-caddy-como-proxy-inverso-opcional)
  - [10- Tips especificos para M1](#10--tips-especificos-para-m1)
  - [11- Despliegue con Docker en Mac](#11--despliegue-con-docker-en-mac)
  - [12- Configuracion de PM2 para produccion](#12--configuracion-de-pm2-para-produccion)
- [Despliegue en Windows](#-despliegue-en-windows)
- [Despliegue en Linux](#-despliegue-en-linux)
- [Variables de entorno](#-variables-de-entorno)
- [Scripts disponibles](#-scripts-disponibles)
- [Licencia](#-licencia)

---

## 🏢 Que es EMBES

EMBES es un **directorio web de profesionales verificados** que opera bajo el modelo **Rank & Rent**: se posiciona orgánicamente en Google para búsquedas locales como "cerrajeros en Castellón" o "dentistas en Granada" y posteriormente se alquila ese tráfico cualificado a profesionales del sector.

### Características principales

- **~510 páginas estáticas** generadas con `generateStaticParams()` (SSG)
  - **480 páginas** de servicio × localidad (ej: `/cerrajeros/castellon`)
  - **30 páginas hub** de localidad (ej: `/castellon`)
- **16 servicios profesionales** organizados en 5 clústeres temáticos
- **30 localidades** repartidas en 12 comunidades autónomas de España
- **Diseño dark-first** con sistema corporativo amarillo/oscuro EMBES
- **SEO técnico completo**: meta tags Open Graph, Twitter Cards, JSON-LD (Organization, WebSite, FAQPage, Service, BreadcrumbList), canonical URLs, `robots.txt`
- **Contenido único por página** generado programáticamente con variación determinista
- **Accesibilidad**: HTML semántico, ARIA labels, skip-to-content, navegación por teclado
- **Responsive**: mobile-first con breakpoints para `sm`, `md`, `lg`, `xl`

---

## 🎯 Estrategia SEO y modelo de negocio

EMBES implementa una estrategia de **silos semánticos** para maximizar el posicionamiento orgánico:

``nueva pestaña
embes.es/                           → Hub principal (Home)
embes.es/castellon                   → Hub de localidad (30 páginas)
embes.es/cerrajeros/castellon        → Landing de servicio×localidad (480 páginas)
```

### Estructura de enlaces internos

Cada página servicio×localidad incluye:
- Enlaces a **servicios relacionados** en la misma ciudad
- Enlaces al **mismo servicio en ciudades cercanas** de la misma comunidad autónoma
- **Nube de enlaces** a todos los demás servicios en esa localidad
- **Breadcrumb** semántico con JSON-LD `BreadcrumbList`

### Datos estructurados (JSON-LD)

| Tipo | Donde | Propósito |
|------|-------|----------|
| `Organization` | Layout global | Identidad de marca en Knowledge Graph |
| `WebSite + SearchAction` | Layout global | Sitelinks de búsqueda en Google |
| `FAQPage` | Cada landing servicio×localidad | Rich snippets de FAQ en SERP |
| `Service` | Cada landing servicio×localidad | Detalle del servicio en Knowledge Graph |
| `BreadcrumbList` | Cada página interna | Breadcrumbs visuales en Google |

---

## 🛠 Tecnologias usadas

### Framework y lenguaje

| Tecnología | Versión | Rol |
|------------|---------|-----|
| **Next.js** | 16.1 | Framework React con App Router, SSG, Server Components |
| **TypeScript** | 5 | Tipado estático estricto |
| **React** | 19 | Librería de UI con Server Components |

### Estilos y UI

| Tecnología | Versión | Rol |
|------------|---------|-----|
| **Tailwind CSS** | 4 | Framework de estilos utility-first con `@theme inline` y oklch |
| **shadcn/ui** | Latest | Componentes UI accesibles (Radix UI primitives) |
| **Lucide React** | 0.525 | Iconografía vectorial |
| **Framer Motion** | 12 | Animaciones de transición |
| **next-themes** | 0.4 | Sistema de tema claro/oscuro |
| **tw-animate-css** | 1.3 | Animaciones CSS para shadcn/ui |

### Backend y datos

| Tecnología | Versión | Rol |
|------------|---------|-----|
| **Prisma** | 6.11 | ORM para base de datos SQLite |
| **SQLite** | — | Base de datos embebida (sin servidor) |
| **Zustand** | 5.0 | Gestión de estado en cliente (disponible) |
| **TanStack Query** | 5.82 | Cache de estado servidor (disponible) |

### Herramientas de desarrollo

| Tecnología | Versión | Rol |
|------------|---------|-----|
| **Bun** | Runtime | Gestor de paquetes y runtime JavaScript |
| **ESLint** | 9 | Linting con `eslint-config-next` |
| **PostCSS** | — | Procesador CSS con plugin `@tailwindcss/postcss` |

### Opcional / Futuro

| Tecnología | Versión | Rol |
|------------|---------|-----|
| **NextAuth.js** | 4.24 | Autenticación (disponible, no configurada) |
| **z-ai-web-dev-sdk** | 0.0.18 | SDK para capacidades AI (LLM, VLM, TTS, etc.) |

---

## 🏗 Arquitectura del proyecto

```
┌─────────────────────────────────────────────────────────────────┐
│                        Navegador                                │
│  URL: embes.es/cerrajeros/castellon                             │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  Next.js 16 App Router                                         │
│                                                                 │
│  / (page.tsx)                  → SPA con 3 vistas: Home,       │
│                                  Servicios, Localidades         │
│                                                                 │
│  /[...slug] (page.tsx)         → Catch-all route:               │
│    • /castellon                → LocationHubPage (30 páginas)   │
│    • /cerrajeros/castellon     → ServiceLocationPage (480 págs)  │
│                                                                 │
│  generateStaticParams()        → Pre-renderiza las 510 páginas  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  Capa de datos                                                │
│  • data.ts          → Servicios, localidades, clústeres         │
│  • seo-content.ts   → Generador de contenido SEO único          │
│  • db.ts + Prisma   → SQLite (para futura funcionalidad)       │
└─────────────────────────────────────────────────────────────────┘
```

### Flujo de datos

```
data.ts (tipos + datos estáticos)
    │
    ├── services[]         → 16 servicios con slug, nombre, icono, clúster
    ├── locations[]        → 30 ciudades con slug, provincia, comunidad
    ├── clusters[]         → 5 agrupaciones temáticas
    └── provinceGroups[]   → 12 grupos por comunidad autónoma
         │
         ▼
seo-content.ts (generador programático)
    │
    ├── generateMeta()           → Title + description únicos
    ├── generateIntro()          → Texto introductorio variado
    ├── generateBenefits()       → 4 beneficios por página
    ├── generateFAQ()            → 5 FAQs únicos con variación
    ├── generateStructuredData() → JSON-LD Service + LocalBusiness
    ├── getRelatedServices()     → Servicios del mismo clúster
    └── getNearbyLocations()     → Ciudades de la misma comunidad
```

---

## 📁 Estructura de carpetas

```
embes/
├── prisma/
│   └── schema.prisma          # Esquema de base de datos (SQLite)
├── public/
│   ├── robots.txt             # Directivas para crawlers de buscadores
│   └── logo.svg               # Logo SVG de EMBES
├── src/
│   ├── app/
│   │   ├── globals.css        # Tema EMBES (oklch), dark/light, utilidades CSS
│   │   ├── layout.tsx         # Layout raíz: SEO metadata, JSON-LD, ThemeProvider
│   │   ├── page.tsx           # Página principal: SPA con 3 vistas (client component)
│   │   ├── [...slug]/
│   │   │   └── page.tsx       # Catch-all: 480 landing + 30 hubs (server component)
│   │   └── api/
│   │       └── route.ts       # API route placeholder
│   ├── components/
│   │   ├── ui/                # Componentes shadcn/ui (40+ componentes)
│   │   ├── views/
│   │   │   ├── home-view.tsx              # Vista inicio: hero, trust, servicios, localidades
│   │   │   ├── servicios-view.tsx         # Vista catálogo: 5 clústeres con tarjetas
│   │   │   ├── localidades-view.tsx       # Vista localidades: 12 comunidades con listas
│   │   │   └── service-location-view.tsx  # Vista servicio×localidad (legacy/SPA)
│   │   ├── navbar.tsx         # Barra de navegación sticky con theme toggle
│   │   ├── footer.tsx         # Pie de página 4 columnas
│   │   └── theme-provider.tsx # Wrapper de next-themes
│   ├── hooks/
│   │   ├── use-mobile.ts      # Hook detección de pantalla móvil
│   │   └── use-toast.ts       # Hook para notificaciones toast
│   └── lib/
│       ├── data.ts            # Tipos, servicios, localidades, helpers
│       ├── seo-content.ts     # Generador de contenido SEO programático
│       ├── db.ts              # Cliente Prisma (SQLite)
│       └── utils.ts           # Utilidad cn() para clases Tailwind
├── next.config.ts             # Config Next.js: output standalone
├── tsconfig.json              # Config TypeScript estricto
├── postcss.config.mjs         # PostCSS con Tailwind
├── package.json               # Dependencias y scripts
└── bun.lock                   # Lockfile de Bun
```

---

## 📖 Explicacion del codigo

### Capa de datos (`data.ts`)

Este es el archivo central que alimenta toda la aplicación. Define los tipos y los datos estáticos:

```typescript
// Tipos principales
interface Service {
  slug: string;        // URL-friendly: "cerrajeros", "electricistas"
  name: string;        // Nombre completo: "Cerrajería profesional"
  shortName: string;   // Nombre corto: "Cerrajeros"
  description: string; // Descripción SEO del servicio
  icon: string;        // Nombre del icono Lucide: "KeyRound"
  cluster: string;     // ID del clúster: "emergencias", "salud", etc.
}

interface Location {
  name: string;        // "Castellón de la Plana"
  slug: string;        // "castellon"
  province: string;    // "Castellón"
  community: string;   // "Comunidad Valenciana"
  isCapital?: boolean; // true si es capital de provincia
}
```

**Datos exportados:**
- `services` — Array de 16 servicios profesionales
- `locations` — Array de 30 ciudades en 12 comunidades autónomas
- `clusters` — 5 agrupaciones (Emergencias 24h, Salud y Cuidado, Reformas y Hogar, Educación y Formación, Bienestar Personal)
- `provinceGroups` — 12 grupos por comunidad autónoma
- `topLocations` — 12 ciudades destacadas para la home
- `featuredServices` — 8 servicios destacados para la home

**Funciones helper:**
- `getTopCitiesForService(slug)` — Devuelve las 5 principales ciudades para un servicio
- `getServiceBySlug(slug)` — Busca un servicio por su slug

---

### Generador de contenido SEO (`seo-content.ts`)

Archivo de ~600 líneas que genera contenido único para cada una de las 480 páginas servicio×localidad. Usa **variación determinista** basada en un hash del slug de la localidad para que el mismo servicio en diferentes ciudades tenga textos distintos pero consistentes entre builds.

```typescript
// Función de hash determinista
function locVariation(location: Location): number {
  let h = 0;
  for (let i = 0; i < location.slug.length; i++) {
    h = (h * 31 + location.slug.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

// Selección determinista de variaciones
function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}
```

**Funciones principales:**
| Función | Retorna | Descripción |
|---------|---------|-------------|
| `generateMeta(service, location)` | `{title, description}` | Meta tags SEO únicos por página |
| `generateIntro(service, location)` | `string` | Párrafo introductorio H1 variado |
| `generateBenefits(service, location)` | `Array<{title, description}>` | 4 beneficios con texto contextualizado |
| `generateFAQ(service, location)` | `Array<{question, answer}>` | 5 FAQs con variación por clúster |
| `generateStructuredData(service, location)` | `object` | JSON-LD Service + LocalBusiness |
| `getRelatedServices(service)` | `Service[]` | Servicios del mismo clúster |
| `getNearbyLocations(service, location)` | `Location[]` | Ciudades de la misma comunidad |
| `generateLocationMeta(location)` | `{title, description}` | Meta tags para páginas hub de localidad |
| `generateLocationIntro(location)` | `string` | Texto introductorio para hub de localidad |
| `getLocationServices(location)` | `Service[]` | Todos los servicios disponibles en una ciudad |

---

### Página principal (`page.tsx`)

Componente cliente que implementa una **SPA (Single Page Application) dentro de la ruta `/`** usando `useState` para alternar entre 3 vistas:

```typescript
type ViewType = "home" | "servicios" | "localidades";

export default function Home() {
  const [activeView, setActiveView] = useState<ViewType>("home");
  // ... escucha eventos custom 'embes-navigate' para cambiar de vista
}
```

**Por qué SPA en vez de rutas reales?** La home, servicios y localidades comparten Navbar y Footer sin necesidad de layouts separados. La comunicación entre `Navbar` (que no recibe props del padre) y `page.tsx` se realiza mediante **Custom Events** del DOM:

```typescript
// En Navbar: despacha evento
window.dispatchEvent(new CustomEvent("embes-navigate", { detail: "servicios" }));

// En page.tsx: escucha evento
useEffect(() => {
  const handler = (e: Event) => {
    setActiveView((e as CustomEvent).detail);
  };
  window.addEventListener("embes-navigate", handler);
  return () => window.removeEventListener("embes-navigate", handler);
}, []);
```

---

### Páginas dinámicas (`[...slug]/page.tsx`)

Este es el archivo más importante para SEO. Es un **Server Component** que maneja todas las rutas excepto `/`:

```typescript
// Genera las 510 páginas estáticas (SSG)
export function generateStaticParams() {
  const params: { slug: string[] }[] = [];
  // 480 páginas servicio×localidad
  for (const service of services) {
    for (const location of locations) {
      params.push({ slug: [service.slug, location.slug] });
    }
  }
  // 30 páginas hub de localidad
  for (const location of locations) {
    params.push({ slug: [location.slug] });
  }
  return params;
}
```

**Dispatch de rutas:**
- `slug.length === 2` → Página landing servicio×localidad (`ServiceLocationPage`)
- `slug.length === 1` → Página hub de localidad (`LocationHubPage`)
- Otro → `notFound()` (404)

**Cada `ServiceLocationPage` incluye:**
1. Breadcrumb con `BreadcrumbList` JSON-LD
2. H1 optimizado: "Cerrajeros en Castellón — Profesionales Verificados"
3. 4 tarjetas de beneficios con iconos
4. Contenido principal en layout 2 columnas (artículo + sidebar sticky con CTA)
5. FAQ con `<details>` nativo + JSON-LD `FAQPage`
6. Sección de ciudades cercanas (misma comunidad autónoma)
7. Nube de enlaces internos a otros servicios en la ciudad

**Cada `LocationHubPage` incluye:**
1. Breadcrumb semántico
2. H1 con nombre de ciudad
3. Grid de 16 servicios disponibles con links a sus landings
4. Agrupación por clústeres temáticos
5. Sección de ciudades cercanas en la misma comunidad

---

### Layout y metatags (`layout.tsx`)

El layout raíz configura toda la aplicación:

- **`lang="es"`** — Idioma español para SEO
- **`className="dark"`** en `<html>` — Tema oscuro por defecto (evita flash de contenido claro)
- **`suppressHydrationWarning`** — Necesario para next-themes
- **`metadata` export** — Metadatos globales con template de título (`%s | EMBES`), descripción, keywords, Open Graph, Twitter Cards, robots directives
- **JSON-LD global** — `Organization` (datos legales, dirección, logo) y `WebSite` con `SearchAction`
- **Fuentes** — Geist Sans y Geist Mono de Google Fonts
- **`ThemeProvider`** — Wrapper de next-themes con `defaultTheme="dark"` y `enableSystem`

---

### Sistema de temas (`globals.css` + theme-provider)

#### Paleta de colores EMBES

El sistema usa **oklch** (OKLAB Lightness Chroma Hue) para colores perceptualmente uniformes:

| Variable | Modo claro | Modo oscuro | Descripción |
|----------|-----------|-------------|-------------|
| `--primary` | `oklch(0.795 0.184 86.047)` | `oklch(0.795 0.184 86.047)` | Amarillo EMBES (igual en ambos) |
| `--background` | `oklch(1 0 0)` (blanco) | `oklch(0.09 0.005 285.823)` | Casi negro con tinte púrpura |
| `--card` | `oklch(0.985 0 0)` | `oklch(0.14 0.005 285.823)` | Tarjetas ligeramente más claras que fondo |
| `--muted-foreground` | `oklch(0.552 0.016 285.938)` | `oklch(0.65 0.015 285.938)` | Texto secundario |

#### Dark mode CSS-first

El toggle de tema en `navbar.tsx` usa un enfoque **100% CSS** para evitar problemas de hidratación:

```tsx
// El icono del Sol solo es visible en modo claro
<Sun className="size-4 dark:hidden" />
// El icono de la Luna solo es visible en modo oscuro
<Moon className="size-4 hidden dark:block text-primary" />
```

#### Utilidades CSS custom

```css
/* Hover de tarjetas acelerado por GPU (sin re-renders JS) */
.card-hover {
  will-change: transform, border-color;
  transform: translateZ(0);        /* Promueve a capa GPU */
  backface-visibility: hidden;     /* Optimización de composición */
}
.card-hover:hover {
  transform: translateY(-0.25rem); /* Elevación sutil */
  border-color: var(--primary);    /* Borde amarillo */
}
```

---

### Componentes de vista

#### `home-view.tsx` — Vista de inicio (Server Component)

Secciones:
1. **Hero** — H1 + barra de búsqueda dual (servicio + ubicación)
2. **Trust** — 4 tarjetas: Profesionales Verificados, Atención 24h, Presupuestos sin compromiso, Cobertura 30+ ciudades
3. **Servicios Destacados** — Grid 4 columnas con 8 servicios principales
4. **Localidades Principales** — Grid de 12 ciudades con links
5. **CTA** — Tarjeta para captar profesionales

#### `servicios-view.tsx` — Catálogo de servicios (Server Component)

Muestra los 5 clústeres temáticos. Cada clúster tiene un grid de tarjetas de servicio con un `Accordion` expandible que muestra 5 enlaces a ciudades principales.

#### `localidades-view.tsx` — Directorio por localidad (Server Component)

Grid de 12 tarjetas de comunidad autónoma. Cada tarjeta lista sus ciudades con links y muestra badges de servicios con alta demanda.

#### `service-location-view.tsx` — Vista legacy (no usada en rutas reales)

Componente diseñado para el modo SPA original. Las páginas reales usan `ServiceLocationPage` dentro de `[...slug]/page.tsx`.

---

### Navbar con navegación dual

La Navbar funciona en **dos modos** según la ruta actual:

1. **En `/` (home)** — Modo SPA: usa `CustomEvent` para cambiar vistas sin recarga
2. **En subpáginas** — Modo router: usa `<Link>` de Next.js para volver a `/`

Esto se implementa detectando `pathname === "/"` con `usePathname()`.

---

### Footer

Pie de página con 4 columnas:
1. **Marca** — Logo EMBES + descripción
2. **Servicios populares** — 8 links a servicios
3. **Localidades principales** — 8 links a ciudades
4. **Información** — Links legales (Sobre EMBES, Contacto, Aviso legal, Política de privacidad)

Incluye copyright dinámico con `new Date().getFullYear()`.

---

## 🍎 Despliegue en Mac con chip M1 (Apple Silicon)

### Requisitos previos

- macOS 12 Monterey o superior (recomendado macOS 14 Sonoma)
- Chip M1, M1 Pro, M1 Max, M1 Ultra, M2, M3 o M4
- ~4 GB de espacio libre en disco
- Conexión a internet

---

### 1. Instalar Homebrew

[Homebrew](https://brew.sh) es el gestor de paquetes de referencia para macOS. Abre la app **Terminal** (Aplicaciones > Utilidades > Terminal) y ejecuta:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

> **Nota en M1:** Homebrew se instala en `/opt/homebrew` en lugar de `/usr/local`. El script de instalación te pedirá que añadas dos líneas a tu `~/.zprofile` (o `~/.zshrc`). Acepta.

Después de la instalación, verifica:

```bash
brew --version
# Debería mostrar algo como: Homebrew 4.x.x
```

Si el comando `brew` no se encuentra, añade Homebrew al PATH:

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

> **Tip M1:** Si usas `bash` en lugar de `zsh`, cambia `~/.zprofile` por `~/.bash_profile`.

---

### 2. Instalar Bun

[Bun](https://bun.sh) es el runtime y gestor de paquetes que usa este proyecto. Es significativamente más rápido que npm en Apple Silicon gracias a su compilación nativa para ARM64.

```bash
brew install oven-sh/bun/bun
```

Verifica la instalación:

```bash
bun --version
# Debería mostrar algo como: 1.x.x
```

> **Nota:** Bun se compila nativamente para ARM64, por lo que en tu M1 funcionará a máxima velocidad sin necesidad de traducción Rosetta 2.

---

### 3. Clonar el repositorio

```bash
# Si usas SSH (recomendado si tienes clave configurada)
git clone git@github.com:tu-usuario/embes.git

# Si usas HTTPS
git clone https://github.com/tu-usuario/embes.git

# Entrar al directorio del proyecto
cd embes
```

---

### 4. Instalar dependencias

```bash
bun install
```

Esto leerá `package.json` y `bun.lock` para instalar todas las dependencias. En un M1, este proceso suele tardar entre 10-30 segundos (vs 1-3 minutos con npm).

> **Tip M1:** Si encuentras errores de compilación de paquetes nativos (como `sharp` o `esbuild`), Bun los maneja automáticamente con sus binarios precompilados para ARM64. Si hay problemas, intenta:
> ```bash
> rm -rf node_modules
> bun install --force
> ```

---

### 5. Configurar base de datos (Prisma + SQLite)

Este proyecto usa SQLite, que viene embebido — **no necesitas instalar ningún servidor de base de datos**.

#### 5.1 Crear archivo `.env`

```bash
cp .env.example .env  # Si existe .env.example
```

Si no existe `.env.example`, crea el archivo `.env` manualmente:

```bash
touch .env
```

Y añade la siguiente línea:

```env
DATABASE_URL="file:./dev.db"
```

#### 5.2 Sincronizar el esquema

```bash
bun run db:push
```

Esto crea el archivo `prisma/dev.db` con las tablas definidas en `prisma/schema.prisma`.

> **Nota:** Para este proyecto de directorio, la base de datos no es estrictamente necesaria en desarrollo ya que todos los datos vienen de `data.ts`. Prisma está disponible para futuras funcionalidades como sistema de valoraciones o perfiles de profesionales.

---

### 6. Iniciar en modo desarrollo

```bash
bun run dev
```

Esto inicia el servidor de desarrollo en `http://localhost:3000` con:
- **Hot Module Replacement (HMR)** — Los cambios se reflejan instantáneamente
- **Fast Refresh** — Preserva el estado de React al editar componentes
- **Compilación incremental** — Solo recompila lo necesario

Abre tu navegador en `http://localhost:3000` para ver la aplicación.

> **Rendimiento en M1:** El primer build puede tardar 5-10 segundos. Las recargas posteriores son casi instantáneas (< 100ms) gracias a la optimización de Next.js 16 para ARM64.

---

### 7. Compilar para producción

```bash
bun run build
```

Esto genera:
- `.next/` — Archivos de compilación optimizados
- `.next/standalone/` — Bundle auto-contenido para despliegue (gracias a `output: "standalone"` en `next.config.ts`)

> **Nota M1:** La compilación completa de las 510 páginas puede tardar entre 30 segundos y 2 minutos dependiendo de la cantidad de RAM disponible. Un M1 con 8 GB lo gestionará sin problemas; si tienes 16 GB será aún más rápido.

---

### 8. Ejecutar en produccion

```bash
bun run start
```

Esto ejecuta el servidor Node.js optimizado en el puerto 3000 usando el bundle standalone.

Para ejecutar en un puerto diferente:

```bash
PORT=8080 bun run start
```

---

### 9. Configurar Caddy como proxy inverso (opcional)

Caddy se usa como gateway para manejar HTTPS automático y enrutamiento:

#### Instalar Caddy en Mac

```bash
brew install caddy
```

#### Configuración básica (`Caddyfile`)

```
embes.es {
    reverse_proxy localhost:3000
}
```

#### Iniciar Caddy

```bash
# Probar la configuración
caddy validate --config Caddyfile

# Iniciar Caddy en segundo plano
caddy start --config Caddyfile

# O en primer plano (para desarrollo)
caddy run --config Caddyfile
```

> **Nota:** Caddy obtiene y renueva automáticamente los certificados SSL/TLS de Let's Encrypt. Tu dominio debe apuntar a la IP pública de tu Mac.

---

### 10. Tips especificos para M1

#### Rosetta 2

Bun y todas las dependencias principales de este proyecto son **nativas para ARM64**, por lo que **no necesitas Rosetta 2**. Sin embargo, si alguna dependencia antigua lo requiere:

```bash
# Instalar Rosetta 2 (solo si es necesario)
softwareupdate --install-rosetta
```

#### Rendimiento

- **Bun en M1** es ~3x más rápido que npm en Intel para instalar dependencias
- **Next.js build** se beneficia del compilador JIT de V8 optimizado para ARM
- **SQLite** funciona nativamente sin emulación

#### Problemas conocidos en M1

| Problema | Solución |
|----------|----------|
| `sharp` falla al instalar | `bun install --force` (Bun usa binarios ARM64 precompilados) |
| Puerto 3000 en uso | `lsof -i :3000` y luego `kill -9 <PID>` |
| Permiso denegado en `/opt/homebrew` | `sudo chown -R $(whoami) /opt/homebrew` |
| `Cannot find module` | `rm -rf node_modules && bun install` |

#### Monitorizar el proceso

```bash
# Ver uso de CPU y memoria del proceso
top -pid $(lsof -t -i:3000)

# Ver logs del servidor en tiempo real
tail -f dev.log

# Ver logs de produccion
tail -f server.log
```

---

### 11. Despliegue con Docker en Mac

Si prefieres usar Docker para aislar el entorno:

#### Instalar Docker Desktop

```bash
brew install --cask docker
```

> **Nota M1:** Docker Desktop para Apple Silicon usa máquinas virtuales basadas en Apple Hypervisor Framework, no Rosetta. Es nativo y eficiente.

#### Crear `Dockerfile`

```dockerfile
FROM oven/bun:1 AS base

FROM base AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["bun", ".next/standalone/server.js"]
```

#### Construir y ejecutar

```bash
# Construir la imagen
docker build -t embes .

# Ejecutar el contenedordocker run -p 3000:3000 --name embes-app embes

# Ver logs
docker logs -f embes-app

# Detener
docker stop embes-app

# Eliminar
docker rm embes-app
```

> **Tip M1:** Marca la imagen como `--platform linux/arm64` si comparten la imagen con servidores Intel:
> ```bash
> docker build --platform linux/arm64 -t embes .
> ```

---

### 12. Configuración de PM2 para produccion

Para mantener el servidor corriendo en segundo plano con auto-restart:

```bash
# Instalar PM2 globalmente
brew install pm2
# o: bun add -g pm2

# Iniciar la aplicación
pm2 start bun --name embes -- run start

# Ver estado
pm2 status

# Ver logspm2 logs embes

# Configurar auto-restart al reiniciar Mac
pm2 startup
pm2 save
```

Crear archivo `ecosystem.config.cjs`:

```javascript
module.exports = {
  apps: [{
    name: 'embes',
    script: 'bun',
    args: 'run start',
    cwd: '/ruta/al/proyecto/embes',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',
    env: {
      NODE_ENV: 'production',
      DATABASE_URL: 'file:./db/custom.db',
    },
  }],
};
```

Luego: `pm2 start ecosystem.config.cjs`

---

## 🪟 Despliegue en Windows

### Requisitos

- Windows 10 (build 19041+) o Windows 11
- PowerShell 7+ (recomendado) o CMD
- WSL2 (Windows Subsystem for Linux) **muy recomendado** para mejor compatibilidad

### Opcion A: Nativo en Windows

#### 1. Instalar Bun

Abre **PowerShell** como administrador:

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

#### 2. Clonar e instalar

```powershell
git clone https://github.com/tu-usuario/embes.git
cd embes
bun install
```

#### 3. Configurar `.env`

Crear archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL="file:./dev.db"
```

#### 4. Sincronizar base de datos

```powershell
bun run db:push
```

#### 5. Iniciar desarrollo

```powershell
bun run dev
```

#### 6. Compilar para produccion

```powershell
bun run build
bun run start
```

### Opcion B: Con WSL2 (recomendado)

WSL2 proporciona un entorno Linux completo dentro de Windows, ideal para desarrollo web.

#### 1. Instalar WSL2

Abre **PowerShell como administrador**:

```powershell
wsl --install
```

Esto instala Ubuntu por defecto. Reinicia Windows cuando se solicite.

#### 2. Abrir Ubuntu y configurar

```bash
# Actualizar paquetes
sudo apt update && sudo apt upgrade -y

# Instalar Bun
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc

# Verificar
bun --version
```

#### 3. Clonar y ejecutar

```bash
cd /mnt/c/Users/TuUsuario/  # O donde prefieras trabajar
git clone https://github.com/tu-usuario/embes.git
cd embes
bun install
echo 'DATABASE_URL="file:./dev.db"' > .env
bun run db:push
bun run dev
```

> **Ventaja WSL2:** El rendimiento de I/O de archivos es mejor dentro del filesystem de Linux (`~/` o `/home/`) que en el filesystem de Windows montado (`/mnt/c/`). Clona el repositorio dentro de `~` para mejor rendimiento.

### Problemas conocidos en Windows

| Problema | Solución |
|----------|----------|
| Puerto 3000 ocupado | `netstat -ano | findstr :3000` y `taskkill /PID <PID> /F` |
| `sharp` falla | Instalar Visual Studio Build Tools o usar WSL2 |
| Paths con espacios | Usa comillas: `cd "C:\Mi Carpeta\embes"` |
| Script `.sh` no funciona | Usa WSL2 o Git Bash |

---

## 🐧 Despliegue en Linux

### Requisitos

- Distribución: Ubuntu 22.04+/24.04, Debian 12+, Fedora 39+, o cualquier distro moderna
- Kernel 5.15+ (para soporte completo de Bun)
- ~1 GB de RAM mínimo, 2 GB recomendado
- `curl`, `git`, `unzip` instalados

### Instalación paso a paso (Ubuntu/Debian)

#### 1. Instalar dependencias del sistema

```bash
sudo apt update && sudo apt install -y curl git unzip build-essential
```

#### 2. Instalar Bun

```bash
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
```

#### 3. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/embes.git
cd embes
```

#### 4. Instalar dependencias

```bash
bun install
```

#### 5. Configurar base de datos

```bash
echo 'DATABASE_URL="file:./dev.db"' > .env
bun run db:push
```

#### 6. Desarrollo

```bash
bun run dev
```

#### 7. Producción con systemd

Crear archivo de servicio `/etc/systemd/system/embes.service`:

```ini
[Unit]
Description=EMBES Directorio Web
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/embes
Environment=NODE_ENV=production
Environment=DATABASE_URL=file:./db/custom.db
ExecStart=/home/www-data/.bun/bin/bun run start
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

```bash
# Compilar
bun run build

# Copiar archivos estáticos necesarios para standalone
cp -r .next/static .next/standalone/.next/
cp -r public .next/standalone/

# Habilitar y arrancar el serviciosudo systemctl daemon-reload
sudo systemctl enable embes
sudo systemctl start embes

# Ver estadussudo systemctl status embes

# Ver logs
sudo journalctl -u embes -f
```

#### 8. Caddy como reverse proxy (con HTTPS automático)

```bash
# Instalar Caddy
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy
```

Editar `/etc/caddy/Caddyfile`:

```
embes.es {
    reverse_proxy localhost:3000
}
```

```bash
sudo systemctl reload caddy
```

### Producción con PM2 (alternativa)

```bash
# Instalar PM2
curl -fsSL https://bun.sh/install | bash
bun add -g pm2

# Iniciar
pm2 start bun --name embes -- run start
pm2 save
pm2 startup
```

### Distribuciones basadas en Fedora/RHEL

```bash
# Instalar dependencias
sudo dnf install -y curl git unzip gcc

# Instalar Bun
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc

# El resto de pasos es idéntico
```

---

## 🔐 Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de datos (SQLite embebido, sin servidor necesario)
DATABASE_URL="file:./dev.db"

# Opcional: Para NextAuth (no configurado actualmente)
# NEXTAUTH_URL="http://localhost:3000"
# NEXTAUTH_SECRET="tu-secreto-aqui"

# Opcional: Para z-ai-web-dev-sdk
# Z_AI_API_KEY="tu-api-key"
```

> **Importante:** Nunca commits el archivo `.env`. Añade `.env` a tu `.gitignore`.

---

## 📋 Scripts disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| `dev` | `bun run dev` | Servidor de desarrollo en puerto 3000 con HMR |
| `build` | `bun run build` | Compilación de producción (SSG de 510 páginas) |
| `start` | `bun run start` | Servidor de producción standalone |
| `lint` | `bun run lint` | Análisis estático con ESLint |
| `db:push` | `bun run db:push` | Sincronizar esquema Prisma con SQLite |
| `db:generate` | `bun run db:generate` | Generar cliente Prisma |
| `db:migrate` | `bun run db:migrate` | Migraciones de base de datos |
| `db:reset` | `bun run db:reset` | Resetear base de datos |

---

## 📄 Licencia

Proyecto privado — EMBES (Empowering Modern Business & Everyday Services).
Todos los derechos reservados.
