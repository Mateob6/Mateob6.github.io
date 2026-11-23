interface PresentationEntryProps {
  /** anchor: /publications#<id> */
  id?: string;
  title: string;
  venue: string;
  location: string;
  year: number;
}

export function PresentationEntry({ id, title, venue, location, year }: PresentationEntryProps) {
  return (
    <article id={id} className="scroll-mt-24 border-l-2 border-accent/20 py-2 pl-5 transition-colors hover:border-accent/60">
      <p className="text-sm font-medium leading-snug text-foreground">{title}</p>
      <p className="text-xs text-muted">{venue} · {location} · {year}</p>
    </article>
  );
}
