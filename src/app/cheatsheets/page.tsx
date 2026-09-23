import Link from "next/link";
import type { Metadata } from "next";
import { cheatsheets } from "@/data/cheatsheets";

export const metadata: Metadata = {
  title: "Cheatsheets",
  description: "One-page references you can print or save as PDF from the browser.",
};

export default function CheatsheetsPage() {
  return (
    <div className="mx-auto max-w-page px-5 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.18em] text-accent">One page each</p>
      <h1 className="mt-3 font-serif text-5xl md:text-6xl">Cheatsheets</h1>
      <p className="mt-4 max-w-3xl text-lg text-ink-soft">
        Print from the browser, or choose “Save as PDF” in the print dialog. No file is generated on a server. Navigation
        and buttons drop out of the printed page.
      </p>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {cheatsheets.map((sheet) => (
          <li key={sheet.id}>
            <Link
              href={`/cheatsheets/${sheet.id}`}
              className="block h-full rounded-3xl border border-line bg-[color:var(--paper-raised)] p-5 no-underline hover:border-ink"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-muted">{sheet.kicker}</p>
              <h2 className="mt-2 font-serif text-3xl text-ink">{sheet.title}</h2>
              <p className="mt-2 text-ink-soft">{sheet.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
