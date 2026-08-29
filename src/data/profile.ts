import type { ProfileLink, ResearchLine } from "@/lib/types";

export const bio = {
  en: [
    "I study how psychological constructs are built and measured, combining quantitative methodology with computational methods. Much of my work addresses the distance between what we theorize about a psychological phenomenon and what our instruments actually capture, particularly in developmental cognitive and educational psychology.",
    "I hold degrees in Psychology and Statistics from Universidad del Valle, where I am a doctoral student in Psychology at CIDEAS. I teach across two universities.",
  ],
  es: [
    "Estudio cómo se construyen y miden los constructos psicológicos, combinando metodología cuantitativa con métodos computacionales. Gran parte de mi trabajo aborda la distancia entre lo que teorizamos sobre un fenómeno psicológico y lo que nuestros instrumentos realmente capturan, particularmente en psicología del desarrollo cognitivo y educativa.",
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

export const researchLines: ResearchLine[] = [
  {
    titleEn: "Computational Approaches in Psychology",
    titleEs: "Aproximaciones Computacionales en Psicología",
    descriptionEn: "Using computational methods and artificial intelligence, I study how psychological constructs are built, represented, and measured. I develop methods to represent and measure multimodal psychological phenomena — gesture, speech, and interaction with artifacts, among others — that conventional measurement does not reach. Centered in cognitive development and education, this line addresses contexts where the distance between the construct and its measurement is most visible, for example, geometric reasoning in deaf children, multimodal interaction in STEM classrooms, or motivation in educational settings.",
    descriptionEs: "Mediante métodos computacionales e inteligencia artificial, estudio cómo se construyen, representan y miden los constructos psicológicos. Desarrollo métodos para representar y medir fenómenos psicológicos multimodales — gesto, habla e interacción con artefactos, entre otros — que la medición convencional no alcanza. Centrada en el desarrollo cognitivo y la educación, esta línea aborda contextos donde la distancia entre el constructo y su medición es más visible, por ejemplo, el razonamiento geométrico en niños sordos, la interacción multimodal en aulas STEM o la motivación en contextos educativos.",
  },
  {
    titleEn: "Applied Quantitative Methodology",
    titleEs: "Metodología Cuantitativa Aplicada",
    descriptionEn: "I work in quantitative methodology, statistical modeling, and psychometrics applied to empirical research across different fields of psychology. I collaborate on study design, development of statistical analyses, instrument validation, and scale adaptation, with particular attention to how methodological and theoretical decisions affect the conclusions we draw.",
    descriptionEs: "Trabajo en metodología cuantitativa, modelamiento estadístico y psicometría, aplicados a la investigación empírica en diferentes campos de la psicología. Colaboro en diseño de estudios, desarrollo de análisis estadísticos, validación de instrumentos y adaptación de escalas, con especial atención a cómo las decisiones metodológicas y teóricas afectan las conclusiones que obtenemos.",
  },
];
