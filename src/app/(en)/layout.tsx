import { SiteShell } from "@/components/layout/site-shell";
import { rootMetadata } from "@/lib/seo";

// Root layout of the English pages (/, /publications, …)
export const metadata = rootMetadata("en");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="en">{children}</SiteShell>;
}
