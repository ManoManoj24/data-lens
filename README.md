# Data Lens

Visual learning site for data management, governance, and the data lifecycle. Lessons, the glossary, and citations come from the educational content pack in `src/data/` — original summaries with public title-and-URL sources.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build
npm start
npm run lint
```

No environment variables are required. Progress is stored in the browser under `datalens.completedModules` (localStorage). Clearing site data resets it.

## Routes

| Path | What you see |
| --- | --- |
| `/` | Home, track cards, progress |
| `/learn` | All 38 lessons |
| `/learn/lifecycle` | Clickable 7-stage lifecycle |
| `/learn/dama` | Clickable DAMA knowledge-area wheel |
| `/learn/governance`, `/learn/roles`, `/learn/quality`, `/learn/mdm` | The other tracks |
| `/learn/[track]/[module]` | Lesson: summary, key points, quiz, sources |
| `/glossary` | Searchable glossary |
| `/sources` | Annotated bibliography and lesson citations |
| `/progress` | Per-track completion |

## Deploy on Vercel

1. Import this repository. Vercel detects Next.js.
2. Leave the build command as `npm run build` and the output as the Next.js default.
3. Do not add environment variables for the learning site. There is no database or auth.
4. Deploy. The App Router pages are static except for client-side progress, quizzes, and search.

Node.js 20 or newer is enough. The app uses the default Node.js runtime (Fluid Compute on Vercel). It does not set an Edge runtime.

## Content

- `src/data/curriculum.json` — 6 tracks, 38 modules
- `src/data/glossary.json` — glossary terms
- `src/data/bibliography.ts` — annotated sources transcribed from the pack bibliography

Governance and privacy lessons are educational overviews, not legal advice.
