import type { Metadata } from "next";
import { T } from "@/components/content/t";
import { ScrollReveal } from "@/components/content/scroll-reveal";
import { TeachingExplorer } from "@/components/content/teaching-diagram";
import { teachingDomains } from "@/data/teaching";

export const metadata: Metadata = {
  title: "Teaching",
  description:
    "University courses taught by Mateo Belalcazar in statistics, quantitative methods, research methodology, and cognitive development at three Colombian universities.",
  alternates: { canonical: "/teaching" },
  openGraph: {
    title: "Teaching — Mateo Belalcazar",
    description:
      "University courses taught by Mateo Belalcazar in statistics, quantitative methods, research methodology, and cognitive development at three Colombian universities.",
    url: "https://mateob6.github.io/teaching",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function TeachingPage() {
  return (
    <div className="py-12 space-y-10">
      <ScrollReveal direction="left">
        <header className="subpage-hero pl-8">
          <p className="uppercase tracking-wider text-accent text-xs font-semibold mb-2">
            <T en="Teaching" es="Docencia" />
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            <T en="Teaching" es="Docencia" />
          </h1>
        </header>
      </ScrollReveal>

      <ScrollReveal>
        <p className="text-sm text-muted leading-relaxed">
          <T
            en="My teaching spans three areas, across undergraduate and graduate programs at three Colombian universities."
            es="Mi docencia abarca tres áreas, en programas de pregrado y posgrado en tres universidades colombianas."
          />
        </p>
      </ScrollReveal>

      <TeachingExplorer domains={teachingDomains} />
    </div>
  );
}
