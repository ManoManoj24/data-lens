const STAGES = [
  { id: "plan", label: "Plan" },
  { id: "create", label: "Create" },
  { id: "store", label: "Store" },
  { id: "use", label: "Use" },
  { id: "share", label: "Share" },
  { id: "archive", label: "Archive" },
  { id: "destroy", label: "Destroy" },
];

function stageActive(moduleId: string): string[] {
  if (moduleId === "lc-plan") return ["plan"];
  if (moduleId === "lc-create") return ["create"];
  if (moduleId === "lc-store") return ["store"];
  if (moduleId === "lc-use") return ["use"];
  if (moduleId === "lc-share") return ["share"];
  if (moduleId === "lc-archive-destroy") return ["archive", "destroy"];
  return [];
}

export function LifecycleDiagram({ active = [] }: { active?: string[] }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-[color:var(--paper-raised)] p-4 md:p-6">
      <figcaption className="mb-4 text-xs uppercase tracking-[0.16em] text-muted">
        Seven-stage spine · quality, protection, and lineage run underneath
      </figcaption>
      <ol className="grid gap-2 sm:grid-cols-7">
        {STAGES.map((stage, index) => {
          const on = active.length === 0 || active.includes(stage.id);
          return (
            <li key={stage.id} className="relative">
              <div
                className={`rounded-xl border px-2 py-3 text-center ${
                  on && active.length > 0
                    ? "border-accent bg-accent text-[color:var(--paper)]"
                    : "border-line bg-paper"
                }`}
              >
                <span className="block text-[10px] uppercase tracking-[0.14em] opacity-70">{index + 1}</span>
                <span className="font-serif text-sm">{stage.label}</span>
              </div>
            </li>
          );
        })}
      </ol>
      <div className="mt-3 grid gap-2 text-xs text-ink-soft sm:grid-cols-3">
        <p className="rounded-lg border border-dashed border-line px-3 py-2">Cross-cut · Data quality</p>
        <p className="rounded-lg border border-dashed border-line px-3 py-2">Cross-cut · Security / privacy</p>
        <p className="rounded-lg border border-dashed border-line px-3 py-2">Cross-cut · Metadata / lineage</p>
      </div>
    </figure>
  );
}

const WHEEL = [
  { id: "dama-arch", label: "Architecture" },
  { id: "dama-model", label: "Modeling" },
  { id: "dama-storage", label: "Storage" },
  { id: "dama-security", label: "Security" },
  { id: "dama-integration", label: "Integration" },
  { id: "dama-content", label: "Content" },
  { id: "dama-refmdm", label: "Reference & master" },
  { id: "dama-dwbi", label: "Warehousing & BI" },
  { id: "dama-metadata", label: "Metadata" },
  { id: "dama-quality", label: "Quality" },
];

