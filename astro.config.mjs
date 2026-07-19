import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'node:url';

// EMBES · Rank & Rent — Astro SSG orientado a SEO / Core Web Vitals.
// Regla de oro: nada que sostenga LCP > 1.5s o CLS > 0 se queda en producción.
const srcDir = fileURLToPath(new URL('./src', import.meta.url));

export default defineConfig({
  // Obligatorio para canonical y @astrojs/sitemap.
  // PLACEHOLDER: sustituir por el dominio real de la marca EMBES.
  site: 'https://www.embes.es',

  // SSG estricto: TODAS las rutas dinámicas se pre-renderizan en build time.
  output: 'static',

  // Formato carpeta + trailing slash siempre -> /servicios/electricista/toledo/
  // Consolida canonical y autoridad sin ambigüedad de rutas (anti-canibalización).
  trailingSlash: 'always',
  build: { format: 'directory' },

  // HTML minificado. Filosofía Zero-JS: sin script de prefetch salvo necesidad justificada.
  compressHTML: true,
  prefetch: false,

  integrations: [
    react(),
    // applyBaseStyles:false: importamos src/styles/global.css (con @tailwind + tokens
    // shadcn) en el layout, evitando una doble inyección de la capa base de Tailwind.
    tailwind({ applyBaseStyles: false }),
    // Rastrea todas las rutas estáticas emitidas (incluido el producto cartesiano de
    // getStaticPaths en /servicios/[servicio]/[localid].astro) y genera /sitemap-index.xml.
    sitemap({
      filter: (page) => !page.includes('/draft/'),
      lastmod: new Date('2026-07-18T00:00:00Z'),
    }),
  ],

  // astro:assets usa el servicio sharp por defecto en SSG (AVIF/WebP automáticos).
  vite: {
    resolve: { alias: { '@': srcDir } },
    build: { target: 'es2022', cssMinify: 'esbuild' },
  },
});
