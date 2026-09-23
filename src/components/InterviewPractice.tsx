"use client";

import { useEffect, useState } from "react";
import { interviewCards } from "@/data/interview";

const KEY = "datalens.interviewMarks";

type Mark = "correct" | "incorrect";

export function InterviewPractice() {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [marks, setMarks] = useState<Record<string, Mark>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as unknown;
      if (parsed && typeof parsed === "object") setMarks(parsed as Record<string, Mark>);
    } catch {
      /* keep empty */
    }
  }, []);

  const card = interviewCards[index];
  const marked = Object.keys(marks).length;
  const solid = Object.values(marks).filter((mark) => mark === "correct").length;

  function mark(value: Mark) {
    const next = { ...marks, [card.id]: value };
    setMarks(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  function go(nextIndex: number) {
    setIndex(nextIndex);
    setRevealed(false);
  }

  return (
    <div>
      <p className="text-sm text-muted">
        {index + 1} of {interviewCards.length} · {solid} marked solid · {marked - solid} to review · saved only in this browser
      </p>
      <article className="mt-4 rounded-3xl border border-line bg-[color:var(--paper-raised)] p-5 md:p-7">
        <p className="text-xs uppercase tracking-[0.16em] text-accent">{card.theme}</p>
        <h2 className="mt-2 font-serif text-3xl leading-snug md:text-4xl">{card.prompt}</h2>
        {revealed ? (
          <div className="mt-5 rounded-2xl border border-line bg-paper p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-muted">A model answer</p>
            <p className="mt-2 text-ink-soft">{card.answer}</p>
          </div>
        ) : (
          <button type="button" className="mt-6 rounded-full bg-ink px-4 py-2 text-sm text-[color:var(--paper)]" onClick={() => setRevealed(true)}>
            Show a model answer
          </button>
        )}
        {revealed ? (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className={`rounded-full px-4 py-2 text-sm ${marks[card.id] === "correct" ? "bg-good text-white" : "border border-line bg-paper"}`}
              onClick={() => mark("correct")}
            >
              I had this
            </button>
            <button
              type="button"
              className={`rounded-full px-4 py-2 text-sm ${marks[card.id] === "incorrect" ? "bg-clay text-white" : "border border-line bg-paper"}`}
              onClick={() => mark("incorrect")}
            >
              I missed this
            </button>
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted">Answer it out loud first. Then compare and mark yourself.</p>
        )}
        <div className="mt-6 flex flex-wrap gap-2">
          <button type="button" className="rounded-full border border-line px-4 py-2 text-sm disabled:opacity-40" disabled={index === 0} onClick={() => go(index - 1)}>
            Previous
          </button>
          <button
            type="button"
            className="rounded-full border border-ink px-4 py-2 text-sm disabled:opacity-40"
            disabled={index === interviewCards.length - 1}
            onClick={() => go(index + 1)}
          >
            Next card
          </button>
        </div>
      </article>
      <ol className="mt-6 grid gap-2 sm:grid-cols-2">
        {interviewCards.map((item, itemIndex) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => go(itemIndex)}
              className={`w-full rounded-2xl border px-3 py-2 text-left text-sm ${itemIndex === index ? "border-ink bg-paper" : "border-line"}`}
            >
              <span className="text-muted">{item.theme}</span>
              <span className="mt-1 block">{marks[item.id] === "correct" ? "Solid" : marks[item.id] === "incorrect" ? "Review" : "Not marked"}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
