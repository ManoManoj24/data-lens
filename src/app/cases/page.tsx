import Link from "next/link";
import type { Metadata } from "next";
import { getCases } from "@/lib/curriculum";

export const metadata: Metadata = { title: "Case studies" };

export default function CasesPage() {
  const cases = getCases();
  return (
    <div className="mx-auto max-w-page px-5 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.18em] text-accent">End to end</p>
      <h1 className="mt-3 font-serif text-5xl md:text-6xl">Case studies</h1>
      <p className="mt-4 max-w-3xl text-lg text-ink-soft">
        Three stories with the same spine as the journey: a product catalog, a customer identity conflict, and a dataset
        someone else should be able to reuse.
      </p>
      <ul className="mt-8 grid gap-4">
        {cases.map((study) => (
          <li key={study.id}>
            <Link href={`/cases/${study.id}`} className="block rounded-3xl border border-line bg-[color:var(--paper-raised)] p-5 no-underline hover:border-ink md:p-7">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">
                {study.kicker} · {study.minutes} min · {study.domains.join(" · ")}
              </p>
              <h2 className="mt-2 font-serif text-4xl text-ink">{study.title}</h2>
              <p className="mt-2 max-w-3xl text-ink-soft">{study.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
