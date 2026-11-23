import { TeachingView, teachingMetadata } from "@/views/teaching";

export const metadata = teachingMetadata("en");

export default function Page() {
  return <TeachingView lang="en" />;
}
