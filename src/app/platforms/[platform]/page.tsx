import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPlatforms, getPlatformOverview, getPlatformArticles } from "@/lib/content";
import { MdxContent } from "@/components/mdx/MdxContent";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { articleJsonLd, jsonLdScript } from "@/lib/seo";

export function generateStaticParams() {
  return getPlatforms().map((platform) => ({ platform }));
}

export function generateMetadata({ params }: { params: { platform: string } }): Metadata {
  const overview = getPlatformOverview(params.platform);
  if (!overview) return {};
  return { title: overview.frontmatter.platformName, description: overview.frontmatter.description };
}

export default function PlatformOverviewPage({ params }: { params: { platform: string } }) {
  const overview = getPlatformOverview(params.platform);
  if (!overview) notFound();
  const articles = getPlatformArticles(params.platform);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          articleJsonLd({
            title: overview.frontmatter.title,
            description: overview.frontmatter.description,
            url: `/platforms/${params.platform}`,
            datePublished: overview.frontmatter.publishedAt,
            authorKey: overview.frontmatter.author,
          })
        )}
      />
      <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-sky">
        Platform
      </span>
      <h1 className="mt-3 font-display text-4xl font-semibold text-ink">
        {overview.frontmatter.platformName}
      </h1>
      <div className="mt-8">
        <MdxContent source={overview.content} />
      </div>

      {articles.length > 0 && (
        <div className="mt-14 border-t border-mid/15 pt-10">
          <h2 className="font-display text-xl font-semibold text-ink">Guides</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {articles.map((a) => (
              <ArticleCard
                key={a.frontmatter.slug}
                href={`/platforms/${params.platform}/${a.frontmatter.slug}`}
                title={a.frontmatter.title}
                description={a.frontmatter.description}
                meta={a.readingTime}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
