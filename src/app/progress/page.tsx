import type { Metadata } from "next";
import Link from "next/link";
import { CompleteDot } from "@/components/ContinueLink";
import { getTracks } from "@/lib/curriculum";

export const metadata: Metadata = {
  title: "Progress",
  description: "Lesson completion stored in this browser.",
};

export default function ProgressPage() {
  const tracks = getTracks();

  return (
    <div className="mx-auto max-w-page px-5 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.18em] text-accent">This browser</p>
      <h1 className="mt-3 font-serif text-5xl">Progress</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">
        A lesson is marked complete when you pass its quiz. The list stays in localStorage under
        datalens.completedModules and is not tied to an account.
      </p>
      <div className="mt-8 grid gap-6">
        {tracks.map((track) => (
          <section key={track.id}>
            <h2 className="font-serif text-3xl">
              <Link href={`/tracks/${track.id}`}>{track.title}</Link>
            </h2>
            <ul className="mt-3 grid gap-2">
              {track.modules.map((module) => (
                <li key={module.id}>
                  <Link
                    href={`/modules/${module.id}`}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-line bg-[color:var(--paper-raised)] px-4 py-3 no-underline hover:border-ink"
                  >
                    <span>{module.title}</span>
                    <CompleteDot moduleId={module.id} />
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
