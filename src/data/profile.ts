import type { ProfileLink, ResearchLine } from "@/lib/types";

export const bio = {
  en: [
    "My research examines how psychological processes — from geometric reasoning to social cognition — manifest across different modalities and populations, and how computational methods can formalize what traditional instruments miss. I work at the intersection of cognitive science, psychometrics, and AI: as a statistician, through psychometric modeling, simulation, and multivariate analysis; and as a computational researcher, developing tools that use contextual embeddings to read meaning in text and multimodal behavioral data.",
    "I hold degrees in Psychology and Statistics from Universidad del Valle, where I am a doctoral candidate at CIDEAS. I teach across three universities and consult in psychometrics.",
  ],
  es: [
    "Mi investigación examina cómo los procesos psicológicos — desde el razonamiento geométrico hasta la cognición social — se manifiestan a través de diferentes modalidades y poblaciones, y cómo los métodos computacionales pueden formalizar lo que los instrumentos tradicionales no capturan. Trabajo en la intersección entre ciencia cognitiva, psicometría e IA: como estadístico, mediante modelamiento psicométrico, simulación y análisis multivariado; y como investigador computacional, desarrollando herramientas que usan embeddings contextuales para leer significado en texto y datos conductuales multimodales.",
    "Tengo formación en Psicología y Estadística de la Universidad del Valle, donde soy candidato doctoral en CIDEAS. Soy docente en tres universidades y consultor en psicometría.",
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

export const researchLines: ResearchLine[] = [
  {
    titleEn: "Applied Quantitative Methodology",
    titleEs: "Metodología Cuantitativa Aplicada",
    descriptionEn: "I bring psychometric modeling, multivariate analysis, and rigorous quantitative standards to empirical research across neuropsychology, educational and developmental psychology, and organizational psychology — collaborating on instrument validation, scale adaptation, and the quantitative infrastructure of applied research where measurement decisions shape clinical, educational, and policy conclusions.",
    descriptionEs: "Aporto modelamiento psicométrico, análisis multivariado y estándares cuantitativos rigurosos a la investigación empírica en neuropsicología, psicología educativa y del desarrollo, y psicología organizacional — colaborando en validación de instrumentos, adaptación de escalas y la infraestructura cuantitativa de la investigación aplicada, donde las decisiones de medición determinan conclusiones clínicas, educativas y de política.",
  },
  {
    titleEn: "Computational Approaches in Psychology",
    titleEs: "Aproximaciones Computacionales en Psicología",
    descriptionEn: "Using computational methods and artificial intelligence, I investigate the semantic structure of psychological constructs and the gap between what we theorize and what standard instruments capture, recovering structure from theoretical texts and formalizing multimodal behavior (gesture, speech, interaction with artifacts) that conventional measurement does not reach. Grounded in cognitive development and education, this work addresses settings where this gap is most visible: geometric reasoning in deaf children, multimodal interaction in STEM classrooms, and spatial navigation in individuals with visual impairments.",
    descriptionEs: "Mediante métodos computacionales e inteligencia artificial, investigo la estructura semántica de los constructos psicológicos y la brecha entre lo que teorizamos y lo que nuestros instrumentos capturan, recuperando estructura de textos teóricos y formalizando comportamiento multimodal (gesto, habla, interacción con artefactos) que la medición convencional no alcanza. Arraigada en el desarrollo cognitivo y la educación, esta línea aborda contextos donde esta brecha es más visible: el razonamiento geométrico en niños sordos, la interacción multimodal en aulas STEM, y la navegación espacial en personas con discapacidad visual.",
  },
];
