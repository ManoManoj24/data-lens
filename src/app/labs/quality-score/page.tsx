import type { Metadata } from "next";
import { QualityLab } from "@/components/Labs";

export const metadata: Metadata = { title: "Quality score lab" };

export default function QualityScorePage() {
  return (
    <div className="mx-auto max-w-page px-5 py-12 md:px-8">
      <p className="text-sm text-muted">Labs</p>
      <h1 className="mt-2 font-serif text-5xl">Quality score</h1>
      <p className="mt-4 max-w-3xl text-lg text-ink-soft">
        Completeness, accuracy, timeliness, and consistency rarely fail together. Change the Harbor Beanie rows, or set the
        dimensions yourself, and read which lens is holding the score down. Weights let a publish decision care more about
        one lens than another.
      </p>
      <div className="mt-8">
        <QualityLab />
      </div>
    </div>
  );
}
