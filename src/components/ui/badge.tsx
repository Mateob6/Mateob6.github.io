import type { HTMLAttributes } from "react";
import { cn } from "./cn";

type Tone = "neutral" | "accent" | "success";

const toneStyles: Record<Tone, string> = {
  neutral: "bg-surface-raised text-muted",
  accent: "bg-accent-subtle text-accent",
  success: "bg-[var(--green-rank)]/10 text-green-rank",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        toneStyles[tone],
        className,
      )}
      {...props}
    />
  );
}
