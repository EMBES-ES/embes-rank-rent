import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  CheckCircle2,
  ShieldCheck,
  Clock,
  ThumbsUp,
  ArrowRight,
  MapPin,
  type LucideIcon,
} from "lucide-react";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  services,
  locations,
  getServiceBySlug,
  clusters,
} from "@/lib/data";
import type { Service, Location } from "@/lib/data";
import {
  generateMeta,
  generateIntro,
  generateBenefits,
  generateFAQ,
  generateStructuredData,
  getRelatedServices,
  getNearbyLocations,
  generateLocationMeta,
  generateLocationIntro,
  getLocationServices,
} from "@/lib/seo-content";

// ─── Icon map ──────────────────────────────────────────────────────
const iconMap: Record<string, LucideIcon> = {
  KeyRound, Zap, Droplets, Hammer, PaintBucket, Wrench, ToolCase,
  Heart, Smile, Sparkles, GraduationCap, Dumbbell, BookOpen, Music,
  Pencil, Scissors, ShieldAlert, HeartPulse, Home,
};

// ─── Static Params (SSG all 510 pages) ──────────────────────────────
export function generateStaticParams() {
  const params: { slug: string[] }[] = [];
  // 480 service-location pages
  for (const service of services) {
    for (const location of locations) {
      params.push({ slug: [service.slug, location.slug] });
    }
  }
  // 30 location hub pages
  for (const location of locations) {
    params.push({ slug: [location.slug] });
  }
  return params;
}

// ─── Metadata ──────────────────────────────────────────────────────
interface SlugProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: SlugProps): Promise<Metadata> {
  const { slug } = await params;

  if (slug.length === 2) {
    // Service-location page
    const service = getServiceBySlug(slug[0]);
    const loc = locations.find((l) => l.slug === slug[1]);
    if (!service || !loc) return { title: "EMBES" };
    const meta = generateMeta(service, loc);
    return {
      title: meta.title,
      description: meta.description,
      openGraph: { title: meta.title, description: meta.description, type: "website" },
      alternates: { canonical: `https://embes.es/${service.slug}/${loc.slug}` },
    };
  }

  if (slug.length === 1) {
    // Location hub page
    const loc = locations.find((l) => l.slug === slug[0]);
    if (!loc) return { title: "EMBES" };
    const meta = generateLocationMeta(loc);
    return {
      title: meta.title,
      description: meta.description,
      openGraph: { title: meta.title, description: meta.description },
      alternates: { canonical: `https://embes.es/${loc.slug}` },
    };
  }

  return { title: "EMBES" };
}

// ─── Main Content Generator ────────────────────────────────────────
function generateMainContent(service: Service, location: Location): string[] {
  return [
    `El servicio de ${service.name.toLowerCase()} abarca todas las necesidades relacionadas con ${service.description.toLowerCase().replace(".", "")}. En EMBES, conectamos a usuarios con profesionales certificados que cuentan con la experiencia y las herramientas necesarias para resolver cualquier situación, desde las intervenciones más rutinarias hasta los casos más complejos que requieren una atención especializada.`,
    `En ${location.name}, provincia de ${location.province} (${location.community}), la demanda de ${service.shortName.toLowerCase()} ha crecido de forma sostenida en los últimos años. La comunidad local valora la proximidad y la confianza que aportan los profesionales verificados, y por eso EMBES trabaja cada día para ampliar su red de especialistas en toda la zona, garantizando cobertura tanto en el casco urbano como en las áreas circundantes.`,
    `A través de EMBES, solicitar ${service.shortName.toLowerCase()} en ${location.name} es un proceso sencillo y transparente. Solo tienes que describir tu necesidad, recibirás presupuestos sin compromiso de hasta tres profesionales verificados y podrás comparar valoraciones y precios antes de tomar tu decisión. Todo el proceso se gestiona de forma segura y sin intermediarios ocultos, para que tengas la tranquilidad de contratar con garantías.`,
  ];
}

