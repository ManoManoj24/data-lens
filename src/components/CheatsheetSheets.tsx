import Link from "next/link";
import { DamaWheel, DimensionGrid, LifecycleDiagram, RoleDiagram } from "@/components/Diagrams";
import { PrintButton } from "@/components/PrintButton";
import { cheatsheets } from "@/data/cheatsheets";

const STAGES = [
  ["Plan", "Purpose, owner, classification, and the retention clock before any row exists."],
  ["Create / Acquire", "Bring data in with context, agreements, and code-list checks."],
  ["Store / Manage", "One system of record, approved location, tested restore, named access."],
  ["Use / Process", "Versioned transforms. Certified outputs stay distinct from sandboxes."],
  ["Share", "A named consumer, a field list, a purpose, and an expiry."],
  ["Archive", "Keep what still has a reason, in a format a later person can read."],
  ["Destroy", "Remove what the clock ended, including known copies, and log it."],
];

const AREAS: [string, string][] = [
  ["Governance", "Decision rights, policy, and the log that stops local law."],
  ["Architecture", "Domains, systems of record, and allowed flows."],
  ["Modeling", "Conceptual, logical, and physical meaning. Watch the grain."],
  ["Storage & operations", "Freshness, backup, restore, and retirement of old stores."],
  ["Security", "Classification and proportionate access, encryption, and monitoring."],
  ["Integration", "Versioned contracts and lineage, not one-off extracts."],
  ["Content", "Official documents with owners, versions, and retention."],
  ["Reference & master", "Shared codes and shared entities that transactions cite."],
  ["Warehousing & BI", "Certified metrics. Exploratory charts look different."],
  ["Metadata", "Meaning, structure, freshness, and handling tags that controls read."],
  ["Quality", "Fit for use: rules, monitors, and fixes at the source."],
];

const DIMENSIONS: [string, string][] = [
  ["Accuracy", "Does it match the real world or a trusted source?"],
  ["Completeness", "Are the required values present?"],
  ["Consistency", "Does the same fact agree with itself?"],
  ["Timeliness", "Is it current enough for this decision?"],
  ["Validity", "Does it obey the format, range, or list?"],
  ["Uniqueness", "Is this one entity stored once?"],
];

export function CheatsheetBody({ id }: { id: string }) {
  const sheet = cheatsheets.find((item) => item.id === id);
  if (!sheet) return null;

  return (
    <article className="print-sheet mx-auto max-w-page px-5 py-10 md:px-8">
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/cheatsheets" className="text-sm">
          All cheatsheets
        </Link>
        <PrintButton />
      </div>
      <header className="border-b border-ink pb-4">
        <p className="text-xs uppercase tracking-[0.18em] text-accent">{sheet.kicker}</p>
        <h1 className="font-serif text-4xl md:text-5xl">{sheet.title}</h1>
        <p className="mt-2 max-w-2xl text-ink-soft">{sheet.summary}</p>
      </header>
      <div className="mt-6">{id === "lifecycle" ? <LifecycleSheet /> : null}</div>
      <div className="mt-6">{id === "dama" ? <DamaSheet /> : null}</div>
      <div className="mt-6">{id === "quality" ? <QualitySheet /> : null}</div>
      <div className="mt-6">{id === "raci" ? <RaciSheet /> : null}</div>
      <p className="mt-8 border-t border-line pt-3 text-xs text-muted">{sheet.sourceNote} Data Lens summaries are original.</p>
    </article>
  );
}

function LifecycleSheet() {
  return (
    <div className="grid gap-6">
      <LifecycleDiagram />
      <ol className="grid gap-2">
        {STAGES.map(([title, text], index) => (
          <li key={title} className="grid grid-cols-[auto_1fr] gap-3 border-b border-line py-2">
            <span className="font-serif text-xl text-accent">{index + 1}</span>
            <span>
              <span className="font-medium">{title}. </span>
              <span className="text-ink-soft">{text}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="text-sm">
        Cross-cuts on every stage: quality (fit for the decision), security and privacy (who may see it), metadata and
        lineage (how a stranger will know). Dashed returns are normal: reuse sends you back to create, analysis loops inside use.
      </p>
    </div>
  );
}

function DamaSheet() {
  return (
    <div className="grid gap-4">
      <DamaWheel active="dama-gov" />
      <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
        {AREAS.map(([title, text]) => (
          <li key={title} className="border-t border-line pt-2 text-sm">
            <span className="font-medium">{title}. </span>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

function QualitySheet() {
  return (
    <div className="grid gap-4">
      <DimensionGrid />
      <ul className="grid gap-2 sm:grid-cols-2">
        {DIMENSIONS.map(([title, text]) => (
          <li key={title} className="rounded-xl border border-line px-3 py-2 text-sm">
            <span className="font-medium">{title}. </span>
            {text}
          </li>
        ))}
      </ul>
      <p className="text-sm text-ink-soft">
        A future birth date fails validity first and may also be inaccurate. Two prices for one SKU fail consistency. A
        valid code is not automatically a true fact. Measure a defined population, then fix the source.
      </p>
    </div>
  );
}

function RaciSheet() {
  const matrix = [
    ["Data owner", "A", "Owns the outcome and can refuse the change."],
    ["Data steward", "R", "Does the impact review, glossary edit, and ticket."],
    ["Data custodian", "C", "Consulted on where the column lives, then executes the drop."],
    ["CDO", "I", "Told afterward unless the field is an enterprise policy."],
  ];
  return (
    <div className="grid gap-4">
      <RoleDiagram />
      <div>
        <p className="text-sm font-medium">Letters</p>
        <ul className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
          <li>R — Responsible. Does the work. There can be more than one.</li>
          <li>A — Accountable. Owns the outcome. Prefer exactly one.</li>
          <li>C — Consulted. Speaks before the decision.</li>
          <li>I — Informed. Hears the result after.</li>
        </ul>
      </div>
      <div>
        <p className="text-sm font-medium">Sample: retire legacy_loyalty_tier</p>
        <table className="mt-2 w-full text-sm">
          <tbody>
            {matrix.map(([role, letter, text]) => (
              <tr key={role} className="border-t border-line">
                <th className="py-2 pr-3 text-left font-medium">{role}</th>
                <td className="py-2 pr-3 font-serif text-xl">{letter}</td>
                <td className="py-2 text-ink-soft">{text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
