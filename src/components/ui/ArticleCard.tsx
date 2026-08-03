import Link from "next/link";

export function ArticleCard({
  href,
  eyebrow,
  eyebrowColorClass,
  title,
  description,
  meta,
}: {
  href: string;
  eyebrow?: string;
  eyebrowColorClass?: string;
  title: string;
  description: string;
  meta?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-lg border border-mid/15 bg-white p-6 transition hover:border-sky/40 hover:shadow-[0_4px_20px_-8px_rgba(11,21,37,0.15)]"
    >
      {eyebrow && (
        <span
          className={`mb-2 font-mono text-[11px] font-semibold uppercase tracking-widest ${
            eyebrowColorClass ?? "text-sky"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h3 className="font-display text-lg font-semibold text-ink group-hover:text-sky">
        {title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-mid">{description}</p>
      {meta && <span className="mt-4 text-xs text-mid/80">{meta}</span>}
    </Link>
  );
}
