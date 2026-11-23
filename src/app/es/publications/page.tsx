import { PublicationsView, publicationsMetadata } from "@/views/publications";

export const metadata = publicationsMetadata("es");

export default function Page() {
  return <PublicationsView lang="es" />;
}
