import Link from "next/link";
import { topLocations, services } from "@/lib/data";

const footerServiceLinks = services.slice(0, 8);
const footerLocationLinks = topLocations.slice(0, 8);

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/40 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-primary hover:opacity-80 transition-opacity"
            >
              EMBES
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Directorio de profesionales verificados en España. Encuentra el
              servicio que necesitas, donde lo necesitas. Presupuestos sin
              compromiso.
            </p>
          </div>

          {/* Servicios */}
          <nav aria-label="Servicios en el pie de página">
            <h3 className="text-sm font-semibold mb-3">
              Servicios populares
            </h3>
            <ul className="space-y-2" role="list">
              {footerServiceLinks.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/${service.slug}/castellon`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Localidades */}
          <nav aria-label="Localidades en el pie de página">
            <h3 className="text-sm font-semibold mb-3">
              Localidades principales
            </h3>
            <ul className="space-y-2" role="list">
              {footerLocationLinks.map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={`/${loc.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Info */}
          <nav aria-label="Información legal">
            <h3 className="text-sm font-semibold mb-3">
              Información
            </h3>
            <ul className="space-y-2" role="list">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Sobre EMBES
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Aviso legal
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-border/40 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} EMBES — Empowering Modern Business &
            Everyday Services. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            Castellón de la Plana, España
          </p>
        </div>
      </div>
    </footer>
  );
}