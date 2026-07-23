import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "EMBES · Directorio de Profesionales Verificados en España",
    template: "%s | EMBES",
  },
  description:
    "Encuentra profesionales verificados cerca de ti. Cerrajeros, electricistas, fontaneros, pintores, dentistas y más en 30 ciudades de España. Presupuestos sin compromiso.",
  keywords: [
    "profesionales verificados",
    "cerrajeros España",
    "electricistas",
    "fontanería",
    "pintores",
    "albañiles",
    "dentistas",
    "clases particulares",
    "directorío servicios",
    "Rank Rent",
  ],
  authors: [{ name: "EMBES", url: "https://embes.es" }],
  creator: "EMBES - Empowering Modern Business & Everyday Services",
  metadataBase: new URL("https://embes.es"),
  openGraph: {
    title: "EMBES · Directorio de Profesionales Verificados en España",
    description:
      "Encuentra profesionales verificados cerca de ti. Presupuestos sin compromiso.",
    siteName: "EMBES",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EMBES · Directorio de Profesionales Verificados",
    description:
      "Encuentra profesionales verificados cerca de ti en toda España.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="dark">
      <head>
        {/* Structured Data: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "EMBES",
              legalName:
                "Asociación Juvenil EMBES - Empowering Modern Business & Everyday Services",
              url: "https://embes.es",
              logo: "https://embes.es/brand/iso1.png",
              email: "hola@embes.es",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Castellón de la Plana",
                addressRegion: "Castellón",
                postalCode: "12006",
                addressCountry: "ES",
              },
            }),
          }}
        />
        {/* Structured Data: WebSite with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "EMBES Directorio",
              url: "https://embes.es",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://embes.es/buscar?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}