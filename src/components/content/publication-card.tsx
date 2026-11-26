interface PublicationCardProps {
  /** anchor: /publications#<id> */
  id?: string;
  type: "article" | "preprint" | "chapter";
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

export function PublicationCard({ id, type, title, authors, venue, year, doi }: PublicationCardProps) {
  return (
    <article id={id} className="scroll-mt-24 py-3 border-b border-border/40 last:border-b-0">
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
        {type === "preprint" && " [Preprint]"}
        .{" "}
        <span className="text-foreground">{venue}</span>
        {doi && (
          <>
            .{" "}
            <a
              href={`https://doi.org/${doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent transition-colors break-all"
            >
              https://doi.org/{doi}
            </a>
          </>
        )}
      </p>
    </article>
  );
}
