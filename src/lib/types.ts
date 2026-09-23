export type QuizQuestion = {
  q: string;
  choices: string[];
  answerIndex: number;
  explain: string;
};

export type SourceRef = {
  title: string;
  url: string;
};

export type Lesson = {
  concept: string;
  howItWorks: string;
  example: string;
  pitfalls: string[];
  checklist: string[];
  seeAlso?: string[];
};

export type Module = {
  id: string;
  title: string;
  summary: string;
  keyPoints: string[];
  visualHint: "flow" | "wheel" | "diagram" | "cards" | string;
  quiz: QuizQuestion[];
  sources: SourceRef[];
  lesson: Lesson;
  minutes?: number;
};

export type Track = {
  id: string;
  title: string;
  summary: string;
  blurb: string;
  modules: Module[];
};

export type Curriculum = {
  siteTitle: string;
  tagline: string;
  tracks: Track[];
};

export type GlossaryTerm = {
  term: string;
  definition: string;
};

export type JourneyStage = {
  id: string;
  index: number;
  title: string;
  short: string;
  productBeat: string;
  customerBeat: string;
  whatHappens: string;
  productDetail: string;
  customerDetail: string;
  whoOwns: string;
  qualityRisk: string;
  governance: string;
  lessons: string[];
};

export type Journey = {
  title: string;
  kicker: string;
  lede: string;
  protagonist: string;
  sku: { id: string; name: string; story: string };
  customer: { id: string; name: string; story: string };
  stages: JourneyStage[];
};

export type PathStep = {
  moduleId: string;
  note: string;
};

export type LearningPath = {
  id: string;
  title: string;
  audience: string;
  summary: string;
  outcome: string;
  steps: PathStep[];
};

export type PathsFile = {
  paths: LearningPath[];
};

export type CaseSection = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  callout?: { label: string; text: string };
  lessons: string[];
};

export type CaseStudy = {
  id: string;
  title: string;
  kicker: string;
  summary: string;
  minutes: number;
  domains: string[];
  sections: CaseSection[];
  fairChecks?: { id: string; principle: string; label: string }[];
};

export type CasesFile = {
  cases: CaseStudy[];
};

export type SearchKind = "lesson" | "glossary" | "journey" | "case" | "lab" | "path" | "sheet" | "practice";

export type SearchDoc = {
  id: string;
  kind: SearchKind;
  title: string;
  href: string;
  text: string;
  kicker: string;
};
