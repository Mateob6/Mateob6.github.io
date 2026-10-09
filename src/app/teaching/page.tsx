import type { Metadata } from "next";
import { T } from "@/components/content/t";
import { ScrollReveal } from "@/components/content/scroll-reveal";
import { TeachingDiagram } from "@/components/content/teaching-diagram";
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

function formatPeriod(semesters: string[]): { en: string; es: string } {
  const first = semesters[0];
  const last = semesters[semesters.length - 1];
  const startYear = first.split("-")[0];
  const endYear = last.split("-")[0];
  const isActive = last === "2026-02";
  if (startYear === endYear && !isActive) return { en: startYear, es: startYear };
  return {
    en: `${startYear}–${isActive ? "present" : endYear}`,
    es: `${startYear}–${isActive ? "presente" : endYear}`,
  };
}

const DOMAIN_IDS = ["statistics", "methodology", "cognitive"];

const SHORT_UNIVERSITIES: Record<string, string> = {
  "Pontificia Universidad Javeriana, Cali": "PUJ Cali",
  "Universidad del Valle": "Univalle",
  "Universidad de San Buenaventura, Cali": "USB Cali",
};

export default function TeachingPage() {
  return (
    <div className="py-12 space-y-12">
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

      <TeachingDiagram />

      {teachingDomains.map((domain, di) => (
        <section key={domain.nameEn} id={DOMAIN_IDS[di]} className="scroll-mt-20">
          <ScrollReveal>
            <h2 className="text-xs uppercase tracking-[0.15em] text-accent font-semibold pb-3 mb-4 border-b border-accent/15">
              <T en={domain.nameEn} es={domain.nameEs} />
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-[10px] uppercase tracking-wider text-accent font-semibold py-2 pr-4">
                      <T en="Course" es="Curso" />
                    </th>
                    <th className="text-left text-[10px] uppercase tracking-wider text-accent font-semibold py-2 pr-4">
                      <T en="Level" es="Nivel" />
                    </th>
                    <th className="text-left text-[10px] uppercase tracking-wider text-accent font-semibold py-2 pr-4">
                      <T en="University" es="Universidad" />
                    </th>
                    <th className="text-left text-[10px] uppercase tracking-wider text-accent font-semibold py-2">
                      <T en="Period" es="Período" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {domain.courses.flatMap((course) =>
                    course.instances.map((inst, ii) => {
                      const period = formatPeriod(inst.semesters);
                      const shortUni = SHORT_UNIVERSITIES[inst.university] || inst.university;
                      return (
                        <tr key={`${course.name}-${ii}`} className="border-b border-border/40">
                          <td className="py-2.5 pr-4 text-foreground font-medium">
                            {ii === 0 ? course.name : ""}
                          </td>
                          <td className="py-2.5 pr-4">
                            <span
                              className={`inline-block px-1.5 py-px text-[10px] font-medium rounded-sm ${
                                inst.level === "graduate"
                                  ? "bg-accent/10 text-accent"
                                  : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                              }`}
                            >
                              <span className="en">{inst.level === "graduate" ? "Graduate" : "Undergraduate"}</span>
                              <span className="es">{inst.level === "graduate" ? "Posgrado" : "Pregrado"}</span>
                            </span>
                          </td>
                          <td className="py-2.5 pr-4 text-muted">{shortUni}</td>
                          <td className="py-2.5 text-muted">
                            <span className="en">{period.en}</span>
                            <span className="es">{period.es}</span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </section>
      ))}
    </div>
  );
}
