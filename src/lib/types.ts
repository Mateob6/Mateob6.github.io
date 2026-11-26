export type Publication = {
  /** anchor on /publications (first author + year) */
  id: string;
  /** language of the work; English if absent */
  language?: "en" | "es";
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi?: string;
  /** preprint: APA «[Preprint]» after the title; `journal` holds the server (PsyArXiv) */
  type: "article" | "preprint" | "chapter";
  quartile?: string;
  /** chapters: the book they belong to */
  book?: { title: string; editors: string[]; publisher: string; isbn: string; pages: [number, number] };
};

export type Presentation = {
  title: string;
  venue: string;
  location: string;
  year: number;
};

export type University = {
  name: string;
  location: string;
  undergraduate: string[];
  graduate: string[];
};

export type Award = {
  titleEn: string;
  titleEs: string;
  institution: string;
  year: number;
  icon: string;
};

export type Group = {
  name: string;
  institution: string;
  period: string;
  rank: string;
};

export type Education = {
  degreeEn: string;
  degreeEs: string;
  institution: string;
  detail?: string;
  period: string;
};

export type ProfileLink = {
  label: string;
  href: string;
  icon: string;
};

export type ResearchLine = {
  titleEn: string;
  titleEs: string;
  descriptionEn: string;
  descriptionEs: string;
};

export type SkillGroup = {
  categoryEn: string;
  categoryEs: string;
  subgroups?: { labelEn: string; labelEs: string; items: string[] }[];
  items?: string[];
};
