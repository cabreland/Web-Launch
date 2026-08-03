import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPlatformEntries, getPlatformArticle, getPlatformOverview } from "@/lib/content";
import { MdxContent } from "@/components/mdx/MdxContent";
import { AuthorByline } from "@/components/ui/AuthorByline";
import { articleJsonLd, jsonLdScript } from "@/lib/seo";

export function generateStaticParams() {
  return getPlatformEntries()
    .filter((e) => !e.frontmatter.isOverview)
    .map((e) => ({ platform: e.frontmatter.platform, slug: e.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ platform: string; slug: string }>;
}): Promise<Metadata> {
  const { platform, slug } = await params;
  const entry = getPlatformArticle(platform, slug);
  if (!entry) return {};
  return { title: entry.frontmatter.title, description: entry.frontmatter.description };
}

export default async function PlatformArticlePage({
  params,
}: {
  params: Promise<{ platform: string; slug: string }>;
}) {
  const { platform, slug } = await params;
  const entry = getPlatformArticle(platform, slug);
  if (!entry) notFound();
  const overview = getPlatformOverview(platform);

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          articleJsonLd({
            title: entry.frontmatter.title,
            description: entry.frontmatter.description,
            url: `/platforms/${platform}/${slug}`,
            datePublished: entry.frontmatter.publishedAt,
            authorKey: entry.frontmatter.author,
          })
        )}
      />
      <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-sky">
        {overview?.frontmatter.platformName ?? platform}
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
    </article>
  );
}
