import type { Metadata } from "next";
import { CtaBlock } from "@/components/ui/CtaBlock";

export const metadata: Metadata = {
  title: "Work With Us",
  description:
    "Custom builds, an implementer community, and marketing services — how to work with WebLaunch.",
};

const services = [
  {
    name: "Custom Build",
    status: "Available",
    description:
      "AI automation, systems integration, and software builds scoped around a specific operational problem — not a generic package.",
  },
  {
    name: "Community",
    status: "Available",
    description:
      "A Skool community for founders and operators implementing AI automation and business systems in their own companies.",
  },
  {
    name: "Web & Marketing",
    status: "Coming soon",
    description:
      "Full-service web and marketing builds, extending the same operator-led approach to growth and brand.",
  },
];

export default function WorkWithUsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-sky">
        Work With Us
      </span>
      <h1 className="mt-3 font-display text-4xl font-semibold text-ink">
        Three ways to work with WebLaunch
      </h1>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-mid">
        We&apos;re selective about custom build engagements — the goal is a small number of
        builds done right, not a volume agency model.
      </p>

      <div className="mt-12 space-y-5">
        {services.map((s) => (
          <div key={s.name} className="rounded-lg border border-mid/15 bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">{s.name}</h2>
              <span
                className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wide ${
                  s.status === "Available"
                    ? "bg-sky/10 text-sky"
                    : "bg-mid/10 text-mid"
                }`}
              >
                {s.status}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-mid">{s.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <CtaBlock
          eyebrow="Get Started"
          title="Tell us what you're building"
          description="A short call to see if it's a fit — no sales deck, no pressure."
          primaryLabel="Contact Us"
          primaryHref="/contact"
        />
      </div>
    </div>
  );
}
