import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

interface FaqItem { q: string; a: string }

/**
 * EMBES · <FaqAccordion /> — Isla React de FAQ transaccional (Fase 4).
 * El contenido Q/A YA viene pre-renderizado y con datos localizados desde el
 * servidor (Astro), este componente solo aporta la interacción de acordeón
 * accesible vía Radix. Se hidrata con cliente:visible en la página.
 */
export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
