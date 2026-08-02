import type { Metadata } from "next";
import Link from "next/link";
import { getLearnArticles } from "@/lib/content";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { clusterLabels, clusterDescriptions } from "@/lib/site";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Practitioner guides on AI automation, business systems, exit readiness, and acquisition finance — organized by topic cluster.",
};

export default function LearnIndexPage() {
  const articles = getLearnArticles();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="max-w-2xl">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-sky">
          Learn
        </span>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink">
          Practitioner guides, not generic AI content
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-mid">
          Four clusters. Every article comes from firsthand operating, buying, or building
          experience — not a content calendar.
        </p>
      </header>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Object.entries(clusterLabels).map(([slug, label]) => (
          <Link
            key={slug}
            href={`/learn/${slug}`}
            className="rounded-lg border border-mid/15 bg-white p-6 transition hover:border-sky/40"
          >
            <h2 className="font-display text-lg font-semibold text-ink">{label}</h2>
            <p className="mt-2 text-sm leading-relaxed text-mid">{clusterDescriptions[slug]}</p>
          </Link>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="font-display text-xl font-semibold text-ink">Latest</h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard
              key={a.frontmatter.slug}
              href={`/learn/${a.frontmatter.cluster}/${a.frontmatter.slug}`}
              eyebrow={clusterLabels[a.frontmatter.cluster]}
              title={a.frontmatter.title}
              description={a.frontmatter.description}
              meta={a.readingTime}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
