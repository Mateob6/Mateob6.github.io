import type { Metadata } from "next";
import { T } from "@/components/content/t";
import { CourseBlock } from "@/components/content/course-block";
import { ScrollReveal } from "@/components/content/scroll-reveal";
import { universities } from "@/data/teaching";

export const metadata: Metadata = { title: "Teaching" };

export default function TeachingPage() {
  return (
    <div className="py-12 space-y-12">
      <ScrollReveal direction="left">
        <header className="subpage-hero pl-8">
          <p className="uppercase tracking-wider text-accent text-xs font-semibold mb-2">
            <T en="Teaching" es="Docencia" />
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            <T en="Teaching" es="Docencia" />
          </h1>
        </header>
      </ScrollReveal>

      <div className="space-y-6">
        {universities.map((u, i) => (
          <ScrollReveal key={u.name} delay={i * 120}>
            <CourseBlock
              name={u.name}
              location={u.location}
              undergraduate={u.undergraduate}
              graduate={u.graduate}
            />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
