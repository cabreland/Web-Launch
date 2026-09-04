"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { SearchModal } from "@/components/ui/SearchModal";
import { primaryNav } from "@/lib/site";

const serviceLinks = [
  { label: "Operational Bottleneck Diagnostic", href: "/work-with-us#engagement-1" },
  { label: "Website-to-Revenue Systems", href: "/work-with-us#engagement-2" },
  { label: "Operational System Builds", href: "/work-with-us#engagement-3" },
  { label: "How we work", href: "/#what-we-do" },
];

const capabilityLinks = [
  { label: "Revenue workflows", href: "/learn/ai-automation" },
  { label: "Business systems", href: "/learn/business-systems" },
  { label: "Owner independence", href: "/learn/exit-readiness" },
  { label: "Transaction readiness", href: "/learn/acquisition-finance" },
  { label: "Platforms and integrations", href: "/platforms" },
];

const companyLinks = [
  { label: "Client results", href: "/builds" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/learn" },
  { label: "About WebLaunch", href: "/about" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMegaOpen(false);
    }
    function closeOnOutsideClick(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) setMegaOpen(false);
    }
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("mousedown", closeOnOutsideClick);
    };
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-40 border-b border-mid/10 bg-paper/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {primaryNav.map((item) =>
            item.label === "What We Do" ? (
              <button key={item.href} type="button" aria-expanded={megaOpen} aria-controls="services-mega-menu" onClick={() => setMegaOpen((value) => !value)} className="flex items-center gap-1.5 text-sm font-medium text-ink/80 transition hover:text-sky">
                {item.label}
                <ChevronDown size={14} className={`transition-transform ${megaOpen ? "rotate-180" : ""}`} />
              </button>
            ) : (
              <Link key={item.href} href={item.href} className="text-sm font-medium text-ink/80 transition hover:text-sky">{item.label}</Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <SearchModal />
          <Link href="/work-with-us" className="rounded-md bg-sky px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-light">Consult an operator →</Link>
        </div>

        <button className="lg:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {megaOpen && (
        <div id="services-mega-menu" className="absolute inset-x-0 top-full hidden border-t border-ink/10 bg-white shadow-[0_28px_70px_-40px_rgba(11,21,37,0.4)] lg:block">
          <div className="mx-auto grid max-w-6xl grid-cols-[1fr_1fr_0.85fr_1.25fr] gap-10 px-6 py-10">
            <MegaColumn title="Consulting and delivery" links={serviceLinks} close={() => setMegaOpen(false)} />
            <MegaColumn title="Capabilities" links={capabilityLinks} close={() => setMegaOpen(false)} />
            <MegaColumn title="Explore" links={companyLinks} close={() => setMegaOpen(false)} />

            <Link href="/builds/zero-touch-deal-automation" onClick={() => setMegaOpen(false)} className="group relative min-h-64 overflow-hidden rounded-lg bg-ink">
              <Image src="/images/proof-operations-tablet.jpg" alt="Connected operational system" fill sizes="320px" className="object-cover opacity-55 transition duration-500 group-hover:scale-105 group-hover:opacity-45" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-accent-light">Featured client result</span>
                <p className="mt-3 font-display text-xl font-semibold leading-tight">Six manual handoffs per deal became zero.</p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs text-paper/75">Read the transformation <ArrowUpRight size={14} /></span>
              </div>
            </Link>
          </div>
        </div>
      )}

      {open && (
        <div className="border-t border-mid/10 bg-paper px-6 py-5 lg:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
            {primaryNav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="text-sm font-medium text-ink/80">{item.label}</Link>
            ))}
            <Link href="/work-with-us" onClick={() => setOpen(false)} className="mt-2 rounded-md bg-sky px-4 py-2 text-center text-sm font-medium text-white">Consult an operator →</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function MegaColumn({ title, links, close }: { title: string; links: { label: string; href: string }[]; close: () => void }) {
  return (
    <div>
      <p className="mb-5 font-mono text-[9px] font-bold uppercase tracking-[0.17em] text-accent">{title}</p>
      <ul className="space-y-3.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} onClick={close} className="text-sm leading-5 text-ink/75 transition hover:text-sky">{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
