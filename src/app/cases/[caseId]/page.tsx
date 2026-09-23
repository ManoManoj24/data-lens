import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FairChecks } from "@/components/FairChecks";
import { getCase, getCases, getModule } from "@/lib/curriculum";
import { paragraphs } from "@/lib/prose";

export function generateStaticParams() {
  return getCases().map((study) => ({ caseId: study.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ caseId: string }> }): Promise<Metadata> {
  const { caseId } = await params;
  const study = getCase(caseId);
  return { title: study?.title ?? "Case", description: study?.summary };
}

export default async function CasePage({ params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params;
  const study = getCase(caseId);
  if (!study) notFound();

  return (
    <article className="mx-auto max-w-page px-5 py-12 md:px-8">
      <p className="text-sm text-muted">
        <Link href="/cases">Cases</Link>
        <span> · {study.domains.join(" · ")}</span>
      </p>
      <p className="mt-4 text-xs uppercase tracking-[0.18em] text-accent">{study.kicker}</p>
      <h1 className="mt-3 max-w-4xl font-serif text-5xl leading-tight md:text-6xl">{study.title}</h1>
      <p className="mt-4 max-w-3xl text-lg text-ink-soft">{study.summary}</p>
      <div className="mt-10 grid gap-6">
        {study.sections.map((section, index) => (
          <section key={section.id} className="rounded-3xl border border-line bg-[color:var(--paper-raised)] p-5 md:p-7">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">
              {String(index + 1).padStart(2, "0")} · {section.kicker}
            </p>
            <h2 className="mt-2 font-serif text-4xl">{section.title}</h2>
            <div className="prose-lesson mt-4 max-w-3xl text-lg">
              {paragraphs(section.body).map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
            {section.callout ? (
              <aside className="mt-5 max-w-3xl rounded-2xl border border-l-4 border-line border-l-accent bg-paper px-4 py-3">
                <p className="text-xs uppercase tracking-[0.14em] text-accent">{section.callout.label}</p>
                <p className="mt-1">{section.callout.text}</p>
              </aside>
            ) : null}
            <ul className="mt-4 flex flex-wrap gap-2">
              {section.lessons.map((id) => {
                const found = getModule(id);
                return (
                  <li key={id}>
                    <Link href={`/modules/${id}`} className="inline-block rounded-full border border-line bg-paper px-3 py-1 text-sm no-underline hover:border-ink">
                      {found?.module.title ?? id}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
      {study.fairChecks ? <FairChecks items={study.fairChecks} /> : null}
    </article>
  );
}
