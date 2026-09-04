import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { footerNav, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div>
            <Logo variant="dark" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
              {siteConfig.description}
            </p>
            <Link
              href="/work-with-us"
              className="mt-7 inline-flex min-h-11 items-center border border-paper/20 px-4 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-paper transition-colors hover:border-sky-light hover:text-sky-light"
            >
              Consult an operator &rarr;
            </Link>
          </div>

          {footerNav.map((col) => (
            <div key={col.title}>
              <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-widest text-paper/40">
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-paper/70 transition hover:text-sky-light"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-paper/10 pt-6 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} WebLaunch. All rights reserved.</p>
          <p>Built with Next.js, deployed on Vercel.</p>
        </div>
      </div>
    </footer>
  );
}
