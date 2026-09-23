"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import type { SearchDoc, SearchKind } from "@/lib/types";

const LABELS: Record<SearchKind, string> = {
  lesson: "Lessons",
  glossary: "Glossary",
  journey: "Journey",
  case: "Cases",
  lab: "Labs",
  path: "Paths",
};

export function SearchExperience({ docs, initialQuery = "" }: { docs: SearchDoc[]; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [debounced, setDebounced] = useState(initialQuery);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setSearching(true);
    const timer = window.setTimeout(() => {
      setDebounced(query);
      setSearching(false);
    }, 180);
    return () => window.clearTimeout(timer);
  }, [query]);

  const results = useMemo(() => rank(docs, debounced), [docs, debounced]);
  const grouped = useMemo(() => {
    const map = new Map<SearchKind, typeof results>();
    results.forEach((result) => {
      map.set(result.doc.kind, [...(map.get(result.doc.kind) ?? []), result]);
    });
    return map;
  }, [results]);

  return (
    <div>
      <label className="block">
        <span className="text-xs uppercase tracking-[0.16em] text-muted">Search</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try golden record, retention, FAIR, steward…"
          className="mt-2 w-full rounded-2xl border border-line bg-[color:var(--paper-raised)] px-4 py-3 text-lg"
          autoFocus
        />
      </label>
      <p className="mt-3 min-h-6 text-sm text-muted" aria-live="polite">
        {searching ? "Searching…" : debounced.trim() ? `${results.length} matches` : "Search lessons, glossary, cases, labs, and the journey."}
      </p>
      {!debounced.trim() ? (
        <div className="mt-6 rounded-3xl border border-dashed border-line px-5 py-10 text-center">
          <p className="font-serif text-3xl">The library is ready.</p>
          <p className="mx-auto mt-2 max-w-lg text-muted">
            Look up a term, a stage, or a case. Results stay in the browser; nothing is sent to a server.
          </p>
        </div>
      ) : null}
      {debounced.trim() && !searching && results.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-line bg-[color:var(--paper-raised)] px-5 py-10">
          <p className="font-serif text-3xl">No matches for “{debounced.trim()}”.</p>
          <p className="mt-2 text-muted">Try a shorter word: lifecycle, owner, fiber, archive, match.</p>
        </div>
      ) : null}
      <div className="mt-6 grid gap-8">
        {Array.from(grouped.entries()).map(([kind, items]) => (
          <section key={kind}>
            <h2 className="font-serif text-2xl">{LABELS[kind]}</h2>
            <ul className="mt-3 grid gap-3">
              {items.slice(0, 8).map((item) => (
                <li key={item.doc.id}>
                  <Link href={item.doc.href} className="block rounded-2xl border border-line bg-[color:var(--paper-raised)] p-4 no-underline hover:border-ink">
                    <p className="text-xs uppercase tracking-[0.14em] text-muted">{item.doc.kicker}</p>
                    <p className="font-serif text-2xl text-ink">{item.doc.title}</p>
                    <p className="mt-1 text-sm text-ink-soft">{item.snippet}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function rank(docs: SearchDoc[], query: string) {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .map((term) => term.trim())
    .filter((term) => term.length > 1);
  if (terms.length === 0) return [];
  return docs
    .map((doc) => {
      const title = doc.title.toLowerCase();
      const text = doc.text.toLowerCase();
      let score = 0;
      terms.forEach((term) => {
        if (title.includes(term)) score += 5;
        if (doc.kicker.toLowerCase().includes(term)) score += 2;
        const hits = text.split(term).length - 1;
        score += Math.min(hits, 6);
      });
      return { doc, score, snippet: snippet(doc.text, terms[0]) };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
}

function snippet(text: string, term: string) {
  const hay = text.replace(/\s+/g, " ").trim();
  const at = hay.toLowerCase().indexOf(term.toLowerCase());
  if (at < 0) return hay.slice(0, 180);
  const start = Math.max(0, at - 70);
  const slice = hay.slice(start, start + 200);
  return `${start > 0 ? "…" : ""}${slice}${start + 200 < hay.length ? "…" : ""}`;
}
