import { MaterialsView, materialsMetadata } from "@/views/materials";

export const metadata = materialsMetadata("en");

export default function Page() {
  return <MaterialsView lang="en" />;
}
