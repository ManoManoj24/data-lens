"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/journey", label: "Journey" },
  { href: "/paths", label: "Paths" },
  { href: "/#tracks", label: "Tracks" },
  { href: "/labs", label: "Labs" },
  { href: "/cases", label: "Cases" },
  { href: "/cheatsheets", label: "Sheets" },
  { href: "/practice/interview", label: "Practice" },
  { href: "/glossary", label: "Glossary" },
  { href: "/search", label: "Search" },
];

function active(pathname: string, href: string) {
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="no-print sticky top-0 z-30 border-b border-line/80 bg-[color:var(--paper)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-page items-center justify-between gap-4 px-5 py-3 md:px-8">
        <Link href="/" className="group flex items-center gap-3 no-underline" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-ink text-accent" aria-hidden>
            <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none">
              <circle cx="13" cy="13" r="6.5" stroke="currentColor" strokeWidth="2" />
              <path d="M18 18.5 L24 24.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <span>
            <span className="block font-serif text-lg leading-none tracking-tight">Data Lens</span>
            <span className="text-[11px] uppercase tracking-[0.16em] text-muted">See the whole path</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-2 py-1.5 text-sm no-underline ${
                active(pathname, link.href) ? "bg-ink text-[color:var(--paper)]" : "text-ink-soft hover:bg-black/5"
              }`}
              aria-current={active(pathname, link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="rounded-full border border-line px-3 py-1.5 text-sm lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open ? (
        <nav id="mobile-nav" className="border-t border-line px-5 py-3 lg:hidden" aria-label="Mobile">
          <ul className="grid gap-1">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-2 py-2 no-underline hover:bg-black/5"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
