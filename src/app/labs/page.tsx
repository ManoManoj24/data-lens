import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Labs",
  description: "Interactive practice: quality scores, RACI, and lifecycle choices.",
};

const LABS = [
  {
    href: "/labs/quality-score",
    title: "Quality score",
    text: "Edit sample product rows or move dimension sliders. Watch a weighted fitness score and which lens is weakest.",
  },
  {
    href: "/labs/raci",
    title: "RACI for a real decision",
    text: "Retire a customer attribute. Assign Responsible, Accountable, Consulted, and Informed, then save the matrix in this browser.",
  },
  {
    href: "/labs/lifecycle-choice",
    title: "Lifecycle choices",
    text: "Four situations from the beanie and Maya story. Pick the next action and read the consequence.",
  },
];

export default function LabsPage() {
  return (
    <div className="mx-auto max-w-page px-5 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.18em] text-accent">Practice</p>
      <h1 className="mt-3 font-serif text-5xl md:text-6xl">Labs</h1>
      <p className="mt-4 max-w-3xl text-lg text-ink-soft">
        Short tools for decisions the lessons describe. Nothing leaves this browser. Completed lessons stay in their own saved list.
      </p>
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {LABS.map((lab) => (
          <li key={lab.href}>
            <Link href={lab.href} className="block h-full rounded-3xl border border-line bg-[color:var(--paper-raised)] p-5 no-underline hover:border-ink">
              <h2 className="font-serif text-3xl text-ink">{lab.title}</h2>
              <p className="mt-2 text-ink-soft">{lab.text}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
