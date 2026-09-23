import { Suspense } from "react";
import type { Metadata } from "next";
import { JourneyExperience } from "@/components/JourneyExperience";
import { getAllModules, getJourney } from "@/lib/curriculum";

export const metadata: Metadata = {
  title: "Data Journey",
  description: "Follow one product SKU and one customer from plan through destruction.",
};

export default function JourneyPage() {
  const journey = getJourney();
  const titles = Object.fromEntries(getAllModules().map(({ module }) => [module.id, module.title]));

  return (
    <div className="mx-auto max-w-page px-5 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.18em] text-accent">{journey.kicker}</p>
      <h1 className="mt-3 max-w-4xl font-serif text-5xl leading-tight md:text-6xl">{journey.title}</h1>
      <p className="mt-4 max-w-3xl text-lg text-ink-soft">{journey.lede}</p>
      <p className="mt-3 max-w-3xl text-ink-soft">{journey.protagonist}</p>
      <Suspense fallback={<p className="mt-8 text-muted">Opening the journey…</p>}>
        <JourneyExperience journey={journey} titles={titles} />
      </Suspense>
    </div>
  );
}
