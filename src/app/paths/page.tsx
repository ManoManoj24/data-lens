import Link from "next/link";
import type { Metadata } from "next";
import { getModule, getPaths, pathMinutes } from "@/lib/curriculum";

export const metadata: Metadata = {
  title: "Learning paths",
  description: "Three guided routes through Data Lens: beginner, practitioner, and governance lead.",
};

export default function PathsPage() {
  const paths = getPaths();

  return (
    <div className="mx-auto max-w-page px-5 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.18em] text-accent">Guided routes</p>
      <h1 className="mt-3 font-serif text-5xl md:text-6xl">Learning paths</h1>
      <p className="mt-4 max-w-3xl text-lg text-ink-soft">
        Pick a route by the job in front of you. Each step is a full lesson. Time is a reading estimate, not a gate.
      </p>
      <div className="mt-10 grid gap-8">
        {paths.map((path) => (
          <article key={path.id} id={path.id} className="scroll-mt-24 rounded-3xl border border-line bg-[color:var(--paper-raised)] p-5 md:p-7">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">
              {path.audience} · about {pathMinutes(path)} min
            </p>
            <h2 className="mt-2 font-serif text-4xl">{path.title}</h2>
            <p className="mt-3 max-w-3xl text-ink-soft">{path.summary}</p>
            <p className="mt-3 max-w-3xl text-sm">
              <span className="font-medium">You will be able to </span>
              {path.outcome}
            </p>
            <ol className="mt-5 grid gap-2">
              {path.steps.map((step, index) => {
                const found = getModule(step.moduleId);
                return (
                  <li key={step.moduleId}>
                    <Link
                      href={`/modules/${step.moduleId}`}
                      className="grid gap-1 rounded-2xl border border-line bg-paper px-4 py-3 no-underline hover:border-ink sm:grid-cols-[auto_1fr]"
                    >
                      <span className="font-serif text-lg text-muted">{String(index + 1).padStart(2, "0")}</span>
                      <span>
                        <span className="block text-ink">{found?.module.title ?? step.moduleId}</span>
                        <span className="text-sm text-muted">{step.note}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </article>
        ))}
      </div>
    </div>
  );
}
