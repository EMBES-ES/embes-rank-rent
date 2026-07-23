import {
  ShieldCheck,
  Clock,
  FileText,
  MapPin,
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
  Scissors,
  Pencil,
  Search,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { featuredServices, topLocations } from "@/lib/data";
import type { Service } from "@/lib/data";

// ─── Icon lookup: map string names from data.ts → Lucide components ───
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
  Scissors,
  Pencil,
};

// ─── Trust section data ─────────────────────────────────────────────
const trustItems = [
  {
    icon: ShieldCheck,
    title: "Profesionales Verificados",
    description:
      "Todos los profesionales de nuestro directorio están verificados y cuentan con valoraciones reales de clientes.",
  },
  {
    icon: Clock,
    title: "Atención 24h / Urgencias",
    description:
      "Servicios de emergencia disponibles las 24 horas. Respuesta rápida para cerrajeros, electricistas y fontaneros.",
  },
  {
    icon: FileText,
    title: "Presupuestos sin compromiso",
    description:
      "Solicita presupuestos gratuitos y compara opciones sin compromiso antes de decidirte.",
  },
  {
    icon: MapPin,
    title: "Cobertura en 30+ ciudades",
    description:
      "Profesionales disponibles en las principales ciudades de España y sus zonas metropolitanas.",
  },
] as const;

// ─── Component ──────────────────────────────────────────────────────
export function HomeView() {
  return (
    <main>
      {/* ── 1. Hero Section ───────────────────────────────────────── */}
      <section
        aria-labelledby="hero-heading"
        className="py-16 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1
            id="hero-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Encuentra Profesionales Verificados{" "}
            <span className="text-primary">Cerca de Ti</span> en España
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            El directorio de profesionales de confianza. Compara, elige y
            contacta con los mejores expertos en servicios
            profesionales en toda España.
          </p>

          {/* Search bar */}
          <Card className="mt-8 max-w-3xl mx-auto p-2">
            <CardContent className="p-0">
              <form
                className="flex flex-col md:flex-row gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="¿Qué necesitas?"
                    className="pl-9 h-11"
                  />
                </div>
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="¿Dónde?"
                    className="pl-9 h-11"
                  />
                </div>
                <Button type="submit" className="h-11 px-6 shrink-0">
                  Buscar profesionales
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── 2. Trust / Confianza Section ──────────────────────────── */}
      <section
        aria-labelledby="trust-heading"
        className="py-16 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="trust-heading"
            className="text-2xl font-bold tracking-tight sm:text-3xl text-center"
          >
            ¿Por qué elegir EMBES?
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. Featured Services Section ───────────────────────────── */}
      <section
        aria-labelledby="services-heading"
        className="py-16 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="services-heading"
            className="text-2xl font-bold tracking-tight sm:text-3xl text-center"
          >
            Servicios Destacados
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {featuredServices.map((service: Service) => {
              const Icon = iconMap[service.icon];
              return (
                <Card
                  key={service.slug}
                  className="card-hover transition-all duration-200 cursor-pointer"
                >
                  <CardContent className="p-6">
                    {Icon && (
                      <Icon className="h-8 w-8 text-primary" />
                    )}
                    <h3 className="mt-3 text-base font-semibold">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. Top Locations Section ───────────────────────────────── */}
      <section
        aria-labelledby="locations-heading"
        className="py-16 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="locations-heading"
            className="text-2xl font-bold tracking-tight sm:text-3xl text-center"
          >
            Localidades Principales
          </h2>
          <p className="mt-3 text-center text-muted-foreground max-w-2xl mx-auto">
            Encuentra profesionales en las principales ciudades de España y
            sus alrededores.
          </p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {topLocations.map((location) => (
              <Link
                key={location.slug}
                href={`/${location.slug}`}
                className="rounded-lg border p-3 text-center text-sm font-medium hover:text-primary hover:border-primary transition-colors duration-200"
              >
                {location.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CTA Section ─────────────────────────────────────────── */}
      <section
        aria-labelledby="cta-heading"
        className="py-16 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-8 sm:p-12 text-center">
              <h2
                id="cta-heading"
                className="text-2xl font-bold tracking-tight sm:text-3xl"
              >
                ¿Eres profesional?
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Únete al mayor directorio de profesionales verificados de
                España. Aumenta tu visibilidad, recibe solicitudes de
                clientes reales y haz crecer tu negocio con EMBES.
              </p>
              <Button size="lg" className="mt-6">
                Solicita tu perfil
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}