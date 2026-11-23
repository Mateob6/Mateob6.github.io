"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { TeachingDomain } from "@/data/teaching";
import { localePath, pick, type Lang } from "@/lib/i18n";
import { formatPeriod, levelName } from "@/lib/teaching";

const DOMAIN_META = [
  { en: ["Statistics &", "Quantitative Methods"], es: ["Estadística y", "Métodos Cuantitativos"] },
  { en: ["Research", "Methodology"], es: ["Metodología de", "la Investigación"] },
  { en: ["Cognitive Development", "& Learning"], es: ["Desarrollo Cognitivo", "y Aprendizaje"] },
];

const SHORT_UNI: Record<string, string> = {
  "Pontificia Universidad Javeriana, Cali": "PUJ Cali",
  "Universidad del Valle": "Univalle",
  "Universidad de San Buenaventura, Cali": "USB Cali",
};

// Each domain has its own URL: /teaching#statistics, #methodology, #cognitive-development.
// The diagram nodes are real links to those anchors; a click swaps the table and updates the address bar,
// and opening (or sharing) the URL shows that domain. All three tables are in the HTML, the inactive ones
// hidden with a CSS class (not the `hidden` attribute), so crawlers and text extractors read every course.
export function TeachingExplorer({
  lang,
  domains,
  materials = {},
}: {
  lang: Lang;
  domains: TeachingDomain[];
  /** course name → /materials/<slug>, for courses that already have published slides */
  materials?: Record<string, string>;
}) {
  const [selected, setSelected] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("diagram-revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // The URL decides the domain: on load and when the hash changes (back button, typed URL, in-page links)
  useEffect(() => {
    const sync = () => {
      const i = domains.findIndex((d) => `#${d.slug}` === window.location.hash);
      if (i < 0) return;
      setSelected(i);
      requestAnimationFrame(() => rootRef.current?.scrollIntoView({ block: "start" }));
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [domains]);

  function choose(e: MouseEvent, i: number) {
    e.preventDefault();
    setSelected(i);
    window.history.replaceState(window.history.state, "", `#${domains[i].slug}`);
  }

  const cx = 600;
  const rootY = 10;
  const rootH = 48;
  const branchY = 120;
  const nodeY = 140;
  const nodeW = 300;
  const nodeH = 120;
  const gap = 50;
  const totalW = nodeW * 3 + gap * 2;
  const startX = cx - totalW / 2;
  const positions = [startX, startX + nodeW + gap, startX + (nodeW + gap) * 2];

  return (
    <div ref={rootRef} className="scroll-mt-20 space-y-8">
      {/* === DIAGRAM === */}
      <div className="relative left-1/2 -translate-x-1/2 w-[100vw] max-w-6xl px-4">
        <svg
          ref={svgRef}
          viewBox="0 0 1200 275"
          className="teaching-diagram w-full"
          role="group"
          aria-label={pick(lang, "Teaching domains", "Áreas de docencia")}
        >
          <title>{pick(lang, "Teaching domains diagram", "Diagrama de las áreas de docencia")}</title>

          {/* Lines */}
          {positions.map((x, i) => {
            const targetX = x + nodeW / 2;
            const d = `M${cx},${rootY + rootH} L${cx},${branchY} L${targetX},${branchY} L${targetX},${nodeY}`;
            const length = Math.abs(cx - targetX) + (branchY - rootY - rootH) + (nodeY - branchY);
            return (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="var(--accent)"
                strokeWidth={1.5}
                strokeDasharray={length}
                strokeDashoffset={length}
                className="diagram-line"
                style={{ animationDelay: `${300 + i * 150}ms` }}
              />
            );
          })}

          {/* Root node */}
          <g className="diagram-root-node">
            <rect x={cx - 85} y={rootY} width={170} height={rootH} rx={24} fill="var(--accent)" />
            <text x={cx} y={rootY + 31} textAnchor="middle" fill="var(--accent-foreground)" fontSize={17} fontWeight={700} letterSpacing="0.08em">
              {pick(lang, "COURSES", "CURSOS")}
            </text>
          </g>

          {/* Domain nodes: links to each domain's anchor */}
          {DOMAIN_META.map((meta, i) => {
            const x = positions[i];
            const isActive = selected === i;
            const count = domains[i].courses.length;
            return (
              <a
                key={i}
                href={`#${domains[i].slug}`}
                onClick={(e) => choose(e, i)}
                aria-current={isActive ? "true" : undefined}
                aria-label={`${pick(lang, domains[i].nameEn, domains[i].nameEs)} (${count})`}
              >
                <g className="diagram-domain-node" style={{ animationDelay: `${600 + i * 150}ms` }}>
                  <rect
                    x={x}
                    y={nodeY}
                    width={nodeW}
                    height={nodeH}
                    rx={16}
                    fill={isActive ? "var(--accent-subtle)" : "var(--background)"}
                    stroke={isActive ? "var(--accent)" : "var(--border)"}
                    strokeWidth={isActive ? 2 : 1.5}
                    className="diagram-node-rect transition-all duration-300"
                  />
                  {pick(lang, meta.en, meta.es).map((line, li) => (
                    <text
                      key={li}
                      x={x + nodeW / 2}
                      y={nodeY + 38 + li * 22}
                      textAnchor="middle"
                      fill={isActive ? "var(--accent)" : "var(--foreground)"}
                      fontSize={16}
                      fontWeight={isActive ? 700 : 500}
                      className="transition-all duration-300"
                    >
                      {line}
                    </text>
                  ))}
                  <text x={x + nodeW / 2} y={nodeY + nodeH - 16} textAnchor="middle" fill="var(--muted)" fontSize={14}>
                    {count} {count === 1 ? pick(lang, "course", "curso") : pick(lang, "courses", "cursos")}
                  </text>
                </g>
              </a>
            );
          })}
        </svg>
      </div>

      {/* === TABLES: one per domain, only the selected one shown === */}
      {domains.map((domain, di) => (
        <section
          key={domain.slug}
          id={domain.slug}
          aria-labelledby={`${domain.slug}-title`}
          className={selected === di ? "scroll-mt-20 animate-fade-in" : "hidden"}
        >
          <h3
            id={`${domain.slug}-title`}
            className="text-xs uppercase tracking-[0.15em] text-accent font-semibold pb-3 mb-4 border-b border-accent/15"
          >
            {pick(lang, domain.nameEn, domain.nameEs)}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-[10px] uppercase tracking-wider text-accent font-semibold py-2 pr-4">
                    {pick(lang, "Course", "Curso")}
                  </th>
                  <th className="text-left text-[10px] uppercase tracking-wider text-accent font-semibold py-2 pr-4">
                    {pick(lang, "Level", "Nivel")}
                  </th>
                  <th className="text-left text-[10px] uppercase tracking-wider text-accent font-semibold py-2 pr-4">
                    {pick(lang, "University", "Universidad")}
                  </th>
                  <th className="text-left text-[10px] uppercase tracking-wider text-accent font-semibold py-2">
                    {pick(lang, "Period", "Período")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {domain.courses.flatMap((course) =>
                  course.instances.map((inst, ii) => (
                    <tr key={`${course.name}-${ii}`} className="border-b border-border/40">
                      <td className="py-2.5 pr-4 text-foreground font-medium">
                        {ii === 0 ? course.name : ""}
                        {ii === 0 && materials[course.name] && (
                          <a
                            href={localePath(lang, materials[course.name])}
                            className="ml-2 whitespace-nowrap text-[11px] font-normal text-accent hover:underline"
                          >
                            {pick(lang, "Materials →", "Materiales →")}
                          </a>
                        )}
                      </td>
                      <td className="py-2.5 pr-4">
                        <span className={`inline-block px-1.5 py-px text-[10px] font-medium rounded-sm ${
                          inst.level === "graduate"
                            ? "bg-accent/10 text-accent"
                            : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                        }`}>
                          {levelName(inst.level, lang)}
                        </span>
                      </td>
                      <td className="py-2.5 pr-4 text-muted">
                        <abbr title={inst.university} className="no-underline">
                          {SHORT_UNI[inst.university] || inst.university}
                        </abbr>
                      </td>
                      <td className="py-2.5 text-muted">{formatPeriod(inst.semesters, lang)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
