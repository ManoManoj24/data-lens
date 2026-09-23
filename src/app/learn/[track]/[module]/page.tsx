import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonBody } from "@/components/LessonBody";
import { allLessons, lessonBySlug, slugForTrack } from "@/lib/content";

type Params = { track: string; module: string };

export function generateStaticParams() {
  return allLessons().map((item) => ({
    track: slugForTrack(item.track.id),
    module: item.module.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { track, module } = await params;
  const found = lessonBySlug(track, module);
  if (!found) return { title: "Lesson" };
  return { title: found.module.title, description: found.module.summary };
}

export default async function LessonPage({ params }: { params: Promise<Params> }) {
  const { track, module } = await params;
  const found = lessonBySlug(track, module);
  if (!found) notFound();

  const { track: trackData, module: lesson, index, slug } = found;
  const previous = index > 0 ? trackData.modules[index - 1] : null;
  const next = index < trackData.modules.length - 1 ? trackData.modules[index + 1] : null;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="eyebrow">
        <Link href="/learn" className="hover:text-lens">
          Tracks
        </Link>
        <span aria-hidden="true"> / </span>
        <Link href={`/learn/${slug}`} className="hover:text-lens">
          {trackData.title}
        </Link>
      </p>
      <h1 className="display mt-3 text-4xl sm:text-5xl">{lesson.title}</h1>
      <p className="mt-3 text-sm font-semibold text-ink-soft">
        Lesson {index + 1} of {trackData.modules.length}
      </p>
      <div className="mt-8">
        <LessonBody lesson={lesson} />
      </div>
      <nav className="mt-10 grid gap-3 sm:grid-cols-2" aria-label="Lesson pager">
        {previous ? (
          <Link href={`/learn/${slug}/${previous.id}`} className="panel p-4 hover:border-lens">
            <span className="text-xs font-bold uppercase tracking-wide text-ink-soft">Previous</span>
            <span className="mt-1 block font-bold">{previous.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/learn/${slug}/${next.id}`} className="panel p-4 text-right hover:border-lens">
            <span className="text-xs font-bold uppercase tracking-wide text-ink-soft">Next</span>
            <span className="mt-1 block font-bold">{next.title}</span>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
