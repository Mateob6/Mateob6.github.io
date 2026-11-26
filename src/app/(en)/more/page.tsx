import { MovedView, movedMetadata } from "@/views/moved";

export const metadata = movedMetadata("en");

export default function Page() {
  return <MovedView lang="en" anchor="awards" en="Awards and skills are now on the home page →" es="Premios y habilidades están ahora en la página de inicio →" />;
}
