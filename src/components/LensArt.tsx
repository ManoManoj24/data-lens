const STAGES = ["Plan", "Create", "Store", "Use", "Share", "Archive", "Destroy"];

export function LensArt() {
  return (
    <figure className="panel relative overflow-hidden p-4 sm:p-6" aria-hidden="true">
      <svg viewBox="0 0 520 360" className="h-auto w-full">
        <defs>
          <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#e7c27a" stopOpacity="0.15" />
            <stop offset="0.5" stopColor="#e7c27a" stopOpacity="0.85" />
            <stop offset="1" stopColor="#0e6a67" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="520" height="360" fill="#17202b" rx="20" />
        <ellipse cx="250" cy="180" rx="78" ry="118" fill="none" stroke="#e7c27a" strokeWidth="3" />
        <ellipse cx="250" cy="180" rx="48" ry="86" fill="none" stroke="#7dcfc8" strokeWidth="2" />
        <ellipse cx="250" cy="180" rx="16" ry="40" fill="#0e6a67" opacity="0.85" />
        <path d="M28 180 H168" stroke="url(#beam)" strokeWidth="8" strokeLinecap="round" />
        <path d="M332 180 H492" stroke="#7dcfc8" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        {STAGES.map((label, index) => {
          const x = 46 + index * 68;
          const y = index % 2 === 0 ? 78 : 286;
          return (
            <g key={label}>
              <line
                x1={x}
                y1={y}
                x2={250}
                y2={180}
                stroke="#f3eee4"
                strokeOpacity="0.18"
              />
              <circle cx={x} cy={y} r="4" fill="#e7c27a" />
              <text
                x={x}
                y={index % 2 === 0 ? y - 12 : y + 20}
                textAnchor="middle"
                fill="#f3eee4"
                fontSize="11"
                fontFamily="var(--font-outfit), sans-serif"
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="sr-only">
        A lens with the seven lifecycle stages arranged around it.
      </figcaption>
    </figure>
  );
}
