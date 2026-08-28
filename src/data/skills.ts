import type { SkillGroup } from "@/lib/types";

export const skillGroups: SkillGroup[] = [
  {
    categoryEn: "Statistical Analysis",
    categoryEs: "Análisis Estadístico",
    subgroups: [
      {
        labelEn: "Inference & Modeling",
        labelEs: "Inferencia y Modelamiento",
        items: ["ANOVA", "MANOVA", "ANCOVA", "Linear & logistic regression", "Multilevel/mixed models", "Mediation & moderation", "Nonparametric methods"],
      },
      {
        labelEn: "Psychometrics & Measurement",
        labelEs: "Psicometría y Medición",
        items: ["IRT", "CFA", "SEM", "Scale construction & validation", "Measurement invariance", "Reliability & validity", "Instrument adaptation"],
      },
      {
        labelEn: "Simulation & Design",
        labelEs: "Simulación y Diseño",
        items: ["Monte Carlo simulation", "Bayesian analysis", "Power analysis", "Missing data (MI/FIML)"],
      },
      {
        labelEn: "Exploration",
        labelEs: "Exploración",
        items: ["EFA", "PCA", "Cluster analysis (K-Means, HDBSCAN, hierarchical)"],
      },
    ],
  },
  {
    categoryEn: "Computational",
    categoryEs: "Computacional",
    items: ["Contextual embeddings", "NLP", "LLM integration", "Content analysis", "Dimensionality reduction (UMAP/t-SNE)"],
  },
  {
    categoryEn: "Languages & Frameworks",
    categoryEs: "Lenguajes y Frameworks",
    items: ["Python", "R", "TypeScript", "SQL", "LaTeX", "FastAPI", "Next.js", "React", "sentence-transformers", "LangGraph"],
  },
  {
    categoryEn: "Platforms",
    categoryEs: "Plataformas",
    items: ["OSF", "GitHub", "Docker", "PostgreSQL"],
  },
];
