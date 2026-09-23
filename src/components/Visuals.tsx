import Link from "next/link";
import type { Lesson } from "@/lib/content";
import { LIFECYCLE_STAGES } from "@/lib/content";

const STAGE_BY_MODULE: Record<string, string> = {
  "lc-plan": "plan",
  "lc-create": "create",
  "lc-store": "store",
  "lc-use": "use",
  "lc-share": "share",
  "lc-archive-destroy": "archive",
};

export function LessonVisual({ lesson }: { lesson: Lesson }) {
  if (lesson.id === "lc-compare") return <CompareModels />;
  if (lesson.id === "lc-unified" || lesson.id === "lc-why") return <MiniStages active={null} />;
  if (STAGE_BY_MODULE[lesson.id]) {
    return <MiniStages active={STAGE_BY_MODULE[lesson.id]} />;
  }
  if (lesson.id.startsWith("dama-")) return <MiniWheel active={lesson.id} />;
  if (lesson.id === "qm-dimensions") return <DimensionChips />;
  if (lesson.id === "qm-fair-depth" || lesson.id === "roles-fair-culture") return <FairMarks />;
  if (lesson.id === "roles-trio" || lesson.id === "gov-decision-rights") return <RoleCards />;
  if (lesson.id === "gov-councils" || lesson.id === "roles-council-cdo") return <CouncilStack />;
  if (lesson.id.startsWith("mdm-")) return <MdmFlow active={lesson.id} />;
  if (lesson.visualHint === "wheel") return <MiniWheel active={null} />;
  if (lesson.visualHint === "cards") return <HintCards />;
  if (lesson.visualHint === "flow") return <MiniStages active={null} />;
  return <HintNodes />;
}

export function MiniStages({ active }: { active: string | null }) {
  return (
    <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7" aria-hidden="true">
      {LIFECYCLE_STAGES.map((stage, index) => {
        const on = active === stage.id || (active === "archive" && stage.id === "destroy");
        return (
          <li
            key={stage.id}
            className={`rounded-xl px-2 py-3 text-center text-xs font-bold ${
              on ? "bg-lens text-white" : "bg-paper-deep text-ink"
            }`}
          >
            <span className="block text-[10px] opacity-70">{index + 1}</span>
            {stage.label}
          </li>
        );
      })}
    </ol>
  );
}

