import { T } from "./t";

interface EducationEntryProps {
  degreeEn: string;
  degreeEs: string;
  institution: string;
  period: string;
}

export function EducationEntry({ degreeEn, degreeEs, institution, period }: EducationEntryProps) {
  return (
    <div className="border-t-2 border-accent/30 pt-3">
      <p className="font-serif text-sm font-bold text-foreground leading-snug">
        <T en={degreeEn} es={degreeEs} />
      </p>
      <p className="text-[12px] text-muted mt-1">{institution}</p>
      <p className="text-[11px] text-muted/60 mt-0.5">{period}</p>
    </div>
  );
}
