import type { Metadata } from "next";
import { CtaBlock } from "@/components/ui/CtaBlock";

export const metadata: Metadata = {
  title: "Work With Us",
  description:
    "Diagnose and remove the operational bottlenecks limiting cash, revenue, delivery, and owner independence.",
};

const services = [
  {
    name: "Operational Bottleneck Diagnostic",
    status: "Available",
    description:
      "We map what happens now, identify the root constraint, quantify its impact, and define the operating system required to remove it.",
  },
  {
    name: "Website-to-Revenue System",
    status: "Available",
    description:
      "A high-performing website connected to lead capture, qualification, scheduling, follow-up, CRM, and reporting—not a standalone design project.",
  },
  {
    name: "Operational System Build",
    status: "Available",
    description:
      "We redesign and implement the workflows, integrations, visibility, and accountability needed to improve revenue, cash, delivery, or owner independence.",
  },
];

export default function WorkWithUsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-sky">
        Work With Us
      </span>
      <h1 className="mt-3 font-display text-4xl font-semibold text-ink">
        Start with the constraint
      </h1>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-mid">
        Every engagement begins by understanding how the business actually works. Then we
        design and implement the smallest system capable of creating meaningful operational change.
      </p>

      <div className="mt-12 space-y-5">
        {services.map((s) => (
          <div id={`engagement-${services.indexOf(s) + 1}`} key={s.name} className="scroll-mt-28 rounded-lg border border-mid/15 bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">{s.name}</h2>
              <span
                className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wide ${
                  s.status === "Available"
                    ? "bg-sky/10 text-sky"
                    : "bg-accent/10 text-accent"
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
          title="Show us where the business gets stuck"
          description="A focused conversation about the constraint, what it affects, and whether WebLaunch is the right team to remove it."
          primaryLabel="Contact Us"
          primaryHref="/contact"
        />
      </div>
    </div>
  );
}
