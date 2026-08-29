import { T } from "./t";

interface EducationEntryProps {
  degreeEn: string;
  degreeEs: string;
  institution: string;
  period: string;
}

export function EducationEntry({ degreeEn, degreeEs, institution, period }: EducationEntryProps) {
  return (
    <div className="flex gap-6 py-4 border-b border-border/40 last:border-b-0">
      <div className="shrink-0 w-24 text-right">
        <p className="text-xs text-muted font-medium tabular-nums">{period}</p>
      </div>
      <div className="relative pl-5 border-l-2 border-accent/30">
        <span className="absolute -left-[5px] top-[5px] w-2 h-2 rounded-full bg-accent/50" />
        <p className="font-serif text-sm font-bold text-foreground leading-snug">
          <T en={degreeEn} es={degreeEs} />
        </p>
        <p className="text-xs text-muted mt-0.5">{institution}</p>
      </div>
    </div>
  );
}
