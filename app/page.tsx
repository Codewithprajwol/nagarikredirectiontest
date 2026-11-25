import Link from "next/link";
import { ALL_REDIRECT_RULES } from "@/lib/redirect-rules";
import { SITE_PAGES } from "@/lib/site-pages";
import { RedirectTester } from "@/components/RedirectTester";
import { GlobeIcon, ZapIcon, ArrowRightIcon, FlameIcon } from "@/components/icons";

export default function HomePage() {
  const count301 = ALL_REDIRECT_RULES.filter((r) => r.statusCode === 301).length;
  const count302 = ALL_REDIRECT_RULES.filter((r) => r.statusCode === 302).length;

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 space-y-10 px-4 py-8 sm:px-6">
      {/* 1. Hero Showcase Section */}
      <section className="glass-panel-elevated relative overflow-hidden rounded-3xl p-6 sm:p-10">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-rose-600/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none"></div>

        <div className="relative">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-bold tracking-wider text-rose-400 uppercase">
              <FlameIcon className="h-3.5 w-3.5" />
              <span>Nagarik News Technology</span>
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-zinc-300">
              Next.js 16 &bull; Turbopack &bull; App Router
            </span>
          </div>

          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                HTTP <span className="text-emerald-400">301</span> &amp;{" "}
                <span className="text-amber-400">302</span> Redirection Engine
              </h1>
              <p className="mt-3.5 text-base sm:text-lg leading-relaxed text-zinc-300">
                A high-precision redirection testing environment for Nagarik Digital Portal. Test, verify, and switch permanent SEO migrations versus temporary breaking-news redirects with instant HTTP header inspection.
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/old-news"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-950/50 hover:from-emerald-500 hover:to-emerald-400 transition-all"
              >
                <span>Trigger 301 (/old-news)</span>
                <ArrowRightIcon className="h-4 w-4" />
              </a>
              <a
                href="/breaking"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-amber-950/50 hover:from-amber-500 hover:to-amber-400 transition-all"
              >
                <span>Trigger 302 (/breaking)</span>
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* 4 Key Stat Badges */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  HTTP 301
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              </div>
              <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
                {count301} Rules
              </div>
              <div className="mt-1 text-xs text-emerald-300/80">
                Permanent (SEO cached)
              </div>
            </div>

            <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">
                  HTTP 302
                </span>
                <span className="h-2 w-2 rounded-full bg-amber-400"></span>
              </div>
              <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
                {count302} Rules
              </div>
              <div className="mt-1 text-xs text-amber-300/80">
                Temporary (Dynamic stories)
              </div>
            </div>

            <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-4 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-rose-400">
                  Proxy Engine
                </span>
                <ZapIcon className="h-3.5 w-3.5 text-rose-400" />
              </div>
              <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
                proxy.ts
              </div>
              <div className="mt-1 text-xs text-rose-300/80">
                Runs before route render
              </div>
            </div>

            <div className="rounded-2xl border border-blue-500/30 bg-blue-950/20 p-4 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
                  Pages
                </span>
                <GlobeIcon className="h-3.5 w-3.5 text-blue-400" />
              </div>
              <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
                {SITE_PAGES.length} Destinations
              </div>
              <div className="mt-1 text-xs text-blue-300/80">
                Individual section pages
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Redirect Workbench (Inspector, Registry, Simulator) */}
      <RedirectTester rules={ALL_REDIRECT_RULES} />

      {/* 3. Destination Pages Directory */}
      <section className="glass-panel-elevated relative overflow-hidden rounded-3xl p-6 sm:p-10">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
              <GlobeIcon className="h-4 w-4" />
              <span>Target Directory</span>
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-white">
              Distinct Destination Pages
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Each section has its own dedicated page file so you can change, customize, or route new redirects anytime.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SITE_PAGES.map((page) => (
            <Link
              key={page.path}
              href={page.path}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-900/60 p-5 transition-all hover:-translate-y-1 hover:border-rose-500/40 hover:bg-zinc-900 hover:shadow-xl hover:shadow-rose-950/20"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-400">
                    {page.section}
                  </span>
                  <code className="rounded bg-white/5 px-2 py-0.5 font-mono text-[11px] text-zinc-400 group-hover:text-zinc-200">
                    {page.path}
                  </code>
                </div>

                <h3 className="mt-3 font-bold text-white group-hover:text-rose-400 transition-colors">
                  {page.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                  {page.description}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-[11px] text-zinc-500 font-mono">
                <span>{page.filePath}</span>
                <ArrowRightIcon className="h-3 w-3 text-zinc-500 transition-transform group-hover:translate-x-1 group-hover:text-rose-400" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
