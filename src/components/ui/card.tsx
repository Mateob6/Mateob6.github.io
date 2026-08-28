import type { HTMLAttributes } from "react";
import { cn } from "./cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: boolean;
}

export function Card({ padding = true, className, ...props }: CardProps) {
  return (
    <div
      className={cn("rounded-xl border border-border bg-surface", padding && "p-6", className)}
      {...props}
    />
  );
}
