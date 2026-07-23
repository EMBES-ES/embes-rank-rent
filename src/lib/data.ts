export interface Service {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  cluster: string;
}

export interface Location {
  name: string;
  slug: string;
  province: string;
  community: string;
  isCapital?: boolean;
}

export interface ServiceCluster {
  id: string;
  name: string;
  description: string;
  icon: string;
  services: Service[];
}

export interface ProvinceGroup {
  name: string;
  slug: string;
  community: string;
  locations: Location[];
  topServices: string[];
}

// ─── Services ───────────────────────────────────────────────────────
export const services: Service[] = [
  {
    slug: "cerrajeros",
    name: "Cerrajería profesional",
    shortName: "Cerrajeros",
    description:
      "Apertura de puertas, cambio de cerraduras, instalación de cilindros de seguridad y blindajes. Servicio urgente disponible 24 horas.",
    icon: "KeyRound",
    cluster: "emergencias",
  },
  {
    slug: "electricistas",
    name: "Electricidad y servicios eléctricos",
    shortName: "Electricistas",
    description:
      "Instalaciones eléctricas, reparación de averías, cuadros eléctricos, certificaciones y eficiencia energética para hogares y negocios.",
    icon: "Zap",
    cluster: "emergencias",
  },
  {
    slug: "fontaneria",
    name: "Fontanería y saneamiento",
    shortName: "Fontanería",
    description:
      "Reparación de fugas, instalación de tuberías, desatascos, calderas y sistemas de calefacción. Profesionales con garantía.",
    icon: "Droplets",
    cluster: "emergencias",
  },
  {
    slug: "albanileria",
    name: "Albañilería y construcción",
    shortName: "Albañiles",
    description:
      "Reformas integrales, tabiquería, revocos, solados, enfoscados y obras menores. Presupuesto sin compromiso.",
    icon: "Hammer",
    cluster: "reformas",
  },
  {
    slug: "pintores",
    name: "Pintura y decoración de interiores",
    shortName: "Pintores",
    description:
      "Pintura de paredes, techos, fachadas, empapelados y tratamientos decorativos. Acabados profesionales con materiales de primera calidad.",
    icon: "PaintBucket",
    cluster: "reformas",
  },
  {
    slug: "carpinteros",
    name: "Carpintería y ebanistería",
    shortName: "Carpinteros",
    description:
      "Carpintería de madera y PVC, muebles a medida, puertas, ventanas, armarios empotrados y restauración.",
    icon: "Wrench",
    cluster: "reformas",
  },
  {
    slug: "reparaciones",
    name: "Reparaciones del hogar",
    shortName: "Reparaciones",
    description:
      "Reparaciones diversas: electrodomésticos, muebles, persianas, puertas, ventanas y pequeños arreglos domésticos.",
    icon: "ToolCase",
    cluster: "reformas",
  },
  {
    slug: "cuidado-mayores",
    name: "Cuidado de personas mayores",
    shortName: "Cuidado de mayores",
    description:
      "Atención domiciliaria para personas mayores: ayuda personal, compañía, supervisión médica y apoyo en actividades diarias.",
    icon: "Heart",
    cluster: "salud",
  },
  {
    slug: "dentistas",
    name: "Odontología y salud dental",
    shortName: "Dentistas",
    description:
      "Revisiones dentales, limpieza, implantes, ortodoncia, blanqueamiento y tratamientos de estética dental.",
    icon: "Smile",
    cluster: "salud",
  },
  {
    slug: "estetica",
    name: "Centros de estética y belleza",
    shortName: "Estética",
    description:
      "Tratamientos faciales y corporales, depilación, manicura, pedicura y servicios de belleza profesional.",
    icon: "Sparkles",
    cluster: "salud",
  },
  {
    slug: "clases-particulares",
    name: "Clases particulares y refuerzo",
    shortName: "Clases particulares",
    description:
      "Profesores particulares de matemáticas, lengua, inglés, ciencias y todas las asignaturas. Todos los niveles educativos.",
    icon: "GraduationCap",
    cluster: "educacion",
  },
  {
    slug: "entrenadores",
    name: "Entrenamiento personal",
    shortName: "Entrenadores personales",
    description:
      "Entrenadores certificados para preparación física, pérdida de peso, hipertrofia y planes nutricionales personalizados.",
    icon: "Dumbbell",
    cluster: "educacion",
  },
  {
    slug: "carreras-universitarias",
    name: "Preparación de carreras universitarias",
    shortName: "Carreras universitarias",
    description:
      "Preparación especializada para acceso a grados universitarios: PCE, selectividad, pruebas de acceso y orientación vocacional.",
    icon: "BookOpen",
    cluster: "educacion",
  },
  {
    slug: "musica",
    name: "Clases de música",
    shortName: "Música",
    description:
      "Profesores de piano, guitarra, violín, batería, canto y teoría musical. Clases individuales y colectivas para todas las edades.",
    icon: "Music",
    cluster: "educacion",
  },
  {
    slug: "peluquerias",
    name: "Peluquería profesional",
    shortName: "Peluquerías",
    description:
      "Cortes de pelo, tintes, mechas, peinados para eventos y tratamientos capilares. Estilistas profesionales con cita previa.",
    icon: "Scissors",
    cluster: "bienestar",
  },
  {
    slug: "clases",
    name: "Clases y formación diversa",
    shortName: "Clases",
    description:
      "Formación en idiomas, informática, cocina, manualidades y más. Academias y profesores verificados en tu zona.",
    icon: "Pencil",
    cluster: "educacion",
  },
];

