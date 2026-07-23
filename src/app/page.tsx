"use client";

import { useState, useCallback, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HomeView } from "@/components/views/home-view";
import { ServiciosView } from "@/components/views/servicios-view";
import { LocalidadesView } from "@/components/views/localidades-view";

type ViewType = "home" | "servicios" | "localidades";

export default function Home() {
  const [activeView, setActiveView] = useState<ViewType>("home");

  // Listen for navigation events from Navbar (which lives outside this component tree on sub-pages)
  useEffect(() => {
    const handler = (e: Event) => {
      const view = (e as CustomEvent).detail as ViewType;
      if (view) {
        setActiveView(view);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("embes-navigate", handler);
    return () => window.removeEventListener("embes-navigate", handler);
  }, []);

  // Sync active view to body so Navbar can read it
  useEffect(() => {
    document.body.dataset.activeView = activeView;
  }, [activeView]);

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-primary focus:text-primary-foreground"
      >
        Saltar al contenido principal
      </a>
      <Navbar />
      <div id="main-content" className="flex-1">
        {activeView === "home" && <HomeView />}
        {activeView === "servicios" && <ServiciosView />}
        {activeView === "localidades" && <LocalidadesView />}
      </div>
      <Footer />
    </div>
  );
}