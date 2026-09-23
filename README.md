# Data Lens

A visual learning site for data management. It follows data from the decision to create it through storage, use, sharing, archive, and destruction, and it teaches governance, quality, roles, and master data along the way.

Lessons are original teaching prose. Public sources are cited by title and URL on each lesson and on the [sources](/sources) page. This is not legal advice.

## Start here

The primary path is the **Data Journey**: one apparel SKU (`NL-HAT-204`, the Harbor Beanie) and one customer (Maya Chen) across seven stages. Each stage names what happens to the data, who owns the decision, the quality risk, a governance checkpoint, and links into deeper lessons.

## Routes

| Path | What it is |
| --- | --- |
| `/` | Home. Primary call to action opens the journey. |
| `/journey` | Start-to-end story. `?stage=use` opens a stage directly. |
| `/paths` | Beginner, Practitioner, and Governance lead routes with time estimates. |
| `/tracks/[trackId]` | Lesson lists for lifecycle, governance, the DAMA wheel, roles, quality and metadata, and MDM. |
| `/modules/[moduleId]` | Full lesson: concept, how it works, example, pitfalls, checklist, quiz, sources. |
| `/labs` | Practice hub. |
| `/labs/quality-score` | Completeness, accuracy, timeliness, and consistency on sample rows or sliders. |
| `/labs/raci` | Assign R/A/C/I for retiring a customer attribute. Saved locally. |
| `/labs/lifecycle-choice` | Scenario cards with consequence feedback. |
| `/cases` | Three end-to-end stories. |
| `/cases/retail-pim` | Catalog create, enrich, publish, retire. |
| `/cases/customer-mdm` | Golden record, match conflicts, unmerge. |
| `/cases/research-fair` | FAIR readiness for a durability dataset. |
| `/search` | Client-side search across lessons, glossary, journey, cases, labs, paths, cheatsheets, and practice. |
| `/glossary` | Working definitions. Terms in lesson prose link here when the phrase matches. |
| `/cheatsheets` | Printable one-pagers. Use the browser print dialog to save a PDF. |
| `/cheatsheets/lifecycle` | Lifecycle stages. Also `/dama`, `/quality`, and `/raci`. |
| `/practice/interview` | Fifteen interview scenarios. Self-mark correct or incorrect. |
| `/journey/certificate` | Title card after every journey stage has been opened in this browser. |
| `/sources` | Public bibliography. |

## Progress

Lesson completion is stored in `localStorage` under `datalens.completedModules` (a JSON array of module ids). Older object-shaped values are read and normalized. Passing a lesson quiz adds the id. Other features use separate keys (`datalens.checklist.*`, `datalens.raciLab`, `datalens.lifecycleLab`, `datalens.journeyVisited`, `datalens.journeyCompletedAt`, `datalens.certificateName`, `datalens.fairChecks`, `datalens.interviewMarks`) so they do not overwrite completion.

## Develop

```bash
npm install
npm run dev
npm run build
```

`npm run build` checks that every original lesson has a full body and a quiz of at least two questions, then runs the Next.js production build. No database, auth, or environment variables are required.

## Content

Curriculum, glossary, journey, paths, and cases live in `src/data/`. Lesson prose is original. `scripts/apply_lessons.py` can regenerate `curriculum.json` from `curriculum.base.json` plus the lesson modules in `scripts/`.
