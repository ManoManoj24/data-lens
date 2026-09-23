"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/content";

export function Quiz({
  questions,
  resetKey,
}: {
  questions: QuizQuestion[];
  resetKey: string;
}) {
  return (
    <div className="space-y-5" key={resetKey}>
      {questions.map((question, index) => (
        <QuestionCard key={`${resetKey}-${index}`} question={question} number={index + 1} total={questions.length} />
      ))}
    </div>
  );
}

function QuestionCard({
  question,
  number,
  total,
}: {
  question: QuizQuestion;
  number: number;
  total: number;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const correct = picked === question.answerIndex;

  return (
    <fieldset className="panel p-4 sm:p-5">
      <legend className="px-1 text-sm font-bold text-ink-soft">
        Question {number} of {total}
      </legend>
      <p className="display mt-2 text-xl">{question.q}</p>
      <div className="mt-4 grid gap-2" role="radiogroup" aria-label={question.q}>
        {question.choices.map((choice, index) => {
          const selected = picked === index;
          const showCorrect = checked && index === question.answerIndex;
          const showWrong = checked && selected && !correct;
          return (
            <button
              key={choice}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={checked}
              onClick={() => setPicked(index)}
              className={`rounded-xl border px-3 py-3 text-left text-sm leading-6 ${
                showCorrect
                  ? "border-lens bg-[#e7f3f2]"
                  : showWrong
                    ? "border-rose bg-[#f8ecee]"
                    : selected
                      ? "border-ink bg-paper"
                      : "border-line bg-card hover:border-ink"
              }`}
            >
              <span className="mr-2 font-bold text-ink-soft">{String.fromCharCode(65 + index)}</span>
              {choice}
              {showCorrect ? <span className="ml-2 font-bold text-lens-deep">Correct answer</span> : null}
              {showWrong ? <span className="ml-2 font-bold text-rose">Your choice</span> : null}
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {checked ? (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setChecked(false);
              setPicked(null);
            }}
          >
            Try again
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            disabled={picked === null}
            onClick={() => setChecked(true)}
          >
            Check answer
          </button>
        )}
      </div>
      {checked ? (
        <p className="mt-4 text-sm leading-6" role="status">
          <span className="font-bold">{correct ? "Correct. " : "Not quite. "}</span>
          {question.explain}
        </p>
      ) : null}
    </fieldset>
  );
}
