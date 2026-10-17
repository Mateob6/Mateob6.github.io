import type { Metadata } from "next";
import Link from "next/link";
import { T } from "@/components/content/t";

export const metadata: Metadata = {
  robots: { index: false },
  alternates: { canonical: "/more" },
};

// Static export can't do server redirects: meta refresh (hoisted to <head>) sends old links to /more
export default function SkillsRedirect() {
  return (
    <div className="py-12">
      <meta httpEquiv="refresh" content="0; url=/more#skills" />
      <Link href="/more#skills" className="text-sm text-accent link-hover">
        <T en="Skills moved to More →" es="Habilidades se movió a Más →" />
      </Link>
    </div>
  );
}
