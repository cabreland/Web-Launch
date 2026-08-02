import type { Metadata } from "next";
import Link from "next/link";
import { getIndustries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries",
  description: "Industry-specific playbooks for AI automation, business systems, and exit readiness.",
};

export default function IndustriesIndexPage() {
  const industries = getIndustries();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-sky">
        Industries
      </span>
      <h1 className="mt-3 font-display text-4xl font-semibold text-ink">Industry playbooks</h1>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-mid">
        The frameworks are universal. The application isn&apos;t. Here&apos;s how they land in
        specific industries.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {industries.map((e) => (
          <Link
            key={e.frontmatter.industry}
            href={`/industries/${e.frontmatter.industry}`}
            className="rounded-lg border border-mid/15 bg-white p-6 transition hover:border-sky/40"
          >
            <h2 className="font-display text-lg font-semibold text-ink">
              {e.frontmatter.industryName}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-mid">{e.frontmatter.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
