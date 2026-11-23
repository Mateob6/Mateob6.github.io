import { SiteShell } from "@/components/layout/site-shell";
import { rootMetadata } from "@/lib/seo";

// Root layout of the Spanish pages (/es, /es/publications, …)
export const metadata = rootMetadata("es");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="es">{children}</SiteShell>;
}
