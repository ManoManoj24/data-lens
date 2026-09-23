import Link from "next/link";
import { ContinueLink, ProgressNote } from "@/components/ContinueLink";
import { LifecycleDiagram } from "@/components/Diagrams";
import { getAllModules, getCurriculum, getTracks, trackMinutes } from "@/lib/curriculum";

export default function HomePage() {
  const curriculum = getCurriculum();
  const tracks = getTracks();
  const modules = getAllModules();

  return (
    <div className="mx-auto max-w-page px-5 py-12 md:px-8 md:py-16">
      <p className="text-xs uppercase tracking-[0.18em] text-accent">Data management, taught visually</p>
      <h1 className="mt-3 max-w-4xl font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
        See what data does, from the first decision to the last copy.
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-ink-soft">{curriculum.tagline}</p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link href="/journey" className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-[color:var(--paper)] no-underline">
          Start the Data Journey
        </Link>
        <ContinueLink
          order={modules.map((item) => item.module.id)}
          className="rounded-full border border-ink px-5 py-3 text-sm no-underline"
        />
      </div>
      <div className="mt-4">
        <ProgressNote total={modules.length} />
      </div>

      <div className="mt-10">
        <LifecycleDiagram />
        <p className="mt-3 text-sm text-muted">
          The journey follows one beanie and one customer across these stages.{" "}
          <Link href="/journey">Open it at Plan</Link>.
        </p>
      </div>

      <section id="tracks" className="mt-16 scroll-mt-24">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-4xl">Tracks</h2>
          <Link href="/paths" className="text-sm">
            Prefer a guided path
          </Link>
        </div>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {tracks.map((track) => (
            <li key={track.id}>
              <Link
                href={`/tracks/${track.id}`}
                className="block h-full rounded-3xl border border-line bg-[color:var(--paper-raised)] p-5 no-underline hover:border-ink"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-muted">
                  {track.modules.length} lessons · {trackMinutes(track)} min
                </p>
                <h3 className="mt-2 font-serif text-3xl text-ink">{track.title}</h3>
                <p className="mt-2 text-ink-soft">{track.blurb}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ["Journey", "One SKU and one customer, stage by stage.", "/journey"],
          ["Labs", "Score quality, assign a RACI, choose a next action.", "/labs"],
          ["Cases", "A catalog, a golden record, and a FAIR deposit.", "/cases"],
          ["Cheatsheets", "One-page sheets you print or save as PDF.", "/cheatsheets"],
          ["Interview cards", "Fifteen prompts. You mark your own answers.", "/practice/interview"],
        ].map(([title, text, href]) => (
          <Link key={href} href={href} className="rounded-3xl border border-line p-5 no-underline hover:border-ink">
            <h2 className="font-serif text-3xl">{title}</h2>
            <p className="mt-2 text-ink-soft">{text}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
