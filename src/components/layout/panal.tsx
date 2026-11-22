"use client";

import { useEffect } from "react";

// Honeycomb background (2026-11-22). The drawing lives in globals.css («Panal»); these are the layers.

/** The site-wide lattice: margins on desktop and a patch behind subpage heroes. Goes inside <body>. */
export function PanalFondo() {
  return (
    <>
      <div aria-hidden="true" className="panal-fondo" />
      <div aria-hidden="true" className="panal-fondo-luz" data-panal-luz="" />
    </>
  );
}

/** Lights the lattice around the pointer: sets --px/--py on every [data-panal-luz] layer, relative to it.
 *  Mouse only; nothing runs on touch screens or with reduced motion. */
export function PanalLuz() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let x = -9999;
    let y = -9999;
    const layers = () => document.querySelectorAll<HTMLElement>("[data-panal-luz]");
    const paint = () => {
      frame = 0;
      layers().forEach((el) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--px", `${x - r.left}px`);
        el.style.setProperty("--py", `${y - r.top}px`);
        el.dataset.activo = "";
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      schedule();
    };
    const leave = () => layers().forEach((el) => delete el.dataset.activo);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", schedule);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);
  return null;
}
