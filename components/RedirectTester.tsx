"use client";

import { useState, useMemo } from "react";
import type { RedirectRule } from "@/lib/redirect-rules";
import {
  SearchIcon,
  RefreshIcon,
  CopyIcon,
  CheckIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
  TerminalIcon,
  ZapIcon,
  ShieldCheckIcon,
} from "./icons";

interface InspectHop {
  step: number;
  url: string;
  path: string;
  status: number;
  statusText: string;
  location: string | null;
  ruleId: string | null;
  cacheControl: string | null;
}

interface InspectResult {
  requestedPath: string;
  hops: InspectHop[];
  initialStatus: number | null;
  finalStatus: number | null;
  error?: string;
}

interface RedirectTesterProps {
  rules: RedirectRule[];
}

const DESTINATION_OPTIONS = [
  "/news",
  "/news/nagarik-digital-launch",
  "/news/budget-update-2026",
  "/epaper",
  "/politics",
  "/business",
  "/sports",
  "/contact",
];

function StatusBadge({
  status,
  size = "md",
}: {
  status: number;
  size?: "sm" | "md" | "lg";
}) {
  const isPermanent = status === 301 || status === 308;
  const isTemporary = status === 302 || status === 307 || status === 303;
  const isOk = status >= 200 && status < 300;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3.5 py-1.5 text-sm font-bold",
  }[size];

  if (isPermanent) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 font-mono font-bold text-emerald-300 ${sizeClasses}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
        <span>{status}</span>
        <span className="font-sans font-semibold text-[10px] text-emerald-400/90 uppercase tracking-wider">
          Permanent
        </span>
      </span>
    );
  }

  if (isTemporary) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 font-mono font-bold text-amber-300 ${sizeClasses}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
        <span>{status}</span>
        <span className="font-sans font-semibold text-[10px] text-amber-400/90 uppercase tracking-wider">
          Temporary
        </span>
      </span>
    );
  }

  if (isOk) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-lg border border-sky-500/40 bg-sky-500/10 font-mono font-bold text-sky-300 ${sizeClasses}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-sky-400"></span>
        <span>{status}</span>
        <span className="font-sans font-semibold text-[10px] text-sky-400/90 uppercase tracking-wider">
          OK
        </span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border border-rose-500/40 bg-rose-500/10 font-mono font-bold text-rose-300 ${sizeClasses}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-rose-400"></span>
      <span>{status}</span>
    </span>
  );
}

