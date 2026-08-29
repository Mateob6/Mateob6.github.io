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
  const levelLabel = lang === "en"
    ? (instance.level === "graduate" ? "Graduate" : "")
    : (instance.level === "graduate" ? "Posgrado" : "");

  return (
    <span className={lang}>
      <span className="font-medium text-foreground/80">{instance.university}</span>
      <span className="text-muted/70"> · {formatPeriod(instance.semesters, lang)}</span>
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
    <div className="py-5 border-b border-border/40 last:border-b-0 flex flex-col md:flex-row md:gap-8">
      <div className="md:w-1/3 shrink-0 mb-1 md:mb-0">
        <p className="text-[13px] font-medium text-foreground leading-snug">{name}</p>
      </div>
      <div className="md:w-2/3">
        <p className="text-[12px] text-muted/70 italic leading-relaxed">
          <span className="en">{descriptionEn}</span>
          <span className="es">{descriptionEs}</span>
        </p>
        <div className="mt-1.5 space-y-1">
          {instances.map((inst, i) => (
            <div key={i} className="flex items-baseline gap-2 text-[12px] text-muted leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-muted/40 shrink-0 translate-y-[-1px]" />
              <p>
                <InstanceLine instance={inst} lang="en" />
                <InstanceLine instance={inst} lang="es" />
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
