import { defineCollection, z } from 'astro:content';

/**
 * EMBES · src/content/config.ts — Fase 2: Content Collections.
 *
 * Dos colecciones paramétricas. El producto cartesiano
 *   Servicios × Localidades
 * alimenta getStaticPaths() en src/pages/servicios/[servicio]/[localidad].astro
 * para generar el árbol transaccional del modelo Rank & Rent (16 × 30 = 480 landings).
 */

// Catálogo de Schema.org que admite cada servicio. Cada documento de `servicios`
// declara aquí su tipo, y el motor JSON-LD (lib/jsonld.ts) lo materializa.
const SchemaTypeEnum = z.enum([
  'MedicalBusiness',
  'EducationalOrganization',
  'LocalBusiness',
  'HomeAndConstructionBusiness',
]);

// Máxima categoría semántica para el silo nacional de cada vertical.
const ServicioSchema = z.object({
  // El id del archivo (electricista.md) debe coincidir con el slug de la ruta.
  title: z.string(), // p.ej. "Electricista Urgente"
  metaDescription: z.string().max(200), // orientada a CTR
  h1Principal: z.string(), // variación informacional nacional
  schemaType: SchemaTypeEnum,
  // Intención de búsqueda exacta para el H1 de la landing transaccional.
  keywordTransaccional: z.string(),
  // Plural del oficio para narrativa de barrio/distribución (p.ej. "electricistas").
  nombreProfesion: z.string().min(2),
  // Tel y texto del CTA — sede del cliente Rank & Rent (PLACEHOLDER).
  telefono: z.string().regex(/^\+?[\d\s()()-]{9,}$/),
  tarifaOrientativa: z.string().optional(), // p.ej. "desde 40 €/intervención"
  // Variables semánticas reutilizables en el cuerpo narrativo.
  variantesKeyword: z.array(z.string()).min(3), // ["luces", "cuadro eléctrico", ...]
  serviciosOfrecidos: z.array(z.string()).min(3),
  // Plantilla de FAQ paramétrica — la localidad se interpola en runtime.
  faq: z.array(z.object({ q: z.string(), a: z.string() })).min(3),
  // Métricas de confianza locales (sección E-E-A-T).
  metricasConfianza: z.array(z.object({
    valor: z.string(),
    etiqueta: z.string(),
  })).min(2),
  areaServedNacional: z.string(), // p.ej. "España peninsular"
});

// Una localidad = un municipio español con variables geográficas locales.
const LocalidadSchema = z.object({
  // El id del archivo (toledo.md) debe coincidir con el slug de la ruta.
  nombre: z.string(), // "Toledo"
  nombreFormal: z.string(), // "Toledo (Castilla-La Mancha)"
  provincia: z.string(),
  region: z.string(),
  // addressLocality / addressRegion / areaServed del JSON-LD.
  addressRegion: z.string(),
  // Polígono operativo (GeoShape) — box aproximada WGS84.
  geo: z.object({
    latitude: z.number(),
    longitude: z.number(),
    bbox: z.tuple([z.number(), z.number(), z.number(), z.number()]),
  }),
  // Variables locales geográficas: barrios, códigos postales, distritos.
  barrios: z.array(z.string()).min(3),
  codigosPostales: z.array(z.string().regex(/^\d{5}$/)).min(1),
  distritos: z.array(z.string()).default([]),
  // Texto local reutilizable en la narrativa geolocalizada.
  introduccionLocal: z.string(),
  numeroHabitantes: z.string().optional(),
});

export const collections = {
  servicios: defineCollection({ type: 'content', schema: ServicioSchema }),
  localidades: defineCollection({ type: 'content', schema: LocalidadSchema }),
};
