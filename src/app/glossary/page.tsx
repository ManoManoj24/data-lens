import type { Metadata } from "next";
import { getGlossary, slugTerm } from "@/lib/curriculum";

export const metadata: Metadata = { title: "Glossary" };

export default function GlossaryPage() {
  const terms = getGlossary();
  return (
    <div className="mx-auto max-w-page px-5 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.18em] text-accent">Reference</p>
      <h1 className="mt-3 font-serif text-5xl md:text-6xl">Glossary</h1>
      <p className="mt-4 max-w-3xl text-lg text-ink-soft">
        Short working definitions for the language the lessons use. They are starting points, not a standard’s official text.
      </p>
      <ul className="mt-8 grid gap-3">
        {terms.map((term) => (
          <li key={term.term} id={slugTerm(term.term)} className="scroll-mt-24 rounded-2xl border border-line bg-[color:var(--paper-raised)] px-4 py-3">
            <h2 className="font-serif text-2xl">{term.term}</h2>
            <p className="text-ink-soft">{term.definition}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
