import {
  type Service,
  type Location,
  services,
  locations,
  clusters,
  provinceGroups,
} from "@/lib/data";

// ─── Internal helpers ─────────────────────────────────────────────

function getClusterServices(service: Service): Service[] {
  const cluster = clusters.find((c) => c.id === service.cluster);
  return cluster ? cluster.services : [];
}

/** Deterministic pseudo-variation based on slug chars to add subtle uniqueness */
function locVariation(location: Location): number {
  let h = 0;
  for (let i = 0; i < location.slug.length; i++) {
    h = (h * 31 + location.slug.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/** Pick from an array deterministically based on a seed */
function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

// ─── 1. generateFAQ ────────────────────────────────────────────────

const emergencyOpenings = [
  "Los precios de los {s} en {l} dependen del tipo de intervención requerida, pero en EMBES trabajamos siempre con total transparencia.",
  "En {l}, el coste de {s} varía según la urgencia y la complejidad del trabajo. A través de EMBES puedes comparar presupuestos sin sorpresas.",
  "Solicitar {s} en {l} a través de EMBES te garantiza conocer el precio antes de aceptar el servicio, sin tarifas ocultas ni recargos imprevistos.",
];

const reformOpenings = [
  "El coste de {s} en {l} varía según la envergadura del trabajo, pero en EMBES puedes solicitar varios presupuestos gratuitos para comparar.",
  "Los {s} de nuestro directorio en {l} ofrecen precios competitivos adaptados a cada tipo de reforma o reparación, sin compromiso inicial.",
  "En EMBES te conectamos con {s} en {l} que detallan cada partida del presupuesto para que sepas exactamente lo que pagas.",
];

const healthOpenings = [
  "En EMBES aplicamos un proceso de selección riguroso para incluir únicamente a profesionales cualificados de {s} en {l}.",
  "Cada profesional de {s} en {l} que aparece en nuestro directorio ha sido evaluado según criterios de formación, experiencia y referencias.",
  "Nuestro equipo verifica personally las credenciales de todos los {s} en {l} antes de incorporarlos al directorio de EMBES.",
];

const educationOpenings = [
  "Los profesores particulares de EMBES en {l} imparten una amplia variedad de asignaturas que cubren todas las etapas educativas.",
  "A través de nuestro directorio encontrarás {s} en {l} especializados en materias desde primaria hasta nivel universitario.",
  "Los {s} disponibles en {l} cubren tanto las asignaturas del currículo oficial como materias complementarias de refuerzo.",
];

const wellbeingOpenings = [
  "Las peluquerías verificadas en {l} ofrecen un catálogo completo de servicios capilares para hombre y mujer.",
  "En nuestro directorio de {l} encontrarás peluquerías que cubren desde cortes básicos hasta tratamientos de coloración avanzada.",
  "Las peluquerías de EMBES en {l} disponen de servicios de corte, tinte, mechas, alisados y tratamientos capilares especializados.",
];

function generateFAQ(
  service: Service,
  location: Location
): { question: string; answer: string }[] {
  const s = service.shortName;
  const n = location.name;
  const p = location.province;
  const v = locVariation(location);
  const kw = `${s} en ${n}`;

  switch (service.cluster) {
    case "emergencias":
      return [
        {
          question: `¿Cuánto cuesta ${s.toLowerCase()} en ${n}?`,
          answer: `${pick(emergencyOpenings, v)} Los {s} en {l} de nuestra red ofrecen tarifas justas ajustadas al mercado de la provincia de ${p}. Puedes solicitar un presupuesto inicial sin compromiso y valorar la relación calidad-precio antes de contratar. Sin costes ocultos ni sorpresas en la factura final de los {s} en ${n}.`
            .replace(/{s}/g, s.toLowerCase())
            .replace(/{l}/g, n),
        },
        {
          question: `¿Los ${s.toLowerCase()} de EMBES en ${n} están disponibles 24 horas?`,
          answer: `Sí, todos los ${s.toLowerCase()} registrados en EMBES para ${n} ofrecen disponibilidad inmediata, incluyendo festivos y madrugadas. El tiempo medio de respuesta en la provincia de ${p} es inferior a una hora. Cuando buscas ${kw}, sabes que contarás con asistencia profesional urgente sin importar el momento del día o la noche.`,
        },
        {
          question: `¿Qué garantía tienen los ${s.toLowerCase()} verificados en ${n}?`,
          answer: `Los ${s.toLowerCase()} de EMBES en ${n} han superado un proceso de verificación que incluye comprobación de seguros de responsabilidad civil, licencias vigentes y valoraciones reales de clientes en ${p}. Además, todos los trabajos de ${kw} cuentan con garantía escrita sobre los materiales y la mano de obra empleada.`,
        },
        {
          question: `¿Cómo solicito ${s.toLowerCase()} en ${n} a través de EMBES?`,
          answer: `Solicitar ${kw} es sencillo: introduce tu ubicación en el buscador de EMBES, selecciona el tipo de intervención y compara los perfiles de ${s.toLowerCase()} disponibles. Puedes contactar directamente, solicitar presupuesto sin compromiso y elegir al profesional que mejor se adapte a tus necesidades en toda la provincia de ${p}.`,
        },
        {
          question: `¿Atienden ${s.toLowerCase()} en toda la provincia de ${p}?`,
          answer: `La cobertura de nuestros ${s.toLowerCase()} abarca tanto ${n} como los municipios más cercanos de la provincia de ${p}. Al buscar ${kw}, verás profesionales que desplazan a tu domicilio con rapidez. Si tu localidad no aparece, contacta con nosotros y ampliaremos la búsqueda de ${s.toLowerCase()} en tu zona.`,
        },
      ];

    case "reformas":
      return [
        {
          question: `¿Cuánto cuesta ${s.toLowerCase()} en ${n}?`,
          answer: `${pick(reformOpenings, v)} El precio de ${kw} depende de factores como los materiales elegidos y la superficie a trabajar. En EMBES puedes solicitar hasta tres presupuestos gratuitos de profesionales en ${p}, comparar valoraciones y decidir con total tranquilidad qué ${s.toLowerCase()} se ajusta mejor a tu presupuesto.`,
        },
        {
          question: `¿Los ${s.toLowerCase()} de EMBES ofrecen presupuesto sin compromiso en ${n}?`,
          answer: `Todos los ${s.toLowerCase()} de nuestro directorio en ${n} ofrecen presupuestos detallados y gratuitos antes de comenzar cualquier trabajo. Podrás ver el desglose de materiales, mano de obra y plazos de ejecución para los servicios de ${kw}. Sin obligación de aceptar y sin coste alguno por la visita previa en la zona de ${p}.`,
        },
        {
          question: `¿Qué tipo de trabajos realizan los ${s.toLowerCase()} en ${n}?`,
          answer: `Los ${s.toLowerCase()} verificados en ${n} cubren una amplia gama de intervenciones: desde pequeñas reparaciones domésticas hasta reformas integrales de viviendas y locales comerciales. ${service.description}. Consulta el perfil de cada profesional de ${kw} para ver sus especialidades concretas y las valoraciones de otros clientes en ${p}.`,
        },
        {
          question: `¿Cómo elegir el mejor ${service.name.toLowerCase()} en ${n}?`,
          answer: `En EMBES facilitamos la elección del mejor profesional de ${kw} mostrando valoraciones verificadas, fotos de trabajos anteriores y detalles de la experiencia de cada ${s.toLowerCase()}. Puedes solicitar múltiples presupuestos y comparar antes de decidirte. Todos los profesionales de ${n} han sido evaluados previamente por nuestro equipo.`,
        },
        {
          question: `¿Trabajan ${s.toLowerCase()} en fines de semana en ${n}?`,
          answer: `Muchos de los ${s.toLowerCase()} disponibles en ${n} ofrecen flexibilidad horaria, incluyendo sábados y domingos, para adaptarse a tu disponibilidad. Al contactar con un profesional de ${kw} a través de EMBES, podrás acordar el horario que mejor te convenga. La disponibilidad real se indica en cada perfil de los ${s.toLowerCase()} de la provincia de ${p}.`,
        },
      ];

    case "salud":
      return [
        {
          question: `¿Cómo seleccionan a los profesionales de ${service.name.toLowerCase()} en ${n}?`,
          answer: `${pick(healthOpenings, v)} Revisamos titulaciones, experiencia profesional, seguros de responsabilidad civil y referencias de pacientes en ${p}. Solo los especialistas que cumplen nuestros estándares aparecen como ${s.toLowerCase()} en ${n} dentro del directorio de EMBES, garantizando una atención de calidad para ti y los tuyos.`,
        },
        {
          question: `¿Los ${s.toLowerCase()} de EMBES en ${n} tienen titulación oficial?`,
          answer: `Sí, todos los ${s.toLowerCase()} registrados en EMBES para ${n} disponen de la titulación y colegiación requerida por la legislación vigente. Antes de ser incluidos en nuestro directorio, verificamos sus credenciales académicas y profesionales. Puedes consultar los ${kw} con la tranquilidad de que cuentas con especialistas debidamente cualificados en ${p}.`,
        },
        {
          question: `¿Qué servicios ofrecen los ${s.toLowerCase()} verificados en ${n}?`,
          answer: `Los ${s.toLowerCase()} de EMBES en ${n} ofrecen una cartera completa de servicios: ${service.description.toLowerCase()}. Puedes consultar el perfil de cada profesional en nuestro directorio para ver los tratamientos específicos disponibles. Los ${kw} se adaptan a las necesidades de cada paciente con atención personalizada en toda la provincia de ${p}.`,
        },
        {
          question: `¿Los precios de ${s.toLowerCase()} en ${n} son competitivos?`,
          answer: `En EMBES promovemos la transparencia tarifaria entre los ${s.toLowerCase()} de ${n}. Puedes solicitar presupuestos sin compromiso y comparar entre varios profesionales antes de tomar una decisión. Los precios de ${kw} se ajustan al mercado de la provincia de ${p}, y muchas consultas y valoraciones iniciales son completamente gratuitas para los usuarios de nuestro directorio.`,
        },
        {
          question: `¿Cómo contacto con ${s.toLowerCase()} en ${n}?`,
          answer: `Ponerse en contacto con ${kw} a través de EMBES es rápido y sencillo. Solo tienes que buscar el servicio en ${n}, revisar los perfiles disponibles y contactar directamente con el profesional que te interese. Podrás resolver dudas, solicitar cita o pedir un presupuesto inicial sin compromiso. Todo el proceso es gratuito y sin intermediarios en la provincia de ${p}.`,
        },
      ];

    case "educacion":
      return [
        {
          question: `¿Qué asignaturas imparten los profesores particulares en ${n}?`,
          answer: `${pick(educationOpenings, v)} Desde matemáticas, lengua y ciencias hasta idiomas, informática y preparación de exámenes. Los {s} en {l} de EMBES cubren tanto el currículo académico oficial como materias de refuerzo y ampliación para todas las etapas educativas en la provincia de ${p}.`
            .replace(/{s}/g, s.toLowerCase())
            .replace(/{l}/g, n),
        },
        {
          question: `¿Los ${s.toLowerCase()} de EMBES en ${n} son profesionales titulados?`,
          answer: `Todos los ${s.toLowerCase()} que forman parte del directorio de EMBES en ${n} cuentan con la formación y experiencia necesarias en su área. Verificamos sus credenciales, referencias y trayectoria docente antes de publicar su perfil. Al elegir ${kw} a través de nuestra plataforma, tienes la garantía de contar con profesionales debidamente cualificados en ${p}.`,
        },
        {
          question: `¿Puedo elegir entre clases presenciales y online en ${n}?`,
          answer: `Muchos de los ${s.toLowerCase()} disponibles en ${n} a través de EMBES ofrecen tanto clases presenciales en tu domicilio o en su centro como sesiones online por videollamada. Esta flexibilidad te permite acceder a ${kw} independientemente de tu horario o ubicación dentro de la provincia de ${p}. Consulta la modalidad preferida en cada perfil profesional.`,
        },
        {
          question: `¿Cuánto cuesta ${service.name.toLowerCase()} en ${n}?`,
          answer: `El precio de ${kw} varía según el nivel educativo, la frecuencia de las sesiones y la modalidad elegida. En EMBES puedes comparar las tarifas de varios ${s.toLowerCase()} en ${n} y solicitar una clase de prueba sin compromiso. Nuestro objetivo es que encuentres la opción más adecuada a tu presupuesto en toda la provincia de ${p}.`,
        },
        {
          question: `¿Cómo sé si el ${s.toLowerCase()} es adecuado para mí en ${n}?`,
          answer: `En EMBES facilitamos la elección del ${s.toLowerCase()} perfecto en ${n} mediante perfiles detallados que incluyen formación, especialidades, metodología de enseñanza y valoraciones de otros alumnos. Puedes solicitar una primera sesión de prueba con ${kw} para comprobar la afinidad antes de comprometerte. La decisión final siempre es tuya en toda la provincia de ${p}.`,
        },
      ];

    case "bienestar":
      return [
        {
          question: `¿Qué servicios ofrecen las peluquerías verificadas en ${n}?`,
          answer: `${pick(wellbeingOpenings, v)} Entre los servicios más demandados de ${kw} se incluyen cortes de cabello personalizados, coloración completa, mechas y balayage, alisados brasileños, tratamientos de keratina y estilismo para eventos especiales. Cada peluquería en ${n} detalla su catálogo completo en su perfil de EMBES para la provincia de ${p}.`,
        },
        {
          question: `¿Puedo pedir cita con peluquerías en ${n} a través de EMBES?`,
          answer: `Sí, puedes contactar directamente con las peluquerías de ${n} a través de su perfil en EMBES para solicitar cita. El proceso es sencillo: consulta los horarios disponibles de ${kw}, elige el profesional que prefieras y reserva tu turno. Sin intermediarios ni cargos adicionales por la gestión de citas en la provincia de ${p}.`,
        },
        {
          question: `¿Las peluquerías de EMBES en ${n} trabajan con productos profesionales?`,
          answer: `Las peluquerías incluidas en nuestro directorio de ${n} utilizan productos de marcas profesionales reconocidas del sector capilar. Al elegir ${kw} a través de EMBES, te aseguras de que los tratamientos se realizan con materiales de primera calidad que protegen y cuidan tu cabello. Consulta las marcas específicas en cada perfil de peluquería de la provincia de ${p}.`,
        },
        {
          question: `¿Cuál es el precio medio de una peluquería en ${n}?`,
          answer: `El precio de los servicios de ${kw} varía según el tratamiento solicitado: un corte básico tiene un coste distinto a una coloración completa o un tratamiento capilar intensivo. En EMBES puedes consultar las tarifas de cada peluquería en ${n} y comparar antes de reservar. Los precios se ajustan al mercado de la provincia de ${p} con total transparencia.`,
        },
        {
          question: `¿Ofrecen las peluquerías en ${n} servicios para eventos?`,
          answer: `Muchas de las peluquerías de EMBES en ${n} disponen de servicios especiales para bodas, comuniones, galas y eventos corporativos. Los {s} de {l} ofrecen recogidos, peinados de fiesta y maquillaje profesional coordinado. Puedes solicitar presupuesto sin compromiso y planificar una prueba previa para asegurarte de que el resultado sea perfecto en tu evento en ${p}.`
            .replace(/{s}/g, s.toLowerCase())
            .replace(/{l}/g, n),
        },
      ];

    default:
      return [];
  }
}

// ─── 2. generateIntro ──────────────────────────────────────────────

const introPhrases: Record<string, string[]> = {
  emergencias: [
    "Encontrar {s} fiables en {l} ya no tiene por qué ser una experiencia estresante.",
    "Si necesitas {s} en {l}, EMBES te conecta con los mejores profesionales de la zona al instante.",
    "Las urgencias domésticas no esperan, y por eso en EMBES ponemos a tu disposición {s} de confianza en {l}.",
  ],
  reformas: [
    "Si estás pensando en contratar {s} en {l}, EMBES simplifica todo el proceso de búsqueda y comparación.",
    "Planificar una reforma o reparación en {l} es más fácil con el directorio de {s} verificados de EMBES.",
    "Los mejores {s} de {l} están a tu alcance gracias al directorio profesional de EMBES.",
  ],
  salud: [
    "Cuidar de tu salud y bienestar en {l} es más sencillo con el directorio de {s} verificados de EMBES.",
    "En EMBES te ayudamos a encontrar {s} de confianza en {l} con garantía de profesionalidad.",
    "Tu bienestar merece profesionales cualificados, y por eso en EMBES solo incluimos {s} verificados en {l}.",
  ],
  educacion: [
    "Impulsar tu formación o la de tus hijos en {l} comienza por elegir los {s} adecuados a través de EMBES.",
    "Encontrar {s} de calidad en {l} es clave para el éxito académico, y EMBES te facilita la tarea.",
    "El aprendizaje continuo en {l} tiene como aliado al directorio de {s} verificados de EMBES.",
  ],
  bienestar: [
    "Cuidar tu imagen personal en {l} está al alcance de un clic con las {s} verificadas de EMBES.",
    "Si buscas {s} de confianza en {l}, EMBES te ofrece un directorio con los mejores estilistas de la zona.",
    "Lucir un aspecto impecable en {l} es posible gracias al directorio de {s} profesionales de EMBES.",
  ],
};

const benefitPhrases: Record<string, string[]> = {
  emergencias: [
    "Nuestro directorio solo incluye profesionales que han superado un riguroso proceso de validación, lo que significa que puedes solicitar un presupuesto sin compromiso y elegir con total confianza.",
    "Cada profesional de nuestro directorio cuenta con seguro de responsabilidad civil y garantía escrita sobre sus intervenciones, para que tengas la tranquilidad que mereces.",
    "Todos los especialistas disponibles han sido evaluados en experiencia, formación y atención al cliente, garantizando un servicio de excelencia en cada intervención.",
  ],
  reformas: [
    "Solo trabajamos con profesionales que han superado nuestro proceso de verificación, lo que te permite solicitar presupuestos sin compromiso y elegir con total confianza.",
    "Cada especialista disponible en nuestro directorio ofrece garantía sobre sus trabajos y utiliza materiales de primera calidad en cada intervención.",
    "Nuestro equipo revisa las valoraciones reales de otros clientes para que puedas tomar una decisión informada antes de contratar cualquier servicio.",
  ],
  salud: [
    "Solo incorporamos a nuestro directorio a especialistas con titulación oficial, seguro de responsabilidad civil y buenas referencias de pacientes en la zona.",
    "Cada profesional ha pasado por un proceso de evaluación que garantiza su cualificación y compromiso con la atención de calidad.",
    "Puedes consultar valoraciones reales de otros pacientes y solicitar una primera consulta sin compromiso antes de comprometerte.",
  ],
  educacion: [
    "Solo incorporamos a profesionales con formación demostrable, experiencia docente y buenas valoraciones de alumnos anteriores en la zona.",
    "Cada profesor o centro ha sido evaluado para garantizar su capacidad pedagógica y compromiso con el aprendizaje del alumno.",
    "Puedes consultar valoraciones reales, solicitar una clase de prueba sin compromiso y elegir al profesional que mejor se adapte a tu estilo de aprendizaje.",
  ],
  bienestar: [
    "Solo incluimos en nuestro directorio a establecimientos con profesionales titulados, buenas valoraciones de clientes y productos de marcas reconocidas.",
    "Cada establecimiento ha sido visitado y evaluado por nuestro equipo para garantizar la calidad de sus servicios y la satisfacción de sus clientes.",
    "Puedes consultar galerías de trabajo, valoraciones reales y solicitar cita directamente sin intermediarios ni costes adicionales.",
  ],
};

const ctaPhrases: Record<string, string[]> = {
  emergencias: [
    "Ya seas de la capital o de cualquier municipio de la {c}, encontrar el profesional adecuado en {l} está a un clic de distancia.",
    "No importa si resides en el centro de {l} o en las afueras de la {c}: nuestros profesionales llegan a toda la provincia de {p}.",
    "Desde cualquier punto de la {c}, puedes acceder a nuestro directorio y encontrar atención profesional inmediata en {l}.",
  ],
  reformas: [
    "Tanto si resides en el casco urbano de {l} como en cualquier municipio de la {c}, encontrar el profesional ideal para tu proyecto está a un clic.",
    "Desde toda la provincia de {p}, puedes acceder a nuestro directorio y comparar profesionales verificados para tu próxima reforma en {l}.",
    "No importa la ubicación de tu propiedad en la {c}: en EMBES conectamos la demanda con los mejores profesionales de {l}.",
  ],
  salud: [
    "Tanto si vives en {l} como en cualquier otra localidad de la {c}, encontrar el especialista adecuado para ti está a un clic de distancia.",
    "Desde cualquier punto de la provincia de {p}, puedes acceder a nuestro directorio y elegir al profesional de salud que mejor se adapte a tus necesidades en {l}.",
    "En toda la {c}, EMBES te acerca a los mejores profesionales verificados para que cuides de tu bienestar sin complicaciones desde {l}.",
  ],
  educacion: [
    "Tanto si buscas clases para ti o para tus hijos en {l}, en EMBES encontrarás al profesional perfecto en toda la {c}.",
    "Desde cualquier municipio de la provincia de {p}, puedes acceder a profesores y academias verificados a través de nuestro directorio para {l}.",
    "En toda la {c}, EMBES conecta a alumnos con los mejores docentes verificados, facilitando el aprendizaje de calidad en {l}.",
  ],
  bienestar: [
    "Tanto si buscas un cambio de look rutinario como un estilismo especial en {l}, en EMBES encontrarás al profesional ideal en toda la {c}.",
    "Desde cualquier punto de la provincia de {p}, puedes acceder a establecimientos verificados y reservar tu cita para {l}.",
    "En toda la {c}, EMBES te conecta con los mejores profesionales del cuidado personal para que luzcas impecable en {l}.",
  ],
};

function generateIntro(service: Service, location: Location): string {
  const v = locVariation(location);
  const cluster = service.cluster;
  const phrases = introPhrases[cluster] ?? introPhrases.emergencias;
  const benefits = benefitPhrases[cluster] ?? benefitPhrases.emergencias;
  const ctas = ctaPhrases[cluster] ?? ctaPhrases.emergencias;

  const opening = pick(phrases, v)
    .replace(/{s}/g, service.shortName.toLowerCase())
    .replace(/{l}/g, location.name);

  const benefit = pick(benefits, v + 3);

  const cta = pick(ctas, v + 7)
    .replace(/{l}/g, location.name)
    .replace(/{c}/g, location.community)
    .replace(/{p}/g, location.province);

  return `${opening} ${service.description.charAt(0).toLowerCase()}${service.description.slice(1)} ${benefit} ${cta}`;
}

// ─── 3. generateBenefits ───────────────────────────────────────────

const benefitDescriptions: Record<string, string[]> = {
  emergencias: [
    "Todos los {s} en {l} han superado nuestra verificación de identidad, licencias, seguros y experiencia profesional. Cada perfil incluye valoraciones reales de clientes en {p}, para que tomes una decisión informada y segura.",
    "Puedes solicitar presupuestos gratuitos y sin compromiso de varios {s} en {l}. Compara precios, plazos y condiciones antes de aceptar, sin costes ocultos ni obligaciones de contratación.",
    "Nuestros {s} en {l} cuentan con movilidad rápida por toda la provincia de {p}. El tiempo medio de respuesta es inferior a 60 minutos para intervenciones urgentes, las 24 horas del día.",
    "Cada intervención de {s} en {l} está respaldada por seguro de responsabilidad civil y garantía escrita. Si algo no sale bien, EMBES te acompaña en la resolución del incidente.",
  ],
  reformas: [
    "Todos los {s} en {l} han pasado nuestro proceso de verificación: comprobamos licencias, seguros, referencias y galerías de trabajos anteriores. Solo los mejores profesionales de {p} forman parte de nuestro directorio.",
    "Solicita hasta tres presupuestos gratuitos de {s} en {l} sin compromiso alguno. Compara materiales, plazos de ejecución y valoraciones de otros clientes antes de tomar tu decisión.",
    "Los {s} de EMBES en {l} se desplazan a tu domicilio con rapidez y flexibilidad horaria, incluyendo fines de semana en muchos casos. Cobertura completa en la provincia de {p}.",
    "Todos los trabajos realizados por {s} en {l} incluyen garantía sobre materiales y mano de obra. Además, cada profesional dispone de seguro de responsabilidad civil para tu tranquilidad.",
  ],
  salud: [
    "Cada profesional de {s} en {l} ha sido evaluado en titulación oficial, experiencia clínica, seguros y referencias de pacientes en {p}. Solo incorporamos a especialistas que cumplen nuestros rigurosos estándares de calidad.",
    "Puedes solicitar consultas informativas y presupuestos de {s} en {l} sin coste ni compromiso. Compara opciones y elige al especialista que mejor se adapte a tus necesidades de salud.",
    "Los {s} de EMBES en {l} ofrecen citas con disponibilidad ajustada a tus horarios. Muchos disponen de agenda flexible incluyendo tardes y sábados en toda la provincia de {p}.",
    "Todos los {s} verificados en {l} cuentan con seguro de responsabilidad civil y cumplen la normativa sanitaria vigente en {p}. Tu seguridad y bienestar son nuestra máxima prioridad.",
  ],
  educacion: [
    "Todos los {s} en {l} han sido evaluados en formación académica, experiencia docente y referencias de alumnos anteriores. Solo los profesionales mejor valorados de {p} forman parte de nuestro directorio.",
    "Solicita una clase de prueba gratuita o un presupuesto sin compromiso de {s} en {l}. Compara metodologías, tarifas y horarios antes de comprometerte con cualquier profesional.",
    "Los {s} de EMBES en {l} ofrecen tanto clases presenciales como online, con horarios flexibles que se adaptan a tu rutina. Disponibilidad en toda la provincia de {p}.",
    "Todos los {s} verificados en {l} cuentan con la titulación necesaria y seguro de responsabilidad civil. EMBES supervisa periódicamente las valoraciones para mantener la calidad del servicio.",
  ],
  bienestar: [
    "Cada peluquería de {l} en EMBES ha sido evaluada en cualificación de su equipo, calidad de los productos utilizados y satisfacción de los clientes en {p}. Solo los mejores establecimientos forman parte de nuestro directorio.",
    "Puedes consultar los precios y solicitar cita con las peluquerías en {l} de forma totalmente gratuita y sin compromiso. Compara servicios, Galerías de trabajo y valoraciones antes de reservar.",
    "Las peluquerías de EMBES en {l} ofrecen citas con horarios flexibles, incluyendo tardes y sábados. Puedes reservar tu turno en línea desde cualquier punto de la provincia de {p}.",
    "Todos los establecimientos de peluquerías en {l} utilizan productos profesionales de marcas reconocidas y cuentan con los seguros exigidos por la normativa vigente en {p}.",
  ],
};

function generateBenefits(
  service: Service,
  location: Location
): { title: string; description: string }[] {
  const s = service.shortName.toLowerCase();
  const n = location.name;
  const p = location.province;
  const cluster = service.cluster;
  const descs = benefitDescriptions[cluster] ?? benefitDescriptions.emergencias;

  const titles = [
    `Profesionales verificados en ${n}`,
    "Presupuestos gratuitos y sin compromiso",
    `Respuesta rápida en ${p}`,
    "Garantía y seguro de responsabilidad civil",
  ];

  return titles.map((title, i) => ({
    title,
    description: descs[i]
      .replace(/{s}/g, s)
      .replace(/{l}/g, n)
      .replace(/{p}/g, p),
  }));
}

// ─── 4. generateMeta ───────────────────────────────────────────────

function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max - 1).trimEnd() + "…";
}

function generateMeta(
  service: Service,
  location: Location
): { title: string; description: string } {
  const kw = `${service.shortName} en ${location.name}`;
  const title = truncate(
    `${kw} | Profesionales Verificados EMBES`,
    60
  );
  const desc = truncate(
    `Encuentra ${service.shortName.toLowerCase()} verificados en ${location.name}. ${service.description.split(".")[0]}. Presupuestos sin compromiso. EMBES — Profesionales de confianza en ${location.province}.`,
    160
  );
  return { title, description: desc };
}

// ─── 5. generateStructuredData ─────────────────────────────────────

function generateStructuredData(
  service: Service,
  location: Location
): object {
  const faqs = generateFAQ(service, location);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: "https://embes.es",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Servicios",
            item: "https://embes.es/servicios",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.shortName,
            item: `https://embes.es/${service.slug}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: `${service.shortName} en ${location.name}`,
          },
        ],
      },
      {
        "@type": "Service",
        name: `${service.shortName} en ${location.name}`,
        description: service.description,
        provider: {
          "@type": "Organization",
          name: "EMBES",
          url: "https://embes.es",
        },
        areaServed: {
          "@type": "City",
          name: location.name,
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: location.province,
          },
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

// ─── 6. getRelatedServices ─────────────────────────────────────────

function getRelatedServices(service: Service): Service[] {
  const siblings = getClusterServices(service).filter(
    (s) => s.slug !== service.slug
  );
  return siblings.slice(0, 6);
}

// ─── 7. getNearbyLocations ─────────────────────────────────────────

function getNearbyLocations(
  location: Location,
  limit: number = 6
): Location[] {
  return locations
    .filter(
      (l) => l.community === location.community && l.slug !== location.slug
    )
    .slice(0, limit);
}

// ─── 8. getLocationServices ────────────────────────────────────────

function getLocationServices(location: Location): Service[] {
  return services;
}

// ─── 9. generateLocationMeta ───────────────────────────────────────

function generateLocationMeta(
  location: Location
): { title: string; description: string } {
  const title = truncate(
    `Profesionales Verificados en ${location.name} | EMBES`,
    60
  );
  const topNames = services.slice(0, 4).map((s) => s.shortName.toLowerCase());
  const desc = truncate(
    `Directorio de profesionales verificados en ${location.name}, ${location.province}. ${topNames.join(", ")} y más. Presupuestos sin compromiso con EMBES.`,
    160
  );
  return { title, description: desc };
}

// ─── 10. generateLocationIntro ─────────────────────────────────────

const locationIntroTemplates = [
  "En {l}, {p}, encontrar profesionales de confianza ha dejado de ser un problema gracias al directorio de EMBES. Nuestra plataforma conecta a los residentes de la {c} con especialistas verificados en múltiples sectores: desde servicios de emergencia las 24 horas y reformas del hogar, hasta salud, educación y bienestar personal. Cada profesional incluido en nuestro directorio ha superado un riguroso proceso de verificación que garantiza su cualificación, experiencia y compromiso con la satisfacción del cliente. Tanto si resides en el centro de {l} como en cualquier localidad cercana de la provincia de {p}, en EMBES puedes comparar perfiles, consultar valoraciones reales y solicitar presupuestos sin compromiso con un solo clic.",
  "Si vives en {l} o en cualquier municipio de la {c}, EMBES es tu aliado para encontrar profesionales verificados en todas las áreas de servicio. Nuestro directorio cubre desde emergencias domiciliarias y reformas integrales hasta salud, formación académica y bienestar personal. Cada especialista de {l} que aparece en nuestra plataforma ha sido evaluado en cuanto a titulación, seguros de responsabilidad civil y referencias de clientes en {p}. Con EMBES, comparar opciones y solicitar presupuestos gratuitos es tan sencillo como introducir tu ubicación y elegir el profesional que mejor se adapte a tus necesidades en la provincia de {p}.",
  "Buscas profesionales de confianza en {l}, {p}? En EMBES hemos creado el directorio más completo de especialistas verificados de la {c}. Desde cerrajeros y electricistas de urgencia hasta profesores particulares, dentistas, peluquerías y especialistas en reformas, todos los perfiles de {l} han sido evaluados rigurosamente. Nuestra misión es que los residentes de {l} y de toda la provincia de {p} puedan encontrar, comparar y contactar con profesionales cualificados sin intermediarios ni costes ocultos. Solicita tu presupuesto sin compromiso y elige con total confianza.",
];

function generateLocationIntro(location: Location): string {
  const v = locVariation(location);
  const template = pick(locationIntroTemplates, v);
  return template
    .replace(/{l}/g, location.name)
    .replace(/{p}/g, location.province)
    .replace(/{c}/g, location.community);
}

// ─── Exports ───────────────────────────────────────────────────────

export {
  generateFAQ,
  generateIntro,
  generateBenefits,
  generateMeta,
  generateStructuredData,
  getRelatedServices,
  getNearbyLocations,
  getLocationServices,
  generateLocationMeta,
  generateLocationIntro,
};