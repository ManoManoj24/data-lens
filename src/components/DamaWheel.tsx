"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LessonBody } from "@/components/LessonBody";
import { DAMA_HUB, DAMA_SPOKES, type Lesson } from "@/lib/content";

const FILLS = [
  "#0f6e6b",
  "#1d6a86",
  "#3f6b4e",
  "#8d5a22",
  "#7d4454",
  "#3c5278",
  "#5c4e32",
  "#1f5c62",
  "#6a4c73",
  "#2f4f46",
];

function polar(cx: number, cy: number, r: number, degFromTop: number) {
  const rad = ((degFromTop - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function slicePath(cx: number, cy: number, r0: number, r1: number, a0: number, a1: number) {
  const [ox0, oy0] = polar(cx, cy, r1, a0);
  const [ox1, oy1] = polar(cx, cy, r1, a1);
  const [ix1, iy1] = polar(cx, cy, r0, a1);
  const [ix0, iy0] = polar(cx, cy, r0, a0);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${ox0} ${oy0} A ${r1} ${r1} 0 ${large} 1 ${ox1} ${oy1} L ${ix1} ${iy1} A ${r0} ${r0} 0 ${large} 0 ${ix0} ${iy0} Z`;
}

export function DamaWheel({ lessons }: { lessons: Lesson[] }) {
  const byId = useMemo(
    () => Object.fromEntries(lessons.map((lesson) => [lesson.id, lesson])),
    [lessons],
  );
  const [selectedId, setSelectedId] = useState(DAMA_HUB);
  const lesson = byId[selectedId];
  const cx = 430;
  const cy = 430;
  const gap = 2.4;
  const span = 360 / DAMA_SPOKES.length;

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
      <div>
        <svg
          viewBox="-180 -70 1220 1040"
          className="mx-auto w-full max-w-[680px]"
          role="group"
          aria-label="DAMA knowledge areas"
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
        >
          <circle cx={cx} cy={cy} r="318" fill="none" stroke="#e7c27a" strokeWidth="1.5" />
          {DAMA_SPOKES.map((spoke, index) => {
            const start = index * span + gap / 2;
            const end = (index + 1) * span - gap / 2;
            const mid = (start + end) / 2;
            const [lx, ly] = polar(cx, cy, 292, mid);
            const rad = ((mid - 90) * Math.PI) / 180;
            const cos = Math.cos(rad);
            const anchor = cos > 0.35 ? "start" : cos < -0.35 ? "end" : "middle";
            const selected = selectedId === spoke.moduleId;
            const title = byId[spoke.moduleId]?.title ?? spoke.lines.join(" ");
            const labelY = ly - (spoke.lines.length - 1) * 8;
            return (
              <g
                key={spoke.moduleId}
                className="wheel-hit"
                role="button"
                tabIndex={0}
                aria-pressed={selected}
                aria-label={title}
                onClick={() => setSelectedId(spoke.moduleId)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedId(spoke.moduleId);
                  }
                }}
              >
                <path
                  d={slicePath(cx, cy, 118, 248, start, end)}
                  fill={selected ? "#e7c27a" : FILLS[index]}
                  stroke={selected ? "#17202b" : "transparent"}
                  strokeWidth="3"
                  className="cursor-pointer"
                />
                <text
                  x={lx}
                  y={labelY}
                  textAnchor={anchor}
                  fill="#17202b"
                  fontSize="14"
                  fontWeight={selected ? 700 : 600}
                  className="wheel-label"
                >
                  {spoke.lines.map((line, lineIndex) => (
                    <tspan key={line} x={lx} dy={lineIndex === 0 ? 0 : 16}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
          <g
            className="wheel-hit"
            role="button"
            tabIndex={0}
            aria-pressed={selectedId === DAMA_HUB}
            aria-label={byId[DAMA_HUB]?.title ?? "Data Governance"}
            onClick={() => setSelectedId(DAMA_HUB)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setSelectedId(DAMA_HUB);
              }
            }}
          >
            <circle
              cx={cx}
              cy={cy}
              r="96"
              fill={selectedId === DAMA_HUB ? "#0e6a67" : "#17202b"}
              stroke="#e7c27a"
              strokeWidth="3"
              className="cursor-pointer"
            />
            <text
              x={cx}
              y={cy - 6}
              textAnchor="middle"
              fill="#f3eee4"
              fontSize="16"
              fontWeight="700"
              className="pointer-events-none"
            >
              Data
            </text>
            <text
              x={cx}
              y={cy + 16}
              textAnchor="middle"
              fill="#f3eee4"
              fontSize="16"
              fontWeight="700"
              className="pointer-events-none"
            >
              Governance
            </text>
          </g>
        </svg>
        <ul className="mt-3 flex flex-wrap gap-2 md:hidden">
          <li>
            <button
              type="button"
              aria-pressed={selectedId === DAMA_HUB}
              onClick={() => setSelectedId(DAMA_HUB)}
              className={`rounded-full px-3 py-2 text-sm font-semibold ${
                selectedId === DAMA_HUB ? "bg-ink text-white" : "bg-card text-ink"
              }`}
            >
              Data Governance
            </button>
          </li>
          {DAMA_SPOKES.map((spoke) => (
            <li key={spoke.moduleId}>
              <button
                type="button"
                aria-pressed={selectedId === spoke.moduleId}
                onClick={() => setSelectedId(spoke.moduleId)}
                className={`rounded-full px-3 py-2 text-sm font-semibold ${
                  selectedId === spoke.moduleId ? "bg-ink text-white" : "bg-card text-ink"
                }`}
              >
                {byId[spoke.moduleId]?.title ?? spoke.lines.join(" ")}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {lesson ? (
        <article className="panel p-4 sm:p-6" aria-labelledby="dama-lesson-title">
          <p className="eyebrow">{selectedId === DAMA_HUB ? "Center" : "Knowledge area"}</p>
          <h2 id="dama-lesson-title" className="display mt-2 text-3xl" aria-live="polite">
            {lesson.title}
          </h2>
          <div className="mt-5">
            <LessonBody lesson={lesson} compact />
          </div>
          <Link className="btn btn-secondary mt-6" href={`/learn/dama/${lesson.id}`}>
            Open the full lesson
          </Link>
        </article>
      ) : null}
    </div>
  );
}
