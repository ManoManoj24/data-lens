import type { Metadata } from "next";
import { RaciLab } from "@/components/Labs";

export const metadata: Metadata = { title: "RACI lab" };

export default function RaciPage() {
  return (
    <div className="mx-auto max-w-page px-5 py-12 md:px-8">
      <p className="text-sm text-muted">Labs</p>
      <h1 className="mt-2 font-serif text-5xl">RACI</h1>
      <p className="mt-4 max-w-3xl text-lg text-ink-soft">
        One decision, four roles. The point is a single Accountable owner and a steward who actually does the work—not a
        matrix that makes everyone feel included.
      </p>
      <div className="mt-8">
        <RaciLab />
      </div>
    </div>
  );
}
