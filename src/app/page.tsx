import { T } from "@/components/content/t";
import { SectionHeader } from "@/components/content/section-header";
import { ProfileLinks } from "@/components/content/profile-links";
import { EducationEntry } from "@/components/content/education-entry";
import { ScrollReveal } from "@/components/content/scroll-reveal";
import { bio, researchLines } from "@/data/profile";
import { education } from "@/data/education";
import type { ResearchLine } from "@/lib/types";

export default function HomePage() {
  return (
    <div className="space-y-20 py-12 relative">
      {/* Decorative */}
      <div className="deco-dot" style={{ top: "6%", right: "6%" }} />
      <div className="deco-dot" style={{ top: "40%", left: "2%", animationDelay: "2s" }} />
      <div className="deco-ring" style={{ top: "12%", left: "-3%", width: 80, height: 80 }} />
      <div className="deco-ring" style={{ top: "60%", right: "-4%", width: 60, height: 60, animationDelay: "2s" }} />

      {/* ===== HERO ===== */}
      <section className="text-center mt-6 md:mt-10">
        <div className="hero-photo w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden mx-auto mb-5 border-2 border-border shadow-lg relative">
          <img src="/photo.jpg" alt="Mateo Belalcazar" width={144} height={144} className="w-full h-full object-cover" />
          <div className="absolute inset-0 rounded-full ring-2 ring-accent/10 ring-offset-4 ring-offset-background" />
        </div>
        <p className="hero-subtitle uppercase tracking-[0.25em] text-[10px] text-accent font-medium mb-2">
          <T
            en="Researcher in Psychology, Statistics & Computational Methods"
            es="Investigador en Psicología, Estadística y Métodos Computacionales"
          />
        </p>
        <h1 className="hero-name font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
          Mateo Belalcazar
        </h1>
        <div className="hero-line w-16 h-0.5 bg-accent/30 mx-auto mb-6" />
        <div className="hero-links">
          <ProfileLinks />
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== ABOUT + EDUCATION (side by side) ===== */}
      <ScrollReveal>
        <div className="flex flex-col md:flex-row md:gap-12">
          <section id="about" className="md:w-4/5">
            <SectionHeader en="About" es="Acerca de" />
            <div className="space-y-4">
              <p className="en text-muted leading-relaxed text-[14px]">{bio.en[0]}</p>
              <p className="es text-muted leading-relaxed text-[14px]">{bio.es[0]}</p>
              <p className="en text-muted leading-relaxed text-[14px]">{bio.en[1]}</p>
              <p className="es text-muted leading-relaxed text-[14px]">{bio.es[1]}</p>
            </div>
          </section>
          <section id="education" className="md:w-1/5 mt-12 md:mt-0">
            <SectionHeader en="Education" es="Educación" />
            <div>
              {education.map((entry) => (
                <EducationEntry
                  key={entry.degreeEn}
                  degreeEn={entry.degreeEn}
                  degreeEs={entry.degreeEs}
                  institution={entry.detail ? `${entry.institution} — ${entry.detail}` : entry.institution}
                  period={entry.period}
                />
              ))}
            </div>
          </section>
        </div>
      </ScrollReveal>

      <div className="section-divider" />

      {/* ===== RESEARCH LINES ===== */}
      <ScrollReveal>
        <section id="research">
          <SectionHeader en="Research Lines" es="Líneas de Investigación" />
          <div className="space-y-5">
            {researchLines.map((line, i) => (
              <ScrollReveal key={line.titleEn} delay={i * 150}>
                <ResearchLineCard line={line} index={i} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>

    </div>
  );
}

function ResearchLineCard({ line, index }: { line: ResearchLine; index: number }) {
  const accent = index === 0
    ? { dot: "bg-accent", top: "bg-accent/20 group-hover:bg-accent/50" }
    : { dot: "bg-emerald-600 dark:bg-emerald-400", top: "bg-emerald-500/20 group-hover:bg-emerald-500/50" };

  return (
    <div className="group rounded-2xl border border-border bg-surface p-6 card-lift relative overflow-hidden">
      <div className={`absolute top-0 left-0 right-0 h-[3px] ${accent.top} transition-colors`} />
      <div className="flex items-start gap-3">
        <div className={`mt-1.5 h-2.5 w-2.5 rounded-full ${accent.dot} shrink-0`} />
        <div>
          <h3 className="font-serif text-base font-bold text-foreground leading-snug">
            <T en={line.titleEn} es={line.titleEs} />
          </h3>
          <p className="text-[13px] text-muted mt-2 leading-relaxed">
            <T en={line.descriptionEn} es={line.descriptionEs} />
          </p>
        </div>
      </div>
    </div>
  );
}