// ─── Clusters ───────────────────────────────────────────────────────
export const clusters: ServiceCluster[] = [
  {
    id: "emergencias",
    name: "Emergencias 24h",
    description:
      "Servicios de intervención urgente disponibles las 24 horas del día. Profesionales que acuden a tu domicilio en menos de 60 minutos para resolver averías y emergencias.",
    icon: "ShieldAlert",
    services: services.filter((s) => s.cluster === "emergencias"),
  },
  {
    id: "salud",
    name: "Salud y Cuidado",
    description:
      "Profesionales de la salud, el bienestar y la atención personal. Centros y especialistas verificados que garantizan la mejor atención para ti y los tuyos.",
    icon: "HeartPulse",
    services: services.filter((s) => s.cluster === "salud"),
  },
  {
    id: "reformas",
    name: "Reformas y Hogar",
    description:
      "Especialistas en mejora, reparación y mantenimiento del hogar. Desde pequeñas reparaciones hasta reformas integrales con presupuesto sin compromiso.",
    icon: "Home",
    services: services.filter((s) => s.cluster === "reformas"),
  },
  {
    id: "educacion",
    name: "Educación y Formación",
    description:
      "Profesores y academias de confianza para todas las etapas formativas. Clases particulares, preparación de exámenes y formación continua.",
    icon: "GraduationCap",
    services: services.filter((s) => s.cluster === "educacion"),
  },
  {
    id: "bienestar",
    name: "Bienestar Personal",
    description:
      "Cuidado personal, estética y bienestar. Profesionales que te ayudan a sentirte mejor tanto por dentro como por fuera.",
    icon: "Sparkles",
    services: services.filter((s) => s.cluster === "bienestar"),
  },
];

