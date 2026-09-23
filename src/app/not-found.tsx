import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-page px-5 py-20 md:px-8">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">Missing page</p>
      <h1 className="mt-3 font-serif text-5xl">That page is not in the library.</h1>
      <p className="mt-4 text-ink-soft">Try the journey, or search the lessons.</p>
      <div className="mt-6 flex gap-3">
        <Link href="/journey" className="rounded-full bg-accent px-4 py-2 text-sm text-[color:var(--paper)] no-underline">
          Start the Data Journey
        </Link>
        <Link href="/search" className="rounded-full border border-ink px-4 py-2 text-sm no-underline">
          Search
        </Link>
      </div>
    </div>
  );
}
