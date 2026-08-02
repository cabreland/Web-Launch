import type { Metadata } from "next";
import { CtaBlock } from "@/components/ui/CtaBlock";

export const metadata: Metadata = {
  title: "Community",
  description: "The WebLaunch community for founders and operators implementing AI automation and business systems.",
};

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-sky">
        Community
      </span>
      <h1 className="mt-3 font-display text-4xl font-semibold text-ink">
        Where implementation actually happens
      </h1>
      <p className="mt-6 text-[15px] leading-relaxed text-mid">
        The articles here explain the frameworks. The community is where you go to actually
        implement them — templates, workflow exports, and direct access to ask questions about
        your specific setup.
      </p>
      <p className="mt-4 text-[15px] leading-relaxed text-mid">
        We run the community on Skool rather than gating resources behind lead forms — it&apos;s
        a space to work through implementation with other operators, not a funnel.
      </p>

      <div className="mt-14">
        <CtaBlock
          eyebrow="Join"
          title="Join the WebLaunch community on Skool"
          description="Link goes live at launch."
          primaryLabel="Join on Skool"
          primaryHref="#"
        />
      </div>
    </div>
  );
}
