import { T } from "./t";

interface EducationEntryProps {
  degreeEn: string;
  degreeEs: string;
  institution: string;
  period: string;
}

export function EducationEntry({ degreeEn, degreeEs, institution, period }: EducationEntryProps) {
  return (
    <div className="relative pl-5 border-l-2 border-accent/30 py-3 first:pt-0 last:pb-0">
      <span className="absolute -left-[5px] top-[15px] first:top-[3px] w-2 h-2 rounded-full bg-accent/50" />
      <p className="font-serif text-[13px] font-bold text-foreground leading-snug">
        <T en={degreeEn} es={degreeEs} />
      </p>
      <p className="text-[11px] text-muted mt-0.5">{institution}</p>
      <p className="text-[11px] text-muted/60 mt-0.5">{period}</p>
    </div>
  );
}
