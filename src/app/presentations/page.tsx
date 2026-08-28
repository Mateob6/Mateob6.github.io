import type { Metadata } from "next";
import { T } from "@/components/content/t";
import { PresentationEntry } from "@/components/content/presentation-entry";
import { ScrollReveal } from "@/components/content/scroll-reveal";
import { presentations } from "@/data/presentations";

export const metadata: Metadata = { title: "Presentations" };

export default function PresentationsPage() {
  return (
    <div className="py-12 space-y-12">
      <ScrollReveal direction="left">
        <header className="subpage-hero pl-8">
          <p className="uppercase tracking-wider text-accent text-xs font-semibold mb-2">
            <T en="Selected Presentations" es="Presentaciones Seleccionadas" />
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            <T en="Presentations" es="Presentaciones" />
          </h1>
        </header>
      </ScrollReveal>

      <div className="space-y-4">
        {presentations.map((p, i) => (
          <ScrollReveal key={p.title} delay={i * 100}>
            <PresentationEntry
              title={p.title}
              venue={p.venue}
              location={p.location}
              year={p.year}
            />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
