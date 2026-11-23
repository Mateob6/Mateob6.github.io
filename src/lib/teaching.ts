import type { CourseInstance } from "@/data/teaching";
import { pick, type Lang } from "./i18n";

/** The current semester: a course taught in it is shown as running to the present */
export const ACTIVE_SEMESTER = "2026-02";

export function levelName(level: CourseInstance["level"], lang: Lang) {
  return level === "graduate" ? pick(lang, "Graduate", "Posgrado") : pick(lang, "Undergraduate", "Pregrado");
}

/** "2024–present" / "2024–presente", or a single year */
export function formatPeriod(semesters: string[], lang: Lang): string {
  const startYear = semesters[0].split("-")[0];
  const endYear = semesters[semesters.length - 1].split("-")[0];
  const isActive = semesters[semesters.length - 1] === ACTIVE_SEMESTER;
  if (startYear === endYear && !isActive) return startYear;
  return `${startYear}–${isActive ? pick(lang, "present", "presente") : endYear}`;
}
