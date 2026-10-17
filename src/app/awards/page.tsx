import type { Metadata } from "next";
import Link from "next/link";
import { T } from "@/components/content/t";

export const metadata: Metadata = {
  robots: { index: false },
  alternates: { canonical: "/more" },
};

// Static export can't do server redirects: meta refresh (hoisted to <head>) sends old links to /more
export default function AwardsRedirect() {
  return (
    <div className="py-12">
      <meta httpEquiv="refresh" content="0; url=/more#awards" />
      <Link href="/more#awards" className="text-sm text-accent link-hover">
        <T en="Awards & Grants moved to More →" es="Premios y Becas se movieron a Más →" />
      </Link>
    </div>
  );
}
