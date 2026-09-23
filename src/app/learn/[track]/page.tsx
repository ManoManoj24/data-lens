import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DamaWheel } from "@/components/DamaWheel";
import { LifecycleExplorer } from "@/components/LifecycleExplorer";
import { CompletionMark, ProgressMeter } from "@/components/progress-ui";
import { GovernanceMap } from "@/components/Visuals";
import {
  firstSentence,
  ORIENTATION_IDS,
  slugForTrack,
  trackBySlug,
  tracks,
} from "@/lib/content";

type Params = { track: string };

export function generateStaticParams() {
  return tracks.map((track) => ({ track: slugForTrack(track.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { track: slug } = await params;
  const track = trackBySlug(slug);
  if (!track) return { title: "Track" };
  return {
    title: track.title,
    description: firstSentence(track.modules[0]?.summary ?? track.title),
  };
}

export default async function TrackPage({ params }: { params: Promise<Params> }) {
  const { track: slug } = await params;
  const track = trackBySlug(slug);
  if (!track) notFound();

  const orientation = track.modules.filter((module) =>
    (ORIENTATION_IDS as readonly string[]).includes(module.id),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="eyebrow">
        <Link href="/learn" className="hover:text-lens">
          Tracks
        </Link>
      </p>
      <h1 className="display mt-2 text-4xl sm:text-5xl">{track.title}</h1>
      <p className="lead mt-4 max-w-3xl">{track.modules[0]?.summary}</p>
      <div className="mt-6 max-w-xl">
        <ProgressMeter
          moduleIds={track.modules.map((module) => module.id)}
          label={track.title}
        />
      </div>

      {track.id === "governance" ? (
        <div className="mt-8 space-y-3">
          <p className="rounded-2xl border border-gold/40 bg-[#f8f1e2] px-4 py-3 text-sm leading-6">
            Educational overview only. Not legal advice for any jurisdiction.
          </p>
          <GovernanceMap />
        </div>
      ) : null}

      {track.id === "lifecycle" ? (
        <div className="mt-10 space-y-8">
          <ul className="grid gap-3 md:grid-cols-3">
            {orientation.map((module) => (
              <li key={module.id}>
                <Link href={`/learn/lifecycle/${module.id}`} className="panel block h-full p-4 hover:border-lens">
                  <span className="font-bold">{module.title}</span>
                  <span className="mt-2 block text-sm leading-6 text-ink-soft">
                    {firstSentence(module.summary)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <LifecycleExplorer lessons={track.modules} />
        </div>
      ) : null}

      {track.id === "dama-wheel" ? (
        <div className="mt-10">
          <DamaWheel lessons={track.modules} />
        </div>
      ) : null}

      <section className="mt-12" aria-labelledby="lesson-list">
        <h2 id="lesson-list" className="display text-3xl">
          Lessons in this track
        </h2>
        <ol className="mt-4 grid gap-3">
          {track.modules.map((module, index) => (
            <li key={module.id}>
              <Link
                href={`/learn/${slug}/${module.id}`}
                className="panel flex items-start gap-4 p-4 hover:border-lens"
              >
                <span className="display w-10 text-xl text-lens">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="flex flex-wrap items-center gap-2 text-lg font-bold">
                    {module.title}
                    <CompletionMark moduleId={module.id} />
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-ink-soft">{module.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
