import {
  ChevronRight,
  MapPin,
  ShieldCheck,
  Clock,
  FileText,
  Star,
  ArrowRight,
} from "lucide-react"

import { Card, CardHeader, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"

import {
  getServiceBySlug,
  getLocationBySlug,
  getRelatedServices,
  getLocationsForService,
  getFAQs,
  getMetaDescription,
} from "@/lib/data"
import type { NavigateFn } from "@/lib/data"

interface ServiceLocationViewProps {
  serviceSlug: string
  locationSlug: string
  onNavigate: NavigateFn
}

export default function ServiceLocationView({
  serviceSlug,
  locationSlug,
  onNavigate,
}: ServiceLocationViewProps) {
  const service = getServiceBySlug(serviceSlug)
  const location = getLocationBySlug(locationSlug)

  if (!service || !location) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Servicio o localidad no encontrada
        </h1>
        <p className="text-muted-foreground mb-6">
          Lo sentimos, no hemos encontrado el servicio o la localidad que buscas.
        </p>
        <Button onClick={() => onNavigate({ type: "home" })}>
          Volver al inicio
        </Button>
      </div>
    )
  }

  const faqs = getFAQs(serviceSlug, location.name)
  const relatedServices = getRelatedServices(serviceSlug)
  const otherLocations = getLocationsForService(serviceSlug, locationSlug, 12)
  const metaDesc = getMetaDescription(service, location)

  // ─── JSON-LD Structured Data ─────────────────────────────────────
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://embes.es/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Servicios",
        item: "https://embes.es/#servicios",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.shortName,
        item: `https://embes.es/#servicios/${service.slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: location.name,
      },
    ],
  }

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.shortName} en ${location.name}`,
    description: metaDesc,
    areaServed: {
      "@type": "City",
      name: location.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: location.community,
      },
    },
    provider: {
      "@type": "Organization",
      name: "EMBES",
      url: "https://embes.es",
    },
    serviceType: service.name,
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  // ─── Trust items ─────────────────────────────────────────────────
  const trustItems = [
    {
      icon: ShieldCheck,
      title: "Profesionales verificados",
      description: `Todos los ${service.shortName.toLowerCase()} en ${location.name} han sido verificados con titulaciones y seguros.`,
    },
    {
      icon: FileText,
      title: "Presupuestos sin compromiso",
      description: "Solicita presupuestos gratuitos y compara sin obligación de contratar.",
    },
    {
      icon: Star,
      title: "Valoraciones reales",
      description: "Consulta opiniones verificadas de clientes reales antes de elegir.",
    },
    {
      icon: Clock,
      title: "Atención rápida",
      description: "Respuesta ágil y profesional para resolver tu necesidad en el menor tiempo posible.",
    },
  ]

  return (
    <>
      {/* ─── JSON-LD Structured Data ──────────────────────────────── */}
      <div className="sr-only-jsd" aria-hidden="true">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd),
          }}
        />
      </div>

      {/* ─── 1. Breadcrumb Navigation ─────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <ol className="flex flex-wrap items-center gap-1 text-sm">
          <li>
            <button
              onClick={() => onNavigate({ type: "home" })}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Inicio
            </button>
          </li>
          <li className="flex items-center gap-1">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <button
              onClick={() => onNavigate({ type: "servicios" })}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Servicios
            </button>
          </li>
          <li className="flex items-center gap-1">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <button
              onClick={() => onNavigate({ type: "servicios" })}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {service.shortName}
            </button>
          </li>
          <li className="flex items-center gap-1">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span aria-current="page" className="text-foreground font-medium">
              {location.name}
            </span>
          </li>
        </ol>
      </nav>

      {/* ─── 2. H1 + Meta Description ─────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          {service.shortName} en {location.name} — Profesionales Verificados | EMBES
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-3xl">
          {metaDesc}
        </p>
      </section>

      {/* ─── 3. Service Details Card ──────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{service.name}</Badge>
              </div>
              <p className="text-foreground leading-relaxed">
                {service.description}
              </p>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4" />
                <span>
                  {location.name}, {location.province}, {location.community}
                </span>
              </div>
            </div>
            <Button size="lg" className="shrink-0 self-start">
              Solicitar presupuesto
            </Button>
          </div>
        </Card>
      </section>

      {/* ─── 4. Trust Section ─────────────────────────────────────── */}
      <section aria-labelledby="trust-heading" className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="trust-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-10"
          >
            Por qué elegir EMBES en {location.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustItems.map((item) => {
              const Icon = item.icon
              return (
                <Card key={item.title} className="p-6">
                  <div className="flex flex-col items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><Separator /></div>

      {/* ─── 5. FAQ Section ───────────────────────────────────────── */}
      <section aria-labelledby="faq-heading" className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-10"
          >
            Preguntas frecuentes sobre {service.shortName} en {location.name}
          </h2>
          <div className="max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><Separator /></div>

      {/* ─── 6. Related Services Section ──────────────────────────── */}
      {relatedServices.length > 0 && (
        <section aria-labelledby="related-services-heading" className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2
              id="related-services-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-10"
            >
              Otros servicios en {location.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((s) => (
                <Card
                  key={s.slug}
                  className="card-hover transition-all duration-200 cursor-pointer h-full"
                  onClick={() =>
                    onNavigate({
                      type: "service-location",
                      service: s.slug,
                      location: locationSlug,
                    })
                  }
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">{s.shortName}</h3>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <CardDescription className="line-clamp-2">
                      {s.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 7. Other Locations Section ───────────────────────────── */}
      {otherLocations.length > 0 && (
        <section aria-labelledby="other-locations-heading" className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2
              id="other-locations-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-10"
            >
              {service.shortName} en otras ciudades
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {otherLocations.map((l) => (
                <button
                  key={l.slug}
                  onClick={() =>
                    onNavigate({
                      type: "service-location",
                      service: serviceSlug,
                      location: l.slug,
                    })
                  }
                  className="flex items-center gap-3 rounded-lg border border-border p-4 text-left hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 cursor-pointer group"
                >
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors block truncate">
                      {l.name}
                    </span>
                    <span className="text-xs text-muted-foreground block truncate">
                      {l.province}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 8. CTA Section ───────────────────────────────────────── */}
      <section aria-labelledby="cta-heading" className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="bg-primary/10 border-primary/20 p-8 sm:p-12">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2
                id="cta-heading"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
              >
                ¿Necesitas {service.shortName.toLowerCase()} en {location.name}?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Encuentra profesionales verificados en {location.name} que ofrecen{" "}
                {service.name.toLowerCase()} con presupuestos gratuitos y sin compromiso.
                Compara valoraciones reales y elige con confianza.
              </p>
              <Button size="lg" className="mt-2">
                Solicitar presupuesto gratis
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </>
  )
}