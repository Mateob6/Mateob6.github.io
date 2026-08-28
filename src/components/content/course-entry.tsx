import { T } from "./t";
import type { Course } from "@/lib/types";

function formatPeriod(semesters: string[]): string {
  const first = semesters[0];
  const last = semesters[semesters.length - 1];
  const startYear = first.split("-")[0];
  const endYear = last.split("-")[0];
  const isActive = last === "2026-02";
  if (startYear === endYear && !isActive) return startYear;
  return `${startYear} – ${isActive ? "present" : endYear}`;
}

function formatPeriodEs(semesters: string[]): string {
  const first = semesters[0];
  const last = semesters[semesters.length - 1];
  const startYear = first.split("-")[0];
  const endYear = last.split("-")[0];
  const isActive = last === "2026-02";
  if (startYear === endYear && !isActive) return startYear;
  return `${startYear} – ${isActive ? "presente" : endYear}`;
}

export function CourseEntry({ course }: { course: Course }) {
  const count = course.semesters.length;

  return (
    <div className="py-3 border-b border-border/40 last:border-b-0">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[13px] font-medium text-foreground leading-snug">
          {course.name}
        </p>
        <span className="text-[11px] text-muted shrink-0">
          <T
            en={course.level === "graduate" ? "Graduate" : "Undergraduate"}
            es={course.level === "graduate" ? "Posgrado" : "Pregrado"}
          />
        </span>
      </div>
      <p className="text-[12px] text-muted mt-0.5">
        <span className="en">
          {count} {count === 1 ? "semester" : "semesters"} · {formatPeriod(course.semesters)}
        </span>
        <span className="es">
          {count} {count === 1 ? "semestre" : "semestres"} · {formatPeriodEs(course.semesters)}
        </span>
      </p>
    </div>
  );
}
