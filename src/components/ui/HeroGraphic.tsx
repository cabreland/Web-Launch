// "The Operating Core" — visual narrative, not a dashboard mockup.
// Left: four fragmented business inputs (misaligned, mixed palette, uneven curves).
// Center: one operating core, three internal layers (capture → logic → intelligence).
// Right: three clean, evenly aligned outputs. Only one warm accent point survives the core.
// Color carries the story: orange = friction/fragmentation in, blue = order out.
export function HeroGraphic() {
  return (
    <svg
      viewBox="0 0 640 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      role="img"
      aria-labelledby="heroGraphicTitle"
    >
      <title id="heroGraphicTitle">
        Four fragmented business inputs entering one operating core, resolving into aligned,
        synchronized outputs
      </title>

      <style>
        {`
          .hg-line { stroke-dasharray: 6 7; animation: hg-flow 3.6s linear infinite; }
          .hg-in-a { animation-duration: 3.1s; }
          .hg-in-b { animation-duration: 4s; animation-delay: -1.1s; }
          .hg-in-c { animation-duration: 3.7s; animation-delay: -2.2s; }
          .hg-in-d { animation-duration: 4.4s; animation-delay: -0.6s; }
          .hg-core-line { animation-duration: 2.8s; }
          .hg-out-line { animation-duration: 2.2s; }
          @keyframes hg-flow { to { stroke-dashoffset: -26; } }
          @media (prefers-reduced-motion: reduce) {
            .hg-line { animation: none; }
          }
        `}
      </style>

      {/* ------- Left: fragmented inputs ------- */}

      {/* uneven connector lines, each colored to match its source node */}
      <path
        className="hg-line hg-in-a"
        d="M79 70 C 150 70, 200 85, 255 95"
        stroke="#1B5FCC"
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />
      <path
        className="hg-line hg-in-b"
        d="M54 190 C 140 190, 200 140, 255 120"
        stroke="#5BA6FF"
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />
      <path
        className="hg-line hg-in-c"
        d="M90 308 C 170 300, 220 180, 255 145"
        stroke="#E0692A"
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />
      <path
        className="hg-line hg-in-d"
        d="M60 415 C 160 400, 220 220, 255 168"
        stroke="#F3A15C"
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />

      {/* Customers / data — square */}
      <rect x="61" y="61" width="18" height="18" rx="4" fill="#1B5FCC" />
      {/* Team / communication — circle */}
      <circle cx="44" cy="190" r="10" fill="#5BA6FF" />
      {/* Financial information — diamond */}
      <path d="M76 296 L90 310 L76 324 L62 310 Z" fill="#E0692A" />
      {/* Field / service delivery — triangle */}
      <path d="M48 408 L60 430 L36 430 Z" fill="#F3A15C" />

      {/* ------- Center: the operating core ------- */}

      <g filter="url(#coreShadow)">
        <rect x="255" y="65" width="180" height="350" rx="18" fill="#FFFFFF" stroke="#E7E5E0" />
      </g>
      <line x1="255" y1="182" x2="435" y2="182" stroke="#6B7280" strokeOpacity="0.15" />
      <line x1="255" y1="298" x2="435" y2="298" stroke="#6B7280" strokeOpacity="0.15" />

      {/* capture layer — scattered, incomplete */}
      <circle cx="300" cy="100" r="3" fill="#E0692A" fillOpacity="0.7" />
      <circle cx="345" cy="118" r="4" fill="#1B5FCC" fillOpacity="0.6" />
      <circle cx="385" cy="95" r="3" fill="#F3A15C" fillOpacity="0.7" />
      <circle cx="320" cy="150" r="3" fill="#5BA6FF" fillOpacity="0.6" />
      <circle cx="400" cy="140" r="2.5" fill="#6B7280" fillOpacity="0.5" />
      <circle cx="365" cy="160" r="3" fill="#E0692A" fillOpacity="0.5" />

      {/* logic layer — one clear path */}
      <path
        className="hg-line hg-core-line"
        d="M270 240 L420 240"
        stroke="#1B5FCC"
        strokeWidth="2"
        strokeOpacity="0.8"
      />
      <rect x="340" y="235" width="10" height="10" rx="2" fill="#1B5FCC" />

      {/* intelligence layer — dashboard + upward trend */}
      <rect x="280" y="386" width="10" height="14" rx="2" fill="#5BA6FF" fillOpacity="0.8" />
      <rect x="308" y="376" width="10" height="24" rx="2" fill="#1B5FCC" fillOpacity="0.8" />
      <rect x="336" y="366" width="10" height="34" rx="2" fill="#5BA6FF" fillOpacity="0.8" />
      <rect x="364" y="356" width="10" height="44" rx="2" fill="#1B5FCC" fillOpacity="0.8" />
      <path
        d="M280 392 L308 372 L336 356 L364 340"
        stroke="#1B5FCC"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="364" cy="340" r="4" fill="#1B5FCC" />

      {/* ------- Right: controlled, aligned outputs ------- */}

      {/* 1. complete status ring */}
      <path
        className="hg-line hg-out-line"
        d="M435 115 L515 115"
        stroke="#1B5FCC"
        strokeWidth="2"
      />
      <circle cx="535" cy="115" r="15" stroke="#1B5FCC" strokeWidth="3" fill="none" />
      <circle cx="535" cy="115" r="3" fill="#1B5FCC" />

      {/* 2. clean operational trend — the one restrained accent point */}
      <path
        className="hg-line hg-out-line"
        d="M435 240 L470 240 L500 220 L530 195"
        stroke="#1B5FCC"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="530" cy="195" r="5" fill="#E0692A" />

      {/* 3. synchronized execution points */}
      <path
        className="hg-line hg-out-line"
        d="M435 365 L470 365"
        stroke="#1B5FCC"
        strokeWidth="2"
      />
      <path d="M470 365 L515 345" stroke="#1B5FCC" strokeWidth="1.5" strokeOpacity="0.6" />
      <path d="M470 365 L515 365" stroke="#1B5FCC" strokeWidth="1.5" strokeOpacity="0.6" />
      <path d="M470 365 L515 385" stroke="#1B5FCC" strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="515" cy="345" r="4" fill="#1B5FCC" />
      <circle cx="515" cy="365" r="4" fill="#5BA6FF" />
      <circle cx="515" cy="385" r="4" fill="#1B5FCC" />

      <defs>
        <filter id="coreShadow" x="225" y="45" width="240" height="400" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="18" stdDeviation="24" floodColor="#0B1525" floodOpacity="0.13" />
        </filter>
      </defs>
    </svg>
  );
}
