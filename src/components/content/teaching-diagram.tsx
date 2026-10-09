"use client";

import { useEffect, useRef, useState } from "react";
import type { TeachingDomain } from "@/data/teaching";

const DOMAIN_META = [
  { id: "statistics", en: ["Statistics &", "Quantitative Methods"], es: ["Estadística y", "Métodos Cuantitativos"] },
  { id: "methodology", en: ["Research", "Methodology"], es: ["Metodología de", "la Investigación"] },
  { id: "cognitive", en: ["Cognitive Development", "& Learning"], es: ["Desarrollo Cognitivo", "y Aprendizaje"] },
];

const SHORT_UNI: Record<string, string> = {
  "Pontificia Universidad Javeriana, Cali": "PUJ Cali",
  "Universidad del Valle": "Univalle",
  "Universidad de San Buenaventura, Cali": "USB Cali",
};

function formatPeriod(semesters: string[]): { en: string; es: string } {
  const startYear = semesters[0].split("-")[0];
  const endYear = semesters[semesters.length - 1].split("-")[0];
  const isActive = semesters[semesters.length - 1] === "2026-02";
  if (startYear === endYear && !isActive) return { en: startYear, es: startYear };
  return {
    en: `${startYear}–${isActive ? "present" : endYear}`,
    es: `${startYear}–${isActive ? "presente" : endYear}`,
  };
}

export function TeachingExplorer({ domains }: { domains: TeachingDomain[] }) {
  const [selected, setSelected] = useState(0);
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

  const activeDomain = domains[selected];

  return (
    <div className="space-y-8">
      {/* === DIAGRAM === */}
      <div className="relative left-1/2 -translate-x-1/2 w-[100vw] max-w-6xl px-4">
        <svg
          ref={svgRef}
          viewBox="0 0 1200 275"
          className="teaching-diagram w-full"
          role="img"
        >
          <title>Teaching domains diagram</title>

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
              COURSES
            </text>
          </g>

          {/* Domain nodes */}
          {DOMAIN_META.map((meta, i) => {
            const x = positions[i];
            const isActive = selected === i;
            const count = domains[i].courses.length;
            return (
              <g
                key={meta.id}
                className="diagram-domain-node"
                style={{ animationDelay: `${600 + i * 150}ms`, cursor: "pointer" }}
                onClick={() => setSelected(i)}
              >
                <rect
                  x={x}
                  y={nodeY}
                  width={nodeW}
                  height={nodeH}
                  rx={16}
                  fill={isActive ? "var(--accent-subtle)" : "var(--surface)"}
                  stroke={isActive ? "var(--accent)" : "var(--border)"}
                  strokeWidth={isActive ? 2 : 1.5}
                  className="diagram-node-rect transition-all duration-300"
                />
                {meta.en.map((line, li) => (
                  <text
                    key={`en-${li}`}
                    x={x + nodeW / 2}
                    y={nodeY + 38 + li * 22}
                    textAnchor="middle"
                    fill={isActive ? "var(--accent)" : "var(--foreground)"}
                    fontSize={16}
                    fontWeight={isActive ? 700 : 500}
                    className="en transition-all duration-300"
                  >
                    {line}
                  </text>
                ))}
                {meta.es.map((line, li) => (
                  <text
                    key={`es-${li}`}
                    x={x + nodeW / 2}
                    y={nodeY + 38 + li * 22}
                    textAnchor="middle"
                    fill={isActive ? "var(--accent)" : "var(--foreground)"}
                    fontSize={16}
                    fontWeight={isActive ? 700 : 500}
                    className="es transition-all duration-300"
                  >
                    {line}
                  </text>
                ))}
                <text
                  x={x + nodeW / 2}
                  y={nodeY + nodeH - 16}
                  textAnchor="middle"
                  fill="var(--muted)"
                  fontSize={14}
                >
                  {count} {count === 1 ? "course" : "courses"}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* === REACTIVE TABLE === */}
      <div key={selected} className="animate-fade-in">
        <h2 className="text-xs uppercase tracking-[0.15em] text-accent font-semibold pb-3 mb-4 border-b border-accent/15">
          <span className="en">{activeDomain.nameEn}</span>
          <span className="es">{activeDomain.nameEs}</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-[10px] uppercase tracking-wider text-accent font-semibold py-2 pr-4">
                  <span className="en">Course</span><span className="es">Curso</span>
                </th>
                <th className="text-left text-[10px] uppercase tracking-wider text-accent font-semibold py-2 pr-4">
                  <span className="en">Level</span><span className="es">Nivel</span>
                </th>
                <th className="text-left text-[10px] uppercase tracking-wider text-accent font-semibold py-2 pr-4">
                  <span className="en">University</span><span className="es">Universidad</span>
                </th>
                <th className="text-left text-[10px] uppercase tracking-wider text-accent font-semibold py-2">
                  <span className="en">Period</span><span className="es">Período</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {activeDomain.courses.flatMap((course) =>
                course.instances.map((inst, ii) => {
                  const period = formatPeriod(inst.semesters);
                  return (
                    <tr key={`${course.name}-${ii}`} className="border-b border-border/40">
                      <td className="py-2.5 pr-4 text-foreground font-medium">
                        {ii === 0 ? course.name : ""}
                      </td>
                      <td className="py-2.5 pr-4">
                        <span className={`inline-block px-1.5 py-px text-[10px] font-medium rounded-sm ${
                          inst.level === "graduate"
                            ? "bg-accent/10 text-accent"
                            : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                        }`}>
                          <span className="en">{inst.level === "graduate" ? "Graduate" : "Undergraduate"}</span>
                          <span className="es">{inst.level === "graduate" ? "Posgrado" : "Pregrado"}</span>
                        </span>
                      </td>
                      <td className="py-2.5 pr-4 text-muted">{SHORT_UNI[inst.university] || inst.university}</td>
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
      </div>
    </div>
  );
}
