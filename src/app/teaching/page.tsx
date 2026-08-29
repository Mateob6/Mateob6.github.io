import type { Metadata } from "next";
import { T } from "@/components/content/t";
import { CourseEntry } from "@/components/content/course-entry";
import { ScrollReveal } from "@/components/content/scroll-reveal";
import { teachingDomains } from "@/data/teaching";

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

      {teachingDomains.map((domain) => (
        <section key={domain.nameEn} className="space-y-4">
          <ScrollReveal>
            <h2 className="text-xs uppercase tracking-[0.15em] text-accent font-semibold pb-3 border-b border-accent/15">
              <T en={domain.nameEn} es={domain.nameEs} />
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="pl-4 border-l-2 border-accent/20">
              {domain.courses.map((course) => (
                <CourseEntry
                  key={course.name + course.instances[0].university}
                  name={course.name}
                  descriptionEn={course.descriptionEn}
                  descriptionEs={course.descriptionEs}
                  instances={course.instances}
                />
              ))}
            </div>
          </ScrollReveal>
        </section>
      ))}
    </div>
  );
}
