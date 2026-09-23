import type { Metadata } from "next";
import Link from "next/link";
import { bibliography, bibliographyIntro, nonUseNotes } from "@/data/bibliography";
import { citations } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sources",
  description: "Annotated bibliography and lesson citations for Data Lens.",
};

export default function SourcesPage() {
  const used = citations();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="eyebrow">Bibliography</p>
      <h1 className="display mt-2 text-4xl sm:text-5xl">Sources</h1>
      <p className="lead mt-4">{bibliographyIntro}</p>
      <p className="mt-4 rounded-2xl border border-gold/40 bg-[#f8f1e2] px-4 py-3 text-sm leading-6">
        Not legal advice. Governance and GDPR modules are educational overviews. Implementers
        should consult qualified counsel and security professionals for their jurisdiction and
        industry.
      </p>

      <div className="mt-10 space-y-10">
        {bibliography.map((section) => (
          <section key={section.id} aria-labelledby={section.id}>
            <h2 id={section.id} className="display text-3xl">
              {section.title}
            </h2>
            <ol className="mt-4 space-y-4">
              {section.items.map((item) => (
                <li key={item.title} className="panel p-4">
                  <h3 className="font-bold">{item.title}</h3>
                  <ul className="mt-2 space-y-1">
                    {item.urls.map((url) => (
                      <li key={url.href}>
                        <a
                          href={url.href}
                          className="text-sm font-semibold text-lens-deep underline underline-offset-4"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {url.label ?? url.href}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{item.note}</p>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <section className="mt-12" aria-labelledby="non-use">
        <h2 id="non-use" className="display text-3xl">
          Notes on intentional non-use
        </h2>
        <ul className="mt-4 space-y-3">
          {nonUseNotes.map((note) => (
            <li key={note} className="panel p-4 text-sm leading-6">
              {note}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="cited-in">
        <h2 id="cited-in" className="display text-3xl">
          Cited in lessons
        </h2>
        <p className="mt-2 text-sm text-ink-soft">
          Every source attached to a lesson, with the lessons that cite it.
        </p>
        <ul className="mt-4 space-y-4">
          {used.map((source) => (
            <li key={source.url} className="panel p-4">
              <a
                href={source.url}
                className="font-bold text-lens-deep underline underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                {source.title}
              </a>
              <ul className="mt-2 flex flex-wrap gap-2">
                {source.lessons.map((lesson) => (
                  <li key={lesson.href}>
                    <Link
                      href={lesson.href}
                      className="inline-flex rounded-full bg-paper-deep px-3 py-1 text-xs font-semibold"
                    >
                      {lesson.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