export function RedirectTester({ rules }: RedirectTesterProps) {
  const [testPath, setTestPath] = useState("/old-news");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<InspectResult | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Filter state for rules table
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "301" | "302" | "proxy" | "config"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Dynamic sandbox state
  const [dynamicCode, setDynamicCode] = useState<"301" | "302">("302");
  const [dynamicTarget, setDynamicTarget] = useState("/news");

  function copyToClipboard(text: string, label: string) {
    void navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  }

  async function inspectPath(pathToCheck: string) {
    const normalized = pathToCheck.trim() || "/";
    setTestPath(normalized);
    setLoading(true);
    try {
      const res = await fetch(
        `/api/inspect?path=${encodeURIComponent(normalized)}`,
        { cache: "no-store" }
      );
      const data = (await res.json()) as InspectResult;
      setResult(data);
    } catch (err) {
      setResult({
        requestedPath: normalized,
        hops: [],
        initialStatus: null,
        finalStatus: null,
        error: err instanceof Error ? err.message : "Failed to inspect path.",
      });
    } finally {
      setLoading(false);
    }
  }

  const filteredRules = useMemo(() => {
    return rules.filter((rule) => {
      // Status code / layer filter
      if (selectedFilter === "301" && rule.statusCode !== 301) return false;
      if (selectedFilter === "302" && rule.statusCode !== 302) return false;
      if (selectedFilter === "proxy" && rule.layer !== "proxy") return false;
      if (selectedFilter === "config" && rule.layer !== "next-config") return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesSource = rule.source.toLowerCase().includes(query);
        const matchesDest = rule.destination.toLowerCase().includes(query);
        const matchesDesc = rule.description.toLowerCase().includes(query);
        return matchesSource || matchesDest || matchesDesc;
      }
      return true;
    });
  }, [rules, selectedFilter, searchQuery]);

  const dynamicUrl = `/api/redirect?code=${dynamicCode}&to=${encodeURIComponent(
    dynamicTarget
  )}`;

  return (
    <div className="space-y-8">
      {/* 1. Live Interactive Inspector Workbench */}
      <section className="glass-panel-elevated relative overflow-hidden rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400">
              <ZapIcon className="h-4 w-4" />
              <span>Diagnostic Inspector</span>
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-white">
              Live HTTP 301 &amp; 302 Header Inspector
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Captures raw server HTTP status codes, redirection chain steps, and{" "}
              <code className="rounded bg-white/10 px-1 py-0.5 font-mono text-zinc-300">
                Location
              </code>{" "}
              headers without automatic browser following.
            </p>
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void inspectPath(testPath);
          }}
          className="mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
              <SearchIcon className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={testPath}
              onChange={(e) => setTestPath(e.target.value)}
              placeholder="Enter path: /old-news, /breaking, or /legacy-article/budget-update-2026"
              className="w-full rounded-xl border border-white/15 bg-black/60 py-3 pl-10 pr-4 font-mono text-sm text-white placeholder:text-zinc-500 focus:border-rose-500 focus:bg-black/90 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-900/30 transition-all hover:from-rose-500 hover:to-red-500 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshIcon className="h-4 w-4 animate-spin" />
                <span>Inspecting...</span>
              </>
            ) : (
              <>
                <ZapIcon className="h-4 w-4" />
                <span>Inspect Headers</span>
              </>
            )}
          </button>
        </form>

        {/* Presets */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-zinc-500 font-medium">Quick Presets:</span>
          {[
            { path: "/old-news", code: "301" },
            { path: "/breaking", code: "302" },
            { path: "/nagarik-paper", code: "301" },
            { path: "/legacy-article/budget-update-2026?utm=test", code: "301" },
            { path: "/promo", code: "302" },
            { path: "/temp-politics", code: "302" },
            { path: "/config-301", code: "301" },
            { path: "/config-302", code: "302" },
          ].map((preset) => (
            <button
              key={preset.path}
              type="button"
              onClick={() => void inspectPath(preset.path)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-zinc-300 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              <span>{preset.path}</span>
              <span
                className={`rounded px-1 text-[10px] font-bold ${
                  preset.code === "301"
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-amber-500/20 text-amber-300"
                }`}
              >
                {preset.code}
              </span>
            </button>
          ))}
        </div>

        {/* Inspection Results Waterfall */}
        {result && (
          <div className="mt-6 rounded-xl border border-white/10 bg-black/50 p-5 backdrop-blur-md">
            {result.error ? (
              <div className="flex items-center gap-2 text-sm font-semibold text-rose-400">
                <span>&times;</span>
                <span>{result.error}</span>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Result header summary */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-zinc-400">Inspection Target:</span>
                    <code className="rounded-md border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-sm font-bold text-white">
                      {result.requestedPath}
                    </code>
                    {result.initialStatus && (
                      <StatusBadge status={result.initialStatus} size="sm" />
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          `curl -IL "http://localhost:3000${result.requestedPath}"`,
                          "curl"
                        )
                      }
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-zinc-800/80 px-2.5 py-1 text-xs text-zinc-300 hover:border-white/30 hover:text-white transition-all"
                    >
                      {copiedText === "curl" ? (
                        <>
                          <CheckIcon className="h-3 w-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <TerminalIcon className="h-3 w-3 text-zinc-400" />
                          <span>Copy cURL Command</span>
                        </>
                      )}
                    </button>

                    <a
                      href={result.requestedPath}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-zinc-800/80 px-2.5 py-1 text-xs text-zinc-300 hover:border-white/30 hover:text-white transition-all"
                    >
                      <span>Open in Browser</span>
                      <ExternalLinkIcon className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                {/* Hops timeline */}
                <div className="relative space-y-3 pt-2">
                  {result.hops.map((hop, index) => {
                    const isLast = index === result.hops.length - 1;
                    return (
                      <div
                        key={hop.step}
                        className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-white/10 bg-zinc-900/70 p-4 transition-all"
                      >
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 font-mono text-xs font-bold text-zinc-300">
                            {hop.step}
                          </span>
                          <StatusBadge status={hop.status} />
                          <code className="font-mono text-sm font-semibold text-zinc-100">
                            {hop.path}
                          </code>
                          {hop.location && (
                            <div className="flex items-center gap-2">
                              <ArrowRightIcon className="h-3.5 w-3.5 text-rose-400" />
                              <span className="text-xs text-zinc-400">Redirects to:</span>
                              <code className="rounded border border-emerald-500/30 bg-emerald-950/40 px-2 py-0.5 font-mono text-xs font-semibold text-emerald-300">
                                {hop.location}
                              </code>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
                          {hop.ruleId && (
                            <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-zinc-300">
                              rule: {hop.ruleId}
                            </span>
                          )}
                          {isLast && hop.status === 200 && (
                            <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-emerald-300">
                              Resolved Destination
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* 2. Configured 301 & 302 Rules Table */}
      <section className="glass-panel-elevated relative overflow-hidden rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <ShieldCheckIcon className="h-4 w-4" />
              <span>Routing Registry</span>
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-white">
              Configured Redirect Rules
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Manage and test active redirects mapped across proxy.ts and next.config.ts.
            </p>
          </div>

          {/* Search bar inside table */}
          <div className="relative w-full md:w-64">
            <SearchIcon className="pointer-events-none absolute left-3 top-3 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search source or dest..."
              className="w-full rounded-xl border border-white/15 bg-black/40 py-2 pl-9 pr-3 text-xs text-white placeholder:text-zinc-500 focus:border-rose-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-5 flex flex-wrap items-center gap-2 border-b border-white/10 pb-4 text-xs">
          <span className="text-zinc-500 font-medium">Filter:</span>
          {[
            { id: "all", label: `All Rules (${rules.length})` },
            {
              id: "301",
              label: `301 Permanent (${rules.filter((r) => r.statusCode === 301).length})`,
            },
            {
              id: "302",
              label: `302 Temporary (${rules.filter((r) => r.statusCode === 302).length})`,
            },
            {
              id: "proxy",
              label: `Proxy Layer (${rules.filter((r) => r.layer === "proxy").length})`,
            },
            {
              id: "config",
              label: `Next Config (${rules.filter((r) => r.layer === "next-config").length})`,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedFilter(tab.id as typeof selectedFilter)}
              className={`rounded-lg px-3 py-1 font-medium transition-all ${
                selectedFilter === tab.id
                  ? "bg-rose-600 text-white shadow-md shadow-rose-900/30"
                  : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                <th className="py-3.5 pr-4">Status</th>
                <th className="py-3.5 pr-4">Source URL</th>
                <th className="py-3.5 pr-4">Target Destination</th>
                <th className="py-3.5 pr-4">Implementation</th>
                <th className="py-3.5 pr-4">Purpose</th>
                <th className="py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredRules.map((rule) => {
                const sampleSource = rule.source.includes(":slug")
                  ? rule.source.replace(":slug", "budget-update-2026")
                  : rule.source;
                return (
                  <tr
                    key={rule.id}
                    className="group transition-colors hover:bg-white/[0.03]"
                  >
                    <td className="py-4 pr-4 whitespace-nowrap">
                      <StatusBadge status={rule.statusCode} size="sm" />
                    </td>
                    <td className="py-4 pr-4 font-mono text-xs font-bold text-white">
                      <div className="flex items-center gap-2">
                        <span>{rule.source}</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(sampleSource, rule.id)}
                          title="Copy path"
                          className="opacity-0 transition-opacity group-hover:opacity-100 text-zinc-400 hover:text-white"
                        >
                          {copiedText === rule.id ? (
                            <CheckIcon className="h-3 w-3 text-emerald-400" />
                          ) : (
                            <CopyIcon className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="py-4 pr-4 font-mono text-xs text-rose-300">
                      <span className="rounded bg-rose-500/10 px-2 py-0.5 border border-rose-500/20">
                        {rule.destination}
                      </span>
                    </td>
                    <td className="py-4 pr-4 whitespace-nowrap">
                      <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-zinc-300">
                        {rule.layer === "proxy" ? "proxy.ts" : "next.config.ts"}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-xs text-zinc-400 max-w-xs">
                      {rule.description}
                    </td>
                    <td className="py-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => void inspectPath(sampleSource)}
                          className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-semibold text-zinc-300 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
                        >
                          Inspect
                        </button>
                        <a
                          href={sampleSource}
                          className="inline-flex items-center gap-1 rounded-lg bg-rose-600 px-3 py-1 text-xs font-semibold text-white shadow-md shadow-rose-900/30 transition-all hover:bg-rose-500"
                        >
                          <span>Visit</span>
                          <ExternalLinkIcon className="h-3 w-3" />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Ad-Hoc 301 / 302 Simulator Sandbox */}
      <section className="glass-panel-elevated relative overflow-hidden rounded-2xl p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
          <TerminalIcon className="h-4 w-4" />
          <span>Interactive Playground</span>
        </div>
        <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-white">
          On-The-Fly 301 / 302 Redirect Simulator
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          Generate an immediate HTTP redirect with custom status codes and destinations without altering server configuration files.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-300">
              HTTP Status Code
            </label>
            <select
              value={dynamicCode}
              onChange={(e) => setDynamicCode(e.target.value as "301" | "302")}
              className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 font-mono text-sm text-white focus:border-rose-500 focus:outline-none"
            >
              <option value="301" className="bg-zinc-900">
                301 - Moved Permanently (SEO / Canonical)
              </option>
              <option value="302" className="bg-zinc-900">
                302 - Found (Temporary / Campaign)
              </option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-300">
              Target Destination Page
            </label>
            <select
              value={dynamicTarget}
              onChange={(e) => setDynamicTarget(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 font-mono text-sm text-white focus:border-rose-500 focus:outline-none"
            >
              {DESTINATION_OPTIONS.map((dest) => (
                <option key={dest} value={dest} className="bg-zinc-900">
                  {dest}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end gap-2.5">
            <button
              type="button"
              onClick={() => void inspectPath(dynamicUrl)}
              className="flex-1 rounded-xl border border-white/15 bg-white/5 py-2.5 text-center text-sm font-semibold text-zinc-200 hover:border-white/30 hover:bg-white/10 hover:text-white transition-all"
            >
              Inspect Flow
            </button>
            <a
              href={dynamicUrl}
              className="flex-1 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 py-2.5 text-center text-sm font-bold text-white shadow-lg shadow-amber-900/30 hover:from-amber-500 hover:to-amber-400 transition-all"
            >
              Fire Redirect
            </a>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl border border-white/5 bg-black/40 px-4 py-2.5 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-500">Live Endpoint:</span>
            <code className="font-mono text-rose-300">{dynamicUrl}</code>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(dynamicUrl, "dyn-url")}
            className="text-zinc-400 hover:text-white"
          >
            {copiedText === "dyn-url" ? (
              <span className="text-emerald-400">Copied!</span>
            ) : (
              <CopyIcon className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </section>
    </div>
  );
}
