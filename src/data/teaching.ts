export type CourseInstance = {
  university: string;
  level: "undergraduate" | "graduate";
  semesters: string[];
};

export type CourseGroup = {
  name: string;
  descriptionEn: string;
  descriptionEs: string;
  instances: CourseInstance[];
};

export type TeachingDomain = {
  nameEn: string;
  nameEs: string;
  courses: CourseGroup[];
};

export const teachingDomains: TeachingDomain[] = [
  {
    nameEn: "Statistics & Quantitative Methods",
    nameEs: "Estadística y Métodos Cuantitativos",
    courses: [
      {
        name: "Estadística para Ciencias Sociales",
        descriptionEn: "Inferential statistics, multivariate analysis, and research design for psychology students.",
        descriptionEs: "Estadística inferencial, análisis multivariado y diseño de investigación para estudiantes de psicología.",
        instances: [
          { university: "Pontificia Universidad Javeriana, Cali", level: "undergraduate", semesters: ["2023-01", "2023-02", "2024-01", "2024-02", "2025-01", "2025-02", "2026-01", "2026-02"] },
          { university: "Universidad de San Buenaventura, Cali", level: "undergraduate", semesters: ["2024-01"] },
        ],
      },
      {
        name: "Estadística",
        descriptionEn: "Foundations of descriptive and inferential statistics applied to behavioral science research.",
        descriptionEs: "Fundamentos de estadística descriptiva e inferencial aplicados a la investigación en ciencias del comportamiento.",
        instances: [
          { university: "Universidad del Valle", level: "undergraduate", semesters: ["2024-02", "2025-02", "2026-02"] },
        ],
      },
      {
        name: "Estadística Multivariada Aplicada",
        descriptionEn: "Advanced multivariate techniques for graduate research in psychology.",
        descriptionEs: "Técnicas multivariadas avanzadas para la investigación en psicología a nivel de posgrado.",
        instances: [
          { university: "Pontificia Universidad Javeriana, Cali", level: "graduate", semesters: ["2023-02"] },
        ],
      },
      {
        name: "Análisis Integrado de Datos",
        descriptionEn: "Integration of quantitative and qualitative analysis methods in applied research projects.",
        descriptionEs: "Integración de métodos de análisis cuantitativo y cualitativo en proyectos de investigación aplicada.",
        instances: [
          { university: "Pontificia Universidad Javeriana, Cali", level: "undergraduate", semesters: ["2025-02", "2026-01", "2026-02"] },
        ],
      },
    ],
  },
  {
    nameEn: "Research Methodology",
    nameEs: "Metodología de la Investigación",
    courses: [
      {
        name: "Metodología Cuantitativa",
        descriptionEn: "Quantitative research design, sampling, measurement, and data analysis strategies.",
        descriptionEs: "Diseño de investigación cuantitativa, muestreo, medición y estrategias de análisis de datos.",
        instances: [
          { university: "Universidad del Valle", level: "undergraduate", semesters: ["2023-01", "2023-02", "2024-01", "2024-02", "2025-02"] },
          { university: "Universidad del Valle", level: "graduate", semesters: ["2024-02", "2025-02"] },
        ],
      },
      {
        name: "Lógica Investigativa",
        descriptionEn: "Foundations of research logic, hypothesis formulation, and study design.",
        descriptionEs: "Fundamentos de lógica investigativa, formulación de hipótesis y diseño de estudios.",
        instances: [
          { university: "Universidad de San Buenaventura, Cali", level: "undergraduate", semesters: ["2024-01"] },
        ],
      },
    ],
  },
  {
    nameEn: "Cognitive Development & Learning",
    nameEs: "Desarrollo Cognitivo y Aprendizaje",
    courses: [
      {
        name: "Psicología del Aprendizaje",
        descriptionEn: "Learning theories, behavioral and cognitive perspectives, and their application in educational settings.",
        descriptionEs: "Teorías del aprendizaje, perspectivas conductual y cognitiva, y su aplicación en contextos educativos.",
        instances: [
          { university: "Pontificia Universidad Javeriana, Cali", level: "undergraduate", semesters: ["2023-02", "2024-01", "2024-02", "2025-01", "2025-02", "2026-01", "2026-02"] },
          { university: "Universidad del Valle", level: "undergraduate", semesters: ["2024-02", "2025-02", "2026-02"] },
        ],
      },
      {
        name: "Tópicos en Psicología Cognitiva",
        descriptionEn: "Selected topics in cognitive psychology: attention, memory, reasoning, and language.",
        descriptionEs: "Temas selectos en psicología cognitiva: atención, memoria, razonamiento y lenguaje.",
        instances: [
          { university: "Pontificia Universidad Javeriana, Cali", level: "undergraduate", semesters: ["2023-02", "2024-01", "2024-02", "2025-01"] },
        ],
      },
      {
        name: "Pensamiento Lógico-Matemático",
        descriptionEn: "Logical and mathematical thinking from a developmental perspective.",
        descriptionEs: "Pensamiento lógico y matemático desde una perspectiva del desarrollo.",
        instances: [
          { university: "Universidad del Valle", level: "undergraduate", semesters: ["2024-01", "2025-01", "2026-01"] },
        ],
      },
      {
        name: "Desarrollo del Pensamiento Matemático",
        descriptionEn: "Cognitive development of mathematical reasoning in children and adolescents.",
        descriptionEs: "Desarrollo cognitivo del razonamiento matemático en niños y adolescentes.",
        instances: [
          { university: "Universidad del Valle", level: "undergraduate", semesters: ["2025-01", "2026-01"] },
        ],
      },
      {
        name: "Psicología Educativa 3",
        descriptionEn: "Advanced topics in educational psychology: motivation, self-regulation, and assessment.",
        descriptionEs: "Temas avanzados en psicología educativa: motivación, autorregulación y evaluación.",
        instances: [
          { university: "Universidad del Valle", level: "undergraduate", semesters: ["2025-02"] },
        ],
      },
    ],
  },
];
