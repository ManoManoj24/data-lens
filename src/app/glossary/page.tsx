import type { Metadata } from "next";
import { GlossaryBrowser } from "@/components/GlossaryBrowser";
import { terms } from "@/lib/content";

export const metadata: Metadata = {
  title: "Glossary",
  description: "Short definitions for the terms used in Data Lens lessons.",
};

export default function GlossaryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="eyebrow">Reference</p>
      <h1 className="display mt-2 text-4xl sm:text-5xl">Glossary</h1>
      <p className="lead mt-4">
        {terms.length} short definitions for the terms used in the lessons. Search, or jump by
        letter.
      </p>
      <div className="mt-8">
        <GlossaryBrowser />
      </div>
    </div>
  );
}
