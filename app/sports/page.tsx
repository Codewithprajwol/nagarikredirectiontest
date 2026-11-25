import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ZapIcon, ExternalLinkIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Sports",
  description: "Nagarik Sports section page.",
};

export default function SportsPage() {
  return (
    <PageShell
      section="Sports Desk"
      title="Cricket, Football &amp; National Athletics"
      subtitle="Dedicated Sports page ready for ad-hoc 301 and 302 redirect experiments."
      currentPath="/sports"
      filePath="app/sports/page.tsx"
    >
      <div className="space-y-6">
        <div className="glass-panel-elevated rounded-2xl p-6 sm:p-8">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-rose-400">
            <ZapIcon className="h-3.5 w-3.5" />
            <span>Interactive Target Sandbox</span>
          </div>
          <h2 className="mt-3 text-2xl font-bold text-white">
            Ready for Target Switching
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-300">
            To redirect any existing URL (such as <code className="font-mono text-white">/breaking</code> or <code className="font-mono text-white">/old-news</code>) to this Sports page, edit <code className="font-mono text-rose-300">lib/redirect-rules.ts</code> and update the <code className="font-mono text-white">destination</code> to <code className="font-mono text-white">&quot;/sports&quot;</code>.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/api/redirect?code=301&to=/sports"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-950/40 hover:from-emerald-500 hover:to-emerald-400 transition-all"
            >
              <span>Instant 301 &rarr; /sports</span>
              <ExternalLinkIcon className="h-3.5 w-3.5" />
            </a>
            <a
              href="/api/redirect?code=302&to=/sports"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-amber-950/40 hover:from-amber-500 hover:to-amber-400 transition-all"
            >
              <span>Instant 302 &rarr; /sports</span>
              <ExternalLinkIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
