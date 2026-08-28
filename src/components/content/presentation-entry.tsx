interface PresentationEntryProps {
  title: string;
  venue: string;
  location: string;
  year: number;
}

export function PresentationEntry({ title, venue, location, year }: PresentationEntryProps) {
  return (
    <div className="border-l-2 border-accent/20 py-2 pl-5 transition-colors hover:border-accent/60">
      <p className="text-sm font-medium leading-snug text-foreground">{title}</p>
      <p className="text-xs text-muted">{venue} · {location} · {year}</p>
    </div>
  );
}
