import { useState } from 'react';
import { Menu } from 'lucide-react';
import {
  Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface NavLink { label: string; href: string }

/**
 * EMBES · <MobileNav /> — Isla React para el menú off-canvas móvil (Fase 1).
 * Directiva cliente:idle: el panel no es LCP, así que se hidrata fuera del
 * critical path. Cero impacto en Largest Contentful Paint.
 */
export default function MobileNav({ links, telefono, profesional }: { links: NavLink[]; telefono: string; profesional?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Abrir menú de navegación" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>EMBES — {profesional ?? 'Servicios'}</SheetTitle>
          <SheetDescription>Directorio de servicios en tu localidad</SheetDescription>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-1" aria-label="Navegación móvil">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        {telefono && (
          <a href={`tel:${telefono}`} className="mt-4">
            <Button className="w-full" size="lg">Llamar ahora</Button>
          </a>
        )}
      </SheetContent>
    </Sheet>
  );
}
