import Link from "next/link";
import { ALL_REDIRECT_RULES } from "@/lib/redirect-rules";
import {
  GlobeIcon,
  CodeIcon,
  CheckCircleIcon,
  ExternalLinkIcon,
} from "./icons";

interface PageShellProps {
  section: string;
  title: string;
  subtitle: string;
  currentPath: string;
  filePath: string;
  children: React.ReactNode;
}

export function PageShell({
  section,
  title,
  subtitle,
  currentPath,
  filePath,
  children,
}: PageShellProps) {
  const incomingRules = ALL_REDIRECT_RULES.filter(
    (rule) => rule.enabled && rule.destination === currentPath
  );

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
      {/* Header Banner */}
      <div className="glass-panel-elevated relative mb-8 overflow-hidden rounded-2xl p-6 sm:p-8">
        {/* Subtle decorative glow */}
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-rose-600/15 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-blue-600/10 blur-3xl pointer-events-none"></div>

        <div className="relative">
          {/* Breadcrumb & Metadata Badges */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="text-zinc-400 transition-colors hover:text-white"
              >
                Dashboard
              </Link>
              <span className="text-zinc-600">/</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 font-semibold tracking-wide text-rose-300 uppercase text-[11px]">
                <GlobeIcon className="h-3 w-3" />
                {section}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-zinc-400">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-white/5 bg-zinc-900/80 px-2.5 py-1">
                <span className="text-zinc-500">Route:</span>
                <span className="text-emerald-400 font-semibold">{currentPath}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-white/5 bg-zinc-900/80 px-2.5 py-1">
                <CodeIcon className="h-3 w-3 text-zinc-500" />
                <span className="text-zinc-300">{filePath}</span>
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {title}
          </h1>
          <p className="mt-2.5 max-w-3xl text-sm sm:text-base leading-relaxed text-zinc-300">
            {subtitle}
          </p>

          {/* Incoming Redirect Callout */}
          {incomingRules.length > 0 && (
            <div className="mt-6 rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                <CheckCircleIcon className="h-4 w-4 text-emerald-400" />
                <span>Redirect rules actively pointing to this page</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {incomingRules.map((rule) => {
                  const isPermanent =
                    rule.statusCode === 301 || rule.statusCode === 308;
                  return (
                    <a
                      key={rule.id}
                      href={rule.source}
                      className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900/90 px-3 py-2 text-xs font-medium text-zinc-200 transition-all hover:border-white/30 hover:bg-zinc-800"
                    >
                      <span
                        className={`rounded-md px-2 py-0.5 font-mono text-[11px] font-bold ${
                          isPermanent
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                        }`}
                      >
                        {rule.statusCode} {isPermanent ? "Permanent" : "Temporary"}
                      </span>
                      <span className="font-mono text-zinc-200">
                        {rule.source}
                      </span>
                      <ExternalLinkIcon className="h-3 w-3 text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-300" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/5 pt-4 text-xs">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-medium text-rose-400 transition-colors hover:text-rose-300"
            >
              <span>&larr; Back to Redirect Workbench</span>
            </Link>
            <span className="text-zinc-600">&bull;</span>
            <Link
              href="/contact"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              How to change target URLs &rarr;
            </Link>
          </div>
        </div>
      </div>

      {children}
    </main>
  );
}