export function DamaWheel({ active }: { active: string }) {
  const cx = 210;
  const cy = 210;
  const r = 148;
  return (
    <figure className="rounded-2xl border border-line bg-[color:var(--paper-raised)] p-4">
      <figcaption className="mb-2 text-xs uppercase tracking-[0.16em] text-muted">
        Governance at the hub · other areas stay in the picture
      </figcaption>
      <svg viewBox="0 0 420 420" className="mx-auto w-full max-w-xl" role="img" aria-label="DAMA-style wheel with governance in the center">
        {WHEEL.map((node, index) => {
          const angle = (Math.PI * 2 * index) / WHEEL.length - Math.PI / 2;
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          const on = active === node.id;
          return (
            <g key={node.id}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke={on ? "#1b4f4a" : "#d5cec2"} strokeWidth={on ? 2 : 1} />
              <rect
                x={x - 52}
                y={y - 16}
                width="104"
                height="32"
                rx="8"
                fill={on ? "#1b4f4a" : "#faf7f1"}
                stroke={on ? "#1b4f4a" : "#1c1915"}
              />
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fontSize="10"
                fill={on ? "#f4f1ea" : "#1c1915"}
                fontFamily="var(--font-sans), sans-serif"
              >
                {node.label}
              </text>
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r="46" fill={active === "dama-gov" ? "#1b4f4a" : "#1c1915"} />
        <text
          x={cx}
          y={cy - 2}
          textAnchor="middle"
          fontSize="11"
          fill="#f4f1ea"
          fontFamily="var(--font-serif), serif"
        >
          Governance
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="9" fill="#f4f1ea" fontFamily="var(--font-sans), sans-serif">
          decision rights
        </text>
      </svg>
    </figure>
  );
}

export function RoleDiagram() {
  const rows = [
    ["Executive sponsor / CDO", "Funds the program and removes blockers"],
    ["Governance council", "Adopts shared standards and settles cross-domain conflicts"],
    ["Data owner", "Accountable for access, quality expectations, and exceptions"],
    ["Data steward", "Definitions, queues, and day-to-day fitness"],
    ["Data custodian", "Platforms, backups, and technical controls"],
  ];
  return (
    <figure className="rounded-2xl border border-line bg-[color:var(--paper-raised)] p-4 md:p-6">
      <figcaption className="mb-4 text-xs uppercase tracking-[0.16em] text-muted">
        Decision altitude · from sponsor to platform
      </figcaption>
      <ol className="grid gap-2">
        {rows.map(([title, text], index) => (
          <li key={title} className="grid grid-cols-[auto_1fr] items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-ink font-serif text-sm">{index + 1}</span>
            <span className="rounded-xl border border-line bg-paper px-3 py-2">
              <span className="block font-medium">{title}</span>
              <span className="text-sm text-muted">{text}</span>
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

const DIMENSIONS = [
  ["Accuracy", "Matches the real world or a trusted source"],
  ["Completeness", "Required values are present"],
  ["Consistency", "The same fact agrees with itself"],
  ["Timeliness", "Current enough for the decision"],
  ["Validity", "Obeys formats, ranges, and lists"],
  ["Uniqueness", "One entity, one record"],
];

export function DimensionGrid() {
  return (
    <figure className="rounded-2xl border border-line bg-[color:var(--paper-raised)] p-4 md:p-6">
      <figcaption className="mb-4 text-xs uppercase tracking-[0.16em] text-muted">Six lenses for fitness for use</figcaption>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {DIMENSIONS.map(([title, text]) => (
          <li key={title} className="rounded-xl border border-line bg-paper p-3">
            <p className="font-serif text-lg">{title}</p>
            <p className="text-sm text-muted">{text}</p>
          </li>
        ))}
      </ul>
    </figure>
  );
}

export function CompareModels() {
  const columns = [
    { name: "UW–Madison style", items: ["Plan", "Create", "Manage", "Use", "Share", "Reuse", "Destroy"] },
    { name: "NIST RDaF", items: ["Envision", "Plan", "Generate / Acquire", "Process / Analyze", "Share / Use / Reuse", "Preserve / Discard"] },
    { name: "USGS SDL", items: ["Plan", "Acquire", "Process", "Analyze", "Preserve", "Publish / Share"] },
  ];
  return (
    <figure className="rounded-2xl border border-line bg-[color:var(--paper-raised)] p-4 md:p-6">
      <figcaption className="mb-4 text-xs uppercase tracking-[0.16em] text-muted">
        Same arc, different labels · plus describe, quality, and security as cross-cuts
      </figcaption>
      <div className="grid gap-3 md:grid-cols-3">
        {columns.map((column) => (
          <div key={column.name} className="rounded-xl border border-line bg-paper p-3">
            <p className="font-serif text-lg">{column.name}</p>
            <ol className="mt-2 space-y-1 text-sm">
              {column.items.map((item) => (
                <li key={item} className="border-t border-line/80 py-1 first:border-t-0">
                  {item}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </figure>
  );
}

export function PolicyStack() {
  const layers = [
    ["Policy", "Intent and constraints a manager can apply"],
    ["Standard", "A measurable convention: formats, required fields, code lists"],
    ["Procedure", "The ticket, job, or review that makes the standard happen"],
  ];
  return (
    <figure className="rounded-2xl border border-line bg-[color:var(--paper-raised)] p-4 md:p-6">
      <figcaption className="mb-4 text-xs uppercase tracking-[0.16em] text-muted">Three altitudes of the same intent</figcaption>
      <ol className="grid gap-2">
        {layers.map(([title, text]) => (
          <li key={title} className="rounded-xl border border-line bg-paper px-4 py-3">
            <p className="font-serif text-xl">{title}</p>
            <p className="text-sm text-muted">{text}</p>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function MdmSplit() {
  return (
    <figure className="rounded-2xl border border-line bg-[color:var(--paper-raised)] p-4 md:p-6">
      <figcaption className="mb-4 text-xs uppercase tracking-[0.16em] text-muted">
        Lists classify · entities are recognized · transactions cite both
      </figcaption>
      <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        <div className="rounded-xl border border-line bg-paper p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-muted">Reference data</p>
          <p className="font-serif text-2xl">Charcoal · GB · S–XL</p>
          <p className="text-sm text-muted">Controlled codes and classifications</p>
        </div>
        <span className="hidden text-center text-muted md:block" aria-hidden>→</span>
        <div className="rounded-xl border border-accent bg-paper p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-accent">Master data</p>
          <p className="font-serif text-2xl">Maya · Harbor Beanie</p>
          <p className="text-sm text-muted">Shared entities and relationships</p>
        </div>
        <span className="hidden text-center text-muted md:block" aria-hidden>→</span>
        <div className="rounded-xl border border-line bg-paper p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-muted">Transaction</p>
          <p className="font-serif text-2xl">Order #4481</p>
          <p className="text-sm text-muted">Cites a customer and a SKU</p>
        </div>
      </div>
    </figure>
  );
}

export function GoldenSketch() {
  return (
    <figure className="rounded-2xl border border-line bg-[color:var(--paper-raised)] p-4 md:p-6">
      <figcaption className="mb-4 text-xs uppercase tracking-[0.16em] text-muted">
        Survivorship picks a winner per attribute · the crosswalk keeps every source key
      </figcaption>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-line bg-paper p-3 text-sm">
          <p className="text-xs uppercase tracking-[0.14em] text-muted">Store card</p>
          <p>Legal name · Maya C. Chen</p>
          <p className="text-muted">Older email</p>
        </div>
        <div className="rounded-xl border border-accent bg-accent p-3 text-sm text-[color:var(--paper)]">
          <p className="text-xs uppercase tracking-[0.14em] opacity-80">Golden C-104422</p>
          <p>Name from store</p>
          <p>Email from web</p>
          <p className="opacity-80">Both source keys retained</p>
        </div>
        <div className="rounded-xl border border-line bg-paper p-3 text-sm">
          <p className="text-xs uppercase tracking-[0.14em] text-muted">Web profile</p>
          <p>Email verified today</p>
          <p className="text-muted">Consent timestamp</p>
        </div>
      </div>
    </figure>
  );
}

export function MatchSketch() {
  const bands = [
    ["0.97 – 1", "Auto-link only if policy allows", "High"],
    ["0.80 – 0.97", "Steward queue", "Review"],
    ["Below 0.80", "Leave apart", "No match"],
  ];
  return (
    <figure className="rounded-2xl border border-line bg-[color:var(--paper-raised)] p-4 md:p-6">
      <figcaption className="mb-4 text-xs uppercase tracking-[0.16em] text-muted">
        Two thresholds · the gray band is a person, not a coin flip
      </figcaption>
      <ol className="grid gap-2 md:grid-cols-3">
        {bands.map(([range, text, label]) => (
          <li key={label} className="rounded-xl border border-line bg-paper p-3">
            <p className="text-xs uppercase tracking-[0.14em] text-muted">{label}</p>
            <p className="font-serif text-2xl">{range}</p>
            <p className="text-sm">{text}</p>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function HierarchySketch() {
  return (
    <figure className="rounded-2xl border border-line bg-[color:var(--paper-raised)] p-4 md:p-6">
      <figcaption className="mb-4 text-xs uppercase tracking-[0.16em] text-muted">
        Selling hierarchy · facts join the leaf, then roll through the version that was true that day
      </figcaption>
      <div className="grid gap-2 text-sm md:grid-cols-4">
        {["Accessories", "Headwear", "Harbor Beanie", "NL-HAT-204"].map((node, index) => (
          <div key={node} className="rounded-xl border border-line bg-paper px-3 py-4 text-center">
            <p className="text-[10px] uppercase tracking-[0.14em] text-muted">Level {index + 1}</p>
            <p className="font-serif text-lg">{node}</p>
          </div>
        ))}
      </div>
    </figure>
  );
}

export function ModuleDiagram({ moduleId }: { moduleId: string }) {
  if (moduleId === "lc-compare") return <CompareModels />;
  if (moduleId.startsWith("lc-")) return <LifecycleDiagram active={stageActive(moduleId)} />;
  if (moduleId.startsWith("dama-")) return <DamaWheel active={moduleId} />;
  if (["gov-policies"].includes(moduleId)) return <PolicyStack />;
  if (["gov-intro", "gov-councils", "gov-decision-rights", "roles-trio", "roles-council-cdo", "roles-raci"].includes(moduleId)) {
    return <RoleDiagram />;
  }
  if (["qm-dimensions", "qm-measure", "dama-quality"].includes(moduleId)) return <DimensionGrid />;
  if (["mdm-golden"].includes(moduleId)) return <GoldenSketch />;
  if (["mdm-match-merge"].includes(moduleId)) return <MatchSketch />;
  if (["mdm-hierarchy"].includes(moduleId)) return <HierarchySketch />;
  if (["mdm-master", "mdm-reference", "mdm-vs-rdm", "mdm-ops", "dama-refmdm"].includes(moduleId)) return <MdmSplit />;
  if (moduleId.startsWith("gov-")) return <PolicyStack />;
  return <LifecycleDiagram />;
}
