import { T } from "./t";

interface SectionHeaderProps {
  en: string;
  es: string;
}

export function SectionHeader({ en, es }: SectionHeaderProps) {
  return (
    <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl mb-6">
      <T en={en} es={es} />
    </h2>
  );
}