// ─── Locations ──────────────────────────────────────────────────────
export const locations: Location[] = [
  // Comunidad Valenciana
  { name: "Castellón de la Plana", slug: "castellon", province: "Castellón", community: "Comunidad Valenciana", isCapital: true },
  { name: "València", slug: "valencia", province: "València", community: "Comunidad Valenciana", isCapital: true },
  { name: "Sagunto", slug: "sagunto", province: "València", community: "Comunidad Valenciana" },
  { name: "Villarreal", slug: "villarreal", province: "Castellón", community: "Comunidad Valenciana" },
  { name: "Elche", slug: "elche", province: "Alacant", community: "Comunidad Valenciana" },
  // Cataluña
  { name: "Terrassa", slug: "terrassa", province: "Barcelona", community: "Cataluña" },
  { name: "Sabadell", slug: "sabadell", province: "Barcelona", community: "Cataluña" },
  { name: "Badalona", slug: "badalona", province: "Barcelona", community: "Cataluña" },
  { name: "Girona", slug: "girona", province: "Girona", community: "Cataluña", isCapital: true },
  // Andalucía
  { name: "Granada", slug: "granada", province: "Granada", community: "Andalucía", isCapital: true },
  { name: "Marbella", slug: "marbella", province: "Málaga", community: "Andalucía" },
  { name: "Huelva", slug: "huelva", province: "Huelva", community: "Andalucía", isCapital: true },
  { name: "Jaén", slug: "jaen", province: "Jaén", community: "Andalucía", isCapital: true },
  { name: "Cádiz", slug: "cadiz", province: "Cádiz", community: "Andalucía", isCapital: true },
  // Castilla-La Mancha
  { name: "Cuenca", slug: "cuenca", province: "Cuenca", community: "Castilla-La Mancha", isCapital: true },
  { name: "Albacete", slug: "albacete", province: "Albacete", community: "Castilla-La Mancha", isCapital: true },
  { name: "Toledo", slug: "toledo", province: "Toledo", community: "Castilla-La Mancha", isCapital: true },
  { name: "Ciudad Real", slug: "ciudad-real", province: "Ciudad Real", community: "Castilla-La Mancha", isCapital: true },
  // Castilla y León
  { name: "Soria", slug: "soria", province: "Soria", community: "Castilla y León", isCapital: true },
  { name: "Burgos", slug: "burgos", province: "Burgos", community: "Castilla y León", isCapital: true },
  { name: "Zamora", slug: "zamora", province: "Zamora", community: "Castilla y León", isCapital: true },
  // Aragón
  { name: "Teruel", slug: "teruel", province: "Teruel", community: "Aragón", isCapital: true },
  // Cantabria
  { name: "Santander", slug: "santander", province: "Cantabria", community: "Cantabria", isCapital: true },
  // Comunidad de Madrid
  { name: "Alcorcón", slug: "alcorcon", province: "Madrid", community: "Comunidad de Madrid" },
  // Islas Baleares
  { name: "Ibiza", slug: "ibiza", province: "Illes Balears", community: "Islas Baleares" },
  { name: "Palma de Mallorca", slug: "mallorca", province: "Illes Balears", community: "Islas Baleares", isCapital: true },
  // La Rioja
  { name: "Logroño", slug: "logrono", province: "La Rioja", community: "La Rioja", isCapital: true },
  // Galicia
  { name: "Ourense", slug: "ourense", province: "Ourense", community: "Galicia", isCapital: true },
  { name: "Santiago de Compostela", slug: "santiago-compostela", province: "A Coruña", community: "Galicia", isCapital: true },
  // Extremadura
  { name: "Cáceres", slug: "caceres", province: "Cáceres", community: "Extremadura", isCapital: true },
];

