import { MaterialsView, materialsMetadata } from "@/views/materials";

export const metadata = materialsMetadata("es");

export default function Page() {
  return <MaterialsView lang="es" />;
}
