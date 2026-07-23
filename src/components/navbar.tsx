"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Moon, Sun, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

type ViewType = "home" | "servicios" | "localidades"

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const label =
    resolvedTheme === "dark"
      ? "Cambiar a modo claro"
      : "Cambiar a modo oscuro"

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      onClick={toggleTheme}
      suppressHydrationWarning
    >
      <Sun className="size-4 dark:hidden" />
      <Moon className="size-4 hidden dark:block text-primary" />
    </Button>
  )
}

const navLinks = [
  { label: "Inicio", view: "home", href: "/" },
  { label: "Servicios", view: "servicios", href: "/#servicios" },
  { label: "Localidades", view: "localidades", href: "/#localidades" },
] as const;

/**
 * Custom event dispatched by page.tsx (SPA) to switch views.
 * Server-rendered sub-pages do NOT dispatch this.
 */
function NavLinks({ activeView, onSheetClose }: {
  activeView: string;
  onSheetClose?: () => void;
}) {
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === "/"

  return (
    <nav aria-label="Navegación principal">
      <ul className="flex items-center gap-1" role="list">
        {navLinks.map((link) => {
          const isActive = isHomePage
            ? activeView === link.view
            : link.view === "home"

          return (
            <li key={link.view}>
              {isHomePage ? (
                <button
                  data-nav-view={link.view}
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent("embes-navigate", { detail: link.view }))
                    window.scrollTo({ top: 0, behavior: "smooth" })
                    onSheetClose?.()
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  href={link.href}
                  onClick={onSheetClose}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  );
}

/**
 * Navbar works in two modes:
 * - On / (home): SPA mode, listens for custom 'embes-navigate' events
 * - On sub-pages: Real Link-based navigation back to /
 *
 * This avoids passing function props from Server Components.
 */
export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === "/"

  const handleLogoClick = () => {
    if (isHomePage) {
      // Dispatch SPA navigation event for page.tsx to pick up
      window.dispatchEvent(new CustomEvent("embes-navigate", { detail: "home" }))
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      router.push("/")
    }
  }

  const closeSheet = () => {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  }

  // On the home page, read activeView from body (set by page.tsx)
  // On sub-pages, default to "home" (only Inicio is active)
  const [activeView, setActiveView] = useState<ViewType>(
    () => {
      if (typeof document === "undefined") return "home"
      const v = document.body.dataset.activeView as ViewType | undefined
      return v || "home"
    }
  )

  useEffect(() => {
    if (!isHomePage) return

    const handler = (e: Event) => {
      const view = (e as CustomEvent).detail as ViewType
      setActiveView(view)
    }

    window.addEventListener("embes-navigate", handler)
    return () => window.removeEventListener("embes-navigate", handler)
  }, [isHomePage])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
          aria-label="EMBES - Ir al inicio"
        >
          <span className="text-xl font-bold tracking-tight">
            <span className="text-primary">EMBES</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2">
          <NavLinks activeView={activeView} />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <ThemeToggle />

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Abrir menú de navegación"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 pt-12">
              <NavLinks activeView={activeView} onSheetClose={closeSheet} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}