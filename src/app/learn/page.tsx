import type { Metadata } from "next";
import Link from "next/link";
import { CompletionMark } from "@/components/progress-ui";
import { firstSentence, slugForTrack, TRACK_ACCENT, tracks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tracks",
  description: "All Data Lens tracks and lessons.",
};

export default function LearnIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="eyebrow">Catalog</p>
      <h1 className="display mt-2 text-4xl sm:text-5xl">Every lesson</h1>
      <p className="lead mt-4 max-w-2xl">
        Six tracks cover the lifecycle, governance, the DAMA wheel, roles, quality and metadata,
        and master versus reference data.
      </p>
      <div className="mt-10 space-y-10">
        {tracks.map((track) => (
          <section key={track.id} aria-labelledby={`track-${track.id}`}>
            <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
              <h2 id={`track-${track.id}`} className="display text-3xl">
                <Link href={`/learn/${slugForTrack(track.id)}`} className="hover:text-lens-deep">
                  {track.title}
                </Link>
              </h2>
              <span className="text-sm font-semibold text-ink-soft">
                {track.modules.length} lessons
              </span>
            </div>
            <p className="mb-4 max-w-3xl text-sm leading-6 text-ink-soft">
              {firstSentence(track.modules[0]?.summary ?? "")}
            </p>
            <ol className="grid gap-3 sm:grid-cols-2">
              {track.modules.map((module, index) => (
                <li key={module.id}>
                  <Link
                    href={`/learn/${slugForTrack(track.id)}/${module.id}`}
                    className="panel flex h-full gap-3 p-4 hover:border-lens"
                  >
                    <span
                      className="display w-8 shrink-0 text-lg"
                      style={{ color: TRACK_ACCENT[track.id] }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="flex flex-wrap items-center gap-2 font-bold">
                        {module.title}
                        <CompletionMark moduleId={module.id} />
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-ink-soft">
                        {firstSentence(module.summary)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
