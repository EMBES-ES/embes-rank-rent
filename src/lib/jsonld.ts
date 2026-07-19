import type { CollectionEntry } from 'astro:content';

/**
 * EMBES · src/lib/jsonld.ts — Motor de inyección de datos estructurados (Fase 3).
 *
 * Evalúa `schemaType` del servicio y emite el bloque Schema.org correspondiente:
 *  - MedicalBusiness            → dentistas, geriatría
 *  - EducationalOrganization    → clases particulares
 *  - HomeAndConstructionBusiness→ oficios manuales del hogar
 *  - LocalBusiness              → resto de servicios locales
 *
 * Todo bloque incluye imperativamente:
 *  - addressLocality / addressRegion  (PostalAddress)
 *  - geo (GeoCoordinates) y areaServed (GeoShape "box" = polígono operativo)
 */

export interface JsonLdContext {
  servicio: CollectionEntry<'servicios'>;
  localidad: CollectionEntry<'localidades'>;
  // URL absoluta ya con trailing slash, ej: https://www.embes.es/servicios/electricista/toledo/
  canonical: string;
  // URL del logo en /public (relativa a la raíz del dominio).
  logoUrl: string;
}

const SITE = 'https://www.embes.es'; // sincronizado con astro.config.mjs · site

/** Dirección postal mínima con campos geográficos obligatorios. */
function postalAddress(loc: CollectionEntry<'localidades'>) {
  const l = loc.data;
  return {
    '@type': 'PostalAddress',
    addressLocality: l.nombre,
    addressRegion: l.addressRegion,
    postalCode: l.codigosPostales[0], // CP representativo de la cabecera
    addressCountry: 'ES',
  };
}

/** Polígono operativo como GeoShape (box WGS84) — areaServed exigido. */
function areaServed(loc: CollectionEntry<'localidades'>) {
  const [minLat, minLon, maxLat, maxLon] = loc.data.geo.bbox;
  return {
    '@type': 'GeoShape',
    // Formato box de Schema: "minLat minLon maxLat maxLon" (separados por espacios).
    box: `${minLat.toFixed(4)} ${minLon.toFixed(4)} ${maxLat.toFixed(4)} ${maxLon.toFixed(4)}`,
  };
}

function geoCoordinates(loc: CollectionEntry<'localidades'>) {
  const g = loc.data.geo;
  return { '@type': 'GeoCoordinates', latitude: g.latitude, longitude: g.longitude };
}

/** Bloque FAQPage reutilizable para el acordeón de FAQ. */
export function buildFaqJsonLd(servicio: CollectionEntry<'servicios'>, localidad: CollectionEntry<'localidades'>) {
  const faq = servicio.data.faq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  }));
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq,
  };
}

/** Bloque Organization común (se inyecta una sola vez en el head del layout). */
export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EMBES',
    url: `${SITE}/`,
    logo: `${SITE}/logo.png`,
  };
}

/** Bloque BreadcrumbList para la página transaccional. */
export function buildBreadcrumbJsonLd(ctx: JsonLdContext) {
  const s = ctx.servicio.slug, l = ctx.localidad.slug;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: ctx.servicio.data.title, item: `${SITE}/servicios/${s}/` },
      { '@type': 'ListItem', position: 3, name: ctx.localidad.data.nombre, item: ctx.canonical },
    ],
  };
}

/**
 * Genera el dato estructulado PRINCIPAL de la landing transaccional, alternando
 * @type según schemaType. Todos comparten los campos geográficos obligatorios.
 */
export function buildBusinessJsonLd(ctx: JsonLdContext) {
  const { servicio, localidad, canonical } = ctx;
  const s = servicio.data;
  const l = localidad.data;

  // @type dinámico: EducationalOrganization es @type simple; el resto es array
  // [LocalBusiness/HomeAndConstructionBusiness/MedicalBusiness, Place implied via address].
  const baseType =
    s.schemaType === 'EducationalOrganization'
      ? 'EducationalOrganization'
      : [s.schemaType, 'Place'];

  const graph: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': baseType,
    '@id': canonical,
    name: `${s.title} en ${l.nombre}`,
    description: s.metaDescription,
    url: canonical,
    telephone: s.telefono,
    image: `${SITE}/logo.png`,
    priceRange: s.tarifaOrientativa ?? '$$',
    address: postalAddress(localidad),
    geo: geoCoordinates(localidad),
    areaServed: areaServed(localidad),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      itemListElement: s.serviciosOfrecidos.map((item) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: item },
      })),
    },
  };

  // MedicalBusiness exige (especialmente útil) medicalSpecialty / isAcceptingNewPatients.
  if (s.schemaType === 'MedicalBusiness') {
    graph['medicalSpecialty'] = s.variantesKeyword[2] ?? 'Dentistry';
    graph['isAcceptingNewPatients'] = true;
  }
  // HomeAndConstructionBusiness añade knowsAbout de oficios.
  if (s.schemaType === 'HomeAndConstructionBusiness') {
    graph['knowsAbout'] = s.variantesKeyword;
  }

  return graph;
}

/**
 * Serializa cualquier objeto a una etiqueta <script type="application/ld+json">.
 * Escapa `<`/`>` como </> (válido dentro de JSON\TypeScript, no cierra
 * el tag <script>) evitando XSS y ruptura del parser.
 */
export function jsonLdScript(obj: unknown): string {
  const safe = JSON.stringify(obj).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
  return `<script type="application/ld+json">${safe}</script>`;
}
