import Image from "next/image";

type MarqueeLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
};

const LOGOS: MarqueeLogo[] = [
  {
    src: "/logos/bojangles.png",
    alt: "Bojangles",
    width: 704,
    height: 240,
    className: "h-9 sm:h-10",
  },
  {
    src: "/logos/chickfila.png",
    alt: "Chick-fil-A",
    width: 532,
    height: 240,
    className: "h-10 sm:h-11",
  },
  {
    src: "/logos/fairway.png",
    alt: "Fairway Independent Mortgage Corporation",
    width: 994,
    height: 240,
    className: "h-9 sm:h-10",
  },
  {
    src: "/logos/oxford.png",
    alt: "University of Oxford",
    width: 200,
    height: 240,
    className: "h-12 sm:h-14",
  },
  {
    src: "/logos/ufc.png",
    alt: "UFC",
    width: 692,
    height: 240,
    className: "h-8 sm:h-9",
  },
];

export function LogoMarquee() {
  return (
    <section aria-labelledby="client-experience-heading" className="relative overflow-hidden border-b border-white/10 bg-ink text-white">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-light/60 to-transparent"
      />

      <div className="mx-auto max-w-6xl px-6 pb-10 pt-9 sm:pb-12 sm:pt-10">
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
          <h2
            id="client-experience-heading"
            className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-light"
          >
            Experience across complex operations
          </h2>
          <p className="text-xs text-paper/55">Organizations our team has supported</p>
        </div>

        <div className="logo-marquee-mask group mt-8 overflow-hidden">
          <div className="logo-marquee-track flex w-max items-center group-hover:[animation-play-state:paused]">
            {[0, 1].map((copyIndex) => (
              <div
                key={copyIndex}
                aria-hidden={copyIndex === 1}
                className="flex shrink-0 items-center gap-14 pr-14 sm:gap-20 sm:pr-20 lg:gap-24 lg:pr-24"
              >
                {LOGOS.map((logo) => (
                  <div key={logo.alt} className="flex w-36 shrink-0 items-center justify-center sm:w-44">
                    <Image
                      src={logo.src}
                      alt={copyIndex === 0 ? logo.alt : ""}
                      width={logo.width}
                      height={logo.height}
                      className={`${logo.className} w-auto max-w-full object-contain grayscale brightness-0 invert opacity-60 transition-[filter,opacity] duration-300 group-hover:grayscale-0 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-90`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
