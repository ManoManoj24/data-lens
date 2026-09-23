import Link from "next/link";
import { terms, termAnchor } from "@/lib/content";

type Phrase = { phrase: string; term: string };

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function phrasesFor(term: string) {
  const phrases = new Set<string>([term]);
  const withoutNote = term.replace(/\s*\(high-level\)\s*/gi, "").trim();
  if (withoutNote) phrases.add(withoutNote);
  const acronym = term.match(/\(([A-Z][A-Z0-9-]*)\)/);
  if (acronym) phrases.add(acronym[1]);
  const withoutParen = term.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();
  if (withoutParen) phrases.add(withoutParen);
  if (withoutNote.includes("/")) {
    for (const part of withoutNote.split("/")) {
      const piece = part.trim();
      if (piece.length >= 4) phrases.add(piece);
    }
  }
  const first = term.split(" ")[0];
  if (/^[A-Z0-9-]{3,}$/.test(first)) phrases.add(first);
  return [...phrases];
}

const phraseMap = new Map<string, string>();
const phrases: Phrase[] = [];

for (const entry of terms) {
  for (const phrase of phrasesFor(entry.term)) {
    const key = phrase.toLowerCase();
    if (!phraseMap.has(key)) {
      phraseMap.set(key, entry.term);
      phrases.push({ phrase, term: entry.term });
    }
  }
}

phrases.sort((a, b) => b.phrase.length - a.phrase.length);

const termPattern = new RegExp(
  `(?<![A-Za-z0-9])(${phrases.map((item) => escapeRegExp(item.phrase)).join("|")})(?![A-Za-z0-9])`,
  "gi",
);

export function LinkedText({
  text,
  except,
}: {
  text: string;
  except?: string;
}) {
  const nodes: React.ReactNode[] = [];
  const used = new Set<string>();
  const matcher = new RegExp(termPattern.source, "gi");
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = matcher.exec(text))) {
    const phrase = match[0];
    const start = match.index;
    if (start > last) nodes.push(text.slice(last, start));
    const canonical = phraseMap.get(phrase.toLowerCase());
    if (!canonical || canonical === except || used.has(canonical)) {
      nodes.push(phrase);
    } else {
      used.add(canonical);
      nodes.push(
        <Link
          key={`${canonical}-${start}`}
          href={`/glossary#${termAnchor(canonical)}`}
          className="glossary-link"
        >
          {phrase}
        </Link>,
      );
    }
    last = start + phrase.length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}
