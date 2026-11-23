import { CourseView, courseMetadata, courseStaticParams } from "@/views/course";

type Props = { params: Promise<{ curso: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return courseStaticParams();
}

export async function generateMetadata({ params }: Props) {
  return courseMetadata("es", (await params).curso);
}

export default async function Page({ params }: Props) {
  return <CourseView lang="es" curso={(await params).curso} />;
}
