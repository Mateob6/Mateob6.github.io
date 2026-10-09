import type { Metadata } from "next";
import { T } from "@/components/content/t";
import { GroupCard } from "@/components/content/group-card";
import { ScrollReveal } from "@/components/content/scroll-reveal";
import { groups } from "@/data/groups";

export const metadata: Metadata = {
  title: "Research Groups",
  description:
    "Member of two Minciencias-ranked research groups: Organizational Psychology (A1) and Scientific Cognition and Learning (A) at Universidad del Valle.",
  alternates: { canonical: "/groups" },
  openGraph: {
    title: "Research Groups — Mateo Belalcazar",
    description:
      "Member of two Minciencias-ranked research groups: Organizational Psychology (A1) and Scientific Cognition and Learning (A) at Universidad del Valle.",
    url: "https://mateob6.github.io/groups",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function GroupsPage() {
  return (
    <div className="py-12 space-y-12">
      <ScrollReveal direction="left">
        <header className="subpage-hero pl-8">
          <p className="uppercase tracking-wider text-accent text-xs font-semibold mb-2">
            <T en="Research Groups" es="Grupos de Investigación" />
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            <T en="Research Groups" es="Grupos de Investigación" />
          </h1>
        </header>
      </ScrollReveal>

      <div className="space-y-4">
        {groups.map((group, i) => (
          <ScrollReveal key={group.name} delay={i * 120}>
            <GroupCard
              name={group.name}
              institution={group.institution}
              periodEn={group.period}
              periodEs={group.period.replace("present", "presente")}
              rank={group.rank}
            />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
