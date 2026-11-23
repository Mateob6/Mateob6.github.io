import { RecognitionView, recognitionMetadata } from "@/views/recognition";

export const metadata = recognitionMetadata("es");

export default function Page() {
  return <RecognitionView lang="es" />;
}
