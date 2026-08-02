import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with WebLaunch about a build, the community, or a general question.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-sky">
        Contact
      </span>
      <h1 className="mt-3 font-display text-4xl font-semibold text-ink">Let&apos;s talk</h1>
      <p className="mt-4 text-[15px] leading-relaxed text-mid">
        Fastest way to reach us is email. If you&apos;re inquiring about a custom build, include
        a sentence on the problem you&apos;re trying to solve — it saves a round trip.
      </p>

      <div className="mt-10 rounded-lg border border-mid/15 bg-white p-6">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-mid/60">
          Email
        </p>
        <a href="mailto:hello@weblaunch.io" className="mt-1 block text-lg font-medium text-sky">
          hello@weblaunch.io
        </a>
      </div>

      <p className="mt-6 text-xs text-mid/70">
        Scheduling link (Calendly/Cal.com) to be added here once confirmed.
      </p>
    </div>
  );
}
