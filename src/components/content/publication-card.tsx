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
      return <strong key={i} className="text-foreground">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function PublicationCard({ title, authors, venue, year, doi }: PublicationCardProps) {
  return (
    <div className="py-3 border-b border-border/40 last:border-b-0">
      <p className="text-[13px] text-muted leading-relaxed">
        {renderAuthors(authors)}{" "}
        <span>({year}).</span>{" "}
        {doi ? (
          <a
            href={`https://doi.org/${doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="italic text-foreground hover:text-accent transition-colors"
          >
            {title}
          </a>
        ) : (
          <span className="italic text-foreground">{title}</span>
        )}
        .{" "}
        <span>{venue}</span>
        {doi && (
          <>
            .{" "}
            <a
              href={`https://doi.org/${doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent/70 hover:text-accent transition-colors break-all"
            >
              https://doi.org/{doi}
            </a>
          </>
        )}
      </p>
    </div>
  );
}
