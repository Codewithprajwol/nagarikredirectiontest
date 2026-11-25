import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "ePaper",
  description: "Nagarik ePaper destination page for 301 & 302 testing.",
};

const EDITIONS = [
  { name: "Kathmandu Morning Edition", pages: 16, date: "2026-11-25" },
  { name: "Pokhara Regional Edition", pages: 12, date: "2026-11-25" },
  { name: "Biratnagar Eastern Edition", pages: 12, date: "2026-11-25" },
];

export default function EpaperPage() {
  return (
    <PageShell
      section="ePaper"
      title="Nagarik ePaper"
      subtitle="Digital newspaper edition page. Currently targeted by both /nagarik-paper (301 Permanent) and /promo (302 Temporary)."
      currentPath="/epaper"
      filePath="app/epaper/page.tsx"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {EDITIONS.map((edition) => (
          <div
            key={edition.name}
            className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs"
          >
            <div className="text-xs font-semibold text-red-700 uppercase">
              Digital Edition
            </div>
            <h2 className="mt-2 text-lg font-bold text-zinc-950">
              {edition.name}
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              {edition.pages} pages &middot; {edition.date}
            </p>
            <div className="mt-4 rounded-lg bg-zinc-50 p-3 font-mono text-xs text-zinc-600">
              Placeholder edition card — edit app/epaper/page.tsx anytime.
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
