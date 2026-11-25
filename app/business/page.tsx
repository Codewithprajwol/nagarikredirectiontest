import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Business",
  description: "Nagarik Business & Economy section page.",
};

export default function BusinessPage() {
  return (
    <PageShell
      section="Business"
      title="Business & Economy"
      subtitle="Dedicated Business section page. Currently targeted by /config-302 (302 Temporary defined in next.config.ts)."
      currentPath="/business"
      filePath="app/business/page.tsx"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "NEPSE Index", value: "2,648.15", note: "Sample metric" },
          { label: "USD / NPR", value: "134.80", note: "Sample rate" },
          { label: "Gold (Tola)", value: "162,400", note: "Sample quote" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs"
          >
            <div className="text-xs font-semibold text-zinc-500 uppercase">
              {item.label}
            </div>
            <div className="mt-2 font-mono text-2xl font-bold text-zinc-950">
              {item.value}
            </div>
            <div className="mt-1 text-xs text-zinc-500">{item.note}</div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
