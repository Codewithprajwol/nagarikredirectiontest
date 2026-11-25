import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Politics",
  description: "Nagarik Politics section page.",
};

export default function PoliticsPage() {
  return (
    <PageShell
      section="Politics"
      title="Politics & Governance"
      subtitle="Dedicated Politics section page. Currently targeted by /temp-politics (302 Temporary)."
      currentPath="/politics"
      filePath="app/politics/page.tsx"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-xs">
          <h2 className="text-lg font-bold text-zinc-950">
            Parliament &amp; Policy Updates
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            This is a standalone Politics page. You can point 301 or 302 rules
            here, or switch /temp-politics from 302 to 301 in{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs">
              lib/redirect-rules.ts
            </code>
            .
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-xs">
          <h2 className="text-lg font-bold text-zinc-950">
            Provincial Coverage
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            Use this page to verify browser URL bar transitions and confirm that
            query strings like{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs">
              /temp-politics?utm_source=test
            </code>{" "}
            are preserved after redirect.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
