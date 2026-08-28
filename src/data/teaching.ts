import type { Course } from "@/lib/types";

const PUJ = "Pontificia Universidad Javeriana";
const PUJ_SHORT = "PUJ Cali";
const UV = "Universidad del Valle";
const UV_SHORT = "Univalle";
const USB = "Universidad de San Buenaventura";
const USB_SHORT = "USB Cali";

export const courses: Course[] = [
  // === PUJ Cali ===
  {
    name: "Estadística para Ciencias Sociales",
    university: PUJ, universityShort: PUJ_SHORT,
    level: "undergraduate",
    semesters: ["2023-01", "2023-02", "2024-01", "2024-02", "2025-01", "2025-02", "2026-01", "2026-02"],
  },
  {
    name: "Psicología del Aprendizaje",
    university: PUJ, universityShort: PUJ_SHORT,
    level: "undergraduate",
    semesters: ["2023-02", "2024-01", "2024-02", "2025-01", "2025-02", "2026-01", "2026-02"],
  },
  {
    name: "Análisis Integrado de Datos",
    university: PUJ, universityShort: PUJ_SHORT,
    level: "undergraduate",
    semesters: ["2025-02", "2026-01", "2026-02"],
  },
  {
    name: "Tópicos en Psicología Cognitiva",
    university: PUJ, universityShort: PUJ_SHORT,
    level: "undergraduate",
    semesters: ["2023-02", "2024-01", "2024-02", "2025-01"],
  },
  {
    name: "Estadística Multivariada Aplicada",
    university: PUJ, universityShort: PUJ_SHORT,
    level: "graduate",
    semesters: ["2023-02"],
  },

  // === Universidad del Valle ===
  {
    name: "Psicología del Aprendizaje",
    university: UV, universityShort: UV_SHORT,
    level: "undergraduate",
    semesters: ["2024-02", "2025-02", "2026-02"],
  },
  {
    name: "Estadística",
    university: UV, universityShort: UV_SHORT,
    level: "undergraduate",
    semesters: ["2024-02", "2025-02", "2026-02"],
  },
  {
    name: "Metodología Cuantitativa",
    university: UV, universityShort: UV_SHORT,
    level: "undergraduate",
    semesters: ["2023-01", "2023-02", "2024-01", "2024-02", "2025-02"],
  },
  {
    name: "Pensamiento Lógico-Matemático",
    university: UV, universityShort: UV_SHORT,
    level: "undergraduate",
    semesters: ["2024-01", "2025-01", "2026-01"],
  },
  {
    name: "Desarrollo del Pensamiento Matemático",
    university: UV, universityShort: UV_SHORT,
    level: "undergraduate",
    semesters: ["2025-01", "2026-01"],
  },
  {
    name: "Psicología Educativa 3",
    university: UV, universityShort: UV_SHORT,
    level: "undergraduate",
    semesters: ["2025-02"],
  },
  {
    name: "Metodología Cuantitativa",
    university: UV, universityShort: UV_SHORT,
    level: "graduate",
    semesters: ["2024-02", "2025-02"],
  },

  // === USB Cali ===
  {
    name: "Lógica Investigativa",
    university: USB, universityShort: USB_SHORT,
    level: "undergraduate",
    semesters: ["2024-01"],
  },
  {
    name: "Estadística para Ciencias Sociales",
    university: USB, universityShort: USB_SHORT,
    level: "undergraduate",
    semesters: ["2024-01"],
  },
];

export const universityOrder = [PUJ, UV, USB];
export const universityLocations: Record<string, string> = {
  [PUJ]: "Cali, Colombia · 2022 – present",
  [UV]: "Cali, Colombia · 2020 – present",
  [USB]: "Cali, Colombia · 2024",
};
