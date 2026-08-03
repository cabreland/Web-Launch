"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SlideshowSlide } from "@/lib/content";

export function BuildSlideshow({ slides }: { slides: SlideshowSlide[] }) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  if (!slides?.length) return null;
  const slide = slides[index];

  return (
    <div className="not-prose my-10 overflow-hidden rounded-2xl border border-mid/15 bg-ink">
      <div className="relative flex min-h-[280px] flex-col justify-center px-8 py-10 sm:px-14 sm:py-14">
        {slide.eyebrow && (
          <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-sky-light">
            {slide.eyebrow}
          </span>
        )}
        <h3 className="mt-3 max-w-xl font-display text-2xl font-semibold text-paper sm:text-3xl">
          {slide.title}
        </h3>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-paper/70">{slide.body}</p>
        {slide.stat && (
          <p className="mt-6 font-mono text-sm font-semibold text-sky-light">{slide.stat}</p>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-paper/10 bg-ink px-6 py-4">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/20 text-paper/70 transition hover:border-sky-light hover:text-sky-light"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-sky-light" : "w-1.5 bg-paper/25"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next slide"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/20 text-paper/70 transition hover:border-sky-light hover:text-sky-light"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
