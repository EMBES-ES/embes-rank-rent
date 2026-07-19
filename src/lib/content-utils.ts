import type { CollectionEntry } from 'astro:content';

/**
 * EMBES · src/lib/content-utils.ts
 *
 * Utilidades de composición de texto por landing (producto cartesiano).
 * Personaliza tokens genéricos con la localidad real para que cada página
 * /servicios/[servicio]/[localidad]/ tenga contenido único — anti-tronco-común.
 */

export interface FaqItem { q: string; a: string }

/** Sustituye los placeholders {localidad} / {provincia} planteados en los datos del servicio. */
export function localize(text: string, servicio: CollectionEntry<'servicios'>, localidad: CollectionEntry<'localidades'>): string {
  return text
    .replaceAll('{localidad}', localidad.data.nombre)
    .replaceAll('{provincia}', localidad.data.provincia)
    .replaceAll('{region}', localidad.data.region)
    .replaceAll('{servicio}', servicio.data.title)
    .replaceAll('{profesion}', servicio.data.nombreProfesion);
}

/** Localiza toda la lista de FAQ (Q + A) a la localidad/provincia concreta. */
export function localizeFaq(servicio: CollectionEntry<'servicios'>, localidad: CollectionEntry<'localidades'>): FaqItem[] {
  return servicio.data.faq.map((f) => ({ q: localize(f.q, servicio, localidad), a: localize(f.a, servicio, localidad) }));
}

/** Construye el texto del CTA tel con anclaje legible (por si se quiere mostrar como texto visible). */
export function telDisplay(servicio: CollectionEntry<'servicios'>): string {
  return servicio.data.telefono.replace(/\s/g, '');
}
