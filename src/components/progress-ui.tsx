"use client";

import Link from "next/link";
import {
  allLessons,
  firstSentence,
  moduleCount,
  slugForTrack,
  TRACK_ACCENT,
  tracks,
} from "@/lib/content";
import { percent, useProgress } from "@/lib/progress";

export function ProgressMeter({
  moduleIds,
  label,
}: {
  moduleIds: string[];
  label: string;
}) {
  const { ready, completed } = useProgress();
  const done = moduleIds.filter((id) => completed.has(id)).length;
  const value = ready ? percent(done, moduleIds.length) : 0;

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm text-ink-soft">
        <span>{label}</span>
        <span>{ready ? `${value}% · ${done}/${moduleIds.length}` : "Saved in this browser"}</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-paper-deep"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-label={`${label} progress`}
      >
        <div className="h-full rounded-full bg-lens" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function CompleteButton({ moduleId }: { moduleId: string }) {
  const { ready, isComplete, toggle } = useProgress();
  const done = ready && isComplete(moduleId);

  return (
    <button
      type="button"
      className={`btn ${done ? "btn-secondary" : "btn-primary"}`}
      aria-pressed={done}
      disabled={!ready}
      onClick={() => toggle(moduleId)}
    >
      {done ? "Completed · undo" : "Mark complete"}
    </button>
  );
}

export function HomeTracks() {
  const { ready, completed } = useProgress();
  const total = moduleCount();
  const done = ready ? completed.size : 0;
  const ordered = allLessons();
  const nextLesson = ordered.find((item) => !completed.has(item.module.id));
  const overall = ready ? percent(done, total) : 0;

  return (
    <div className="mt-14 space-y-8">
      <section className="panel p-5 sm:p-6" aria-labelledby="progress-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Progress</p>
            <h2 id="progress-heading" className="display mt-2 text-3xl">
              {ready ? `${overall}% of the guide` : "Progress stays on this device"}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-ink-soft">
            {ready && nextLesson
              ? `Next up: ${nextLesson.module.title}`
              : ready
                ? "Every lesson in this browser is marked complete."
                : "Mark a lesson complete and the rings update. Nothing is sent to a server."}
          </p>
        </div>
        <div className="mt-5">
          <ProgressMeter moduleIds={ordered.map((item) => item.module.id)} label="All lessons" />
        </div>
        {nextLesson ? (
          <Link className="btn btn-primary mt-5" href={nextLesson.href}>
            {done === 0 ? "Start the first lesson" : "Continue"}
          </Link>
        ) : null}
      </section>

      <section aria-labelledby="tracks-heading">
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 id="tracks-heading" className="display text-3xl">
            Six tracks
          </h2>
          <Link href="/learn" className="text-sm font-semibold text-lens-deep">
            Browse every lesson
          </Link>
        </div>
        <ul className="grid gap-4 md:grid-cols-2">
          {tracks.map((track) => {
            const accent = TRACK_ACCENT[track.id] ?? "#0e6a67";
            const href = `/learn/${slugForTrack(track.id)}`;
            return (
              <li key={track.id}>
                <article className="panel h-full overflow-hidden">
                  <div className="h-1.5" style={{ background: accent }} />
                  <div className="p-5">
                    <p className="text-sm font-semibold text-ink-soft">
                      {track.modules.length} lessons
                    </p>
                    <h3 className="display mt-1 text-2xl">
                      <Link href={href} className="hover:text-lens-deep">
                        {track.title}
                      </Link>
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-soft">
                      {firstSentence(track.modules[0]?.summary ?? "")}
                    </p>
                    <div className="mt-4">
                      <ProgressMeter
                        moduleIds={track.modules.map((module) => module.id)}
                        label="Track"
                      />
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export function ProgressBoard() {
  const { ready, completed, toggle } = useProgress();

  return (
    <div className="space-y-8">
      <ProgressMeter
        moduleIds={allLessons().map((item) => item.module.id)}
        label="All lessons"
      />
      {tracks.map((track) => (
        <section key={track.id} aria-labelledby={`board-${track.id}`} className="panel p-4 sm:p-5">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <h2 id={`board-${track.id}`} className="display text-2xl">
              <Link href={`/learn/${slugForTrack(track.id)}`} className="hover:text-lens-deep">
                {track.title}
              </Link>
            </h2>
          </div>
          <ProgressMeter
            moduleIds={track.modules.map((module) => module.id)}
            label={track.title}
          />
          <ul className="mt-4 divide-y divide-line">
            {track.modules.map((module, index) => {
              const done = ready && completed.has(module.id);
              return (
                <li key={module.id} className="flex items-center gap-3 py-3">
                  <button
                    type="button"
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${
                      done
                        ? "border-lens bg-lens text-white"
                        : "border-line bg-card text-ink"
                    }`}
                    aria-pressed={done}
                    aria-label={`${done ? "Mark incomplete" : "Mark complete"}: ${module.title}`}
                    disabled={!ready}
                    onClick={() => toggle(module.id)}
                  >
                    {done ? "✓" : String(index + 1).padStart(2, "0")}
                  </button>
                  <Link
                    href={`/learn/${slugForTrack(track.id)}/${module.id}`}
                    className="font-semibold hover:text-lens-deep"
                  >
                    {module.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

export function CompletionMark({ moduleId }: { moduleId: string }) {
  const { ready, isComplete } = useProgress();
  if (!ready || !isComplete(moduleId)) return null;
  return (
    <span className="rounded-full bg-lens px-2 py-0.5 text-xs font-bold text-white">
      Done
    </span>
  );
}
