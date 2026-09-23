import Link from "next/link";
import { LensArt } from "@/components/LensArt";
import { HomeTracks } from "@/components/progress-ui";
import { moduleCount, tagline, terms, tracks } from "@/lib/content";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="eyebrow">Visual field guide</p>
          <h1 className="display mt-3 text-5xl sm:text-6xl">Data Lens</h1>
          <p className="lead mt-5 max-w-xl">{tagline}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/learn/lifecycle">
              Explore the lifecycle
            </Link>
            <Link className="btn btn-secondary" href="/learn/dama">
              Open the DAMA wheel
            </Link>
          </div>
          <p className="mt-5 text-sm text-ink-soft">
            {tracks.length} tracks · {moduleCount()} lessons · {terms.length} glossary terms.
            Progress is stored in this browser only.
          </p>
        </div>
        <LensArt />
      </section>
      <HomeTracks />
    </div>
  );
}