function CompareModels() {
  const models = [
    {
      name: "UW-style",
      stages: ["Plan", "Create", "Manage", "Use", "Share", "Collect/Reuse", "Destroy"],
    },
    {
      name: "NIST RDaF",
      stages: [
        "Envision",
        "Plan",
        "Generate/Acquire",
        "Process/Analyze",
        "Share/Use/Reuse",
        "Preserve/Discard",
      ],
    },
    {
      name: "USGS SDL",
      stages: ["Plan", "Acquire", "Process", "Analyze", "Preserve", "Publish/Share"],
    },
  ];

  return (
    <div className="grid gap-3 lg:grid-cols-3" aria-label="Three public lifecycle models">
      {models.map((model) => (
        <section key={model.name} className="rounded-2xl bg-[#17202b] p-4 text-paper">
          <h3 className="text-sm font-bold text-gold-bright">{model.name}</h3>
          <ol className="mt-3 space-y-1.5">
            {model.stages.map((stage, index) => (
              <li key={stage} className="flex items-center gap-2 text-sm">
                <span className="w-5 text-xs text-gold-bright">{index + 1}</span>
                {stage}
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}

const SPOKE_IDS = [
  "dama-arch",
  "dama-model",
  "dama-storage",
  "dama-security",
  "dama-integration",
  "dama-content",
  "dama-refmdm",
  "dama-dwbi",
  "dama-metadata",
  "dama-quality",
];

function MiniWheel({ active }: { active: string | null }) {
  const cx = 80;
  const cy = 80;
  return (
    <svg viewBox="0 0 160 160" className="mx-auto h-40 w-40" aria-hidden="true">
      {SPOKE_IDS.map((id, index) => {
        const angle = (index / SPOKE_IDS.length) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * 58;
        const y = cy + Math.sin(angle) * 58;
        const on = active === id;
        return <circle key={id} cx={x} cy={y} r={on ? 10 : 7} fill={on ? "#e7c27a" : "#0e6a67"} />;
      })}
      <circle cx={cx} cy={cy} r={active === "dama-gov" ? 22 : 18} fill="#17202b" />
      <text x={cx} y={cy + 4} textAnchor="middle" fill="#f3eee4" fontSize="9" fontWeight="700">
        Govern
      </text>
    </svg>
  );
}

function DimensionChips() {
  const names = ["Accuracy", "Completeness", "Consistency", "Timeliness", "Validity", "Uniqueness"];
  return (
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3" aria-hidden="true">
      {names.map((name) => (
        <li key={name} className="rounded-xl border border-line bg-card px-3 py-4 text-center text-sm font-bold">
          {name}
        </li>
      ))}
    </ul>
  );
}

function FairMarks() {
  const marks = [
    ["F", "Findable"],
    ["A", "Accessible"],
    ["I", "Interoperable"],
    ["R", "Reusable"],
  ];
  return (
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="FAIR principles">
      {marks.map(([letter, word]) => (
        <li key={letter} className="rounded-2xl bg-[#17202b] px-3 py-4 text-center text-paper">
          <span className="display block text-3xl text-gold-bright">{letter}</span>
          <span className="mt-1 block text-sm">{word}</span>
        </li>
      ))}
    </ul>
  );
}

function RoleCards() {
  const roles = ["Data Owner", "Data Steward", "Data Custodian"];
  return (
    <ul className="grid gap-2 sm:grid-cols-3" aria-hidden="true">
      {roles.map((role) => (
        <li key={role} className="rounded-2xl border border-line bg-card px-3 py-5 text-center font-bold">
          {role}
        </li>
      ))}
    </ul>
  );
}

function CouncilStack() {
  const layers = [
    "Executive Sponsor / CDO",
    "Data Governance Council",
    "Data Owner",
    "Data Steward",
    "Data Custodian",
  ];
  return (
    <ol className="mx-auto grid max-w-md gap-2" aria-hidden="true">
      {layers.map((layer, index) => (
        <li
          key={layer}
          className="rounded-xl bg-ink px-3 py-2 text-center text-sm font-semibold text-paper"
          style={{ width: `${100 - index * 8}%`, marginInline: "auto" }}
        >
          {layer}
        </li>
      ))}
    </ol>
  );
}

function MdmFlow({ active }: { active: string }) {
  const nodes = [
    { id: "mdm-reference", label: "Reference data" },
    { id: "mdm-master", label: "Master data" },
    { id: "mdm-vs-rdm", label: "MDM vs reference management" },
  ];
  return (
    <ol className="grid gap-2 sm:grid-cols-3" aria-hidden="true">
      {nodes.map((node) => (
        <li
          key={node.id}
          className={`rounded-xl px-3 py-4 text-center text-sm font-bold ${
            active === node.id ? "bg-lens text-white" : "bg-paper-deep"
          }`}
        >
          {node.label}
        </li>
      ))}
    </ol>
  );
}

function HintCards() {
  return (
    <div className="grid grid-cols-3 gap-2" aria-hidden="true">
      {[0, 1, 2].map((item) => (
        <div key={item} className="h-16 rounded-xl border border-line bg-card" />
      ))}
    </div>
  );
}

function HintNodes() {
  return (
    <svg viewBox="0 0 280 72" className="h-16 w-full" aria-hidden="true">
      <line x1="40" y1="36" x2="240" y2="36" stroke="#0e6a67" strokeWidth="2" />
      {[40, 140, 240].map((x) => (
        <circle key={x} cx={x} cy="36" r="12" fill="#17202b" />
      ))}
    </svg>
  );
}

export function GovernanceMap() {
  const layers = [
    { label: "Executive Sponsor / CDO", href: "/learn/roles/roles-council-cdo" },
    { label: "Data Governance Council", href: "/learn/governance/gov-councils" },
    { label: "Data Owner", href: "/learn/roles/roles-trio" },
    { label: "Data Steward", href: "/learn/roles/roles-trio" },
    { label: "Data Custodian", href: "/learn/roles/roles-trio" },
  ];

  return (
    <div className="panel p-4 sm:p-5">
      <p className="eyebrow">Operating picture</p>
      <ol className="mx-auto mt-4 grid max-w-lg gap-2">
        {layers.map((layer, index) => (
          <li key={layer.label} style={{ width: `${100 - index * 6}%`, marginInline: "auto" }}>
            <Link
              href={layer.href}
              className="block rounded-xl bg-ink px-3 py-3 text-center text-sm font-semibold text-paper hover:bg-lens-deep"
            >
              {layer.label}
            </Link>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-sm leading-6 text-ink-soft">
        Owners decide; stewards operationalize; custodians implement technical controls; the council
        resolves cross-domain issues.
      </p>
    </div>
  );
}
