import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description: "Templates, frameworks, and downloadable resources from WebLaunch.",
};

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-sky">
        Resources
      </span>
      <h1 className="mt-3 font-display text-4xl font-semibold text-ink">Resource library</h1>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-mid">
        Templates and frameworks referenced across the Learn articles will publish here as they
        go live. Implementation-ready resources live in the{" "}
        <a href="/community" className="text-sky hover:underline">
          community
        </a>
        , not behind a gate.
      </p>

      <div className="mt-12 rounded-lg border border-dashed border-mid/30 bg-white p-8 text-center text-sm text-mid">
        First resources publish alongside launch content.
      </div>
    </div>
  );
}
