import { RecognitionView, recognitionMetadata } from "@/views/recognition";

export const metadata = recognitionMetadata("en");

export default function Page() {
  return <RecognitionView lang="en" />;
}
