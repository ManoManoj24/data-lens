import type { Metadata } from "next";
import { bibliography, bibliographyIntro, nonUseNotes } from "@/data/bibliography";
import { getAllModules } from "@/lib/curriculum";

export const metadata: Metadata = { title: "Sources" };

export default function SourcesPage() {
  const map = new Map<string, string>();
  getAllModules().forEach(({ module }) => {
    module.sources.forEach((source) => map.set(source.url, source.title));
  });
  const sources = Array.from(map.entries()).sort((a, b) => a[1].localeCompare(b[1]));

  return (
    <div className="mx-auto max-w-page px-5 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.18em] text-accent">Bibliography</p>
      <h1 className="mt-3 font-serif text-5xl md:text-6xl">Sources</h1>
      <p className="mt-4 max-w-3xl text-lg text-ink-soft">
        Public pages consulted while writing original Data Lens lessons. Citations are title plus URL. This site does not
        reproduce book chapters or membership-only framework text.
      </p>
      <ul className="mt-8 grid gap-3">
        {sources.map(([url, title]) => (
          <li key={url} className="rounded-2xl border border-line px-4 py-3">
            <a href={url} className="text-accent">
              {title}
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-12 grid gap-8">
        <p className="max-w-3xl text-ink-soft">{bibliographyIntro}</p>
        {bibliography.map((section) => (
          <section key={section.id}>
            <h2 className="font-serif text-3xl">{section.title}</h2>
            <ul className="mt-3 grid gap-3">
              {section.items.map((item) => (
                <li key={item.title} className="rounded-2xl border border-line px-4 py-3">
                  <a href={item.urls[0]?.href} className="text-accent">
                    {item.title}
                  </a>
                  <p className="mt-1 text-sm text-ink-soft">{item.note}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <section>
          <h2 className="font-serif text-3xl">What was not copied</h2>
          <ul className="mt-3 grid gap-2 text-sm text-ink-soft">
            {nonUseNotes.map((note) => (
              <li key={note} className="rounded-2xl border border-line px-4 py-3">
                {note}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
