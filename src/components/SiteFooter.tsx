import Link from "next/link";
import { siteTitle } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="display text-2xl">{siteTitle}</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-ink-soft">
            Original lessons for visual learners. Framework names are cited accurately.
            Explanations are summaries, not a substitute for official DAMA-DMBOK or DCAM texts.
          </p>
          <p className="mt-3 max-w-md text-sm leading-6 text-ink-soft">
            Governance and privacy modules are educational overviews, not legal advice.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-2 text-sm font-semibold">
          <Link href="/learn/lifecycle" className="hover:text-lens-deep">
            Lifecycle
          </Link>
          <Link href="/learn/dama" className="hover:text-lens-deep">
            DAMA wheel
          </Link>
          <Link href="/learn" className="hover:text-lens-deep">
            All tracks
          </Link>
          <Link href="/glossary" className="hover:text-lens-deep">
            Glossary
          </Link>
          <Link href="/sources" className="hover:text-lens-deep">
            Sources
          </Link>
          <Link href="/progress" className="hover:text-lens-deep">
            Progress
          </Link>
        </nav>
      </div>
    </footer>
  );
}
