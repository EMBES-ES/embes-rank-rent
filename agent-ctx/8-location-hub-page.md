---
Task ID: 8
Agent: Main
Task: Create /src/app/[localidad]/page.tsx — Location Hub Page

Work Log:
- Created dynamic route directory /src/app/[localidad]/
- Built [localidad]/page.tsx as a server component (no "use client")
- Implemented all 5 required sections:
  1. **Breadcrumb**: Inicio → Localidades → [Location Name] using shadcn Breadcrumb with Next.js Link
  2. **Header/H1**: "[location.name] — Directorio de Profesionales Verificados" with MapPin icon and province/community metadata
  3. **Services Grid**: H2 + responsive grid (1/2/3 cols) with Lucide icon cards, descriptions, and CTA buttons linking to /[servicio-slug]/[localidad-slug]
  4. **Service Clusters**: H2 + grouped by cluster with icon headers, descriptions, and linked service items
  5. **Nearby Locations**: H2 + grid of other cities in the same community, with (Capital) badge for capitals
- Implemented generateStaticParams returning all location slugs
- Implemented generateMetadata with generateLocationMeta, OpenGraph, and canonical URL
- Used Next.js 16 async params pattern (Promise<{ localidad: string }>)
- notFound() handling for invalid slugs
- Included Navbar and Footer components
- Created placeholder /src/lib/seo-content.ts with generateLocationMeta, generateLocationIntro, getLocationServices (for parallel agent to replace)
- Used EMBES brand styling: card-hover GPU class, primary yellow accent, dark-first theme
- All icons via iconMap pattern matching data.ts icon strings
- Semantic HTML with aria-labelledby on all sections
- Mobile-first responsive design
- Zero lint errors

Stage Summary:
- /src/app/[localidad]/page.tsx — Server component, ~308 lines
- /src/lib/seo-content.ts — Placeholder with 3 exports for location SEO content
- All 30 location slugs covered by generateStaticParams
- Services grid uses getLocationServices() for future database-driven filtering
