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
const operatingPriorities = [
  {
    slug: "ai-automation",
    number: "01",
    title: "Revenue workflow",
    problem: "Completed work, signed deals, or customer requests stall between teams and systems.",
    outcome: "Move work cleanly from completion to billing, follow-up, and collected cash.",
  },
  {
    slug: "business-systems",
    number: "02",
    title: "Operational control",
    problem: "Reporting is late, ownership is unclear, and exceptions surface after they become expensive.",
    outcome: "Give every handoff an owner and leadership a reliable view of what needs attention.",
  },
  {
    slug: "exit-readiness",
    number: "03",
    title: "Owner independence",
    problem: "Approvals, customer knowledge, and critical decisions still route through the founder.",
    outcome: "Build repeatable execution that does not depend on the owner being in every conversation.",
  },
  {
    slug: "acquisition-finance",
    number: "04",
    title: "Transaction readiness",
    problem: "The numbers may look good, but the operation is difficult for a buyer or new leader to inherit.",
    outcome: "Create cleaner reporting, transferable processes, and defensible operating assumptions.",
  },
];

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
          <div className="min-w-0 w-full max-w-[calc(100vw-3rem)] overflow-hidden sm:max-w-none">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-sky">
              Operator-led systems strategy &amp; architecture
            </span>
            <h1 className="mt-4 max-w-full break-words font-display text-4xl font-semibold leading-tight text-ink sm:max-w-xl sm:text-5xl">
              Growth exposes every system your business was never built to handle.
            </h1>
            <p className="mt-4 max-w-full break-words text-lg leading-relaxed text-mid sm:mt-6 sm:max-w-xl">
              We design the operating systems, workflows, integrations, and technical
              architecture that help operationally complex businesses scale &mdash; without adding
              chaos, brittle tools, or dependence on the owner.
            </p>
            <div className="mt-6 flex flex-col items-start gap-4 sm:mt-8 sm:flex-row sm:flex-wrap">
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

            {/* Compact hero graphic for mobile sits below the CTAs. */}
            <div className="mt-10 w-full max-w-xs lg:hidden">
              <HeroGraphic />
            </div>
          </div>

          <div className="hidden min-w-0 lg:block">
            <HeroGraphic />
          </div>
        </div>
      </section>

      {/* Operator positioning */}
      <section className="border-y border-ink/10 bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-3">
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-mid">
            <span>Built by operators</span>
            <span aria-hidden className="text-sky/55">•</span>
            <span>Designed around real workflows</span>
            <span aria-hidden className="text-sky/55">•</span>
            <span>Architecture before automation</span>
          </p>
        </div>
      </section>

      <LogoMarquee />

      {/* Who this is for */}
      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                Who this is for
              </span>
              <h2 className="mt-3 max-w-md font-display text-3xl font-semibold leading-tight text-ink">
                Businesses where operational friction is already costing real money.
              </h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 sm:grid-cols-3">
              {[
                ["01", "Complex delivery", "Crews, properties, customers, and finance must stay aligned across every job."],
                ["02", "Founder bottlenecks", "The business slows whenever an approval or decision reaches the owner."],
                ["03", "Growth or transition", "You need clearer operations before scaling, acquiring, financing, or selling."],
              ].map(([number, title, description]) => (
                <div key={number} className="bg-paper p-6">
                  <span className="font-mono text-[10px] font-semibold text-sky">{number}</span>
                  <h3 className="mt-8 font-display text-base font-semibold text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mid">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Operating priorities */}
      <section className="border-b border-ink/10 bg-[#f1ede7]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-sky">
            What we fix
          </span>
          <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight text-ink">
              Four operating problems that limit growth and enterprise value.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-mid">
              We start with the costly handoff, reporting gap, or owner bottleneck—not a generic technology category.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {operatingPriorities.map((priority) => (
              <Link
                key={priority.slug}
                href={`/learn/${priority.slug}`}
                className="group rounded-xl border border-ink/10 bg-white/90 p-7 shadow-[0_16px_45px_-38px_rgba(11,21,37,0.5)] transition duration-300 hover:-translate-y-1 hover:border-sky/35 hover:shadow-[0_22px_55px_-35px_rgba(27,95,204,0.35)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[10px] font-semibold text-sky">{priority.number}</span>
                  <span className="text-sm text-sky transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-ink">{priority.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mid">{priority.problem}</p>
                <div className="mt-5 border-t border-ink/10 pt-4">
                  <p className="text-sm font-medium leading-relaxed text-ink">{priority.outcome}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured build: proof of the methodology. */}
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
              Read the full build &rarr;
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
              View all &rarr;
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
