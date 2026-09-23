"use client";

import { useEffect, useState } from "react";

const KEY = "datalens.fairChecks";

export function FairChecks({
  items,
}: {
  items: { id: string; principle: string; label: string }[];
}) {
  const [checked, setChecked] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) setChecked(parsed.filter((item): item is string => typeof item === "string"));
    } catch {
      /* empty */
    }
  }, []);

  function toggle(id: string) {
    setChecked((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }

  const principles = ["Findable", "Accessible", "Interoperable", "Reusable"];

  return (
    <section className="mt-10 rounded-3xl border border-line bg-[color:var(--paper-raised)] p-4 md:p-6" aria-labelledby="fair-heading">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 id="fair-heading" className="font-serif text-3xl">
          Readiness checklist
        </h2>
        <p className="text-sm text-muted">
          {checked.length} of {items.length} marked on this browser
        </p>
      </div>
      <div className="mt-4 grid gap-5">
        {principles.map((principle) => (
          <fieldset key={principle}>
            <legend className="font-serif text-2xl">{principle}</legend>
            <ul className="mt-2 grid gap-2">
              {items
                .filter((item) => item.principle === principle)
                .map((item) => (
                  <li key={item.id}>
                    <label className="flex gap-3 rounded-xl border border-line bg-paper px-3 py-3">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 accent-[color:var(--accent)]"
                        checked={checked.includes(item.id)}
                        onChange={() => toggle(item.id)}
                      />
                      <span>{item.label}</span>
                    </label>
                  </li>
                ))}
            </ul>
          </fieldset>
        ))}
      </div>
    </section>
  );
}
