import type { Metadata } from "next";
import { T } from "@/components/content/t";
import { ScrollReveal } from "@/components/content/scroll-reveal";
import { TeachingExplorer } from "@/components/content/teaching-diagram";
import { CurvedPanel } from "@/components/content/curved-panel";
import { teachingDomains } from "@/data/teaching";
import { getMaterialsLinks } from "@/data/materials";
import { pick, type Lang } from "@/lib/i18n";
import { setLang } from "@/lib/lang-server";
import { breadcrumbs, jsonLd, teachingSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export function teachingMetadata(lang: Lang): Metadata {
  return pageMetadata({
    lang,
    title: pick(lang, "Teaching", "Docencia"),
    description: pick(
      lang,
      "University courses taught by Mateo Belalcazar in statistics, quantitative methods, research methodology, and cognitive development at three Colombian universities.",
      "Cursos universitarios de Mateo Belalcazar en estadística, métodos cuantitativos, metodología de la investigación y desarrollo cognitivo, en tres universidades colombianas."
    ),
    path: "/teaching",
  });
}

export async function TeachingView({ lang }: { lang: Lang }) {
  setLang(lang);
  const materials = await getMaterialsLinks();
  return (
    <div className="pt-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@graph": [teachingSchema(lang, materials), breadcrumbs(lang, [{ name: pick(lang, "Teaching", "Docencia"), path: "/teaching" }])],
        })}
      />
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

      {/* The explorer (diagram + table) on the curved panel, mirrored: drops at the left */}
      <CurvedPanel final espejo ancho="max-w-3xl" labelledBy="cursos-docencia">
        <h2 id="cursos-docencia" className="sr-only">
          <T en="Courses" es="Cursos" />
        </h2>
        <TeachingExplorer lang={lang} domains={teachingDomains} materials={materials} />
      </CurvedPanel>
    </div>
  );
}
