"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { SearchModal } from "@/components/ui/SearchModal";
import { primaryNav } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-mid/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink/80 transition hover:text-sky"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <SearchModal />
          <Link
            href="/#newsletter"
            className="rounded-md bg-sky px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-light"
          >
            Subscribe →
          </Link>
        </div>

        <button
          className="lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-mid/10 bg-paper px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-ink/80"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#newsletter"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-sky px-4 py-2 text-center text-sm font-medium text-white"
            >
              Subscribe →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
