import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { T } from "@/components/content/t";
import { AwardCard } from "@/components/content/award-card";
import { ScrollReveal } from "@/components/content/scroll-reveal";
import { awards } from "@/data/awards";
import { skillGroups } from "@/data/skills";

export const metadata: Metadata = pageMetadata({
  title: "Awards & Skills",
  description:
    "Academic awards and research grants (Javeriana, Universidad del Valle) and technical profile: statistical analysis (psychometrics, SEM, IRT, Bayesian), computational tools (R, Python, Julia), and research methods.",
  path: "/more",
});

const iconMap: Record<string, "trophy" | "money" | "medal"> = {
  trophy: "trophy",
  grant: "money",
  medal: "medal",
};

function SkillItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-baseline gap-2 text-[13px] text-muted leading-relaxed">
      <span className="w-1.5 h-1.5 rounded-full bg-accent/50 shrink-0 translate-y-[-1px]" />
      {children}
    </li>
  );
}

export default function MorePage() {
  const statsGroup = skillGroups.find((g) => g.subgroups);
  const complementary = skillGroups.filter((g) => !g.subgroups);

  return (
    <div className="py-12 space-y-16">
      <ScrollReveal direction="left">
        <header className="subpage-hero pl-8">
          <p className="uppercase tracking-wider text-accent text-xs font-semibold mb-2">
            <T en="More" es="Más" />
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            <T en="Awards & Skills" es="Premios y Habilidades" />
          </h1>
        </header>
      </ScrollReveal>

      <section id="awards" className="scroll-mt-20">
        <ScrollReveal>
          <h2 className="font-serif text-xl font-bold text-foreground mb-6 pb-3 border-b border-accent/15">
            <T en="Awards & Grants" es="Premios y Becas" />
          </h2>
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
      </section>

      <div id="skills" className="scroll-mt-20 space-y-16">
        {statsGroup && (
          <ScrollReveal>
            <section>
              <h2 className="font-serif text-xl font-bold text-foreground mb-6 pb-3 border-b border-accent/15">
                <T en={statsGroup.categoryEn} es={statsGroup.categoryEs} />
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                {statsGroup.subgroups!.map((sub) => (
                  <div key={sub.labelEn}>
                    <h3 className="font-serif text-sm font-bold text-foreground mb-2">
                      <T en={sub.labelEn} es={sub.labelEs} />
                    </h3>
                    <ul className="space-y-1.5">
                      {sub.items.map((item) => (
                        <SkillItem key={item}>{item}</SkillItem>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}

        <ScrollReveal>
          <section>
            <h2 className="font-serif text-xl font-bold text-foreground mb-6 pb-3 border-b border-accent/15">
              <T en="Tools & Methods" es="Herramientas y Métodos" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {complementary.map((group) => (
                <div key={group.categoryEn}>
                  <h3 className="font-serif text-sm font-bold text-foreground mb-3">
                    <T en={group.categoryEn} es={group.categoryEs} />
                  </h3>
                  <ul className="space-y-1.5">
                    {group.items?.map((item) => (
                      <SkillItem key={item}>{item}</SkillItem>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}
