"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PrintButton } from "@/components/PrintButton";
import type { Journey } from "@/lib/types";

const VISIT_KEY = "datalens.journeyVisited";
const NAME_KEY = "datalens.certificateName";
const WHEN_KEY = "datalens.journeyCompletedAt";

export function CertificateCard({ journey }: { journey: Journey }) {
  const [visited, setVisited] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [name, setName] = useState("");
  const [when, setWhen] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(VISIT_KEY);
      const parsed = raw ? (JSON.parse(raw) as unknown) : [];
      const ids = Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
      setVisited(ids);
      setName(localStorage.getItem(NAME_KEY) ?? "");
      const complete = journey.stages.every((stage) => ids.includes(stage.id));
      if (complete) {
        const existing = localStorage.getItem(WHEN_KEY);
        const stamp = existing || new Date().toISOString().slice(0, 10);
        if (!existing) localStorage.setItem(WHEN_KEY, stamp);
        setWhen(stamp);
      }
    } catch {
      setVisited([]);
    }
    setReady(true);
  }, [journey.stages]);

  const missing = journey.stages.filter((stage) => !visited.includes(stage.id));
  const complete = ready && missing.length === 0;
  const displayName = name.trim() || "A Data Lens reader";

  function saveName(value: string) {
    setName(value);
    localStorage.setItem(NAME_KEY, value);
  }

  async function copyCard() {
    const text = `${displayName} followed the Data Lens journey: ${journey.sku.name} (${journey.sku.id}) and ${journey.customer.name} from plan through destruction. ${when}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (!ready) {
    return <p className="mt-8 text-muted">Checking this browser’s journey…</p>;
  }

  if (!complete) {
    return (
      <div className="mt-8 rounded-3xl border border-line bg-[color:var(--paper-raised)] p-5 md:p-7">
        <h2 className="font-serif text-3xl">The certificate opens when every stage has been opened.</h2>
        <p className="mt-3 max-w-2xl text-ink-soft">
          {visited.length} of {journey.stages.length} stages are recorded on this browser. Nothing is sent to a server.
        </p>
        <ul className="mt-4 grid gap-2">
          {missing.map((stage) => (
            <li key={stage.id}>
              <Link href={`/journey?stage=${stage.id}`} className="text-accent">
                Open {stage.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="no-print mb-4 flex flex-wrap gap-2">
        <PrintButton label="Print title card" />
        <button type="button" className="rounded-full border border-ink px-4 py-2 text-sm" onClick={copyCard}>
          {copied ? "Copied" : "Copy a share line"}
        </button>
      </div>
      <label className="no-print block max-w-md text-sm">
        Name on the card
        <input
          value={name}
          onChange={(event) => saveName(event.target.value)}
          placeholder="Your name"
          className="mt-1 w-full rounded-xl border border-line bg-[color:var(--paper-raised)] px-3 py-2"
        />
      </label>
      <section
        id="certificate"
        className="mx-auto mt-6 max-w-3xl rounded-3xl border-2 border-ink bg-[color:var(--paper-raised)] px-6 py-10 text-center md:px-12"
      >
        <p className="text-xs uppercase tracking-[0.22em] text-accent">Data Lens</p>
        <h2 className="mt-3 font-serif text-4xl md:text-5xl">Journey complete</h2>
        <p className="mt-6 font-serif text-3xl">{displayName}</p>
        <p className="mx-auto mt-4 max-w-xl text-ink-soft">
          Followed one product and one customer from the decision to create their data through archive and destruction.
        </p>
        <dl className="mx-auto mt-6 grid max-w-lg gap-3 text-left text-sm sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-paper p-3">
            <dt className="text-xs uppercase tracking-[0.14em] text-muted">Product</dt>
            <dd className="mt-1">
              {journey.sku.name}
              <span className="block text-muted">{journey.sku.id}</span>
            </dd>
          </div>
          <div className="rounded-2xl border border-line bg-paper p-3">
            <dt className="text-xs uppercase tracking-[0.14em] text-muted">Customer</dt>
            <dd className="mt-1">
              {journey.customer.name}
              <span className="block text-muted">{journey.customer.id}</span>
            </dd>
          </div>
        </dl>
        <p className="mt-6 text-sm text-muted">Recorded in this browser on {when}. Not a credential and not a transmission.</p>
      </section>
    </div>
  );
}
