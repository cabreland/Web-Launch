import Link from "next/link";
import Image from "next/image";
import { getLearnArticles, getBuilds } from "@/lib/content";
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

const deliverySteps = [
  ["01", "Consult", "See the whole business, trace the constraint to its source, and define the operating model required to remove it."],
  ["02", "Build", "Implement the workflows, data, integrations, and management visibility that make execution reliable."],
  ["03", "Operate", "Manage critical systems, resolve exceptions, and continuously improve performance as the business changes."],
];

const engagementPaths = [
  {
    eyebrow: "Find the constraint",
    title: "Operational Bottleneck Diagnostic",
    description: "A focused assessment of the workflow costing you time, cash, visibility, or control—with a practical system blueprint for fixing it.",
  },
  {
    eyebrow: "Convert demand",
    title: "Website-to-Revenue System",
    description: "A modern website connected to qualification, scheduling, follow-up, CRM, and reporting—not a standalone design project.",
  },
  {
    eyebrow: "Build the system",
    title: "Operational System Build",
    description: "End-to-end implementation across revenue, cash, delivery, information, or owner-dependent workflows.",
  },
];

// Pull the real "before / built / result" narrative out of a build's MDX body
// rather than inventing case-study copy. Grounded in what's actually written.
function getIntro(content: string): string {
  const trimmed = content.trim();
  const end = trimmed.search(/\n\s*\n|\n<|\n##/);
  return (end === -1 ? trimmed : trimmed.slice(0, end)).trim();
}

export default function HomePage() {
  const articles = getLearnArticles().slice(0, 3);
  const builds = getBuilds();
  const featured = builds[0];

  const before = featured ? getIntro(featured.content) : undefined;
  const proofSlides = featured?.frontmatter.slideshow ?? [];
  const outcomeSlide = proofSlides.find((slide) => /outcome/i.test(slide.eyebrow ?? ""));

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink/10 bg-[linear-gradient(120deg,#f7f7f5_0%,#f7f7f5_58%,#eef4ff_100%)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 -top-40 h-[420px] w-[420px] rounded-full bg-sky/20 blur-[110px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-10 h-[380px] w-[380px] rounded-full bg-accent/20 blur-[110px]"
        />
        <div aria-hidden className="pointer-events-none absolute bottom-[-0.18em] left-1/2 hidden -translate-x-1/2 whitespace-nowrap font-display text-[15vw] font-semibold uppercase leading-none tracking-[-0.06em] text-ink/[0.025] lg:block">
          Operations
        </div>

        <div className="relative mx-auto grid w-full max-w-6xl min-w-0 grid-cols-1 items-center gap-10 overflow-hidden px-6 pb-12 pt-14 sm:gap-12 sm:pb-20 sm:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:overflow-visible lg:pt-28">
          <div className="w-full min-w-0">
            <span className="block max-w-[21rem] font-mono text-[9px] font-semibold uppercase leading-5 tracking-[0.16em] text-sky sm:max-w-none sm:text-[11px] sm:tracking-widest">
              Operational transformation for founder-led businesses
            </span>
            <h1 className="mt-4 max-w-[21rem] font-display text-[2.35rem] font-semibold leading-[1.12] tracking-[-0.025em] text-ink sm:max-w-xl sm:text-5xl sm:leading-tight">
              Run the business. Change the business. Strengthen what comes next.
            </h1>
            <p className="mt-4 max-w-[21rem] text-base leading-7 text-mid sm:mt-6 sm:max-w-xl sm:text-lg sm:leading-relaxed">
              WebLaunch combines operating strategy, workflow redesign, and technology implementation
              to help complex businesses perform with greater control—and less dependence on the owner.
            </p>
            <div className="mt-6 flex flex-col items-start gap-4 sm:mt-8 sm:flex-row sm:flex-wrap">
              <Link
                href="/work-with-us"
                className="rounded-md bg-sky px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-light"
              >
                Consult an operator
              </Link>
              <Link
                href="/builds"
                className="rounded-md border border-mid/25 px-6 py-3 text-sm font-medium text-ink transition hover:border-sky/50"
              >
                Explore client results
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
      <section className="border-y border-white/10 bg-ink">
        <div className="mx-auto max-w-6xl px-6 py-3.5">
          <p className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-center font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-paper/65">
            <span>Built by operators</span>
            <span aria-hidden className="text-sky-light">/</span>
            <span>Designed around real workflows</span>
            <span aria-hidden className="text-accent-light">/</span>
            <span>Architecture before automation</span>
          </p>
        </div>
      </section>

      <LogoMarquee />

      {/* Institutional credibility */}
      <section className="overflow-hidden border-b border-ink/10 bg-white">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-[1.35fr_0.65fr]">
          <div className="px-6 py-20 lg:border-r lg:border-ink/10 lg:py-24">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">Experience across the full operating arc</span>
            <p className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-5xl">
              We have built the front end of growth, operated the business behind it, and seen what buyers expect at the other side.
            </p>
          </div>
          <div className="grid grid-cols-2 border-t border-ink/10 lg:grid-cols-1 lg:border-t-0">
            <div className="border-r border-ink/10 p-7 lg:border-b lg:border-r-0">
              <strong className="font-display text-4xl font-semibold text-sky">1,300+</strong>
              <p className="mt-2 text-xs leading-5 text-mid">Digital experiences built across the history of WebLaunch.</p>
            </div>
            <div className="p-7">
              <strong className="font-display text-2xl font-semibold text-ink">Built. Operated. Exited.</strong>
              <p className="mt-2 text-xs leading-5 text-mid">Advice grounded in firsthand operating and transaction experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="relative overflow-hidden border-b border-ink/10 bg-[#f0eee9]">
        <div aria-hidden className="absolute -right-20 top-1/2 h-[440px] w-[440px] -translate-y-1/2 rounded-full border border-accent/15" />
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
            <div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                The mandate
              </span>
              <h2 className="mt-4 max-w-md font-display text-4xl font-semibold leading-[1.08] text-ink">
                Transform the systems underneath performance.
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-7 text-mid">We work where disconnected systems, unclear ownership, and founder dependence have become constraints on margin, speed, or enterprise value.</p>
            </div>
            <div className="border-t border-ink/20">
              {[
                ["01", "Complex delivery", "Crews, properties, customers, and finance must stay aligned across every job."],
                ["02", "Founder bottlenecks", "The business slows whenever an approval or decision reaches the owner."],
                ["03", "Growth or transition", "You need clearer operations before scaling, acquiring, financing, or selling."],
              ].map(([number, title, description]) => (
                <div key={number} className="group grid gap-4 border-b border-ink/20 py-7 sm:grid-cols-[4rem_0.75fr_1.25fr] sm:items-start">
                  <span className="font-display text-3xl font-semibold text-ink/15 transition-colors group-hover:text-accent">{number}</span>
                  <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
                  <p className="text-sm leading-6 text-mid">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Operating priorities */}
      <section className="relative overflow-hidden border-b border-ink/10 bg-white">
        <div aria-hidden className="absolute right-0 top-0 hidden h-full w-[38%] bg-[#f0eee9] lg:block" />
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
            What we fix
          </span>
          <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <h2 className="max-w-xl font-display text-4xl font-semibold leading-[1.08] text-ink">
              Four operating problems that limit growth and enterprise value.
            </h2>
            <p className="max-w-md text-sm leading-6 text-mid">
              We start with the costly handoff, reporting gap, or owner bottleneck—not a generic technology category.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {operatingPriorities.map((priority, index) => (
              <Link
                key={priority.slug}
                href={`/learn/${priority.slug}`}
                className={`group relative min-h-72 overflow-hidden p-8 transition-transform duration-300 hover:-translate-y-1 ${index === 0 ? "bg-ink text-white" : index === 3 ? "bg-accent text-white" : "border border-ink/10 bg-paper text-ink"}`}
              >
                <span aria-hidden className={`absolute -bottom-8 -right-3 font-display text-[8rem] font-semibold leading-none ${index === 0 || index === 3 ? "text-white/[0.055]" : "text-ink/[0.035]"}`}>{priority.number}</span>
                <div className="flex items-start justify-between gap-4">
                  <span className={`font-mono text-[10px] font-semibold ${index === 0 || index === 3 ? "text-white/60" : "text-accent"}`}>{priority.number}</span>
                  <span className={`text-sm transition-transform group-hover:translate-x-1 ${index === 0 || index === 3 ? "text-white" : "text-sky"}`} aria-hidden>→</span>
                </div>
                <h3 className="relative mt-7 font-display text-2xl font-semibold">{priority.title}</h3>
                <p className={`relative mt-3 text-sm leading-6 ${index === 0 || index === 3 ? "text-white/65" : "text-mid"}`}>{priority.problem}</p>
                <div className={`relative mt-6 border-t pt-5 ${index === 0 || index === 3 ? "border-white/15" : "border-ink/10"}`}>
                  <p className="text-sm font-medium leading-6">{priority.outcome}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery method */}
      <section id="what-we-do" className="scroll-mt-20 border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                What we do
              </span>
              <h2 className="mt-4 max-w-md font-display text-4xl font-semibold leading-[1.08] text-ink">
                Strategy through execution—with one accountable operating partner.
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-7 text-mid">
                Advice has value only when it changes how the business performs. We stay close enough to the work to make the new system real.
              </p>
            </div>
            <ol className="grid border-l border-t border-ink/15 lg:grid-cols-3">
              {deliverySteps.map(([number, title, description]) => (
                <li key={number} className="group border-b border-r border-ink/15 p-7 lg:min-h-72">
                  <span className="font-mono text-[9px] font-bold text-accent">{number}</span>
                  <h3 className="mt-16 font-display text-2xl font-semibold text-ink transition-colors group-hover:text-sky">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-mid">{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Engagement paths */}
      <section className="relative overflow-hidden border-b border-ink/10 bg-[#eef4ff] text-ink">
        <div aria-hidden className="absolute right-[-8rem] top-[-10rem] h-[36rem] w-[36rem] rounded-full border border-sky/10" />
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-sky">Ways to start</span>
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.08]">Start with the constraint. Build only what the operation needs.</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-mid">Focused entry points that create immediate operating value and a clear path into larger systems work.</p>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            {engagementPaths.map((path, index) => (
              <Link key={path.title} href={`/work-with-us#engagement-${index + 1}`} className={`group relative min-h-72 overflow-hidden p-8 transition-transform hover:-translate-y-1 ${index === 0 ? "bg-accent text-white lg:col-span-5" : index === 1 ? "bg-white text-ink lg:col-span-7" : "bg-sky text-white lg:col-span-12 lg:min-h-52"}`}>
                <span className={`font-mono text-[9px] font-bold uppercase tracking-[0.16em] ${index === 1 ? "text-accent" : "text-white/65"}`}>{path.eyebrow}</span>
                <h3 className={`mt-10 max-w-xl font-display font-semibold leading-tight ${index === 2 ? "text-3xl" : "text-2xl"}`}>{path.title}</h3>
                <p className={`mt-4 max-w-xl text-sm leading-7 ${index === 1 ? "text-mid" : "text-white/70"}`}>{path.description}</p>
                <span className={`mt-8 inline-flex text-sm transition-transform group-hover:translate-x-1 ${index === 1 ? "text-sky" : "text-white"}`} aria-hidden>Explore &rarr;</span>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 border-l-2 border-emerald-500 pl-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-xl font-semibold">Operate better now. Build a company that is easier to scale and transfer later.</p>
            <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.16em] text-emerald-600">Operate → Scale → Transfer</span>
          </div>
        </div>
      </section>

      {/* Featured build: proof of the methodology. */}
      {featured && (
        <section className="bg-ink text-white">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent-light">
                Client transformation
              </span>
              <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold leading-tight sm:text-4xl">
                Rebuilding the operating system behind every new engagement.
              </h2>

              <div className="mt-10 space-y-8">
                <div className="border-l-2 border-accent pl-6">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-accent-light">
                    Before
                  </p>
                  <p className="mt-2 text-base leading-7 text-paper/80">
                    {before ?? "The same deal information was repeatedly re-typed and handed off between disconnected systems."}
                  </p>
                </div>

                <div className="border-l-2 border-sky-light pl-6">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-sky-light">
                    Built
                  </p>
                  <p className="mt-2 text-base leading-7 text-paper/80">
                    {featured.frontmatter.summary}
                  </p>
                </div>

                <div className="border-l-2 border-emerald-400 pl-6">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-400">
                    Result
                  </p>
                  <p className="mt-2 font-display text-2xl font-semibold leading-snug text-white">
                    Six manual handoffs per deal became zero.
                  </p>
                  {outcomeSlide?.body && (
                    <p className="mt-2 text-sm leading-6 text-paper/65">{outcomeSlide.body}</p>
                  )}
                </div>
              </div>

              <Link
                href={`/builds/${featured.frontmatter.slug}`}
                className="mt-9 inline-flex min-h-11 items-center gap-3 border border-white/25 px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-sky-light hover:bg-sky/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-light"
              >
                Read the client result <span aria-hidden>&rarr;</span>
              </Link>
            </div>

            <figure className="relative overflow-hidden rounded-lg border border-white/15 bg-white/5 shadow-[0_28px_70px_-35px_rgba(0,0,0,0.85)]">
              <Image
                src="/images/proof-operations-tablet.jpg"
                alt="Operational workflow dashboard displayed on a tablet"
                width={1264}
                height={848}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full object-cover"
              />
              <figcaption className="absolute bottom-0 left-0 border-r border-t border-white/15 bg-ink/90 px-4 py-2 font-mono text-[8px] uppercase tracking-[0.14em] text-paper/70 backdrop-blur-sm">
                Connected operations / system view
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      {/* Latest articles */}
      {articles.length > 0 && (
        <section className="border-b border-ink/10 bg-[#f1ede7]">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="flex items-end justify-between gap-6">
              <div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-sky">Insights</span>
                <h2 className="mt-3 font-display text-4xl font-semibold text-ink">Ideas for building a better-run business.</h2>
              </div>
              <Link href="/learn" className="hidden min-h-11 items-center border border-ink/20 px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:border-sky hover:text-sky sm:inline-flex">Explore all insights &rarr;</Link>
            </div>
            <div className="mt-12 grid border-l border-t border-ink/15 lg:grid-cols-2">
              {articles.map((article, index) => (
                <Link key={article.frontmatter.slug} href={`/learn/${article.frontmatter.cluster}/${article.frontmatter.slug}`} className={`group border-b border-r border-ink/15 bg-paper p-7 transition-colors hover:bg-white ${index === 0 ? "lg:row-span-2 lg:p-10" : ""}`}>
                  <div className="flex items-center justify-between gap-4">
                    <span className={`font-mono text-[9px] font-semibold uppercase tracking-[0.15em] ${clusterColors[article.frontmatter.cluster]?.text ?? "text-sky"}`}>{clusterLabels[article.frontmatter.cluster]}</span>
                    <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-mid">{article.readingTime}</span>
                  </div>
                  <h3 className={`mt-8 font-display font-semibold leading-tight text-ink transition-colors group-hover:text-sky ${index === 0 ? "max-w-md text-3xl" : "text-xl"}`}>{article.frontmatter.title}</h3>
                  <p className={`mt-4 text-sm leading-7 text-mid ${index === 0 ? "max-w-lg" : "line-clamp-2"}`}>{article.frontmatter.description}</p>
                  <span className="mt-8 inline-flex text-sm text-sky transition-transform group-hover:translate-x-1" aria-hidden>&rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-ink/10 bg-[#eaf6f4]">
        <div aria-hidden className="absolute inset-y-0 right-0 hidden w-[42%] opacity-50 lg:block [background-image:repeating-linear-gradient(60deg,transparent_0,transparent_27px,rgba(224,105,42,0.35)_28px,transparent_29px)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 lg:grid-cols-[1fr_0.65fr] lg:py-24">
          <div>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Start with the constraint</span>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl">Let&apos;s make the business work better.</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-mid">Tell us where revenue, work, information, or decisions get stuck. We&apos;ll help you see the system behind it and define the path forward.</p>
            <Link href="/work-with-us" className="mt-8 inline-flex min-h-12 items-center bg-ink px-6 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-sky focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky">Consult an operator &rarr;</Link>
          </div>
          <div className="hidden min-h-56 items-end border-l border-ink/15 pl-10 lg:flex">
            <p className="max-w-xs font-display text-2xl font-semibold leading-tight text-ink">Operate with clarity.<br />Scale with control.<br />Transfer with confidence.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
