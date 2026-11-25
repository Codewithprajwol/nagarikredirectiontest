import Link from "next/link";
import { TerminalIcon, ShieldCheckIcon } from "./icons";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#090b10] text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-rose-600 px-2 py-0.5 text-xs font-black tracking-wider text-white uppercase">
                Nagarik
              </span>
              <span className="font-bold text-white text-sm">
                Redirection Test Portal
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-zinc-400">
              Complete Next.js 16 testing site for validating HTTP 301 Moved Permanently and HTTP 302 Found response headers, SEO migration compatibility, and dynamic slug redirection.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500 font-mono">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
              <span>All 16 routes static / ISR ready</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-wider text-zinc-200 uppercase">
              Redirect Destinations
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/news" className="text-zinc-400 hover:text-white transition-colors">
                  News Hub (/news)
                </Link>
              </li>
              <li>
                <Link href="/news/nagarik-digital-launch" className="text-zinc-400 hover:text-white transition-colors">
                  Featured Article (/news/:slug)
                </Link>
              </li>
              <li>
                <Link href="/epaper" className="text-zinc-400 hover:text-white transition-colors">
                  ePaper Edition (/epaper)
                </Link>
              </li>
              <li>
                <Link href="/politics" className="text-zinc-400 hover:text-white transition-colors">
                  Politics &amp; Governance (/politics)
                </Link>
              </li>
              <li>
                <Link href="/business" className="text-zinc-400 hover:text-white transition-colors">
                  Business &amp; Economy (/business)
                </Link>
              </li>
              <li>
                <Link href="/sports" className="text-zinc-400 hover:text-white transition-colors">
                  Sports Desk (/sports)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-wider text-zinc-200 uppercase">
              Configuration Files
            </h3>
            <div className="mt-3 space-y-2.5 text-xs font-mono">
              <div className="rounded-lg border border-white/5 bg-zinc-900/60 p-2.5">
                <span className="text-emerald-400 text-[11px] block font-sans font-semibold">
                  Rule Definitions:
                </span>
                <span className="text-zinc-300 text-[11px]">lib/redirect-rules.ts</span>
              </div>
              <div className="rounded-lg border border-white/5 bg-zinc-900/60 p-2.5">
                <span className="text-rose-400 text-[11px] block font-sans font-semibold">
                  Next.js Proxy:
                </span>
                <span className="text-zinc-300 text-[11px]">proxy.ts</span>
              </div>
              <div className="rounded-lg border border-white/5 bg-zinc-900/60 p-2.5">
                <span className="text-amber-400 text-[11px] block font-sans font-semibold">
                  Static Next Config:
                </span>
                <span className="text-zinc-300 text-[11px]">next.config.ts</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-wider text-zinc-200 uppercase">
              Testing &amp; CLI Quick Commands
            </h3>
            <p className="mt-2 text-xs text-zinc-400">
              Run in your terminal to inspect raw headers:
            </p>
            <div className="mt-2.5 rounded-lg border border-white/10 bg-black/60 p-2.5 font-mono text-[11px] text-zinc-300">
              <div className="flex items-center justify-between text-zinc-500 text-[10px] pb-1 border-b border-white/5">
                <span>cURL Status Check</span>
                <TerminalIcon className="h-3 w-3" />
              </div>
              <div className="pt-1.5 text-emerald-400">curl -I localhost:3000/old-news</div>
              <div className="text-amber-400">curl -I localhost:3000/breaking</div>
            </div>
            <div className="mt-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-medium"
              >
                <ShieldCheckIcon className="h-3.5 w-3.5" />
                <span>Full Testing &amp; Rule Editing Guide &rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/5 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <div>
            &copy; 2026 Nagarik Redirection Test Portal &bull; Nepal Republic Media Ltd.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span>HTTP 301 Permanent</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
              <span>HTTP 302 Found</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
