"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GlobeIcon,
  NewspaperIcon,
  ZapIcon,
  TrendingUpIcon,
  TerminalIcon,
  BookOpenIcon,
  ArrowRightIcon,
} from "./icons";

const NAV_LINKS = [
  { href: "/", label: "Workbench", icon: TerminalIcon },
  { href: "/news", label: "News", icon: NewspaperIcon },
  { href: "/epaper", label: "ePaper", icon: BookOpenIcon },
  { href: "/politics", label: "Politics", icon: GlobeIcon },
  { href: "/business", label: "Business", icon: TrendingUpIcon },
  { href: "/sports", label: "Sports", icon: ZapIcon },
  { href: "/contact", label: "Docs & Guide", icon: TerminalIcon },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c0e14]/80 backdrop-blur-xl">
      {/* Top Status & Quick-Nav Bar */}
      <div className="border-b border-white/5 bg-black/40 px-4 py-1.5 text-xs">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-mono text-zinc-300 font-medium">
              Next.js 16 Proxy Engine
            </span>
            <span className="text-zinc-600">&bull;</span>
            <span className="text-zinc-400 hidden sm:inline">
              Nagarik Redirection Sandbox (HTTP 301 &amp; 302)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-zinc-500 hidden md:inline">Instant Test:</span>
            <a
              href="/old-news"
              className="group inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-0.5 font-mono text-[11px] font-medium text-emerald-400 transition-all hover:border-emerald-400 hover:bg-emerald-900/50"
              title="HTTP 301 Permanent Redirect to /news"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span>/old-news</span>
              <span className="rounded bg-emerald-900/60 px-1 text-[10px] text-emerald-300">
                301
              </span>
            </a>

            <a
              href="/breaking"
              className="group inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-950/40 px-2.5 py-0.5 font-mono text-[11px] font-medium text-amber-400 transition-all hover:border-amber-400 hover:bg-amber-900/50"
              title="HTTP 302 Temporary Redirect to featured story"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
              <span>/breaking</span>
              <span className="rounded bg-amber-900/60 px-1 text-[10px] text-amber-300">
                302
              </span>
            </a>

            <a
              href="/api/redirect?code=301&to=/sports"
              className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800/60 px-2 py-0.5 font-mono text-[11px] text-zinc-300 hover:border-zinc-500"
            >
              <span>Dynamic 301</span>
              <ArrowRightIcon className="h-3 w-3 text-zinc-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-red-700 font-bold text-white shadow-lg shadow-rose-900/40 transition-transform group-hover:scale-105">
            <span className="text-lg tracking-wider">ना</span>
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 opacity-0 blur-sm transition-opacity group-hover:opacity-60"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-rose-400 transition-colors">
                NAGARIK
              </span>
              <span className="rounded-md border border-rose-500/30 bg-rose-500/10 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-rose-400 uppercase">
                Redirect Engine
              </span>
            </div>
            <p className="text-xs text-zinc-400 hidden sm:block">
              Multi-Page 301/302 Routing &amp; Inspection Lab
            </p>
          </div>
        </Link>

        {/* Navigation links */}
        <nav
          aria-label="Primary"
          className="flex items-center gap-1 overflow-x-auto rounded-xl border border-white/5 bg-zinc-900/60 p-1 backdrop-blur-md"
        >
          {NAV_LINKS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${isActive
                  ? "bg-rose-600 text-white shadow-md shadow-rose-900/30"
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                  }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-white" : "text-zinc-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
