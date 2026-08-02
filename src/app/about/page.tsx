import type { Metadata } from "next";
import { jsonLdScript, personJsonLd } from "@/lib/seo";
import { authors } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Christopher Breland — M&A advisory principal, Scopecast AI co-founder, and agency founder writing about AI automation, business systems, and exit readiness.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(personJsonLd("chris"))} />

      <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-sky">
        About
      </span>
      <h1 className="mt-3 font-display text-4xl font-semibold text-ink">
        Built by operators, for operators
      </h1>
      <p className="mt-6 text-[15px] leading-relaxed text-mid">
        WebLaunch exists because most business content is written by people who&apos;ve never
        run the P&amp;L. Everything published here comes from firsthand operating, buying, and
        building experience — no ghostwritten generic advice.
      </p>

      <section id="chris" className="mt-14 border-t border-mid/15 pt-10">
        <h2 className="font-display text-2xl font-semibold text-ink">{authors.chris.name}</h2>
        <p className="mt-1 text-sm font-medium text-sky">{authors.chris.title}</p>
        <p className="mt-4 text-[15px] leading-relaxed text-mid">{authors.chris.bio}</p>
      </section>

      <section id="trevor" className="mt-14 border-t border-mid/15 pt-10">
        <h2 className="font-display text-2xl font-semibold text-ink">{authors.trevor.name}</h2>
        <p className="mt-1 text-sm font-medium text-sky">{authors.trevor.title}</p>
        {authors.trevor.bioPending ? (
          <p className="mt-4 rounded-md border border-dashed border-mid/30 bg-mid/5 p-4 text-sm text-mid">
            Bio pending — replace this block in <code>src/lib/site.ts</code> before this section
            ships publicly.
          </p>
        ) : (
          <p className="mt-4 text-[15px] leading-relaxed text-mid">{authors.trevor.bio}</p>
        )}
      </section>
    </div>
  );
}
