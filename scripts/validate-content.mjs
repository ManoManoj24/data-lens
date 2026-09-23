import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const curriculum = JSON.parse(readFileSync(resolve(root, "src/data/curriculum.json"), "utf8"));
const journey = JSON.parse(readFileSync(resolve(root, "src/data/journey.json"), "utf8"));
const paths = JSON.parse(readFileSync(resolve(root, "src/data/paths.json"), "utf8"));
const cases = JSON.parse(readFileSync(resolve(root, "src/data/cases.json"), "utf8"));

const original = [
  "lc-why", "lc-compare", "lc-unified", "lc-plan", "lc-create", "lc-store", "lc-use", "lc-share", "lc-archive-destroy",
  "gov-intro", "gov-decision-rights", "gov-policies", "gov-councils", "gov-metrics", "gov-risk",
  "dama-gov", "dama-arch", "dama-model", "dama-storage", "dama-security", "dama-integration", "dama-content", "dama-refmdm", "dama-dwbi", "dama-metadata", "dama-quality",
  "roles-trio", "roles-council-cdo", "roles-raci", "roles-fair-culture",
  "qm-dimensions", "qm-measure", "qm-metadata-types", "qm-lineage-catalog", "qm-fair-depth",
  "mdm-master", "mdm-reference", "mdm-vs-rdm",
];

const modules = curriculum.tracks.flatMap((track) => track.modules);
const byId = new Map(modules.map((module) => [module.id, module]));
const errors = [];

for (const id of original) {
  const module = byId.get(id);
  if (!module) {
    errors.push(`missing original module ${id}`);
    continue;
  }
  const lesson = module.lesson;
  if (!lesson?.concept?.trim() || !lesson.howItWorks?.trim() || !lesson.example?.trim()) {
    errors.push(`${id} lesson prose incomplete`);
  }
  if (!lesson?.pitfalls || lesson.pitfalls.length < 3) errors.push(`${id} pitfalls`);
  if (!lesson?.checklist || lesson.checklist.length < 4) errors.push(`${id} checklist`);
  if (!module.quiz || module.quiz.length < 2) errors.push(`${id} quiz`);
}

for (const id of ["mdm-golden", "mdm-match-merge", "mdm-hierarchy", "mdm-ops"]) {
  if (!byId.has(id)) errors.push(`missing MDM module ${id}`);
}

if (journey.stages?.length !== 7) errors.push("journey stages");
const pathIds = (paths.paths ?? []).map((path) => path.id);
for (const id of ["beginner", "practitioner", "governance-lead"]) {
  if (!pathIds.includes(id)) errors.push(`missing path ${id}`);
}
const caseIds = (cases.cases ?? []).map((item) => item.id);
for (const id of ["retail-pim", "customer-mdm", "research-fair"]) {
  if (!caseIds.includes(id)) errors.push(`missing case ${id}`);
}

const linked = new Set(journey.stages.flatMap((stage) => stage.lessons));
for (const id of ["mdm-golden", "mdm-match-merge", "mdm-hierarchy", "mdm-ops"]) {
  if (!linked.has(id)) errors.push(`${id} not linked from journey`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`validated ${modules.length} modules, ${journey.stages.length} stages, ${paths.paths.length} paths, ${cases.cases.length} cases`);
