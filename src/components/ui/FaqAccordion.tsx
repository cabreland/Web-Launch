import type { FaqItem } from "@/lib/content";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  if (!items?.length) return null;
  return (
    <div className="not-prose my-10 divide-y divide-mid/20 border-y border-mid/20">
      <h2 className="sr-only">Frequently asked questions</h2>
      {items.map((item, i) => (
        <details key={i} className="group py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-medium text-ink">
            {item.q}
            <span className="shrink-0 font-mono text-sky transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 text-[15px] leading-relaxed text-mid">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
