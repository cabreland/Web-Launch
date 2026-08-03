import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCompares, getCompare } from "@/lib/content";
import { MdxContent } from "@/components/mdx/MdxContent";
import { AuthorByline } from "@/components/ui/AuthorByline";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { articleJsonLd, faqJsonLd, jsonLdScript } from "@/lib/seo";

export function generateStaticParams() {
  return getCompares().map((e) => ({ slug: e.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getCompare(slug);
  if (!entry) return {};
  return { title: entry.frontmatter.title, description: entry.frontmatter.description };
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getCompare(slug);
  if (!entry) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          articleJsonLd({
            title: entry.frontmatter.title,
            description: entry.frontmatter.description,
            url: `/compare/${slug}`,
            datePublished: entry.frontmatter.publishedAt,
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
        Compare
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
