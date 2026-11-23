import { TeachingView, teachingMetadata } from "@/views/teaching";

export const metadata = teachingMetadata("es");

export default function Page() {
  return <TeachingView lang="es" />;
}
