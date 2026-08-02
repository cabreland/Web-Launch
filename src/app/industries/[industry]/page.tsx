import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIndustries, getIndustry } from "@/lib/content";
import { MdxContent } from "@/components/mdx/MdxContent";
import { AuthorByline } from "@/components/ui/AuthorByline";
import { articleJsonLd, jsonLdScript } from "@/lib/seo";

export function generateStaticParams() {
  return getIndustries().map((e) => ({ industry: e.frontmatter.industry }));
}

export function generateMetadata({ params }: { params: { industry: string } }): Metadata {
  const entry = getIndustry(params.industry);
  if (!entry) return {};
  return { title: entry.frontmatter.industryName, description: entry.frontmatter.description };
}

export default function IndustryPage({ params }: { params: { industry: string } }) {
  const entry = getIndustry(params.industry);
  if (!entry) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          articleJsonLd({
            title: entry.frontmatter.title,
            description: entry.frontmatter.description,
            url: `/industries/${params.industry}`,
            datePublished: entry.frontmatter.publishedAt,
            authorKey: entry.frontmatter.author,
          })
        )}
      />
      <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-sky">
        {entry.frontmatter.industryName}
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
