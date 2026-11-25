import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { TerminalIcon, CodeIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Docs & Guide",
  description: "How to modify pages and 301/302 redirect rules.",
};

export default function ContactPage() {
  return (
    <PageShell
      section="Developer & Editor Guide"
      title="How to Modify Redirects &amp; Add Pages"
      subtitle="Technical reference guide for changing 301/302 status codes, updating destinations, and checking headers via CLI."
      currentPath="/contact"
      filePath="app/contact/page.tsx"
    >
      <div className="space-y-8">
        {/* Difference Matrix */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 backdrop-blur-md">
            <span className="rounded-md border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-0.5 font-mono text-xs font-bold text-emerald-300">
              HTTP 301 Moved Permanently
            </span>
            <h3 className="mt-3 text-lg font-bold text-white">
              Permanent SEO Migration
            </h3>
            <ul className="mt-3 space-y-2 text-xs leading-relaxed text-zinc-300 list-disc pl-4">
              <li>Transfers search engine ranking / page equity permanently to destination.</li>
              <li>Cached indefinitely by web browsers; subsequent clicks skip the server.</li>
              <li>Used when URLs change forever (e.g. site redesign, article slug cleanup).</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-6 backdrop-blur-md">
            <span className="rounded-md border border-amber-500/40 bg-amber-500/20 px-2.5 py-0.5 font-mono text-xs font-bold text-amber-300">
              HTTP 302 Found (Temporary)
            </span>
            <h3 className="mt-3 text-lg font-bold text-white">
              Dynamic / Campaign Redirect
            </h3>
            <ul className="mt-3 space-y-2 text-xs leading-relaxed text-zinc-300 list-disc pl-4">
              <li>Browsers and crawlers recheck the original URL every single time.</li>
              <li>Perfect for `/breaking` news which switches to different stories frequently.</li>
              <li>Great for marketing banners, promo shortcuts, and temporary maintenance.</li>
            </ul>
          </div>
        </div>

        {/* How to Edit Code */}
        <div className="glass-panel-elevated rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400">
            <CodeIcon className="h-4 w-4" />
            <span>How to Change Rules in Code</span>
          </div>
          <h2 className="mt-2 text-xl font-bold text-white">
            1. Edit Central Rules (`lib/redirect-rules.ts`)
          </h2>
          <p className="mt-1 text-sm text-zinc-300">
            Both the Next.js Proxy engine and the interactive dashboard read from this array. To change a redirect from 301 to 302, simply change <code className="font-mono text-emerald-300">statusCode: 301</code> to <code className="font-mono text-amber-300">statusCode: 302</code>:
          </p>

          <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-black/60 p-4 font-mono text-xs text-zinc-200">
{`{
  id: "breaking-302",
  source: "/breaking",
  destination: "/news/nagarik-digital-launch", // Change to "/sports" or any page
  statusCode: 302,                            // Change to 301 or 302
  enabled: true,
  label: "Breaking -> Featured Story",
  description: "Temporary 302 redirect pointing to active story.",
  layer: "proxy"
}`}
          </pre>
        </div>

        {/* CLI Testing Box */}
        <div className="glass-panel-elevated rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
            <TerminalIcon className="h-4 w-4" />
            <span>CLI Verification via cURL</span>
          </div>
          <h2 className="mt-2 text-xl font-bold text-white">
            Inspect Headers from PowerShell / Bash
          </h2>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-black/60 p-4 font-mono text-xs text-zinc-200 leading-relaxed">
{`# Test 301 Permanent Redirect
curl -I http://localhost:3000/old-news

# Test 302 Temporary Redirect
curl -I http://localhost:3000/breaking

# Follow redirect hops to final destination
curl -IL http://localhost:3000/old-news`}
          </pre>
        </div>
      </div>
    </PageShell>
  );
}
