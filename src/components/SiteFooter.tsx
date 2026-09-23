import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="no-print mt-20 border-t border-line">
      <div className="mx-auto grid max-w-page gap-8 px-5 py-10 md:grid-cols-[1.4fr_1fr] md:px-8">
        <div>
          <p className="font-serif text-2xl">Data Lens</p>
          <p className="mt-2 max-w-xl text-sm text-muted">
            An educational picture of data management, governance, and lifecycle. It is not legal, compliance,
            or professional advice. Confirm obligations with qualified counsel and your security team.
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-2 text-sm" aria-label="Footer">
          <Link href="/journey">Data Journey</Link>
          <Link href="/paths">Learning paths</Link>
          <Link href="/labs">Labs</Link>
          <Link href="/cases">Case studies</Link>
          <Link href="/glossary">Glossary</Link>
          <Link href="/cheatsheets">Cheatsheets</Link>
          <Link href="/practice/interview">Interview practice</Link>
          <Link href="/journey/certificate">Journey certificate</Link>
          <Link href="/sources">Sources</Link>
        </nav>
      </div>
    </footer>
  );
}
