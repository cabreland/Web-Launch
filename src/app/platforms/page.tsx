import type { Metadata } from "next";
import Link from "next/link";
import { getPlatformEntries, getPlatforms, getPlatformOverview } from "@/lib/content";

export const metadata: Metadata = {
  title: "Platforms",
  description: "Platform-specific guides for the CRM, automation, and marketing tools we build on.",
};

export default function PlatformsIndexPage() {
  const platforms = getPlatforms();
  const entries = getPlatformEntries();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-sky">
        Platforms
      </span>
      <h1 className="mt-3 font-display text-4xl font-semibold text-ink">Platform guides</h1>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-mid">
        Configuration guides and failure-mode breakdowns for the platforms we actually run in
        production.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {platforms.map((slug) => {
          const overview = getPlatformOverview(slug);
          const articleCount = entries.filter(
            (e) => e.frontmatter.platform === slug && !e.frontmatter.isOverview
          ).length;
          return (
            <Link
              key={slug}
              href={`/platforms/${slug}`}
              className="rounded-lg border border-mid/15 bg-white p-6 transition hover:border-sky/40"
            >
              <h2 className="font-display text-lg font-semibold text-ink">
                {overview?.frontmatter.platformName ?? slug}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-mid">
                {overview?.frontmatter.description}
              </p>
              <span className="mt-4 block text-xs text-mid/70">{articleCount} guide(s)</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
