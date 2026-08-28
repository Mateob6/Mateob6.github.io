import { Card, Badge } from "@/components/ui";
import { T } from "./t";

interface PublicationCardProps {
  type: "article" | "chapter";
  title: string;
  authors: string;
  venue: string;
  year: number;
  doi?: string;
}

function renderAuthors(authors: string) {
  const parts = authors.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function PublicationCard({ type, title, authors, venue, year, doi }: PublicationCardProps) {
  return (
    <Card className="card-lift badge-shimmer">
      <div className="flex items-start gap-3">
        <Badge tone="accent" className="mt-0.5 shrink-0 text-[10px] uppercase tracking-widest">
          <T
            en={type === "article" ? "Article" : "Chapter"}
            es={type === "article" ? "Artículo" : "Capítulo"}
          />
        </Badge>
        <div className="space-y-1.5">
          {doi ? (
            <a
              href={`https://doi.org/${doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block font-serif text-sm font-bold leading-snug text-foreground transition-colors hover:text-accent"
            >
              {title}
            </a>
          ) : (
            <p className="font-serif text-sm font-bold leading-snug text-foreground">{title}</p>
          )}
          <p className="text-xs text-muted">{renderAuthors(authors)}</p>
          <p className="text-xs italic text-muted/70">{year} · {venue}</p>
        </div>
      </div>
    </Card>
  );
}
