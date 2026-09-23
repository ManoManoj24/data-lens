"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LessonBody } from "@/components/LessonBody";
import {
  CROSS_CUTS,
  LIFECYCLE_STAGES,
  type Lesson,
} from "@/lib/content";

export function LifecycleExplorer({ lessons }: { lessons: Lesson[] }) {
  const byId = useMemo(
    () => Object.fromEntries(lessons.map((lesson) => [lesson.id, lesson])),
    [lessons],
  );
  const [stageId, setStageId] = useState(LIFECYCLE_STAGES[0].id);
  const stage = LIFECYCLE_STAGES.find((item) => item.id === stageId) ?? LIFECYCLE_STAGES[0];
  const lesson = byId[stage.moduleId];
  const nonlinear = byId["lc-why"]?.keyPoints.find((point) =>
    point.includes("rarely strictly linear"),
  );
  const crossCaption = byId["lc-unified"]?.keyPoints.find((point) =>
    point.startsWith("Cross-cuts"),
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Seven-stage spine</p>
        <h2 className="display mt-2 text-3xl">Select a stage</h2>
        <ol className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-7">
          {LIFECYCLE_STAGES.map((item, index) => {
            const selected = item.id === stage.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  aria-controls="stage-lesson"
                  onClick={() => setStageId(item.id)}
                  className={`flex h-full w-full flex-col items-start rounded-2xl border px-3 py-3 text-left ${
                    selected
                      ? "border-lens bg-lens text-white"
                      : "border-line bg-card text-ink hover:border-lens"
                  }`}
                >
                  <span className={`text-[11px] font-bold ${selected ? "text-white" : "text-lens"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 text-sm font-bold leading-5">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ol>
        {nonlinear ? <p className="mt-3 text-sm leading-6 text-ink-soft">{nonlinear}</p> : null}
      </div>

      <div>
        <h3 className="text-sm font-bold text-ink-soft">Cross-cuts</h3>
        {crossCaption ? <p className="mt-1 text-sm leading-6 text-ink-soft">{crossCaption}</p> : null}
        <ul className="mt-3 flex flex-wrap gap-2">
          {CROSS_CUTS.map((cut) => (
            <li key={cut.id}>
              <Link
                href={cut.href}
                className="inline-flex rounded-full border border-dashed border-lens px-3 py-2 text-sm font-semibold text-lens-deep hover:bg-white"
              >
                {cut.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {lesson ? (
        <article id="stage-lesson" className="panel p-4 sm:p-6" aria-labelledby="stage-lesson-title">
          <p className="eyebrow">{stage.label}</p>
          <h2 id="stage-lesson-title" className="display mt-2 text-3xl" aria-live="polite">
            {lesson.title}
          </h2>
          {lesson.id === "lc-archive-destroy" ? (
            <p className="mt-2 text-sm text-ink-soft">
              Archive and Destroy share this lesson.
            </p>
          ) : null}
          <div className="mt-5">
            <LessonBody lesson={lesson} compact />
          </div>
          <Link className="btn btn-secondary mt-6" href={`/learn/lifecycle/${lesson.id}`}>
            Open the full lesson
          </Link>
        </article>
      ) : null}
    </div>
  );
}
