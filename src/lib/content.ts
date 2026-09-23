import curriculum from "@/data/curriculum.json";
import glossary from "@/data/glossary.json";

export type Source = { title: string; url: string };

export type QuizQuestion = {
  q: string;
  choices: string[];
  answerIndex: number;
  explain: string;
};

export type Lesson = {
  id: string;
  title: string;
  summary: string;
  keyPoints: string[];
  visualHint: string;
  quiz: QuizQuestion[];
  sources: Source[];
};

export type Track = {
  id: string;
  title: string;
  modules: Lesson[];
};

export type GlossaryTerm = {
  term: string;
  definition: string;
};

export const siteTitle = curriculum.siteTitle;
export const tagline = curriculum.tagline;
export const tracks = curriculum.tracks as Track[];
export const glossaryTitle = glossary.title;
export const terms = glossary.terms as GlossaryTerm[];

const TRACK_SLUG: Record<string, string> = {
  lifecycle: "lifecycle",
  governance: "governance",
  "dama-wheel": "dama",
  roles: "roles",
  "quality-metadata": "quality",
  "mdm-reference": "mdm",
};

export const TRACK_ACCENT: Record<string, string> = {
  lifecycle: "#0f6e6b",
  governance: "#8a5a12",
  "dama-wheel": "#1f4e79",
  roles: "#7a3e4e",
  "quality-metadata": "#2f5d50",
  "mdm-reference": "#3d4f7c",
};

export function slugForTrack(id: string) {
  return TRACK_SLUG[id] ?? id;
}

export function trackBySlug(slug: string) {
  return tracks.find((track) => slugForTrack(track.id) === slug);
}

export function lessonHref(trackId: string, moduleId: string) {
  return `/learn/${slugForTrack(trackId)}/${moduleId}`;
}

export function allLessons() {
  return tracks.flatMap((track) =>
    track.modules.map((module, index) => ({
      track,
      module,
      index,
      slug: slugForTrack(track.id),
      href: lessonHref(track.id, module.id),
    })),
  );
}

export function lessonBySlug(trackSlug: string, moduleId: string) {
  const track = trackBySlug(trackSlug);
  if (!track) return null;
  const index = track.modules.findIndex((module) => module.id === moduleId);
  if (index < 0) return null;
  return {
    track,
    module: track.modules[index],
    index,
    slug: trackSlug,
    href: `/learn/${trackSlug}/${moduleId}`,
  };
}

export function moduleCount() {
  return tracks.reduce((total, track) => total + track.modules.length, 0);
}

export const knownModuleIds = new Set(allLessons().map((item) => item.module.id));

export function termAnchor(term: string) {
  return term
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function firstSentence(text: string) {
  const match = text.match(/^.*?[.!?](\s|$)/);
  return match ? match[0].trim() : text;
}

export type LifecycleStage = {
  id: string;
  label: string;
  moduleId: string;
};

export const LIFECYCLE_STAGES: LifecycleStage[] = [
  { id: "plan", label: "Plan", moduleId: "lc-plan" },
  { id: "create", label: "Create / Acquire", moduleId: "lc-create" },
  { id: "store", label: "Store / Manage", moduleId: "lc-store" },
  { id: "use", label: "Use / Process", moduleId: "lc-use" },
  { id: "share", label: "Share", moduleId: "lc-share" },
  { id: "archive", label: "Archive", moduleId: "lc-archive-destroy" },
  { id: "destroy", label: "Destroy", moduleId: "lc-archive-destroy" },
];

export const ORIENTATION_IDS = ["lc-why", "lc-compare", "lc-unified"] as const;

export const CROSS_CUTS = [
  {
    id: "quality",
    label: "Data quality",
    href: "/learn/quality/qm-dimensions",
  },
  {
    id: "security",
    label: "Security / privacy",
    href: "/learn/dama/dama-security",
  },
  {
    id: "metadata",
    label: "Metadata / lineage",
    href: "/learn/quality/qm-lineage-catalog",
  },
] as const;

export type DamaSpoke = {
  moduleId: string;
  lines: string[];
};

export const DAMA_HUB = "dama-gov";

export const DAMA_SPOKES: DamaSpoke[] = [
  { moduleId: "dama-arch", lines: ["Architecture"] },
  { moduleId: "dama-model", lines: ["Modeling", "& Design"] },
  { moduleId: "dama-storage", lines: ["Storage &", "Operations"] },
  { moduleId: "dama-security", lines: ["Security"] },
  { moduleId: "dama-integration", lines: ["Integration"] },
  { moduleId: "dama-content", lines: ["Documents", "& Content"] },
  { moduleId: "dama-refmdm", lines: ["Reference", "& Master"] },
  { moduleId: "dama-dwbi", lines: ["Warehousing", "& BI"] },
  { moduleId: "dama-metadata", lines: ["Metadata"] },
  { moduleId: "dama-quality", lines: ["Quality"] },
];

export function findLesson(moduleId: string) {
  return allLessons().find((item) => item.module.id === moduleId) ?? null;
}

export function citations() {
  const map = new Map<
    string,
    { title: string; url: string; lessons: { title: string; href: string }[] }
  >();

  for (const item of allLessons()) {
    for (const source of item.module.sources) {
      const lesson = { title: item.module.title, href: item.href };
      const existing = map.get(source.url);
      if (existing) {
        existing.lessons.push(lesson);
      } else {
        map.set(source.url, { title: source.title, url: source.url, lessons: [lesson] });
      }
    }
  }

  return [...map.values()].sort((a, b) => a.title.localeCompare(b.title));
}
