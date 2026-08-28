import { Card } from "@/components/ui";
import { T } from "./t";

interface CourseBlockProps {
  name: string;
  location: string;
  undergraduate: string[];
  graduate: string[];
}

export function CourseBlock({ name, location, undergraduate, graduate }: CourseBlockProps) {
  return (
    <Card className="card-lift">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="font-serif text-base font-bold text-foreground">{name}</p>
          <p className="text-xs text-muted">{location}</p>
        </div>
        <svg className="h-5 w-5 text-accent/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
        </svg>
      </div>
      {undergraduate.length > 0 && (
        <div className="mb-3">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">
            <T en="Undergraduate" es="Pregrado" />
          </p>
          <ul className="space-y-1 text-sm text-muted">
            {undergraduate.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </div>
      )}
      {graduate.length > 0 && (
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">
            <T en="Graduate" es="Posgrado" />
          </p>
          <ul className="space-y-1 text-sm text-muted">
            {graduate.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </div>
      )}
    </Card>
  );
}
