import type { Metadata } from "next";
import { T } from "@/components/content/t";
import { AwardCard } from "@/components/content/award-card";
import { ScrollReveal } from "@/components/content/scroll-reveal";
import { awards } from "@/data/awards";

export const metadata: Metadata = {
  title: "Awards & Grants",
  description:
    "Academic awards and research grants: Teaching Excellence Award (Javeriana), research grants (Universidad del Valle), and meritorious thesis recognition.",
  alternates: { canonical: "/awards" },
  openGraph: {
    title: "Awards & Grants — Mateo Belalcazar",
    description:
      "Academic awards and research grants: Teaching Excellence Award (Javeriana), research grants (Universidad del Valle), and meritorious thesis recognition.",
    url: "https://mateob6.github.io/awards",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

const iconMap: Record<string, "trophy" | "money" | "medal"> = {
  trophy: "trophy",
  grant: "money",
  medal: "medal",
};

export default function AwardsPage() {
  return (
    <div className="py-12 space-y-12">
      <ScrollReveal direction="left">
        <header className="subpage-hero pl-8">
          <p className="uppercase tracking-wider text-accent text-xs font-semibold mb-2">
            <T en="Awards & Grants" es="Premios y Becas" />
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            <T en="Awards & Grants" es="Premios y Becas" />
          </h1>
        </header>
      </ScrollReveal>

      <div className="space-y-3">
        {awards.map((award, i) => (
          <ScrollReveal key={`${award.titleEn}-${award.year}`} delay={i * 100}>
            <AwardCard
              titleEn={award.titleEn}
              titleEs={award.titleEs}
              institution={award.institution}
              year={award.year}
              icon={iconMap[award.icon] || "trophy"}
            />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
