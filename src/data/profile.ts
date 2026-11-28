import type { ProfileLink, ResearchLine } from "@/lib/types";
import type { Lang } from "@/lib/i18n";

// Academic CV (public version, Cancillería anonymized): copied from
// ~/Desktop/Proyectos/Certificados laborales/cv/fuentes/academico{,_en}.pdf. The link follows the site language.
export const CV = { en: "/cv/mateo-belalcazar-cv-en.pdf", es: "/cv/mateo-belalcazar-cv-es.pdf" } as const;

export const bio = {
  en: [
    "I study how psychological constructs are built and measured, working between cognitive science and quantitative methods. Much of my work addresses the distance between what we theorize about a psychological phenomenon and what our instruments actually capture, and on both fronts I use artificial intelligence to represent theory and what we record in a shared space.",
    "I hold degrees in Psychology and Statistics from Universidad del Valle, where I am a doctoral student in Psychology at CIDEAS. I teach across two universities.",
  ],
  es: [
    "Estudio cómo se construyen y miden los constructos psicológicos, entre las ciencias cognitivas y los métodos cuantitativos. Gran parte de mi trabajo aborda la distancia entre lo que teorizamos sobre un fenómeno psicológico y lo que nuestros instrumentos realmente capturan, y en ambos frentes uso la inteligencia artificial para representar la teoría y lo que registramos en un mismo espacio.",
    "Tengo formación en Psicología y Estadística de la Universidad del Valle, donde soy estudiante doctoral en Psicología en CIDEAS. Soy docente en dos universidades.",
  ],
} as const;

export const profileLinks: ProfileLink[] = [
  { label: "Email", href: "mailto:mateo.belalcazar6@gmail.com", icon: "email" },
  { label: "Scholar", href: "https://scholar.google.com/citations?hl=es&authuser=1&user=RoI0VQ8AAAAJ", icon: "scholar" },
  { label: "ORCID", href: "https://orcid.org/0000-0001-8276-9734", icon: "orcid" },
  { label: "ResearchGate", href: "https://www.researchgate.net/profile/Mateo-Belalcazar", icon: "researchgate" },
  { label: "GitHub", href: "https://github.com/Mateob6", icon: "github" },
  { label: "OSF", href: "https://osf.io/phswz/", icon: "osf" },
  { label: "Semantic Scholar", href: "https://www.semanticscholar.org/author/Mateo-Belalc%C3%A1zar/2296970047", icon: "semantic-scholar" },
];

// Research lines, renamed on 2026-11-27 after reading Mateo's papers and thesis (Wulff-style: one question per line,
// no projects or populations; the concrete work lives in Publications). Before: «Computational Approaches in
// Psychology» and «Applied Quantitative Methodology», with long descriptions. AI is in both lines on purpose.
export const researchLines: ResearchLine[] = [
  {
    titleEn: "Cognitive Science",
    titleEs: "Ciencias Cognitivas",
    descriptionEn: "This line asks how people think and learn through the body, gesture, speech, and artifacts, and how artificial intelligence can represent that activity in relation to theory without reducing it to a single channel or score.",
    descriptionEs: "Esta línea pregunta cómo se piensa y se aprende a través del cuerpo, el gesto, el habla y los artefactos, y cómo la inteligencia artificial puede representar esa actividad en relación con la teoría sin reducirla a un solo canal o a un solo puntaje.",
  },
  {
    titleEn: "Quantitative Methods",
    titleEs: "Métodos Cuantitativos",
    descriptionEn: "This line asks how measurement and analysis decisions shape what we conclude about psychological phenomena, and how artificial intelligence can help examine how faithfully instruments capture the theories they claim to operationalize.",
    descriptionEs: "Esta línea pregunta cómo las decisiones de medición y análisis moldean lo que concluimos sobre los fenómenos psicológicos, y cómo la inteligencia artificial puede ayudar a examinar qué tan fielmente los instrumentos recogen las teorías que dicen operacionalizar.",
  },
];

/** Shown as one sentence under the research lines («Further interests include …», «También me interesan …»)
 *  and listed in the Person JSON-LD (knowsAbout) */
export const furtherInterests = {
  en: ["distributional semantics", "cognitive development and education in diverse contexts", "spatial and mathematical thinking", "construct validity", "content analysis"],
  es: ["la semántica distribucional", "el desarrollo cognitivo y la educación en contextos diversos", "el pensamiento espacial y matemático", "la validez de constructo", "el análisis de contenido"],
} as const;


/** «Further interests include a, b, and c.» / «También me interesan a, b y c.» */
export function furtherInterestsSentence(lang: Lang): string {
  const list = new Intl.ListFormat(lang, { style: "long", type: "conjunction" }).format(furtherInterests[lang]);
  return lang === "en" ? `Further interests include ${list}.` : `También me interesan ${list}.`;
}
