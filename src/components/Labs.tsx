"use client";

import { useEffect, useMemo, useState } from "react";

const RACI_KEY = "datalens.raciLab";
const LIFE_KEY = "datalens.lifecycleLab";

type Row = {
  id: string;
  sku: string;
  name: string;
  color: string;
  fiber: string;
  price: string;
  updatedDays: number;
};

const COLORS = ["Charcoal", "Sea", "Ivory", "Ink"];

const STARTER: Row[] = [
  { id: "1", sku: "NL-HAT-204", name: "Harbor Beanie", color: "Charcoal", fiber: "100% merino", price: "48", updatedDays: 1 },
  { id: "2", sku: "NL-HAT-204", name: "Harbor Beanie", color: "charcol", fiber: "", price: "42", updatedDays: 40 },
  { id: "3", sku: "NL-TEE-118", name: "", color: "Sea", fiber: "cotton blend", price: "-5", updatedDays: 3 },
];

function scoreRows(rows: Row[]) {
  const required: (keyof Row)[] = ["name", "color", "fiber", "price"];
  let completeness = 0;
  let accuracy = 0;
  rows.forEach((row) => {
    const filled = required.filter((key) => String(row[key]).trim()).length / required.length;
    completeness += filled;
    const colorExact = COLORS.includes(row.color.trim());
    const colorLoose = COLORS.some((color) => color.toLowerCase() === row.color.trim().toLowerCase());
    const price = Number(row.price);
    const priceOk = Number.isFinite(price) && price > 0;
    const fiberOk = /\d+\s*%/.test(row.fiber);
    if (colorExact && priceOk && fiberOk) accuracy += 1;
    else if (colorLoose && priceOk) accuracy += 0.55;
    else if (colorLoose || priceOk || fiberOk) accuracy += 0.25;
  });
  completeness /= rows.length || 1;
  accuracy /= rows.length || 1;

  const groups = new Map<string, Row[]>();
  rows.forEach((row) => {
    const key = row.sku.trim() || row.id;
    groups.set(key, [...(groups.get(key) ?? []), row]);
  });
  let consistency = 0;
  groups.forEach((list) => {
    const sig = (row: Row) => [row.name, row.color, row.fiber, row.price].map((value) => value.trim().toLowerCase()).join("|");
    consistency += list.every((row) => sig(row) === sig(list[0])) ? 1 : 0;
  });
  consistency /= groups.size || 1;

  let timeliness = 0;
  rows.forEach((row) => {
    const days = Number(row.updatedDays) || 0;
    timeliness += Math.max(0, Math.min(1, 1 - days / 30));
  });
  timeliness /= rows.length || 1;

  return {
    completeness: Math.round(completeness * 100),
    accuracy: Math.round(accuracy * 100),
    timeliness: Math.round(timeliness * 100),
    consistency: Math.round(consistency * 100),
  };
}

const DIMS = [
  ["completeness", "Completeness", "Are required values present?"],
  ["accuracy", "Accuracy", "Do values match a trusted form of the truth?"],
  ["timeliness", "Timeliness", "Is the row current enough to publish?"],
  ["consistency", "Consistency", "Does the same SKU agree with itself?"],
] as const;

