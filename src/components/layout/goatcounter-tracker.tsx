"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    goatcounter?: { count: (vars: { path: string }) => void };
  }
}

// count.js only counts the initial page load; client-side <Link> navigations need a manual count
export function GoatCounterTracker() {
  const pathname = usePathname();
  const prev = useRef(pathname);

  useEffect(() => {
    // Initial load is already counted by count.js (ref comparison also absorbs Strict Mode's double effect)
    if (prev.current === pathname) return;
    prev.current = pathname;
    window.goatcounter?.count({ path: pathname });
  }, [pathname]);

  return null;
}
