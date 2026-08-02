"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

const ALGOLIA_CONFIGURED =
  !!process.env.NEXT_PUBLIC_ALGOLIA_APP_ID && !!process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY;

export function SearchModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="flex items-center gap-2 rounded-md border border-mid/20 px-3 py-1.5 text-sm text-mid transition hover:border-sky/40 hover:text-ink"
      >
        <Search size={15} />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden rounded border border-mid/30 px-1.5 py-0.5 font-mono text-[10px] sm:inline">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-ink/50 px-4 pt-24">
          <div className="w-full max-w-lg rounded-lg bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <p className="font-display text-sm font-semibold text-ink">Search WebLaunch</p>
              <button onClick={() => setOpen(false)} aria-label="Close search">
                <X size={18} className="text-mid" />
              </button>
            </div>
            {ALGOLIA_CONFIGURED ? (
              <p className="mt-4 text-sm text-mid">
                Algolia search UI mounts here once index keys are wired in — see
                README.md for the react-instantsearch integration point.
              </p>
            ) : (
              <p className="mt-4 text-sm text-mid">
                Search isn&apos;t configured yet. Set NEXT_PUBLIC_ALGOLIA_APP_ID and
                NEXT_PUBLIC_ALGOLIA_SEARCH_KEY to enable it.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
