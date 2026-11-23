import { PublicationsView, publicationsMetadata } from "@/views/publications";

export const metadata = publicationsMetadata("en");

export default function Page() {
  return <PublicationsView lang="en" />;
}
