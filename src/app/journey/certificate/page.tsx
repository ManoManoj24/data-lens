import type { Metadata } from "next";
import { CertificateCard } from "@/components/CertificateCard";
import { getJourney } from "@/lib/curriculum";

export const metadata: Metadata = {
  title: "Journey certificate",
  description: "A browser-only title card for finishing the Data Lens journey.",
};

export default function CertificatePage() {
  const journey = getJourney();
  return (
    <div className="mx-auto max-w-page px-5 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.18em] text-accent">This browser only</p>
      <h1 className="mt-3 font-serif text-5xl md:text-6xl">Certificate</h1>
      <p className="no-print mt-4 max-w-3xl text-lg text-ink-soft">
        Open all seven journey stages and this page draws a title card you can print or copy. There is no account and no
        file stored on a server.
      </p>
      <CertificateCard journey={journey} />
    </div>
  );
}
