// JSON-LD (schema.org) for search engines and AI agents. Every node about Mateo points to one Person (@id /#person),
// so the profile, the publications, the courses and the awards read as one entity.
import { awards } from "@/data/awards";
import { education } from "@/data/education";
import { groups } from "@/data/groups";
import { presentations } from "@/data/presentations";
import { publications } from "@/data/publications";
import { researchLines } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { teachingDomains } from "@/data/teaching";
import { localePath, pick, slugify, type Lang } from "./i18n";
import type { Publication } from "./types";
import { ACTIVE_SEMESTER, levelName } from "./teaching";
import { absUrl, PERSON_ID, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./seo";

export const ORCID = "0000-0001-8276-9734";
export const EMAIL = "mateo.belalcazar6@gmail.com";

/** Public academic profiles (Person.sameAs and the plain-text pages) */
export const PROFILES = [
  { label: "ORCID", url: `https://orcid.org/${ORCID}` },
  { label: "Google Scholar", url: "https://scholar.google.com/citations?user=RoI0VQ8AAAAJ" },
  { label: "Semantic Scholar", url: "https://www.semanticscholar.org/author/2296970047" },
  { label: "ResearchGate", url: "https://www.researchgate.net/profile/Mateo-Belalcazar" },
  { label: "CvLAC (Minciencias)", url: "https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000095645" },
  { label: "OSF", url: "https://osf.io/phswz/" },
  { label: "GitHub", url: "https://github.com/Mateob6" },
];

const UNIVERSITIES: Record<string, string> = {
  "Universidad del Valle": "https://www.univalle.edu.co",
  "Pontificia Universidad Javeriana, Cali": "https://www.javerianacali.edu.co",
  "Pontificia Universidad Javeriana": "https://www.javerianacali.edu.co",
  "Universidad de San Buenaventura, Cali": "https://www.usbcali.edu.co",
};

const university = (name: string) => ({
  "@type": "CollegeOrUniversity",
  name,
  ...(UNIVERSITIES[name] && { url: UNIVERSITIES[name] }),
});

const person = { "@type": "Person", "@id": PERSON_ID } as const;

export function jsonLd(data: object) {
  return { __html: JSON.stringify(data) };
}

/** Home > Section > Page */
export function breadcrumbs(lang: Lang, trail: { name: string; path: string }[]) {
  const items = [{ name: pick(lang, "Home", "Inicio"), path: "/" }, ...trail];
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absUrl(localePath(lang, it.path)),
    })),
  };
}

export const awardText = (a: (typeof awards)[number], lang: Lang) =>
  `${pick(lang, a.titleEn, a.titleEs)}, ${a.institution} (${a.year})`;

const allSkills = () =>
  skillGroups.flatMap((g) => [...(g.items ?? []), ...(g.subgroups ?? []).flatMap((s) => s.items)]);

/** The full Person, for the home (inside a ProfilePage) */
export function personSchema(lang: Lang) {
  const degrees = education.filter((e) => !e.period.includes("present"));
  return {
    ...person,
    name: SITE_NAME,
    givenName: "Mateo",
    familyName: "Belalcazar",
    // Name forms used in published work, so search engines link them to this profile
    alternateName: ["Mateo Belalcázar", "Mateo Belalcázar Correa", "Mateo Belalcazar Correa", "M. Belalcazar"],
    url: SITE_URL,
    image: `${SITE_URL}/photo.jpg`,
    email: `mailto:${EMAIL}`,
    description: SITE_DESCRIPTION[lang],
    jobTitle: pick(lang, ["Doctoral Researcher in Psychology", "University Lecturer"], ["Investigador doctoral en Psicología", "Docente universitario"]),
    identifier: { "@type": "PropertyValue", propertyID: "ORCID", value: ORCID },
    worksFor: [university("Universidad del Valle"), university("Pontificia Universidad Javeriana, Cali")],
    affiliation: { "@type": "ResearchOrganization", name: "Instituto CIDEAS", parentOrganization: university("Universidad del Valle") },
    alumniOf: [university("Universidad del Valle")],
    hasCredential: degrees.map((d) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: pick(lang, d.degreeEn, d.degreeEs),
      recognizedBy: university(d.institution),
      dateCreated: d.period.split("–").pop(),
    })),
    memberOf: groups.map((g) => ({ "@type": "Organization", name: g.name, description: g.institution })),
    award: awards.map((a) => awardText(a, lang)),
    knowsAbout: [
      ...pick(
        lang,
        ["Psychometrics", "Psychological measurement", "Quantitative methodology", "Statistical modeling", "Computational psychology", "Cognitive development", "Educational psychology", "Mathematics education"],
        ["Psicometría", "Medición psicológica", "Metodología cuantitativa", "Modelamiento estadístico", "Psicología computacional", "Desarrollo cognitivo", "Psicología educativa", "Educación matemática"]
      ),
      ...researchLines.map((r) => pick(lang, r.titleEn, r.titleEs)),
      ...allSkills(),
    ],
    knowsLanguage: ["es", "en"],
    workLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: "Cali", addressRegion: "Valle del Cauca", addressCountry: "CO" } },
    sameAs: PROFILES.map((p) => p.url),
  };
}

