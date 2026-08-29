export type Publication = {
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi?: string;
  type: "article" | "chapter";
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
