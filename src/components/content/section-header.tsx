import { T } from "./t";

interface SectionHeaderProps {
  en: string;
  es: string;
  id?: string;
}

export function SectionHeader({ en, es, id }: SectionHeaderProps) {
  return (
    <h2 id={id} className="font-serif text-2xl font-bold text-foreground md:text-3xl mb-6">
      <T en={en} es={es} />
    </h2>
  );
}