// ─── Chevron icon for FAQ ──────────────────────────────────────────
function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// ─── Service-Location Landing Page ─────────────────────────────────
function ServiceLocationPage({ service, location }: { service: Service; location: Location }) {
  const intro = generateIntro(service, location);
  const benefits = generateBenefits(service, location);
  const faqItems = generateFAQ(service, location);
  const structuredData = generateStructuredData(service, location);
  const relatedServices = getRelatedServices(service);
  const nearbyLocations = getNearbyLocations(service, location);
  const otherServices = services.filter((s) => s.slug !== service.slug);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="flex-1">
        {/* Breadcrumb */}
        <nav aria-label="Ruta de navegación" className="border-b border-border/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Inicio</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">{service.shortName}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <span className="text-muted-foreground">
                    {service.shortName} en {location.name}
                  </span>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </nav>

        <main>
          {/* H1 + Intro */}
          <section aria-labelledby="hero-h1" className="py-12 lg:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1
                id="hero-h1"
                className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
              >
                {service.shortName} en {location.name}{" "}
                <span className="text-primary">— Profesionales Verificados</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-3xl leading-relaxed">
                {intro}
              </p>
            </div>
          </section>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Separator />
          </div>

          {/* Benefits */}
          <section aria-labelledby="benefits-h2" className="py-12 lg:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2
                id="benefits-h2"
                className="text-2xl sm:text-3xl font-bold tracking-tight mb-8"
              >
                ¿Por qué elegir EMBES para {service.shortName} en{" "}
                {location.name}?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((b, i) => {
                  const icons = [ShieldCheck, ThumbsUp, Clock, CheckCircle2];
                  const Icon = icons[i] || CheckCircle2;
                  return (
                    <Card key={i} className="card-hover transition-all duration-200">
                      <CardContent className="p-6">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="size-5 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">{b.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {b.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Main Content 2-col */}
          <section aria-labelledby="content-h2" className="py-12 lg:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 id="content-h2" className="sr-only">
                Sobre {service.name} en {location.name}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Content */}
                <article className="lg:col-span-2">
                  <h2 className="text-2xl font-bold tracking-tight mb-6">
                    Sobre el servicio de {service.name} en {location.name}
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    {generateMainContent(service, location).map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </article>

                {/* Right: CTA + Related */}
                <aside className="lg:sticky lg:top-20 self-start space-y-6">
                  <Card className="bg-primary/10 border-primary/20">
                    <CardContent className="p-6 text-center">
                      <h3 className="font-semibold text-lg mb-2">
                        ¿Necesitas {service.shortName} en {location.name}?
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Solicita presupuestos gratuitos de profesionales
                        verificados.
                      </p>
                      <Button size="lg" className="w-full">
                        Solicitar presupuesto gratuito
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        Servicios relacionados en {location.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {relatedServices.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/${s.slug}/${location.slug}`}
                          className="flex items-center justify-between group py-1.5"
                        >
                          <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                            {s.shortName} en {location.name}
                          </span>
                          <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                      ))}
                    </CardContent>
                  </Card>
                </aside>
              </div>
            </div>
          </section>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Separator />
          </div>

          {/* FAQ */}
          <section aria-labelledby="faq-h2" className="py-12 lg:py-16">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <h2
                id="faq-h2"
                className="text-2xl sm:text-3xl font-bold tracking-tight mb-8"
              >
                Preguntas frecuentes sobre {service.shortName} en{" "}
                {location.name}
              </h2>
              <div className="space-y-0 border rounded-lg">
                {faqItems.map((item, i) => (
                  <details
                    key={i}
                    className="group border-b last:border-b-0 border-border/60"
                  >
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium hover:text-primary transition-colors list-none [&::-webkit-details-marker]:hidden">
                      {item.question}
                      <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* Related Locations */}
          {nearbyLocations.length > 0 && (
            <section
              aria-labelledby="nearby-h2"
              className="py-12 lg:py-16 bg-muted/30"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2
                  id="nearby-h2"
                  className="text-2xl sm:text-3xl font-bold tracking-tight mb-8"
                >
                  {service.shortName} en otras ciudades de{" "}
                  {location.community}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {nearbyLocations.map((loc) => (
                    <Link
                      key={loc.slug}
                      href={`/${service.slug}/${loc.slug}`}
                      className="group"
                    >
                      <Card className="card-hover h-full border-border/50 hover:border-primary/50">
                        <CardContent className="py-4">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center size-9 rounded-lg bg-primary/10 text-primary shrink-0">
                              <MapPin className="size-4" />
                            </span>
                            <div>
                              <p className="font-medium text-sm group-hover:text-primary transition-colors">
                                {loc.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {loc.province}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Internal Link Cloud */}
          <section aria-labelledby="links-h2" className="py-12 lg:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2
                id="links-h2"
                className="text-2xl sm:text-3xl font-bold tracking-tight mb-8"
              >
                Más servicios en {location.name}
              </h2>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {otherServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/${s.slug}/${location.slug}`}
                    className="inline-flex items-center rounded-full border border-border/60 px-4 py-2 text-sm text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    {s.shortName} en {location.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

// ─── Location Hub Page ────────────────────────────────────────────
function LocationHubPage({ location }: { location: Location }) {
  const locServices = getLocationServices(location);
  const nearbyLocs = locations.filter(
    (l) => l.community === location.community && l.slug !== location.slug
  );

  return (
    <div className="flex-1">
      {/* Breadcrumb */}
      <nav aria-label="Ruta de navegación" className="border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Inicio</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="text-muted-foreground">{location.name}</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </nav>

      <main>
        {/* Header */}
        <section aria-labelledby="loc-h1" className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <MapPin className="size-5 text-primary" />
              </span>
              <span className="text-sm text-muted-foreground">
                {location.province} · {location.community}
              </span>
            </div>
            <h1
              id="loc-h1"
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              {location.name}{" "}
              <span className="text-primary">
                — Directorio de Profesionales Verificados
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {generateLocationIntro(location)}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Separator />
        </div>

        {/* Services Grid */}
        <section aria-labelledby="services-h2" className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2
              id="services-h2"
              className="text-2xl sm:text-3xl font-bold tracking-tight mb-8"
            >
              Servicios disponibles en {location.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locServices.map((s) => {
                const Icon = iconMap[s.icon];
                return (
                  <Link
                    key={s.slug}
                    href={`/${s.slug}/${location.slug}`}
                    className="group"
                  >
                    <Card className="card-hover transition-all duration-200 h-full">
                      <CardHeader>
                        {Icon && (
                          <Icon className="size-6 text-primary mb-2" />
                        )}
                        <h3 className="leading-snug">
                          {s.shortName} en {location.name}
                        </h3>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {s.description}
                        </p>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                          Ver {s.shortName} en {location.name}
                          <ArrowRight className="size-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Service Clusters */}
        <section aria-labelledby="clusters-h2" className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2
              id="clusters-h2"
              className="text-2xl sm:text-3xl font-bold tracking-tight mb-8"
            >
              Explorar por categoría en {location.name}
            </h2>
            <div className="space-y-10">
              {clusters.map((cluster) => {
                const ClusterIcon = iconMap[cluster.icon];
                return (
                  <div key={cluster.id}>
                    <div className="flex items-center gap-3 mb-4">
                      {ClusterIcon && (
                        <ClusterIcon className="size-6 text-primary shrink-0" />
                      )}
                      <h3 className="text-xl font-semibold">{cluster.name}</h3>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2" role="list">
                      {cluster.services.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/${s.slug}/${location.slug}`}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                          >
                            <ArrowRight className="size-3 shrink-0" />
                            {s.shortName} en {location.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Nearby Locations */}
        {nearbyLocs.length > 0 && (
          <section
            aria-labelledby="nearby-loc-h2"
            className="py-12 lg:py-16 bg-muted/30"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2
                id="nearby-loc-h2"
                className="text-2xl sm:text-3xl font-bold tracking-tight mb-8"
              >
                Otras ciudades en {location.community}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {nearbyLocs.map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/${loc.slug}`}
                    className="group"
                  >
                    <Card className="card-hover h-full">
                      <CardContent className="py-4 flex items-center gap-3">
                        <MapPin className="size-4 text-primary shrink-0" />
                        <div>
                          <p className="font-medium text-sm group-hover:text-primary transition-colors">
                            {loc.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {loc.province}
                            {loc.isCapital && (
                              <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0">
                                Capital
                              </Badge>
                            )}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

// ─── Page Dispatcher ───────────────────────────────────────────────
export default async function CatchAllPage({ params }: SlugProps) {
  const { slug } = await params;

  // 2-segment: /servicio/localidad → Service-Location landing page
  if (slug.length === 2) {
    const service = getServiceBySlug(slug[0]);
    const loc = locations.find((l) => l.slug === slug[1]);
    if (!service || !loc) notFound();
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <ServiceLocationPage service={service} location={loc} />
        <Footer />
      </div>
    );
  }

  // 1-segment: /localidad → Location Hub page
  if (slug.length === 1) {
    const loc = locations.find((l) => l.slug === slug[0]);
    if (!loc) notFound();
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <LocationHubPage location={loc} />
        <Footer />
      </div>
    );
  }

  notFound();
}