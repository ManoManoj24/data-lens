import type { Lesson } from "@/lib/content";
import { LinkedText } from "@/lib/link-terms";
import { CompleteButton } from "@/components/progress-ui";
import { Quiz } from "@/components/Quiz";
import { LessonVisual } from "@/components/Visuals";

export function LessonBody({
  lesson,
  compact = false,
}: {
  lesson: Lesson;
  compact?: boolean;
}) {
  return (
    <div className="space-y-6">
      {compact ? null : <LessonVisual lesson={lesson} />}
      <p className={compact ? "text-base leading-7 text-ink-soft" : "lead"}>
        <LinkedText text={lesson.summary} />
      </p>
      <section aria-labelledby={`points-${lesson.id}`}>
        <h3 id={`points-${lesson.id}`} className="display text-2xl">
          Key points
        </h3>
        <ol className="mt-3 grid gap-3">
          {lesson.keyPoints.map((point, index) => (
            <li key={point} className="panel flex gap-3 p-3 sm:p-4">
              <span className="display mt-0.5 w-8 shrink-0 text-lg text-lens">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="leading-7">
                <LinkedText text={point} />
              </p>
            </li>
          ))}
        </ol>
      </section>
      <section aria-labelledby={`quiz-${lesson.id}`}>
        <h3 id={`quiz-${lesson.id}`} className="display text-2xl">
          Check your understanding
        </h3>
        <div className="mt-3">
          <Quiz questions={lesson.quiz} resetKey={lesson.id} />
        </div>
      </section>
      <section aria-labelledby={`sources-${lesson.id}`}>
        <h3 id={`sources-${lesson.id}`} className="display text-2xl">
          Sources
        </h3>
        <ul className="mt-3 space-y-2">
          {lesson.sources.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                className="font-semibold text-lens-deep underline decoration-line underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                {source.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
      <CompleteButton moduleId={lesson.id} />
    </div>
  );
}
