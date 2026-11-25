import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageShell } from "@/components/PageShell";
import { getArticleBySlug, SAMPLE_ARTICLES } from "@/lib/site-pages";
import { ClockIcon, ShieldCheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Article",
  description: "Dynamic article destination page for 301 & 302 testing.",
};

export function generateStaticParams() {
  return SAMPLE_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

async function ArticleContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  const title = article
    ? article.title
    : `Dynamic Article: ${decodeURIComponent(slug)}`;
  const subtitle = article
    ? article.summary
    : `Custom slug "${decodeURIComponent(
        slug
      )}" rendered dynamically. Useful for testing /legacy-article/:slug -> /news/:slug (301).`;

  return (
    <PageShell
      section={article?.category ?? "Dynamic Story"}
      title={title}
      subtitle={subtitle}
      currentPath={`/news/${slug}`}
      filePath="app/news/[slug]/page.tsx"
    >
      <div className="space-y-6">
        {/* Dynamic Forwarder Notification Box */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <ShieldCheckIcon className="h-4 w-4" />
            <span>Preserved Parameter Dynamic 301 Route</span>
          </div>
          <p className="mt-1 text-xs text-zinc-300">
            Any request matching{" "}
            <code className="rounded bg-black/40 px-1.5 py-0.5 font-mono text-emerald-300">
              /legacy-article/{slug}
            </code>{" "}
            is captured by <code className="font-mono text-white">proxy.ts</code> and permanently redirected (HTTP 301) here while keeping any UTM query strings.
          </p>
        </div>

        {/* Article Body Container */}
        <article className="glass-panel-elevated rounded-2xl p-6 sm:p-10">
          <div className="mb-6 flex flex-wrap items-center gap-4 border-b border-white/10 pb-5 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="text-zinc-500">Slug:</span>
              <code className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-white">
                {slug}
              </code>
            </span>
            {article && (
              <>
                <span>&bull;</span>
                <span>By {article.author}</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <ClockIcon className="h-3.5 w-3.5" />
                  <time dateTime={article.publishedAt}>{article.publishedAt}</time>
                </span>
              </>
            )}
          </div>

          <div className="space-y-5 text-base sm:text-lg leading-relaxed text-zinc-200">
            {article ? (
              article.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            ) : (
              <p>
                This route accepts any slug dynamically so you can test parameter forwarding with 301/302 redirects.
              </p>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
            <Link
              href="/news"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-200 hover:bg-white/10"
            >
              &larr; Back to News Hub
            </Link>
            <a
              href={`/legacy-article/${slug}`}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-emerald-950/50 hover:bg-emerald-500"
            >
              Retest 301 via /legacy-article/{slug}
            </a>
          </div>
        </article>
      </div>
    </PageShell>
  );
}

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-7xl px-4 py-16 text-center text-sm text-zinc-400 font-mono">
          Loading article content...
        </div>
      }
    >
      <ArticleContent params={params} />
    </Suspense>
  );
}
