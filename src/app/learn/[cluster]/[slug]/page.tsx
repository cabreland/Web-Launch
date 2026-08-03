import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLearnArticles, getLearnArticle } from "@/lib/content";
import { MdxContent } from "@/components/mdx/MdxContent";
import { AuthorByline } from "@/components/ui/AuthorByline";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { articleJsonLd, faqJsonLd, jsonLdScript } from "@/lib/seo";
import { clusterLabels } from "@/lib/site";

export function generateStaticParams() {
  return getLearnArticles().map((a) => ({
    cluster: a.frontmatter.cluster,
    slug: a.frontmatter.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cluster: string; slug: string }>;
}): Promise<Metadata> {
  const { cluster, slug } = await params;
  const entry = getLearnArticle(cluster, slug);
  if (!entry) return {};
  return {
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
    openGraph: { title: entry.frontmatter.title, description: entry.frontmatter.description },
  };
}

export default async function LearnArticlePage({
  params,
}: {
  params: Promise<{ cluster: string; slug: string }>;
}) {
  const { cluster, slug } = await params;
  const entry = getLearnArticle(cluster, slug);
  if (!entry) notFound();

  const url = `/learn/${cluster}/${slug}`;

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          articleJsonLd({
            title: entry.frontmatter.title,
            description: entry.frontmatter.description,
            url,
            datePublished: entry.frontmatter.publishedAt,
            dateModified: entry.frontmatter.updatedAt,
            authorKey: entry.frontmatter.author,
          })
        )}
      />
      {entry.frontmatter.faq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(faqJsonLd(entry.frontmatter.faq))}
        />
      )}

      <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-sky">
        {clusterLabels[cluster]}
      </span>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
        {entry.frontmatter.title}
      </h1>

      <div className="mt-6">
        <AuthorByline
          authorKey={entry.frontmatter.author}
          publishedAt={entry.frontmatter.publishedAt}
          readingTime={entry.readingTime}
        />
      </div>

      <div className="mt-8">
        <MdxContent source={entry.content} />
      </div>

      {entry.frontmatter.faq && <FaqAccordion items={entry.frontmatter.faq} />}
    </article>
  );
}
