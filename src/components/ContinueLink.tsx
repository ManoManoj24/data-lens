"use client";

import Link from "next/link";
import { useProgress } from "@/components/ProgressProvider";

export function ContinueLink({
  order,
  className,
}: {
  order: string[];
  className?: string;
}) {
  const { completed, ready } = useProgress();
  const next = order.find((id) => !completed.includes(id));
  const href = !ready || completed.length === 0 ? "/paths" : next ? `/modules/${next}` : "/journey";
  const label = completed.length > 0 && !next ? "Review the journey" : "Continue learning";

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export function ProgressNote({ total }: { total: number }) {
  const { completed, ready } = useProgress();
  if (!ready) return <p className="text-sm text-muted">Progress stays in this browser.</p>;
  return (
    <p className="text-sm text-muted">
      {completed.length} of {total} lessons complete on this browser.
    </p>
  );
}

export function CompleteDot({ moduleId }: { moduleId: string }) {
  const { isComplete, ready } = useProgress();
  if (!ready || !isComplete(moduleId)) return null;
  return <span className="rounded-full bg-good px-2 py-0.5 text-xs text-white">Complete</span>;
}
