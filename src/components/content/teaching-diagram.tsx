"use client";

import { useEffect, useRef } from "react";

const DOMAINS = [
  {
    id: "statistics",
    en: "Statistics &\nQuantitative Methods",
    es: "Estadística y\nMétodos Cuantitativos",
    count: 4,
  },
  {
    id: "methodology",
    en: "Research\nMethodology",
    es: "Metodología de\nla Investigación",
    count: 2,
  },
  {
    id: "cognitive",
    en: "Cognitive Development\n& Learning",
    es: "Desarrollo Cognitivo\ny Aprendizaje",
    count: 5,
  },
];

export function TeachingDiagram() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("diagram-revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cx = 400;
  const rootY = 30;
  const branchY = 100;
  const nodeY = 120;
  const nodeW = 200;
  const nodeH = 75;
  const gap = 30;
  const totalW = nodeW * 3 + gap * 2;
  const startX = cx - totalW / 2;
  const positions = [
    startX,
    startX + nodeW + gap,
    startX + (nodeW + gap) * 2,
  ];

  return (
    <div className="flex justify-center my-8">
      <svg
        ref={ref}
        viewBox="0 0 800 230"
        className="teaching-diagram w-full max-w-2xl"
        role="img"
      >
        <title>Teaching domains diagram</title>

        {/* Lines from root to domains */}
        {positions.map((x, i) => {
          const targetX = x + nodeW / 2;
          const d = `M${cx},${rootY + 28} L${cx},${branchY} L${targetX},${branchY} L${targetX},${nodeY}`;
          const length = Math.abs(cx - targetX) + (branchY - rootY - 28) + (nodeY - branchY);
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
          <rect
            x={cx - 55}
            y={rootY}
            width={110}
            height={28}
            rx={14}
            fill="var(--accent)"
          />
          <text
            x={cx}
            y={rootY + 18}
            textAnchor="middle"
            fill="var(--accent-foreground)"
            fontSize={12}
            fontWeight={600}
            letterSpacing="0.05em"
          >
            COURSES
          </text>
        </g>

        {/* Domain nodes */}
        {DOMAINS.map((domain, i) => {
          const x = positions[i];
          return (
            <a
              key={domain.id}
              href={`#${domain.id}`}
              className="diagram-domain-node"
              style={{ animationDelay: `${600 + i * 150}ms` }}
            >
              <rect
                x={x}
                y={nodeY}
                width={nodeW}
                height={nodeH}
                rx={10}
                fill="var(--surface)"
                stroke="var(--border)"
                strokeWidth={1.5}
                className="diagram-node-rect"
              />
              {/* Domain name - EN */}
              {domain.en.split("\n").map((line, li) => (
                <text
                  key={`en-${li}`}
                  x={x + nodeW / 2}
                  y={nodeY + 24 + li * 14}
                  textAnchor="middle"
                  fill="var(--foreground)"
                  fontSize={11}
                  fontWeight={500}
                  className="en"
                >
                  {line}
                </text>
              ))}
              {/* Domain name - ES */}
              {domain.es.split("\n").map((line, li) => (
                <text
                  key={`es-${li}`}
                  x={x + nodeW / 2}
                  y={nodeY + 24 + li * 14}
                  textAnchor="middle"
                  fill="var(--foreground)"
                  fontSize={11}
                  fontWeight={500}
                  className="es"
                >
                  {line}
                </text>
              ))}
              {/* Course count */}
              <text
                x={x + nodeW / 2}
                y={nodeY + nodeH - 10}
                textAnchor="middle"
                fill="var(--muted)"
                fontSize={10}
              >
                {domain.count} {domain.count === 1 ? "course" : "courses"}
              </text>
            </a>
          );
        })}
      </svg>
    </div>
  );
}
