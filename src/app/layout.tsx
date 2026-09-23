import type { Metadata } from "next";
import { Newsreader, Source_Sans_3 } from "next/font/google";
import { ProgressProvider } from "@/components/ProgressProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getCurriculum } from "@/lib/curriculum";
import "./globals.css";

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const curriculum = getCurriculum();

export const metadata: Metadata = {
  title: {
    default: `${curriculum.siteTitle} — data, from start to end`,
    template: `%s · ${curriculum.siteTitle}`,
  },
  description: curriculum.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans text-ink antialiased">
        <a className="skip" href="#content">
          Skip to content
        </a>
        <ProgressProvider>
          <SiteHeader />
          <main id="content">{children}</main>
          <SiteFooter />
        </ProgressProvider>
      </body>
    </html>
  );
}
