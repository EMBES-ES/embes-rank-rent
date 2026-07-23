import Link from "next/link";
import { provinceGroups, getServiceBySlug } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function LocalidadesView() {
  return (
    <main>
      {/* Header Section */}
      <section aria-labelledby="localidades-heading" className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1
            id="localidades-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Encuentra Profesionales por Localidad en Toda España
          </h1>

          <div className="mt-6 space-y-4 text-muted-foreground text-lg max-w-3xl">
            <p>
              EMBES te conecta con profesionales verificados en más de 30
              localidades de toda España. Nuestro directorio está optimizado a
              nivel local para que encuentres el servicio que necesitas
              exactamente en tu zona, con profesionales de confianza y
              valoraciones reales.
            </p>
            <p>
              Cada ubicación cuenta con un catálogo completo de servicios
              profesionales, desde emergencias 24 horas hasta reformas
              integrales, clases particulares y servicios de salud. Todos los
              profesionales de nuestra red han pasado un proceso de verificación
              que garantiza su experiencia y profesionalidad.
            </p>
            <p>
              Explora las comunidades autónomas a continuación y accede al
              directorio completo de servicios disponibles en cada zona. Puedes
              consultar cerrajeros, fontaneros, electricistas, pintores y
              muchos más profesionales en cualquier ciudad de nuestra red.
            </p>
          </div>
        </div>
      </section>

      {/* Province Grid */}
      <section aria-labelledby="provincias-heading" className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="provincias-heading" className="sr-only">
            Listado de comunidades y provincias
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {provinceGroups.map((group) => (
              <article key={group.slug}>
                <Card className="card-hover transition-all duration-200 h-full">
                  <CardHeader>
                    <h3 className="leading-none font-semibold">{group.name}</h3>
                    <CardDescription>
                      {group.locations.length}{" "}
                      {group.locations.length === 1
                        ? "localidad cubierta"
                        : "localidades cubiertas"}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-2">
                      {group.locations.map((location) => (
                        <li key={location.slug}>
                          <Link
                            href={`/${location.slug}`}
                            className={`text-sm text-muted-foreground hover:text-primary transition-colors${
                              location.isCapital ? " font-semibold" : ""
                            }`}
                          >
                            {location.name}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {group.topServices.map((serviceSlug) => {
                        const service = getServiceBySlug(serviceSlug);
                        if (!service) return null;

                        return (
                          <Badge
                            key={serviceSlug}
                            variant="secondary"
                            className="text-xs"
                          >
                            Alta demanda en {service.shortName.toLowerCase()}
                          </Badge>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}