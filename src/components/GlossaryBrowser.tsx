"use client";

import { useMemo, useState } from "react";
import { terms, termAnchor, type GlossaryTerm } from "@/lib/content";
import { LinkedText } from "@/lib/link-terms";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function GlossaryBrowser() {
  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState<string | null>(null);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return terms.filter((entry) => {
      if (letter && !entry.term.toUpperCase().startsWith(letter)) return false;
      if (!needle) return true;
      return (
        entry.term.toLowerCase().includes(needle) ||
        entry.definition.toLowerCase().includes(needle)
      );
    });
  }, [query, letter]);

  const present = new Set(terms.map((entry) => entry.term[0]?.toUpperCase()));

  return (
    <div>
      <div className="panel p-4 sm:p-5">
        <label htmlFor="glossary-search" className="eyebrow">
          Search {terms.length} terms
        </label>
        <input
          id="glossary-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try stewardship, FAIR, lineage…"
          className="mt-3 w-full rounded-2xl border border-line bg-white px-4 py-3 text-base outline-none"
        />
        <div className="mt-4 flex flex-wrap gap-1" role="group" aria-label="Filter by letter">
          <button
            type="button"
            aria-pressed={letter === null}
            onClick={() => setLetter(null)}
            className={`h-9 rounded-full px-3 text-sm font-bold ${
              letter === null ? "bg-ink text-white" : "bg-paper-deep"
            }`}
          >
            All
          </button>
          {LETTERS.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={letter === item}
              disabled={!present.has(item)}
              onClick={() => setLetter(item)}
              className={`h-9 w-9 rounded-full text-sm font-bold disabled:opacity-30 ${
                letter === item ? "bg-ink text-white" : "bg-paper-deep"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm text-ink-soft" aria-live="polite">
        {visible.length} {visible.length === 1 ? "term" : "terms"}
      </p>

      {visible.length === 0 ? (
        <p className="panel mt-4 p-6 text-ink-soft">No terms match that search.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {visible.map((entry) => (
            <TermCard key={entry.term} entry={entry} />
          ))}
        </ul>
      )}
    </div>
  );
}

function TermCard({ entry }: { entry: GlossaryTerm }) {
  return (
    <li id={termAnchor(entry.term)} className="panel scroll-mt-28 p-4 sm:p-5">
      <h2 className="display text-2xl">{entry.term}</h2>
      <p className="mt-2 leading-7 text-ink-soft">
        <LinkedText text={entry.definition} except={entry.term} />
      </p>
    </li>
  );
}
