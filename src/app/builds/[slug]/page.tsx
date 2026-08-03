import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBuilds, getBuild } from "@/lib/content";
import { MdxContent } from "@/components/mdx/MdxContent";
import { AuthorByline } from "@/components/ui/AuthorByline";
import { BuildSlideshow } from "@/components/ui/BuildSlideshow";
import { articleJsonLd, jsonLdScript } from "@/lib/seo";

export function generateStaticParams() {
  return getBuilds().map((b) => ({ slug: b.frontmatter.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const entry = getBuild(params.slug);
  if (!entry) return {};
  return { title: entry.frontmatter.title, description: entry.frontmatter.description };
}

export default function BuildPage({ params }: { params: { slug: string } }) {
  const entry = getBuild(params.slug);
  if (!entry) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          articleJsonLd({
            title: entry.frontmatter.title,
            description: entry.frontmatter.description,
            url: `/builds/${params.slug}`,
            datePublished: entry.frontmatter.publishedAt,
            authorKey: entry.frontmatter.author,
          })
        )}
      />
      <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-sky">
        Build
      </span>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
        {entry.frontmatter.title}
      </h1>
      {entry.frontmatter.stack && (
        <div className="mt-4 flex flex-wrap gap-2">
          {entry.frontmatter.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-mid/20 px-3 py-1 font-mono text-[11px] text-mid"
            >
              {s}
            </span>
          ))}
        </div>
      )}
      <div className="mt-6">
        <AuthorByline
          authorKey={entry.frontmatter.author}
          publishedAt={entry.frontmatter.publishedAt}
          readingTime={entry.readingTime}
        />
      </div>
      {entry.frontmatter.slideshow && entry.frontmatter.slideshow.length > 0 && (
        <BuildSlideshow slides={entry.frontmatter.slideshow} />
      )}

      <div className="mt-8">
        <MdxContent source={entry.content} />
      </div>
    </article>
  );
}
