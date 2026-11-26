import { MovedView, movedMetadata } from "@/views/moved";

export const metadata = movedMetadata("en");

export default function Page() {
  return <MovedView lang="en" anchor="skills" en="Skills are now on the home page →" es="Las habilidades están ahora en la página de inicio →" />;
}
