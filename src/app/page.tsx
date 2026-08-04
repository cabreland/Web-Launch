import Link from "next/link";
import { getLearnArticles, getBuilds } from "@/lib/content";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { CtaBlock } from "@/components/ui/CtaBlock";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { HeroGraphic } from "@/components/ui/HeroGraphic";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { clusterLabels, clusterColors } from "@/lib/site";

// Homepage-only reframe of the four clusters around outcomes. The shared
// clusterDescriptions in lib/site.ts (used on /learn) are left untouched.
const leverageStackDescriptions: Record<string, string> = {
  "ai-automation": "Automate repetitive work and connect the tools your team already uses.",
  "business-systems":
    "Create repeatable execution through clear workflows, ownership, SOPs, and operating rhythms.",
  "exit-readiness":
    "Reduce owner dependence and build a company another operator can confidently inherit.",
  "acquisition-finance":
    "Understand the structure, financing, and operating assumptions behind a successful transaction.",
};

// Pull the real "before / built / result" narrative out of a build's MDX body
// rather than inventing case-study copy. Grounded in what's actually written.
function getIntro(content: string): string {
  const trimmed = content.trim();
  const end = trimmed.search(/\n\s*\n|\n<|\n##/);
  return (end === -1 ? trimmed : trimmed.slice(0, end)).trim();
}

function getSection(content: string, heading: string): string | undefined {
  const re = new RegExp(`##\\s+${heading}\\s*\\n+([\\s\\S]*?)(?=\\n##\\s|$)`, "i");
  return content.match(re)?.[1]?.trim();
}

function getBullets(content: string, heading: string): string[] {
  const section = getSection(content, heading);
  if (!section) return [];
  return section
    .split("\n")
    .map((line) => line.replace(/^-\s*/, "").trim())
    .filter(Boolean);
}

export default function HomePage() {
  const articles = getLearnArticles().slice(0, 3);
  const builds = getBuilds();
  const featured = builds[0];

  const before = featured ? getIntro(featured.content) : undefined;
  const built = featured ? getBullets(featured.content, "What we built") : [];
  const operational = featured
    ? getSection(featured.content, "Result")?.split(/\n\s*\n/)[0]?.trim()
    : undefined;

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

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-12 pt-14 sm:gap-12 sm:pb-20 sm:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:pt-28">
          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-sky">
              Operator-led systems strategy &amp; architecture
            </span>
            <h1 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Growth exposes every system your business was never built to handle.
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-mid sm:mt-6">
              We design the operating systems, workflows, integrations, and technical
              architecture that help operationally complex businesses scale — without adding
              chaos, brittle tools, or dependence on the owner.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 sm:mt-8">
              <Link
                href="/work-with-us"
                className="rounded-md bg-sky px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-light"
              >
                Show us the bottleneck
              </Link>
              <Link
                href="/builds"
                className="rounded-md border border-mid/25 px-6 py-3 text-sm font-medium text-ink transition hover:border-sky/50"
              >
                See systems we&apos;ve built
              </Link>
            </div>

            {/* Compact hero graphic for mobile — sits below the CTAs */}
            <div className="mt-10 max-w-xs lg:hidden" aria-hidden="true">
              <HeroGraphic />
            </div>
          </div>

          <div className="hidden lg:block" aria-hidden="true">
            <HeroGraphic />
          </div>
        </div>
      </section>

      {/* Credibility strip */}
      <section className="border-y border-mid/10 bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center font-mono text-[11px] font-semibold uppercase tracking-widest text-mid">
            <span>Built by operators</span>
            <span aria-hidden className="text-mid/40">
              •
            </span>
            <span>Designed around real workflows</span>
            <span aria-hidden className="text-mid/40">
              •
            </span>
            <span>Architecture before automation</span>
          </p>
        </div>
      </section>

      {/* Logo marquee — earlier work, not systems-architecture clients */}
      <LogoMarquee />

      {/* Who this is for */}
      <section className="border-b border-mid/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-2xl font-semibold text-ink">Who this is for</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="font-display text-base font-semibold text-ink">
                Scaling past spreadsheets
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mid">
                Your crews, properties, customers, and reporting have outgrown disconnected tools
                and manual coordination.
              </p>
            </div>
            <div>
              <h3 className="font-display text-base font-semibold text-ink">
                Removing owner dependence
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mid">
                The business functions while you are present and stalls when decisions,
                information, or approvals cannot move without you.
              </p>
            </div>
            <div>
              <h3 className="font-display text-base font-semibold text-ink">
                Preparing to buy or sell
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mid">
                You need operational visibility, transferable systems, reliable reporting, and
                cleaner transaction execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The operating leverage stack */}
      <section className="border-b border-mid/10 bg-sky/5">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-2xl font-semibold text-ink">
            The operating leverage stack
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-mid">
            Whatever&apos;s slowing you down — reporting, headcount, tech debt, deal terms — it
            runs through one of these four layers.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Object.entries(clusterLabels).map(([slug, label]) => (
              <Link
                key={slug}
                href={`/learn/${slug}`}
                className="rounded-lg border border-mid/15 bg-white p-6 transition hover:border-sky/40"
              >
                <span
                  className={`inline-block h-2.5 w-2.5 rounded-full ${clusterColors[slug]?.dot}`}
                />
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">{label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mid">
                  {leverageStackDescriptions[slug]}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured build — proof of the methodology */}
      {featured && (
        <section className="relative overflow-hidden bg-ink">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sky/20 blur-[110px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent/20 blur-[110px]"
          />

          <div className="relative mx-auto max-w-6xl px-6 py-16">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-sky-light">
              Proof
            </span>
            <h2 className="mt-3 max-w-2xl font-display text-2xl font-semibold text-paper sm:text-3xl">
              {featured.frontmatter.title}
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-paper/70">
              {featured.frontmatter.description}
            </p>

            {featured.frontmatter.stack && featured.frontmatter.stack.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {featured.frontmatter.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-paper/10 px-3 py-1 font-mono text-[11px] text-paper/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-10 grid grid-cols-1 gap-8 border-t border-paper/10 pt-10 sm:grid-cols-3">
              {before && (
                <div>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-accent-light">
                    Before
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-paper/70">{before}</p>
                </div>
              )}
              {built.length > 0 && (
                <div>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-sky-light">
                    Built
                  </span>
                  <ul className="mt-3 space-y-2">
                    {built.slice(0, 4).map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-relaxed text-paper/70">
                        <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-light" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {operational && (
                <div>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-paper">
                    Operational
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-paper/70">{operational}</p>
                </div>
              )}
            </div>

            <Link
              href={`/builds/${featured.frontmatter.slug}`}
              className="mt-8 inline-block text-sm font-medium text-sky-light hover:underline"
            >
              Read the full build →
            </Link>
          </div>
        </section>
      )}

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
                eyebrowColorClass={clusterColors[a.frontmatter.cluster]?.text}
                title={a.frontmatter.title}
                description={a.frontmatter.description}
                meta={a.readingTime}
              />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-mid/15 bg-white p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">
              Practical systems for operationally complex businesses
            </h2>
            <p className="mt-1 max-w-md text-sm text-mid">
              Field-tested breakdowns of automation, reporting, operating architecture, owner
              independence, and acquisition readiness. No recycled AI news.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <CtaBlock
          eyebrow="Work With Us"
          title="Hit an operational bottleneck you can't work around?"
          description="We design and implement the workflows, integrations, and operating systems that remove it."
          primaryLabel="Show us the bottleneck"
          primaryHref="/work-with-us"
        />
      </section>
    </div>
  );
}
