import type { Metadata } from "next";
import { T } from "@/components/content/t";
import { ScrollReveal } from "@/components/content/scroll-reveal";
import { skillGroups } from "@/data/skills";

export const metadata: Metadata = { title: "Skills" };

export default function SkillsPage() {
  return (
    <div className="py-12 space-y-12">
      <ScrollReveal direction="left">
        <header className="subpage-hero pl-8">
          <p className="uppercase tracking-wider text-accent text-xs font-semibold mb-2">
            <T en="Technical Profile" es="Perfil Técnico" />
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            <T en="Skills" es="Habilidades" />
          </h1>
        </header>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillGroups.map((group, gi) => (
          <ScrollReveal
            key={group.categoryEn}
            delay={gi * 80}
            className={group.subgroups ? "md:col-span-2" : ""}
          >
            <div className="rounded-xl border border-border bg-surface p-5">
              <h3 className="text-xs font-semibold text-accent uppercase tracking-wider mb-4">
                <T en={group.categoryEn} es={group.categoryEs} />
              </h3>

              {group.subgroups ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {group.subgroups.map((sub) => (
                    <div key={sub.labelEn}>
                      <p className="text-[10px] text-muted font-medium uppercase tracking-wider mb-2">
                        <T en={sub.labelEn} es={sub.labelEs} />
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {sub.items.map((item) => (
                          <span
                            key={item}
                            className="inline-block rounded-md bg-surface-raised px-2 py-1 text-[11px] font-medium text-foreground border border-border/50"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {group.items?.map((item) => (
                    <span
                      key={item}
                      className="inline-block rounded-md bg-surface-raised px-2 py-1 text-[11px] font-medium text-foreground border border-border/50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
