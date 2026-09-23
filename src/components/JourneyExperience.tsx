"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { Journey, JourneyStage } from "@/lib/types";

const VISIT_KEY = "datalens.journeyVisited";

export function JourneyExperience({
  journey,
  titles,
}: {
  journey: Journey;
  titles: Record<string, string>;
}) {
  const params = useSearchParams();
  const router = useRouter();
  const requested = params.get("stage");
  const initial = journey.stages.find((stage) => stage.id === requested)?.id ?? journey.stages[0].id;
  const [stageId, setStageId] = useState(initial);
  const [visited, setVisited] = useState<string[]>([]);

  useEffect(() => {
    const fromQuery = journey.stages.find((stage) => stage.id === requested)?.id;
    if (fromQuery) setStageId(fromQuery);
  }, [journey.stages, requested]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(VISIT_KEY);
      const parsed = raw ? (JSON.parse(raw) as unknown) : [];
      const prior = Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
      const next = prior.includes(stageId) ? prior : [...prior, stageId];
      localStorage.setItem(VISIT_KEY, JSON.stringify(next));
      setVisited(next);
    } catch {
      setVisited([stageId]);
    }
  }, [stageId]);

  const stage = useMemo(
    () => journey.stages.find((item) => item.id === stageId) ?? journey.stages[0],
    [journey.stages, stageId],
  );

  function select(next: JourneyStage) {
    setStageId(next.id);
    router.replace(`/journey?stage=${next.id}`, { scroll: false });
  }

  return (
    <div>
      <div className="mt-8 grid gap-4 rounded-3xl border border-line bg-[color:var(--paper-raised)] p-4 md:grid-cols-2 md:p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Product SKU</p>
          <p className="font-serif text-2xl">{journey.sku.name}</p>
          <p className="text-sm text-ink-soft">
            {journey.sku.id} · {journey.sku.story}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Customer</p>
          <p className="font-serif text-2xl">{journey.customer.name}</p>
          <p className="text-sm text-ink-soft">
            {journey.customer.id} · {journey.customer.story}
          </p>
        </div>
      </div>

      <ol className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7" aria-label="Lifecycle stages">
        {journey.stages.map((item) => {
          const current = item.id === stage.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => select(item)}
                aria-current={current ? "step" : undefined}
                className={`h-full w-full rounded-2xl border px-2 py-3 text-left ${
                  current ? "border-ink bg-ink text-[color:var(--paper)]" : "border-line bg-[color:var(--paper-raised)] hover:border-ink"
                }`}
              >
                <span className="block text-[10px] uppercase tracking-[0.14em] opacity-70">
                  {String(item.index).padStart(2, "0")}
                  {visited.includes(item.id) && !current ? " · seen" : ""}
                </span>
                <span className="mt-1 block font-serif text-lg leading-tight">{item.title}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 grid gap-3 md:grid-cols-[1fr_1fr]">
        <Lane title="What happens to the SKU" beat={stage.productBeat} body={stage.productDetail} />
        <Lane title="What happens to the customer" beat={stage.customerBeat} body={stage.customerDetail} />
      </div>

      <section className="mt-6 rounded-3xl border border-line bg-[color:var(--paper-raised)] p-5 md:p-7">
        <p className="text-xs uppercase tracking-[0.16em] text-accent">Stage {stage.index} · {stage.short}</p>
        <h2 className="mt-2 font-serif text-4xl">{stage.title}</h2>
        <p className="mt-3 max-w-3xl text-lg text-ink-soft">{stage.whatHappens}</p>
        <dl className="mt-6 grid gap-4 md:grid-cols-3">
          <Info label="Who owns it" text={stage.whoOwns} />
          <Info label="Quality risk" text={stage.qualityRisk} />
          <Info label="Governance checkpoint" text={stage.governance} />
        </dl>
        <div className="mt-6">
          <h3 className="font-serif text-2xl">Go deeper</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {stage.lessons.map((id) => (
              <li key={id}>
                <Link
                  href={`/modules/${id}?from=journey&stage=${stage.id}`}
                  className="inline-block rounded-full border border-line bg-paper px-3 py-1.5 text-sm no-underline hover:border-ink"
                >
                  {titles[id] ?? id}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {journey.stages.map((item) => (
            <span key={item.id} className="sr-only">
              {item.productBeat} {item.customerBeat}
            </span>
          ))}
          <button
            type="button"
            className="rounded-full border border-line px-4 py-2 text-sm disabled:opacity-40"
            disabled={stage.index === 1}
            onClick={() => select(journey.stages[stage.index - 2])}
          >
            Previous stage
          </button>
          <button
            type="button"
            className="rounded-full bg-accent px-4 py-2 text-sm text-[color:var(--paper)] disabled:opacity-40"
            disabled={stage.index === journey.stages.length}
            onClick={() => select(journey.stages[stage.index])}
          >
            Next stage
          </button>
        </div>
      </section>
    </div>
  );
}

function Lane({ title, beat, body }: { title: string; beat: string; body: string }) {
  return (
    <article className="rounded-3xl border border-line bg-paper p-5">
      <p className="text-xs uppercase tracking-[0.16em] text-muted">{title}</p>
      <h3 className="mt-2 font-serif text-2xl">{beat}</h3>
      <p className="mt-3 text-ink-soft">{body}</p>
    </article>
  );
}

function Info({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-4">
      <dt className="text-xs uppercase tracking-[0.14em] text-clay">{label}</dt>
      <dd className="mt-2 text-sm">{text}</dd>
    </div>
  );
}
