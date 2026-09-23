"use client";

export function PrintButton({ label = "Print or save as PDF" }: { label?: string }) {
  return (
    <button
      type="button"
      className="no-print rounded-full bg-ink px-4 py-2 text-sm text-[color:var(--paper)]"
      onClick={() => window.print()}
    >
      {label}
    </button>
  );
}
