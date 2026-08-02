import type { Metadata } from "next";
import { getBuilds } from "@/lib/content";
import { ArticleCard } from "@/components/ui/ArticleCard";

export const metadata: Metadata = {
  title: "Builds",
  description:
    "Anonymized case studies of AI automation, systems, and software builds shipped for real operating businesses.",
};

export default function BuildsIndexPage() {
  const builds = getBuilds();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-sky">
        Builds
      </span>
      <h1 className="mt-3 font-display text-4xl font-semibold text-ink">
        What we&apos;ve actually shipped
      </h1>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-mid">
        Every build shown here is anonymized — the systems and outcomes are real, the client
        names aren&apos;t published.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {builds.map((b) => (
          <ArticleCard
            key={b.frontmatter.slug}
            href={`/builds/${b.frontmatter.slug}`}
            title={b.frontmatter.title}
            description={b.frontmatter.description}
            meta={b.frontmatter.stack?.join(" · ")}
          />
        ))}
      </div>
    </div>
  );
}
