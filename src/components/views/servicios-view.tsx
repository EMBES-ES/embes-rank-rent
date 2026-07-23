import {
  KeyRound,
  Zap,
  Droplets,
  Hammer,
  PaintBucket,
  Wrench,
  ToolCase,
  Heart,
  Smile,
  Sparkles,
  GraduationCap,
  Dumbbell,
  BookOpen,
  Music,
  Pencil,
  Scissors,
  ShieldAlert,
  HeartPulse,
  Home,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"

import { Card, CardHeader, CardContent, CardDescription } from "@/components/ui/card"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { clusters, getTopCitiesForService } from "@/lib/data"
import type { Service } from "@/lib/data"

const iconMap: Record<string, LucideIcon> = {
  KeyRound,
  Zap,
  Droplets,
  Hammer,
  PaintBucket,
  Wrench,
  ToolCase,
  Heart,
  Smile,
  Sparkles,
  GraduationCap,
  Dumbbell,
  BookOpen,
  Music,
  Pencil,
  Scissors,
  ShieldAlert,
  HeartPulse,
  Home,
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon]
  const cities = getTopCitiesForService(service.slug)

  return (
    <article>
      <Card className="card-hover transition-all duration-200 h-full">
        <CardHeader>
          {Icon && <Icon className="text-primary h-6 w-6" />}
          <h3 className="leading-snug">{service.name}</h3>
        </CardHeader>
        <CardContent>
          <CardDescription>{service.description}</CardDescription>
          {cities.length > 0 && (
            <Accordion type="single" collapsible className="mt-4">
              <AccordionItem value="disponibilidad" className="border-b-0">
                <AccordionTrigger className="text-muted-foreground text-sm py-2 hover:no-underline">
                  Ver disponibilidad local
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1.5">
                    {cities.map((city) => (
                      <li key={city.slug}>
                        <Link
                          href={`/${service.slug}/${city.slug}`}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {city.anchorText}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </CardContent>
      </Card>
    </article>
  )
}

export function ServiciosView() {
  return (
    <div className="py-16 lg:py-24">
      {/* ── Header ──────────────────────────────────────────── */}
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
          Catálogo de Servicios Profesionales por Especialidad
        </h1>
        <div className="max-w-3xl space-y-4">
          <p className="text-muted-foreground text-base">
            En EMBES cada profesional ha superado un riguroso proceso de
            verificación antes de aparecer en nuestro directorio.
            Comprobamos titulaciones, seguros de responsabilidad civil,
            experiencia mínima y valoraciones reales de clientes
            anteriores para garantizar un servicio de calidad contrastada.
          </p>
          <p className="text-muted-foreground text-base">
            Nuestra selección no se basa en publicidad pagada: solo los
            profesionales que cumplen nuestros estándares de excelencia
            forman parte del catálogo. Esto te permite comparar,
            solicitar presupuestos sin compromiso y elegir con total
            tranquilidad al profesional que mejor se adapte a tus necesidades.
          </p>
          <p className="text-muted-foreground text-sm">
            Explora las especialidades a continuación y descubre
            profesionales verificados disponibles en las principales ciudades de
            España.
          </p>
        </div>
      </header>

      {/* ── Service Clusters ────────────────────────────────── */}
      {clusters.map((cluster, idx) => {
        const ClusterIcon = iconMap[cluster.icon]
        const headingId = `cluster-${cluster.id}`

        return (
          <section
            key={cluster.id}
            aria-labelledby={headingId}
            className={
              idx < clusters.length - 1
                ? "py-16 lg:py-24"
                : "pt-16 lg:pt-24 pb-24 lg:pb-32"
            }
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* Cluster heading */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-3">
                  {ClusterIcon && (
                    <ClusterIcon className="text-primary h-7 w-7 shrink-0" />
                  )}
                  <h2 id={headingId} className="text-2xl sm:text-3xl font-bold tracking-tight">
                    {cluster.name}
                  </h2>
                </div>
                <p className="text-muted-foreground text-base max-w-3xl">
                  {cluster.description}
                </p>
              </div>

              {/* Service cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cluster.services.map((service) => (
                  <ServiceCard key={service.slug} service={service} />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}