import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ModuleDiagram } from "@/components/Diagrams";
import { Checklist, Quiz, SeeAlso } from "@/components/LessonInteractive";
import { CompleteDot } from "@/components/ContinueLink";
import { getAllModules, getModule, getNeighbors, stagesForModule } from "@/lib/curriculum";
import { paragraphs, steps } from "@/lib/prose";

export function generateStaticParams() {
  return getAllModules().map(({ module }) => ({ moduleId: module.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ moduleId: string }> }): Promise<Metadata> {
  const { moduleId } = await params;
  const found = getModule(moduleId);
  return { title: found?.module.title ?? "Lesson", description: found?.module.summary };
}

export default async function ModulePage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = await params;
  const found = getModule(moduleId);
  if (!found) notFound();
  const { track, module } = found;
  const { prev, next } = getNeighbors(module.id);
  const stages = stagesForModule(module.id);
  const seeAlso = (module.lesson.seeAlso ?? [])
    .map((id) => getModule(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .map((item) => ({ id: item.module.id, title: item.module.title }));
  const how = steps(module.lesson.howItWorks);

  return (
    <article className="mx-auto max-w-page px-5 py-12 md:px-8">
      <p className="text-sm text-muted">
        <Link href={`/tracks/${track.id}`}>{track.title}</Link>
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <CompleteDot moduleId={module.id} />
        {stages.map((stage) => (
          <Link
            key={stage.id}
            href={`/journey?stage=${stage.id}`}
            className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-xs text-accent no-underline"
          >
            Journey · {stage.title}
          </Link>
        ))}
      </div>
      <h1 className="mt-3 max-w-4xl font-serif text-5xl leading-tight md:text-6xl">{module.title}</h1>
      <p className="mt-4 max-w-3xl text-xl text-ink-soft">{module.summary}</p>

      <div className="mt-8">
        <ModuleDiagram moduleId={module.id} />
      </div>

      <section className="mt-8">
        <h2 className="font-serif text-3xl">At a glance</h2>
        <ul className="mt-3 grid gap-2 md:grid-cols-2">
          {module.keyPoints.map((point) => (
            <li key={point} className="rounded-2xl border border-line bg-[color:var(--paper-raised)] px-4 py-3 text-sm">
              {point}
            </li>
          ))}
        </ul>
      </section>

      <section className="prose-lesson mt-10 max-w-3xl">
        <h2 className="font-serif text-3xl">The idea</h2>
        <div className="mt-3 text-lg leading-relaxed">
          {paragraphs(module.lesson.concept).map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-serif text-3xl">How it works</h2>
        {how ? (
          <ol className="mt-4 grid gap-3">
            {how.map((step, index) => (
              <li key={step} className="grid grid-cols-[auto_1fr] gap-3">
                <span className="font-serif text-xl text-accent">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        ) : (
          <div className="prose-lesson mt-3">
            {paragraphs(module.lesson.howItWorks).map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        )}
      </section>

      <section className="mt-10 max-w-3xl rounded-3xl border border-line border-l-4 border-l-clay bg-[color:var(--paper-raised)] p-5 md:p-6">
        <h2 className="font-serif text-3xl">Worked example</h2>
        <div className="prose-lesson mt-3">
          {paragraphs(module.lesson.example).map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-serif text-3xl">Pitfalls</h2>
        <ul className="mt-4 grid gap-2">
          {module.lesson.pitfalls.map((pitfall) => (
            <li key={pitfall} className="rounded-2xl border border-line px-4 py-3">
              {pitfall}
            </li>
          ))}
        </ul>
      </section>

      <Checklist moduleId={module.id} items={module.lesson.checklist} />
      <SeeAlso ids={seeAlso} />
      <Quiz moduleId={module.id} questions={module.quiz} />

      <section className="mt-12">
        <h2 className="font-serif text-3xl">Sources</h2>
        <ul className="mt-3 grid gap-2 text-sm">
          {module.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} className="text-accent">
                {source.title}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted">
          Summaries on this site are original. Titles and links point at public pages; they are not excerpts from those works.
        </p>
      </section>

      <nav className="mt-12 flex flex-wrap justify-between gap-3 border-t border-line pt-6 text-sm" aria-label="Lesson">
        {prev ? (
          <Link href={`/modules/${prev.module.id}`}>← {prev.module.title}</Link>
        ) : (
          <span />
        )}
        {next ? <Link href={`/modules/${next.module.id}`}>{next.module.title} →</Link> : null}
      </nav>
    </article>
  );
}
