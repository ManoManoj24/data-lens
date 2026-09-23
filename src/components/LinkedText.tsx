import type { ReactNode } from "react";
import Link from "next/link";
import { getGlossary, slugTerm } from "@/lib/curriculum";

type TermLink = { term: string; href: string };

let cached: TermLink[] | null = null;

function linkableTerms(): TermLink[] {
  if (cached) return cached;
  cached = getGlossary()
    .filter((item) => item.term.trim().length >= 4)
    .map((item) => ({ term: item.term.trim(), href: `/glossary#${slugTerm(item.term)}` }))
    .sort((a, b) => b.term.length - a.term.length);
  return cached;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

type Hit = { start: number; end: number; href: string };

function hitsFor(text: string, terms: TermLink[]): Hit[] {
  const hits: Hit[] = [];
  for (const term of terms) {
    const re = new RegExp(`(?<![A-Za-z0-9])${escapeRegExp(term.term)}(?![A-Za-z0-9])`, "i");
    const match = re.exec(text);
    if (!match || match.index === undefined) continue;
    const start = match.index;
    const end = start + match[0].length;
    if (hits.some((hit) => start < hit.end && end > hit.start)) continue;
    hits.push({ start, end, href: term.href });
  }
  hits.sort((a, b) => a.start - b.start);
  return hits;
}

export function LinkedText({ text }: { text: string }) {
  const hits = hitsFor(text, linkableTerms());
  if (hits.length === 0) return <>{text}</>;
  const nodes: ReactNode[] = [];
  let cursor = 0;
  hits.forEach((hit, index) => {
    if (hit.start > cursor) nodes.push(text.slice(cursor, hit.start));
    const label = text.slice(hit.start, hit.end);
    nodes.push(
      <Link key={`${hit.start}-${index}`} href={hit.href} className="decoration-accent/50 underline-offset-2">
        {label}
      </Link>,
    );
    cursor = hit.end;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return <>{nodes}</>;
}
