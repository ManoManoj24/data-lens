"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useProgress } from "@/components/ProgressProvider";
import type { QuizQuestion } from "@/lib/types";

export function Checklist({ moduleId, items }: { moduleId: string; items: string[] }) {
  const storageKey = `datalens.checklist.${moduleId}`;
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed) && parsed.length === items.length) {
        setChecked(parsed.map(Boolean));
      }
    } catch {
      /* keep defaults */
    }
  }, [items.length, storageKey]);

  function toggle(index: number) {
    setChecked((prev) => {
      const next = prev.map((value, i) => (i === index ? !value : value));
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  }

  const done = checked.filter(Boolean).length;

  return (
    <section className="mt-10" aria-labelledby="checklist-heading">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="checklist-heading" className="font-serif text-3xl">
          Checklist
        </h2>
        <p className="text-sm text-muted">
          {done} of {items.length} on this browser
        </p>
      </div>
      <ul className="mt-4 grid gap-2">
        {items.map((item, index) => (
          <li key={item}>
            <label className="flex cursor-pointer gap-3 rounded-xl border border-line bg-[color:var(--paper-raised)] px-3 py-3">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-[color:var(--accent)]"
                checked={checked[index] ?? false}
                onChange={() => toggle(index)}
              />
              <span>{item}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Quiz({ moduleId, questions }: { moduleId: string; questions: QuizQuestion[] }) {
  const { isComplete, markComplete } = useProgress();
  const [answers, setAnswers] = useState<number[]>(() => questions.map(() => -1));
  const [submitted, setSubmitted] = useState(false);
  const complete = isComplete(moduleId);
  const allAnswered = answers.every((answer) => answer >= 0);
  const correctCount = questions.filter((question, index) => answers[index] === question.answerIndex).length;
  const allCorrect = submitted && correctCount === questions.length;

  useEffect(() => {
    if (allCorrect) markComplete(moduleId);
  }, [allCorrect, markComplete, moduleId]);

  return (
    <section className="mt-12" aria-labelledby="quiz-heading">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 id="quiz-heading" className="font-serif text-3xl">
          Check yourself
        </h2>
        {complete ? (
          <p className="rounded-full bg-good px-3 py-1 text-sm text-white">Lesson complete</p>
        ) : (
          <p className="text-sm text-muted">Pass every question to mark the lesson complete.</p>
        )}
      </div>
      <ol className="mt-4 grid gap-5">
        {questions.map((question, qIndex) => (
          <li key={question.q} className="rounded-2xl border border-line bg-[color:var(--paper-raised)] p-4 md:p-5">
            <p className="font-medium">
              {qIndex + 1}. {question.q}
            </p>
            <fieldset className="mt-3 grid gap-2">
              <legend className="sr-only">{question.q}</legend>
              {question.choices.map((choice, cIndex) => {
                const selected = answers[qIndex] === cIndex;
                const show = submitted && selected;
                const right = cIndex === question.answerIndex;
                return (
                  <label
                    key={choice}
                    className={`flex cursor-pointer gap-3 rounded-xl border px-3 py-2 ${
                      show && right
                        ? "border-good bg-good/10"
                        : show && !right
                          ? "border-clay bg-clay/10"
                          : "border-line bg-paper"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`${moduleId}-q${qIndex}`}
                      className="mt-1"
                      checked={selected}
                      onChange={() => {
                        setAnswers((prev) => prev.map((value, i) => (i === qIndex ? cIndex : value)));
                        setSubmitted(false);
                      }}
                    />
                    <span>{choice}</span>
                  </label>
                );
              })}
            </fieldset>
            {submitted ? <p className="mt-3 text-sm text-ink-soft">{question.explain}</p> : null}
          </li>
        ))}
      </ol>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="rounded-full bg-ink px-4 py-2 text-sm text-[color:var(--paper)] disabled:opacity-40"
          disabled={!allAnswered}
          onClick={() => setSubmitted(true)}
        >
          Check answers
        </button>
        {submitted ? (
          <p className="text-sm">
            {correctCount} of {questions.length} correct.
            {allCorrect ? " Progress saved on this browser." : " Adjust the misses and check again."}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function SeeAlso({ ids }: { ids: { id: string; title: string }[] }) {
  if (ids.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="font-serif text-3xl">See also</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {ids.map((item) => (
          <li key={item.id}>
            <Link href={`/modules/${item.id}`} className="inline-block rounded-full border border-line bg-[color:var(--paper-raised)] px-3 py-1.5 text-sm no-underline hover:border-ink">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