// ─── Province Groups ────────────────────────────────────────────────
export const provinceGroups: ProvinceGroup[] = [
  {
    name: "Comunidad Valenciana",
    slug: "comunidad-valenciana",
    community: "Comunidad Valenciana",
    locations: locations.filter((l) => l.community === "Comunidad Valenciana"),
    topServices: ["cerrajeros", "fontaneria", "pintores"],
  },
  {
    name: "Cataluña",
    slug: "cataluna",
    community: "Cataluña",
    locations: locations.filter((l) => l.community === "Cataluña"),
    topServices: ["electricistas", "clases-particulares", "dentistas"],
  },
  {
    name: "Andalucía",
    slug: "andalucia",
    community: "Andalucía",
    locations: locations.filter((l) => l.community === "Andalucía"),
    topServices: ["cerrajeros", "albanileria", "cuidado-mayores"],
  },
  {
    name: "Castilla-La Mancha",
    slug: "castilla-la-mancha",
    community: "Castilla-La Mancha",
    locations: locations.filter((l) => l.community === "Castilla-La Mancha"),
    topServices: ["fontaneria", "reparaciones", "entrenadores"],
  },
  {
    name: "Castilla y León",
    slug: "castilla-y-leon",
    community: "Castilla y León",
    locations: locations.filter((l) => l.community === "Castilla y León"),
    topServices: ["cerrajeros", "cuidado-mayores", "peluquerias"],
  },
  {
    name: "Aragón",
    slug: "aragon",
    community: "Aragón",
    locations: locations.filter((l) => l.community === "Aragón"),
    topServices: ["electricistas", "albanileria", "fontaneria"],
  },
  {
    name: "Cantabria",
    slug: "cantabria",
    community: "Cantabria",
    locations: locations.filter((l) => l.community === "Cantabria"),
    topServices: ["cerrajeros", "pintores", "dentistas"],
  },
  {
    name: "Comunidad de Madrid",
    slug: "comunidad-de-madrid",
    community: "Comunidad de Madrid",
    locations: locations.filter((l) => l.community === "Comunidad de Madrid"),
    topServices: ["cerrajeros", "electricistas", "clases-particulares"],
  },
  {
    name: "Islas Baleares",
    slug: "islas-baleares",
    community: "Islas Baleares",
    locations: locations.filter((l) => l.community === "Islas Baleares"),
    topServices: ["reparaciones", "peluquerias", "estetica"],
  },
  {
    name: "La Rioja",
    slug: "la-rioja",
    community: "La Rioja",
    locations: locations.filter((l) => l.community === "La Rioja"),
    topServices: ["fontaneria", "albanileria", "entrenadores"],
  },
  {
    name: "Galicia",
    slug: "galicia",
    community: "Galicia",
    locations: locations.filter((l) => l.community === "Galicia"),
    topServices: ["cerrajeros", "cuidado-mayores", "reparaciones"],
  },
  {
    name: "Extremadura",
    slug: "extremadura",
    community: "Extremadura",
    locations: locations.filter((l) => l.community === "Extremadura"),
    topServices: ["electricistas", "fontaneria", "clases-particulares"],
  },
];

// ─── Top Locations (Home page featured) ────────────────────────────
export const topLocations = [
  { name: "Castellón", slug: "castellon" },
  { name: "València", slug: "valencia" },
  { name: "Granada", slug: "granada" },
  { name: "Madrid", slug: "alcorcon" },
  { name: "Barcelona", slug: "badalona" },
  { name: "Marbella", slug: "marbella" },
  { name: "Santander", slug: "santander" },
  { name: "Sevilla", slug: "huelva" },
  { name: "Baleares", slug: "mallorca" },
  { name: "Toledo", slug: "toledo" },
  { name: "Santiago", slug: "santiago-compostela" },
  { name: "Logroño", slug: "logrono" },
];

// ─── Featured Services (Home page) ──────────────────────────────────
export const featuredServices = services.slice(0, 8);

// ─── Helper: Get top 5 cities for a service ─────────────────────────
export function getTopCitiesForService(serviceSlug: string): { name: string; slug: string; anchorText: string }[] {
  const topCitySlugs = [
    "castellon", "valencia", "granada", "badalona", "santander",
    "alcorcon", "toledo", "sabadell", "girona", "marbella",
    "albacete", "cadiz", "burgos", "logrono", "ourense",
  ];

  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) return [];

  const matchedCities = locations.filter((l) =>
    topCitySlugs.includes(l.slug)
  );

  return matchedCities.slice(0, 5).map((city) => ({
    name: city.name,
    slug: city.slug,
    anchorText: `${service.shortName} en ${city.name}`,
  }));
}

// ─── Service name lookup by slug ────────────────────────────────────
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}