export function QualityLab() {
  const [rows, setRows] = useState<Row[]>(STARTER);
  const [mode, setMode] = useState<"rows" | "sliders">("rows");
  const derived = useMemo(() => scoreRows(rows), [rows]);
  const [manual, setManual] = useState(derived);
  const [weights, setWeights] = useState({ completeness: 25, accuracy: 25, timeliness: 25, consistency: 25 });

  const scores = mode === "rows" ? derived : manual;
  const weightSum = DIMS.reduce((sum, [key]) => sum + weights[key], 0) || 1;
  const composite = Math.round(DIMS.reduce((sum, [key]) => sum + scores[key] * weights[key], 0) / weightSum);
  const weakest = [...DIMS].sort((a, b) => scores[a[0]] - scores[b[0]])[0];

  function updateRow(id: string, patch: Partial<Row>) {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="rounded-3xl border border-line bg-[color:var(--paper-raised)] p-4 md:p-6">
        <div className="flex flex-wrap gap-2">
          <button type="button" className={chip(mode === "rows")} onClick={() => setMode("rows")}>
            Score sample rows
          </button>
          <button type="button" className={chip(mode === "sliders")} onClick={() => { setManual(derived); setMode("sliders"); }}>
            Adjust dimensions
          </button>
        </div>
        {mode === "rows" ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <caption className="mb-2 text-left text-muted">
                Edit the Harbor Beanie rows. Required fields are name, color, fiber, and price. Colors in the list: {COLORS.join(", ")}.
              </caption>
              <thead>
                <tr className="text-left text-xs uppercase tracking-[0.12em] text-muted">
                  {["SKU", "Name", "Color", "Fiber", "Price", "Days old"].map((heading) => (
                    <th key={heading} className="px-1 py-2 font-medium">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-t border-line">
                    {(["sku", "name", "color", "fiber", "price"] as const).map((key) => (
                      <td key={key} className="px-1 py-2">
                        <input
                          aria-label={`${key} for row ${row.id}`}
                          className="w-full rounded-lg border border-line bg-paper px-2 py-1"
                          value={row[key]}
                          onChange={(event) => updateRow(row.id, { [key]: event.target.value })}
                        />
                      </td>
                    ))}
                    <td className="px-1 py-2">
                      <input
                        aria-label={`Days old for row ${row.id}`}
                        type="number"
                        min={0}
                        className="w-20 rounded-lg border border-line bg-paper px-2 py-1"
                        value={row.updatedDays}
                        onChange={(event) => updateRow(row.id, { updatedDays: Number(event.target.value) })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-4 grid gap-4">
            {DIMS.map(([key, label]) => (
              <label key={key} className="block">
                <span className="flex justify-between text-sm">
                  <span>{label}</span>
                  <span>{manual[key]}</span>
                </span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={manual[key]}
                  onChange={(event) => setManual((prev) => ({ ...prev, [key]: Number(event.target.value) }))}
                />
              </label>
            ))}
          </div>
        )}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {DIMS.map(([key, label]) => (
            <label key={key} className="text-sm">
              <span className="flex justify-between">
                <span>Weight · {label}</span>
                <span>{weights[key]}</span>
              </span>
              <input
                type="range"
                min={0}
                max={50}
                value={weights[key]}
                onChange={(event) => setWeights((prev) => ({ ...prev, [key]: Number(event.target.value) }))}
              />
            </label>
          ))}
        </div>
      </section>
      <aside className="rounded-3xl border border-ink bg-ink p-5 text-[color:var(--paper)]">
        <p className="text-xs uppercase tracking-[0.16em] opacity-70">Fitness for publish</p>
        <p className="mt-2 font-serif text-6xl">{composite}</p>
        <p className="text-sm opacity-80">Weighted score across the four dimensions. Not a certification.</p>
        <ul className="mt-4 space-y-2 text-sm">
          {DIMS.map(([key, label, help]) => (
            <li key={key} className="flex justify-between gap-3 border-t border-white/15 pt-2">
              <span>
                {label}
                <span className="block text-xs opacity-70">{help}</span>
              </span>
              <span className="font-serif text-2xl">{scores[key]}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-relaxed">
          The weakest lens right now is {weakest[1].toLowerCase()} at {scores[weakest[0]]}. Raising that dimension moves the
          composite more than polishing a dimension that is already high, unless you shift the weights toward a decision that
          cares about something else.
        </p>
      </aside>
    </div>
  );
}

function chip(on: boolean) {
  return `rounded-full px-3 py-1.5 text-sm ${on ? "bg-ink text-[color:var(--paper)]" : "border border-line bg-paper"}`;
}

const ROLES = ["Data steward", "Data owner", "Data custodian", "CDO"] as const;
const LETTERS = ["R", "A", "C", "I"] as const;
type Letter = (typeof LETTERS)[number];

const MODEL: Record<(typeof ROLES)[number], Letter> = {
  "Data steward": "R",
  "Data owner": "A",
  "Data custodian": "C",
  CDO: "I",
};

export function RaciLab() {
  const [grid, setGrid] = useState<Record<string, Letter>>({
    "Data steward": "R",
    "Data owner": "A",
    "Data custodian": "C",
    CDO: "I",
  });
  const [saved, setSaved] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RACI_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { grid?: Record<string, Letter> };
      if (parsed.grid) setGrid(parsed.grid);
    } catch {
      /* empty */
    }
  }, []);

  function save() {
    const accountable = ROLES.filter((role) => grid[role] === "A");
    const messages: string[] = [];
    if (accountable.length !== 1) {
      messages.push("A decision needs exactly one Accountable role. Several A’s dissolve ownership; zero A’s means the work floats.");
    } else if (grid["Data owner"] !== "A") {
      messages.push("The data owner is the usual Accountable role for retiring a customer attribute. Anyone else as A is a signal to re-check altitude.");
    } else {
      messages.push("One owner is Accountable. That matches the pattern this lab teaches.");
    }
    if (grid["Data steward"] === "I") {
      messages.push("The steward should do the analysis and the glossary change, so Informed is too passive. Responsible fits.");
    } else if (grid["Data steward"] === "R") {
      messages.push("The steward is Responsible for the work. Good.");
    }
    if (grid.CDO === "R") {
      messages.push("The CDO coordinates the program. Doing the attribute retirement is the wrong altitude; Informed (or Consulted if the field is enterprise-critical) fits better.");
    } else if (grid.CDO === "I" || grid.CDO === "C") {
      messages.push("The CDO is not buried in the task. That keeps sponsorship at the right height.");
    }
    if (grid["Data custodian"] === "A") {
      messages.push("Custodians implement controls. Making them Accountable lets production access become business policy.");
    } else {
      messages.push("Consulted is a solid mark for the custodian: they speak to technical impact, then execute inside the approved change.");
    }
    const text = messages.join(" ");
    setNote(text);
    setSaved(true);
    localStorage.setItem(RACI_KEY, JSON.stringify({ decision: "retire-legacy-loyalty-tier", grid, savedAt: new Date().toISOString() }));
  }

  return (
    <div>
      <section className="rounded-3xl border border-line bg-[color:var(--paper-raised)] p-4 md:p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">Decision</p>
        <h2 className="mt-1 font-serif text-3xl">Retire the customer attribute legacy_loyalty_tier</h2>
        <p className="mt-2 max-w-3xl text-ink-soft">
          Assign one letter to each role. R does the work, A owns the outcome, C is asked beforehand, I is told afterwards.
          Save stores the matrix in this browser under a key that does not touch completed lessons.
        </p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr>
                <th className="py-2 text-left font-medium">Role</th>
                {LETTERS.map((letter) => (
                  <th key={letter} className="px-2 py-2 font-medium">{letter}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROLES.map((role) => (
                <tr key={role} className="border-t border-line">
                  <th scope="row" className="py-3 text-left font-medium">{role}</th>
                  {LETTERS.map((letter) => (
                    <td key={letter} className="px-2 text-center">
                      <input
                        type="radio"
                        name={role}
                        aria-label={`${role} ${letter}`}
                        checked={grid[role] === letter}
                        onChange={() => {
                          setGrid((prev) => ({ ...prev, [role]: letter }));
                          setSaved(false);
                        }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="button" className="mt-4 rounded-full bg-accent px-4 py-2 text-sm text-[color:var(--paper)]" onClick={save}>
          Save matrix
        </button>
        {saved ? <p className="mt-4 max-w-3xl text-sm leading-relaxed">{note}</p> : null}
        <p className="mt-4 text-sm text-muted">
          A teaching pattern for this decision is steward {MODEL["Data steward"]}, owner {MODEL["Data owner"]}, custodian {MODEL["Data custodian"]}, CDO {MODEL.CDO}. Your save is kept either way.
        </p>
      </section>
    </div>
  );
}

const SCENARIOS = [
  {
    id: "share-extract",
    title: "The campaign export",
    prompt: "A teammate wants the full customer table emailed before a weekend sale, “just in case.”",
    choices: [
      {
        id: "least",
        label: "Grant a named, expiring feed with only consented emails and the fields the campaign uses",
        tone: "Sound",
        text: "Share stays specific: consumer, purpose, field list, and a clock. The rest of the master never becomes an attachment.",
      },
      {
        id: "email",
        label: "Email the spreadsheet so nobody is blocked",
        tone: "Harmful",
        text: "The file is now an unowned copy. You cannot see who forwarded it, and destruction later will miss it.",
      },
      {
        id: "more",
        label: "Add income and birthday to the extract so the campaign can be smarter",
        tone: "Harmful",
        text: "That expands purpose and collection in the same gesture. New fields need a plan, not a Friday favor.",
      },
    ],
  },
  {
    id: "color-drift",
    title: "Two colors for one beanie",
    prompt: "The PIM says Charcoal. The web still shows “charcol” from a manual fix last month.",
    choices: [
      {
        id: "pim",
        label: "Correct the reference value in the PIM and republish the certified feed",
        tone: "Sound",
        text: "The system of record stays the editor. Channels catch up from the contract instead of growing a second master.",
      },
      {
        id: "web-only",
        label: "Edit only the website so launch is not delayed",
        tone: "Risky",
        text: "The store and the marketplace still disagree, and the next publish may overwrite the web fix with the old defect—or the reverse.",
      },
      {
        id: "ignore",
        label: "Leave it until the season ends",
        tone: "Risky",
        text: "Search, filters, and the quality score keep failing a rule you already declared blocking. Waiting is a decision to publish a defect.",
      },
    ],
  },
  {
    id: "retention",
    title: "The clock has ended",
    prompt: "Maya closed her account. Marketing retention has ended. There is no legal hold. Order facts are on a longer finance clock.",
    choices: [
      {
        id: "selective",
        label: "Destroy marketing attributes and known copies, log it, and leave order facts alone",
        tone: "Sound",
        text: "End-of-life is selective. Destruction evidence covers the class whose clock ended, not a blunt wipe of every table that mentions her.",
      },
      {
        id: "forever",
        label: "Keep a personal drive copy so the team does not lose the segment",
        tone: "Harmful",
        text: "The schedule just lost. A laptop copy is still processing, and it will outlive every official control.",
      },
      {
        id: "all",
        label: "Delete orders too, so the profile is truly gone",
        tone: "Risky",
        text: "Finance retention is a different rule. Destroying it early can break a return or a tax question. Holds and clocks are checked per class.",
      },
    ],
  },
  {
    id: "match",
    title: "The household phone",
    prompt: "The match job scores Maya and another resident at 0.84, mostly because they share a phone and a last name. Auto-merge starts at 0.97.",
    choices: [
      {
        id: "queue",
        label: "Send it to the steward queue and do not merge on the shared phone",
        tone: "Sound",
        text: "The gray band is where people prevent false positives. A household number is context, not identity.",
      },
      {
        id: "auto",
        label: "Lower the threshold and auto-merge to clear the queue",
        tone: "Harmful",
        text: "You just glued two people together, including consent. Queue pressure is a staffing problem, not a reason to change identity rules on the spot.",
      },
      {
        id: "delete",
        label: "Delete both records so the conflict disappears",
        tone: "Harmful",
        text: "The entities were real. Deleting them destroys orders and consent history to avoid a decision.",
      },
    ],
  },
];

export function LifecycleLab() {
  const [picks, setPicks] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LIFE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as unknown;
      if (parsed && typeof parsed === "object") setPicks(parsed as Record<string, string>);
    } catch {
      /* empty */
    }
  }, []);

  function choose(scenarioId: string, choiceId: string) {
    const next = { ...picks, [scenarioId]: choiceId };
    setPicks(next);
    localStorage.setItem(LIFE_KEY, JSON.stringify(next));
  }

  const done = SCENARIOS.filter((scenario) => picks[scenario.id]).length;

  return (
    <div>
      <p className="text-sm text-muted">{done} of {SCENARIOS.length} scenarios answered on this browser.</p>
      <ol className="mt-4 grid gap-4">
        {SCENARIOS.map((scenario, index) => {
          const pick = picks[scenario.id];
          const chosen = scenario.choices.find((choice) => choice.id === pick);
          return (
            <li key={scenario.id} className="rounded-3xl border border-line bg-[color:var(--paper-raised)] p-4 md:p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">Scenario {index + 1}</p>
              <h2 className="mt-1 font-serif text-3xl">{scenario.title}</h2>
              <p className="mt-2 max-w-3xl">{scenario.prompt}</p>
              <div className="mt-4 grid gap-2">
                {scenario.choices.map((choice) => (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() => choose(scenario.id, choice.id)}
                    className={`rounded-2xl border px-3 py-3 text-left text-sm ${
                      pick === choice.id ? "border-ink bg-paper" : "border-line bg-paper/60 hover:border-ink"
                    }`}
                    aria-pressed={pick === choice.id}
                  >
                    {choice.label}
                  </button>
                ))}
              </div>
              {chosen ? (
                <p className="mt-4 rounded-2xl border border-line bg-paper px-4 py-3 text-sm">
                  <span className="font-medium">{chosen.tone}. </span>
                  {chosen.text}
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
