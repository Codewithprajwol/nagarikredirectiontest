import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { SAMPLE_ARTICLES } from "@/lib/site-pages";
import {
  FlameIcon,
  ClockIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "News",
  description: "Nagarik News listing page for redirect destination testing.",
};

export default function NewsPage() {
  const featured = SAMPLE_ARTICLES[0];
  const others = SAMPLE_ARTICLES.slice(1);

  return (
    <PageShell
      section="News Desk"
      title="Nagarik Digital Newsroom"
      subtitle="Main news destination hub. Currently targeted by /old-news (301 Permanent via proxy.ts) and /config-301 (301 Permanent via next.config.ts)."
      currentPath="/news"
      filePath="app/news/page.tsx"
    >
      <div className="space-y-8">
        {/* Breaking News Ticker */}
        <div className="flex items-center gap-3 rounded-xl border border-rose-500/30 bg-rose-950/30 px-4 py-2.5 text-xs backdrop-blur-md">
          <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-rose-400">
            <FlameIcon className="h-4 w-4" />
            <span>Breaking Ticker:</span>
          </span>
          <span className="text-zinc-300">
            Nagarik 302 temporary breaking redirect is currently targeted at our featured launch article.
          </span>
          <a
            href="/breaking"
            className="ml-auto inline-flex items-center gap-1 font-semibold text-rose-400 hover:text-rose-300 underline"
          >
            <span>Test /breaking (302)</span>
            <ArrowRightIcon className="h-3 w-3" />
          </a>
        </div>

        {/* Featured Story Hero */}
        {featured && (
          <div className="glass-panel-elevated relative overflow-hidden rounded-2xl p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-md border border-rose-500/40 bg-rose-500/20 px-2.5 py-0.5 font-bold uppercase tracking-wider text-rose-300">
                {featured.category}
              </span>
              <span className="flex items-center gap-1 text-zinc-400">
                <ClockIcon className="h-3.5 w-3.5" />
                <time dateTime={featured.publishedAt}>{featured.publishedAt}</time>
              </span>
              <span className="text-zinc-600">&bull;</span>
              <span className="text-zinc-400">By {featured.author}</span>
            </div>

            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-white hover:text-rose-400 transition-colors">
              <Link href={`/news/${featured.slug}`}>{featured.title}</Link>
            </h2>

            <p className="mt-3 max-w-4xl text-sm sm:text-base leading-relaxed text-zinc-300">
              {featured.summary}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href={`/news/${featured.slug}`}
                className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-rose-900/30 hover:bg-rose-500 transition-all"
              >
                <span>Read Full Story</span>
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </Link>
              <a
                href={`/legacy-article/${featured.slug}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/30 px-4 py-2.5 font-mono text-xs text-emerald-300 hover:border-emerald-400 hover:bg-emerald-900/40 transition-all"
              >
                <span>Test 301: /legacy-article/{featured.slug}</span>
                <ExternalLinkIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* Other News Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {others.map((article) => (
            <div
              key={article.slug}
              className="glass-panel flex flex-col justify-between rounded-2xl p-6 transition-all hover:border-white/20 hover:bg-zinc-900/80"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-semibold uppercase text-zinc-300">
                    {article.category}
                  </span>
                  <span>{article.publishedAt}</span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-white hover:text-rose-400 transition-colors">
                  <Link href={`/news/${article.slug}`}>{article.title}</Link>
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-400">
                  {article.summary}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-4 text-xs">
                <Link
                  href={`/news/${article.slug}`}
                  className="font-bold text-rose-400 hover:text-rose-300"
                >
                  Read Story &rarr;
                </Link>
                <a
                  href={`/legacy-article/${article.slug}`}
                  className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-zinc-300 hover:border-white/30 hover:text-white"
                >
                  Test 301 Slug
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