function parseAuthors(authors: string) {
  const clean = authors.replace(/\*\*/g, "");
  // Split on ", &" or " & " first, then on "., " (APA separator between "Initials., Next")
  return clean
    .replace(/,?\s*&\s*/g, "., ")
    .split(/\.,\s*/)
    .map((s) => s.trim().replace(/\.$/, ""))
    .filter(Boolean)
    .map((name) => (name.startsWith("Belalcazar") ? { ...person, name } : { "@type": "Person", name }));
}

export function publicationSchema(pub: Publication, lang: Lang) {
  const id = `${absUrl(localePath(lang, "/publications"))}#${pub.id}`;
  const common = {
    "@id": id,
    name: pub.title,
    headline: pub.title,
    author: parseAuthors(pub.authors),
    datePublished: String(pub.year),
    inLanguage: pub.language ?? "en",
    url: pub.doi ? `https://doi.org/${pub.doi}` : id,
    ...(pub.doi && {
      sameAs: `https://doi.org/${pub.doi}`,
      identifier: { "@type": "PropertyValue", propertyID: "DOI", value: pub.doi },
    }),
  };
  if (pub.type === "chapter" && pub.book) {
    return {
      "@type": "Chapter",
      ...common,
      pageStart: pub.book.pages[0],
      pageEnd: pub.book.pages[1],
      isPartOf: {
        "@type": "Book",
        name: pub.book.title,
        isbn: pub.book.isbn,
        editor: pub.book.editors.map((name) => ({ "@type": "Person", name })),
        publisher: { "@type": "Organization", name: pub.book.publisher },
        datePublished: String(pub.year),
      },
    };
  }
  const [journal, volume, article] = pub.journal.split(",").map((s) => s.trim());
  return {
    "@type": "ScholarlyArticle",
    ...common,
    isPartOf: {
      "@type": volume ? "PublicationVolume" : "Periodical",
      ...(volume ? { volumeNumber: volume, isPartOf: { "@type": "Periodical", name: journal } } : { name: journal }),
    },
    ...(article && { pagination: article }),
  };
}

export const presentationId = (p: (typeof presentations)[number]) => `${p.year}-${slugify(p.title, 6)}`;

export function presentationSchema(p: (typeof presentations)[number], lang: Lang) {
  const [city, country] = p.location.split(",").map((s) => s.trim());
  return {
    "@type": "CreativeWork",
    "@id": `${absUrl(localePath(lang, "/publications"))}#${presentationId(p)}`,
    genre: pick(lang, "Conference presentation", "Ponencia en congreso"),
    name: p.title.replace(/\.$/, ""),
    author: person,
    dateCreated: String(p.year),
    inLanguage: "es",
    description: pick(lang, `Presented at ${p.venue}, ${p.location}, ${p.year}.`, `Presentada en ${p.venue}, ${p.location}, ${p.year}.`),
    locationCreated: { "@type": "Place", name: p.location, address: { "@type": "PostalAddress", addressLocality: city, addressCountry: country } },
  };
}

export function publicationsSchemas(lang: Lang) {
  return [...publications.map((p) => publicationSchema(p, lang)), ...presentations.map((p) => presentationSchema(p, lang))];
}

/** Every course taught, grouped by domain, with each university where it was taught */
export function teachingSchema(lang: Lang, materials: Record<string, string>) {
  const page = absUrl(localePath(lang, "/teaching"));
  return {
    "@type": "ItemList",
    "@id": `${page}#courses`,
    name: pick(lang, "Courses taught by Mateo Belalcazar", "Cursos dictados por Mateo Belalcazar"),
    itemListElement: teachingDomains.flatMap((d) => d.courses.map((c) => ({ c, d }))).map(({ c, d }, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        "@id": `${page}#course-${slugify(c.name)}`,
        name: c.name,
        description: pick(lang, c.descriptionEn, c.descriptionEs),
        about: pick(lang, d.nameEn, d.nameEs),
        inLanguage: "es",
        educationalLevel: [...new Set(c.instances.map((x) => levelName(x.level, lang)))].join(", "),
        provider: [...new Set(c.instances.map((x) => x.university))].map(university),
        ...(materials[c.name] && { subjectOf: absUrl(localePath(lang, materials[c.name])) }),
        hasCourseInstance: c.instances.map((x) => ({
          "@type": "CourseInstance",
          name: `${c.name} — ${levelName(x.level, lang)}, ${x.university}`,
          courseMode: "Onsite",
          instructor: person,
          location: university(x.university),
          startDate: x.semesters[0].split("-")[0],
          ...(x.semesters[x.semesters.length - 1] !== ACTIVE_SEMESTER && {
            endDate: x.semesters[x.semesters.length - 1].split("-")[0],
          }),
          description: pick(lang, `Semesters: ${x.semesters.join(", ")}`, `Semestres: ${x.semesters.join(", ")}`),
        })),
      },
    })),
  };
}

/** Awards and skills, merged by search engines into the same Person */
export function recognitionSchema(lang: Lang) {
  return {
    ...person,
    name: SITE_NAME,
    award: awards.map((a) => awardText(a, lang)),
    knowsAbout: allSkills(),
  };
}
