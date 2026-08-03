import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getClusters, getLearnArticlesByCluster } from "@/lib/content";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { clusterLabels, clusterDescriptions, clusterColors } from "@/lib/site";

export function generateStaticParams() {
  return getClusters().map((cluster) => ({ cluster }));
}

export function generateMetadata({
  params,
}: {
  params: { cluster: string };
}): Metadata {
  const label = clusterLabels[params.cluster];
  if (!label) return {};
  return {
    title: label,
    description: clusterDescriptions[params.cluster],
  };
}

export default function ClusterPage({ params }: { params: { cluster: string } }) {
  const label = clusterLabels[params.cluster];
  if (!label) notFound();

  const articles = getLearnArticlesByCluster(params.cluster);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <span
        className={`font-mono text-[11px] font-semibold uppercase tracking-widest ${
          clusterColors[params.cluster]?.text ?? "text-sky"
        }`}
      >
        Learn
      </span>
      <h1 className="mt-3 font-display text-4xl font-semibold text-ink">{label}</h1>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-mid">
        {clusterDescriptions[params.cluster]}
      </p>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <ArticleCard
            key={a.frontmatter.slug}
            href={`/learn/${params.cluster}/${a.frontmatter.slug}`}
            title={a.frontmatter.title}
            description={a.frontmatter.description}
            meta={a.readingTime}
          />
        ))}
        {articles.length === 0 && (
          <p className="text-sm text-mid">No articles published in this cluster yet.</p>
        )}
      </div>
    </div>
  );
}
