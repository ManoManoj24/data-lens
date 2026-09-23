import type { Metadata } from "next";
import { LifecycleLab } from "@/components/Labs";

export const metadata: Metadata = { title: "Lifecycle choice lab" };

export default function LifecycleChoicePage() {
  return (
    <div className="mx-auto max-w-page px-5 py-12 md:px-8">
      <p className="text-sm text-muted">Labs</p>
      <h1 className="mt-2 font-serif text-5xl">Lifecycle choices</h1>
      <p className="mt-4 max-w-3xl text-lg text-ink-soft">
        The next action is the lesson. Each scenario is taken from the journey: a share, a quality repair, a retention
        clock, and a match that should not be automatic.
      </p>
      <div className="mt-8">
        <LifecycleLab />
      </div>
    </div>
  );
}
