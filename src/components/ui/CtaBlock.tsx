import Link from "next/link";

export function CtaBlock({
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-ink px-8 py-12 text-center sm:px-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 -top-24 h-64 w-64 rounded-full bg-sky/25 blur-[90px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-accent/25 blur-[90px]"
      />

      <div className="relative">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-sky-light">
          {eyebrow}
        </span>
        <h2 className="mx-auto mt-3 max-w-2xl font-display text-2xl font-semibold text-paper sm:text-3xl">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[15px] text-paper/70">{description}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="rounded-md bg-sky px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-light"
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="text-sm font-medium text-paper/80 underline underline-offset-4 hover:text-paper"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
