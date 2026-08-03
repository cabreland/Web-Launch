import Link from "next/link";
import { getLearnArticles, getBuilds } from "@/lib/content";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { CtaBlock } from "@/components/ui/CtaBlock";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { HeroGraphic } from "@/components/ui/HeroGraphic";
import { clusterLabels, clusterDescriptions } from "@/lib/site";

export default function HomePage() {
  const articles = getLearnArticles().slice(0, 3);
  const builds = getBuilds().slice(0, 2);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 -top-40 h-[420px] w-[420px] rounded-full bg-sky/20 blur-[110px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-10 h-[380px] w-[380px] rounded-full bg-accent/20 blur-[110px]"
        />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-20 sm:pt-28 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-sky">
              Operator-led, not agency-written
            </span>
            <h1 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Most businesses don&apos;t have a growth problem. They have an operations problem.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-mid">
              We&apos;re operators, not consultants — people who&apos;ve run properties, built and
              sold companies, and lived inside the systems that make or break a growing business.
              WebLaunch is where we break down the bottlenecks that slow operationally complex
              businesses down, and the automation, integrations, and operating systems that fix
              them.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/work-with-us"
                className="rounded-md bg-sky px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-light"
              >
                Work With Us
              </Link>
              <Link
                href="/learn"
                className="rounded-md border border-mid/25 px-6 py-3 text-sm font-medium text-ink transition hover:border-sky/50"
              >
                Browse the guides
              </Link>
            </div>
          </div>

          <div className="hidden lg:block" aria-hidden="true">
            <HeroGraphic />
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="border-y border-mid/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-2xl font-semibold text-ink">Who this is for</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="font-display text-base font-semibold text-ink">
                Property, Construction &amp; Field Service
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mid">
                Managing crews, sites, or properties where visibility and coordination break down
                the moment you scale past a spreadsheet.
              </p>
            </div>
            <div>
              <h3 className="font-display text-base font-semibold text-ink">Founders & Operators</h3>
              <p className="mt-2 text-sm leading-relaxed text-mid">
                Running a business that works fine when you&apos;re in the room — and stalls the
                moment you&apos;re not.
              </p>
            </div>
            <div>
              <h3 className="font-display text-base font-semibold text-ink">Buyers & Sellers</h3>
              <p className="mt-2 text-sm leading-relaxed text-mid">
                Preparing for or navigating an acquisition — from exit readiness to deal
                structuring and financing mechanics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clusters */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-2xl font-semibold text-ink">Four content clusters</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-mid">
          Whatever&apos;s slowing you down — reporting, headcount, tech debt, deal terms — it
          usually traces back to one of these four areas.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Object.entries(clusterLabels).map(([slug, label]) => (
            <Link
              key={slug}
              href={`/learn/${slug}`}
              className="rounded-lg border border-mid/15 bg-white p-6 transition hover:border-sky/40"
            >
              <h3 className="font-display text-lg font-semibold text-ink">{label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mid">{clusterDescriptions[slug]}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest articles */}
      {articles.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold text-ink">Latest from Learn</h2>
            <Link href="/learn" className="text-sm font-medium text-sky hover:underline">
              View all →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
        </section>
      )}

      {/* Builds */}
      {builds.length > 0 && (
        <section className="border-t border-mid/10 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold text-ink">What we&apos;ve built</h2>
              <Link href="/builds" className="text-sm font-medium text-sky hover:underline">
                View all →
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
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
        </section>
      )}

      {/* Newsletter */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-mid/15 bg-white p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">
              Get new guides before they hit the feed
            </h2>
            <p className="mt-1 text-sm text-mid">No spam. Unsubscribe anytime.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <CtaBlock
          eyebrow="Work With Us"
          title="Hit an operational bottleneck you can't work around?"
          description="We build the automation, integrations, and systems that remove it — plus a community for implementers and marketing services on the way."
          primaryLabel="Work With Us"
          primaryHref="/work-with-us"
          secondaryLabel="Explore the community"
          secondaryHref="/community"
        />
      </section>
    </div>
  );
}
