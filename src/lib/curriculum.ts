import curriculumJson from "@/data/curriculum.json";
import glossaryJson from "@/data/glossary.json";
import journeyJson from "@/data/journey.json";
import pathsJson from "@/data/paths.json";
import casesJson from "@/data/cases.json";
import type {
  CaseStudy,
  Curriculum,
  GlossaryTerm,
  Journey,
  LearningPath,
  Module,
  PathsFile,
  SearchDoc,
  Track,
} from "./types";

const curriculum = curriculumJson as Curriculum;
const journey = journeyJson as Journey;
const pathsFile = pathsJson as PathsFile;
const casesFile = casesJson as { cases: CaseStudy[] };
const glossary = glossaryJson as { title: string; terms: GlossaryTerm[] };

export function getCurriculum(): Curriculum {
  return curriculum;
}

export function getTracks(): Track[] {
  return curriculum.tracks;
}

export function getTrack(id: string): Track | undefined {
  return curriculum.tracks.find((track) => track.id === id);
}

export function getAllModules(): { track: Track; module: Module }[] {
  return curriculum.tracks.flatMap((track) =>
    track.modules.map((module) => ({ track, module })),
  );
}

export function getModule(id: string): { track: Track; module: Module } | undefined {
  return getAllModules().find((item) => item.module.id === id);
}

export function getNeighbors(moduleId: string): {
  prev?: { track: Track; module: Module };
  next?: { track: Track; module: Module };
} {
  const all = getAllModules();
  const index = all.findIndex((item) => item.module.id === moduleId);
  return {
    prev: index > 0 ? all[index - 1] : undefined,
    next: index >= 0 && index < all.length - 1 ? all[index + 1] : undefined,
  };
}

export function getJourney(): Journey {
  return journey;
}

export function stagesForModule(moduleId: string): { id: string; title: string }[] {
  return journey.stages
    .filter((stage) => stage.lessons.includes(moduleId))
    .map((stage) => ({ id: stage.id, title: stage.title }));
}

export function getPaths(): LearningPath[] {
  return pathsFile.paths;
}

export function getCases(): CaseStudy[] {
  return casesFile.cases;
}

export function getCase(id: string): CaseStudy | undefined {
  return casesFile.cases.find((item) => item.id === id);
}

export function getGlossary(): GlossaryTerm[] {
  return [...glossary.terms].sort((a, b) => a.term.localeCompare(b.term));
}

export function moduleMinutes(module: Module): number {
  return module.minutes ?? 14;
}

export function trackMinutes(track: Track): number {
  return track.modules.reduce((sum, module) => sum + moduleMinutes(module), 0);
}

export function pathMinutes(path: LearningPath): number {
  return path.steps.reduce((sum, step) => {
    const found = getModule(step.moduleId);
    return sum + (found ? moduleMinutes(found.module) : 12);
  }, 0);
}

const labs = [
  {
    id: "quality-score",
    title: "Quality score lab",
    href: "/labs/quality-score",
    text: "Score completeness accuracy timeliness consistency on sample product rows. Weighted fitness for use. Harbor Beanie catalog defects.",
  },
  {
    id: "raci",
    title: "RACI decision lab",
    href: "/labs/raci",
    text: "Assign Responsible Accountable Consulted Informed for retiring a customer attribute. Steward owner custodian CDO.",
  },
  {
    id: "lifecycle-choice",
    title: "Lifecycle choice lab",
    href: "/labs/lifecycle-choice",
    text: "Choose the next action for sharing, quality repair, retention, and a match exception. Consequence feedback.",
  },
];

export function buildSearchDocs(): SearchDoc[] {
  const docs: SearchDoc[] = [];

  for (const { track, module } of getAllModules()) {
    const lesson = module.lesson;
    docs.push({
      id: `lesson-${module.id}`,
      kind: "lesson",
      title: module.title,
      href: `/modules/${module.id}`,
      kicker: track.title,
      text: [
        module.summary,
        ...module.keyPoints,
        lesson.concept,
        lesson.howItWorks,
        lesson.example,
        ...lesson.pitfalls,
        ...lesson.checklist,
      ].join("\n"),
    });
  }

  for (const term of glossary.terms) {
    docs.push({
      id: `glossary-${term.term}`,
      kind: "glossary",
      title: term.term,
      href: `/glossary#${slugTerm(term.term)}`,
      kicker: "Glossary",
      text: term.definition,
    });
  }

  for (const stage of journey.stages) {
    docs.push({
      id: `journey-${stage.id}`,
      kind: "journey",
      title: `Journey · ${stage.title}`,
      href: `/journey?stage=${stage.id}`,
      kicker: "Data Journey",
      text: [
        stage.productBeat,
        stage.customerBeat,
        stage.whatHappens,
        stage.productDetail,
        stage.customerDetail,
        stage.whoOwns,
        stage.qualityRisk,
        stage.governance,
      ].join("\n"),
    });
  }

  for (const study of casesFile.cases) {
    docs.push({
      id: `case-${study.id}`,
      kind: "case",
      title: study.title,
      href: `/cases/${study.id}`,
      kicker: "Case study",
      text: [study.summary, ...study.sections.map((section) => `${section.title}\n${section.body}`)].join(
        "\n",
      ),
    });
  }

  for (const lab of labs) {
    docs.push({
      id: `lab-${lab.id}`,
      kind: "lab",
      title: lab.title,
      href: lab.href,
      kicker: "Lab",
      text: lab.text,
    });
  }

  for (const path of pathsFile.paths) {
    docs.push({
      id: `path-${path.id}`,
      kind: "path",
      title: path.title,
      href: `/paths#${path.id}`,
      kicker: "Learning path",
      text: `${path.audience}\n${path.summary}\n${path.outcome}`,
    });
  }

  return docs;
}

export function slugTerm(term: string): string {
  return term
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const ORIGINAL_MODULE_IDS = [
  "lc-why",
  "lc-compare",
  "lc-unified",
  "lc-plan",
  "lc-create",
  "lc-store",
  "lc-use",
  "lc-share",
  "lc-archive-destroy",
  "gov-intro",
  "gov-decision-rights",
  "gov-policies",
  "gov-councils",
  "gov-metrics",
  "gov-risk",
  "dama-gov",
  "dama-arch",
  "dama-model",
  "dama-storage",
  "dama-security",
  "dama-integration",
  "dama-content",
  "dama-refmdm",
  "dama-dwbi",
  "dama-metadata",
  "dama-quality",
  "roles-trio",
  "roles-council-cdo",
  "roles-raci",
  "roles-fair-culture",
  "qm-dimensions",
  "qm-measure",
  "qm-metadata-types",
  "qm-lineage-catalog",
  "qm-fair-depth",
  "mdm-master",
  "mdm-reference",
  "mdm-vs-rdm",
] as const;
