import { T } from "./t";
import type { CourseInstance } from "@/data/teaching";

function formatPeriod(semesters: string[], lang: "en" | "es"): string {
  const first = semesters[0];
  const last = semesters[semesters.length - 1];
  const startYear = first.split("-")[0];
  const endYear = last.split("-")[0];
  const isActive = last === "2026-02";
  const present = lang === "en" ? "present" : "presente";
  if (startYear === endYear && !isActive) return startYear;
  return `${startYear} – ${isActive ? present : endYear}`;
}

function InstanceLine({ instance, lang }: { instance: CourseInstance; lang: "en" | "es" }) {
  const count = instance.semesters.length;
  const semLabel = lang === "en"
    ? (count === 1 ? "semester" : "semesters")
    : (count === 1 ? "semestre" : "semestres");
  const levelLabel = lang === "en"
    ? (instance.level === "graduate" ? "Graduate" : "")
    : (instance.level === "graduate" ? "Posgrado" : "");

  return (
    <span className={lang}>
      {instance.university} · {count} {semLabel} · {formatPeriod(instance.semesters, lang)}
      {levelLabel && <span className="text-accent/70"> · {levelLabel}</span>}
    </span>
  );
}

export function CourseEntry({ name, descriptionEn, descriptionEs, instances }: {
  name: string;
  descriptionEn: string;
  descriptionEs: string;
  instances: CourseInstance[];
}) {
  return (
    <div className="py-3.5 border-b border-border/40 last:border-b-0">
      <p className="text-[13px] font-medium text-foreground leading-snug">{name}</p>
      <p className="text-[12px] text-muted/70 mt-0.5 italic leading-relaxed">
        <span className="en">{descriptionEn}</span>
        <span className="es">{descriptionEs}</span>
      </p>
      <div className="mt-1 space-y-0.5">
        {instances.map((inst, i) => (
          <p key={i} className="text-[12px] text-muted">
            <InstanceLine instance={inst} lang="en" />
            <InstanceLine instance={inst} lang="es" />
          </p>
        ))}
      </div>
    </div>
  );
}
