import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CompleteDot } from "@/components/ContinueLink";
import { getTrack, getTracks, moduleMinutes } from "@/lib/curriculum";

export function generateStaticParams() {
  return getTracks().map((track) => ({ trackId: track.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ trackId: string }> }): Promise<Metadata> {
  const { trackId } = await params;
  const track = getTrack(trackId);
  return { title: track?.title ?? "Track" };
}

export default async function TrackPage({ params }: { params: Promise<{ trackId: string }> }) {
  const { trackId } = await params;
  const track = getTrack(trackId);
  if (!track) notFound();

  return (
    <div className="mx-auto max-w-page px-5 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">Track</p>
      <h1 className="mt-3 font-serif text-5xl md:text-6xl">{track.title}</h1>
      <p className="mt-4 max-w-3xl text-lg text-ink-soft">{track.summary}</p>
      <ol className="mt-8 grid gap-3">
        {track.modules.map((module, index) => (
          <li key={module.id}>
            <Link
              href={`/modules/${module.id}`}
              className="grid gap-2 rounded-3xl border border-line bg-[color:var(--paper-raised)] p-5 no-underline hover:border-ink md:grid-cols-[auto_1fr_auto]"
            >
              <span className="font-serif text-2xl text-muted">{String(index + 1).padStart(2, "0")}</span>
              <span>
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-serif text-2xl text-ink">{module.title}</span>
                  <CompleteDot moduleId={module.id} />
                </span>
                <span className="mt-1 block text-ink-soft">{module.summary}</span>
              </span>
              <span className="text-sm text-muted">{moduleMinutes(module)} min</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
