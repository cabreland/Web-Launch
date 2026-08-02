import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "WebLaunch privacy policy.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      {/*
        DRAFT — placeholder privacy policy carried over from the redirect-preserved
        /privacy-policy URL. Needs a pass from counsel before launch: confirm data
        collected (GA4, Beehiiv, Algolia query logs, contact form), retention, and
        any state-specific disclosures (e.g. CCPA) before this ships live.
      */}
      <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-sky">
        Privacy Policy
      </span>
      <h1 className="mt-3 font-display text-4xl font-semibold text-ink">Privacy Policy</h1>
      <p className="mt-4 text-sm text-mid">Last updated: [date] — draft, pending legal review.</p>

      <div className="prose prose-neutral mt-10 max-w-none prose-headings:font-display">
        <h2>What we collect</h2>
        <p>
          WebLaunch collects information you provide directly (such as your email address when
          subscribing to our newsletter or contacting us) and standard analytics data (via Google
          Analytics) about how visitors use the site.
        </p>
        <h2>How we use it</h2>
        <p>
          We use collected information to operate and improve the site, respond to inquiries, and
          send newsletter content to subscribers who opt in. We do not sell personal information.
        </p>
        <h2>Third-party services</h2>
        <p>
          This site uses Google Analytics for traffic analytics, Beehiiv for newsletter delivery,
          and Algolia for on-site search. Each operates under its own privacy policy.
        </p>
        <h2>Your choices</h2>
        <p>
          You can unsubscribe from the newsletter at any time via the link in any email. Contact
          us at hello@weblaunch.io for any data request.
        </p>
      </div>
    </div>
  );
}
