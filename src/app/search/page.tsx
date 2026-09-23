import type { Metadata } from "next";
import { SearchExperience } from "@/components/SearchExperience";
import { buildSearchDocs } from "@/lib/curriculum";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const docs = buildSearchDocs();
  return (
    <div className="mx-auto max-w-page px-5 py-12 md:px-8">
      <h1 className="font-serif text-5xl md:text-6xl">Search</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Lessons, glossary terms, journey stages, cases, labs, and paths. Empty until you ask.
      </p>
      <div className="mt-8">
        <SearchExperience docs={docs} initialQuery={q ?? ""} />
      </div>
    </div>
  );
}
