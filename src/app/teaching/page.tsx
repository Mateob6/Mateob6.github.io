import type { Metadata } from "next";
import { T } from "@/components/content/t";
import { CourseEntry } from "@/components/content/course-entry";
import { ScrollReveal } from "@/components/content/scroll-reveal";
import { courses, universityOrder, universityLocations } from "@/data/teaching";

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

      {universityOrder.map((uni) => {
        const uniCourses = courses
          .filter((c) => c.university === uni)
          .sort((a, b) => {
            const aActive = a.semesters.includes("2026-02") ? 1 : 0;
            const bActive = b.semesters.includes("2026-02") ? 1 : 0;
            if (bActive !== aActive) return bActive - aActive;
            return b.semesters.length - a.semesters.length;
          });

        if (uniCourses.length === 0) return null;

        return (
          <section key={uni} className="space-y-4">
            <ScrollReveal>
              <div>
                <h2 className="text-xs uppercase tracking-[0.15em] text-accent font-semibold">
                  {uni}
                </h2>
                <p className="text-[11px] text-muted mt-0.5">{universityLocations[uni]}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="pl-4 border-l-2 border-accent/20">
                {uniCourses.map((course) => (
                  <CourseEntry key={`${course.name}-${course.level}-${course.university}`} course={course} />
                ))}
              </div>
            </ScrollReveal>
          </section>
        );
      })}
    </div>
  );
}
