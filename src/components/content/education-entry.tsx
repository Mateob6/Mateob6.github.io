import { T } from "./t";

interface EducationEntryProps {
  degreeEn: string;
  degreeEs: string;
  institution: string;
  period: string;
}

export function EducationEntry({ degreeEn, degreeEs, institution, period }: EducationEntryProps) {
  return (
    <div className="border-l-2 border-accent/30 py-2 pl-5">
      <p className="font-serif text-sm font-bold text-foreground">
        <T en={degreeEn} es={degreeEs} />
      </p>
      <p className="text-xs text-muted">{institution} · {period}</p>
    </div>
  );
}
