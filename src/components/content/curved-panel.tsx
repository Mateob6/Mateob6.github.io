// The curved panel: where a page turns from reading to exploring, the cream background gives way to a
// full-width surface panel whose top edge is the curve Mateo drew (2026-11-22, first on Materials).
// Rules (2026-11-22): at most one per page, only at that turn (a collection, a tool, the doors to the
// rest of the site), always the same two surfaces; reading pages stay flat. Mirrored on alternate pages.

/** The top edge: flat, a broad rise, then a drop at the right (at the left when mirrored, via CSS).
 *  The same path is repeated as a mask in globals.css (--panal-curva / --panal-curva-espejo). */
function PanelCurve() {
  const top = "M0 64 C 380 64 640 66 860 50 C 1060 34 1190 26 1290 34 C 1360 40 1410 66 1440 96";
  return (
    <svg aria-hidden="true" viewBox="0 0 1440 120" preserveAspectRatio="none" className="panel-curva block h-12 w-full sm:h-20">
      <path d={`${top} L1440 120 L0 120 Z`} className="fill-surface" />
      <path d={top} fill="none" className="stroke-accent/40" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function CurvedPanel({
  children,
  espejo = false,
  final = false,
  ancho = "max-w-5xl",
  labelledBy,
}: {
  children: React.ReactNode;
  /** drop at the left instead of the right */
  espejo?: boolean;
  /** last thing on the page: the panel runs down into the footer */
  final?: boolean;
  /** width of the content inside the panel */
  ancho?: string;
  labelledBy?: string;
}) {
  return (
    <section
      data-panel=""
      data-panel-final={final ? "" : undefined}
      aria-labelledby={labelledBy}
      className={`panel-curvo relative left-1/2 w-[100vw] -translate-x-1/2${espejo ? " panel-espejo" : ""}`}
    >
      <PanelCurve />
      {/* the honeycomb under the blue curve, and its pointer light (globals.css «Panal») */}
      <div aria-hidden="true" className="panal-panel" />
      <div aria-hidden="true" className="panal-panel-luz" data-panal-luz="" />
      <div className="panel-cuerpo bg-surface pb-20">
        <div className={`relative z-[1] mx-auto ${ancho} px-6 pt-4`}>{children}</div>
      </div>
    </section>
  );
}
