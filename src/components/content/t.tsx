import type { ReactNode } from "react";

export function T({ en, es }: { en: ReactNode; es: ReactNode }) {
  return (
    <>
      <span className="en">{en}</span>
      <span className="es">{es}</span>
    </>
  );
}
