"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { moduleCount, siteTitle } from "@/lib/content";
import { useProgress } from "@/lib/progress";

const LINKS = [
  { href: "/learn/lifecycle", label: "Lifecycle" },
  { href: "/learn/dama", label: "DAMA wheel" },
  { href: "/learn", label: "Tracks" },
  { href: "/glossary", label: "Glossary" },
  { href: "/sources", label: "Sources" },
  { href: "/progress", label: "Progress" },
];

function isActive(href: string, pathname: string) {
  if (href === "/learn") return pathname === "/learn";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function LensMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#17202B" />
      <circle cx="16" cy="16" r="9" fill="none" stroke="#E7C27A" strokeWidth="1.6" />
      <circle cx="16" cy="16" r="4.5" fill="none" stroke="#7DCFC8" strokeWidth="1.4" />
      <circle cx="16" cy="16" r="1.6" fill="#F3EEE4" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { ready, count } = useProgress();
  const total = moduleCount();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 rounded-full">
          <LensMark />
          <span className="display text-xl">{siteTitle}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href, pathname) ? "page" : undefined}
              className={`rounded-full px-3 py-2 text-sm font-semibold ${
                isActive(link.href, pathname)
                  ? "bg-ink text-white"
                  : "text-ink-soft hover:bg-paper-deep hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/progress"
            className="hidden rounded-full border border-line bg-card px-3 py-1.5 text-sm font-semibold text-ink sm:inline-flex"
            aria-label="Lesson progress"
          >
            {ready ? `${count}/${total}` : "—"}
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-line bg-card px-4 py-3 lg:hidden"
        >
          <ul className="grid gap-1">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href, pathname) ? "page" : undefined}
                  className={`block rounded-xl px-3 py-3 text-base font-semibold ${
                    isActive(link.href, pathname) ? "bg-ink text-white" : "hover:bg-paper"
                  }`}
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
