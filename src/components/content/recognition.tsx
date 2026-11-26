// Awards & Grants and Skills, the last two sections of the home (before Explore).
// Until 2026-11-26 they were their own page (/more, «Recognition»); the old URLs now redirect to these anchors.
// Anchors: #awards (and one per award: #<year>-<slug>), #skills, #statistical-analysis, #tools-and-methods.
import { slugify } from "@/lib/i18n";
import { T } from "@/components/content/t";
import { AwardCard } from "@/components/content/award-card";
import { ScrollReveal } from "@/components/content/scroll-reveal";
import { SectionHeader } from "@/components/content/section-header";
import { awards } from "@/data/awards";
import { skillGroups } from "@/data/skills";

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

const subheading = "font-serif text-xl font-bold text-foreground mb-6 pb-3 border-b border-accent/15";

export function AwardsSection() {
  return (
    <section id="awards" className="scroll-mt-20">
      <ScrollReveal>
        <SectionHeader en="Awards & Grants" es="Premios y Becas" />
      </ScrollReveal>
      <div className="space-y-3">
        {awards.map((award, i) => (
          <ScrollReveal key={`${award.titleEn}-${award.year}`} delay={i * 100}>
            <AwardCard
              id={`${award.year}-${slugify(award.titleEn)}`}
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
  );
}

export function SkillsSection() {
  const statsGroup = skillGroups.find((g) => g.subgroups);
  const complementary = skillGroups.filter((g) => !g.subgroups);

  return (
    <section id="skills" className="scroll-mt-20">
      <ScrollReveal>
        <SectionHeader en="Skills" es="Habilidades" />
      </ScrollReveal>
      <div className="space-y-12">
        {statsGroup && (
          <ScrollReveal>
            <section id={slugify(statsGroup.categoryEn)} className="scroll-mt-20">
              <h3 className={subheading}>
                <T en={statsGroup.categoryEn} es={statsGroup.categoryEs} />
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                {statsGroup.subgroups!.map((sub) => (
                  <div key={sub.labelEn}>
                    <h4 className="font-serif text-sm font-bold text-foreground mb-2">
                      <T en={sub.labelEn} es={sub.labelEs} />
                    </h4>
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
          <section id="tools-and-methods" className="scroll-mt-20">
            <h3 className={subheading}>
              <T en="Tools & Methods" es="Herramientas y Métodos" />
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {complementary.map((group) => (
                <div key={group.categoryEn}>
                  <h4 className="font-serif text-sm font-bold text-foreground mb-3">
                    <T en={group.categoryEn} es={group.categoryEs} />
                  </h4>
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
    </section>
  );
}
