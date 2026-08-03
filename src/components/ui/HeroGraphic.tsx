export function HeroGraphic() {
  return (
    <svg
      viewBox="0 0 560 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      role="img"
      aria-labelledby="heroGraphicTitle"
    >
      <title id="heroGraphicTitle">
        Disconnected systems — properties, crews, and paperwork — resolving into one operating
        dashboard
      </title>

      {/* connector lines from scattered inputs into the dashboard */}
      <g stroke="#1B5FCC" strokeOpacity="0.35" strokeWidth="1.5" fill="none">
        <path d="M60 90 C 130 90, 150 150, 205 165" />
        <path d="M40 230 C 110 230, 150 220, 205 210" />
        <path d="M70 360 C 130 350, 160 290, 210 260" />
        <path d="M500 100 C 430 100, 400 150, 350 165" />
        <path d="M520 250 C 450 250, 410 235, 355 220" />
      </g>

      {/* scattered input nodes representing disconnected systems */}
      <g>
        <circle cx="52" cy="90" r="16" fill="#0B1525" fillOpacity="0.06" />
        <circle cx="52" cy="90" r="16" stroke="#6B7280" strokeOpacity="0.4" />
        <rect x="44" y="83" width="16" height="14" rx="2" fill="#1B5FCC" />

        <circle cx="32" cy="230" r="16" fill="#0B1525" fillOpacity="0.06" />
        <circle cx="32" cy="230" r="16" stroke="#6B7280" strokeOpacity="0.4" />
        <path d="M25 234 L 32 224 L 39 234 Z" fill="#E0692A" />

        <circle cx="62" cy="362" r="16" fill="#0B1525" fillOpacity="0.06" />
        <circle cx="62" cy="362" r="16" stroke="#6B7280" strokeOpacity="0.4" />
        <rect x="55" y="355" width="14" height="14" rx="7" fill="#5BA6FF" />

        <circle cx="508" cy="100" r="16" fill="#0B1525" fillOpacity="0.06" />
        <circle cx="508" cy="100" r="16" stroke="#6B7280" strokeOpacity="0.4" />
        <rect x="500" y="93" width="16" height="14" rx="2" fill="#F3A15C" />

        <circle cx="528" cy="250" r="16" fill="#0B1525" fillOpacity="0.06" />
        <circle cx="528" cy="250" r="16" stroke="#6B7280" strokeOpacity="0.4" />
        <circle cx="528" cy="250" r="6" fill="#1B5FCC" />
      </g>

      {/* central dashboard card */}
      <g filter="url(#cardShadow)">
        <rect x="205" y="140" width="150" height="200" rx="14" fill="#FFFFFF" stroke="#E7E5E0" />
      </g>

      {/* card header */}
      <circle cx="222" cy="158" r="3" fill="#E0692A" />
      <circle cx="233" cy="158" r="3" fill="#F3A15C" />
      <circle cx="244" cy="158" r="3" fill="#5BA6FF" />
      <rect x="218" y="172" width="60" height="6" rx="3" fill="#0B1525" fillOpacity="0.75" />
      <rect x="218" y="184" width="40" height="5" rx="2.5" fill="#6B7280" fillOpacity="0.5" />

      {/* bar rows representing systems now reporting into one place */}
      <g>
        <rect x="218" y="204" width="124" height="10" rx="3" fill="#0B1525" fillOpacity="0.05" />
        <rect x="218" y="204" width="88" height="10" rx="3" fill="#1B5FCC" />

        <rect x="218" y="222" width="124" height="10" rx="3" fill="#0B1525" fillOpacity="0.05" />
        <rect x="218" y="222" width="62" height="10" rx="3" fill="#5BA6FF" />

        <rect x="218" y="240" width="124" height="10" rx="3" fill="#0B1525" fillOpacity="0.05" />
        <rect x="218" y="240" width="102" height="10" rx="3" fill="#E0692A" />
      </g>

      {/* trend line */}
      <path
        d="M218 300 L 244 288 L 268 296 L 292 270 L 318 278 L 342 254"
        stroke="#1B5FCC"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="342" cy="254" r="4" fill="#1B5FCC" />

      <rect x="218" y="316" width="70" height="8" rx="4" fill="#0B1525" fillOpacity="0.06" />
      <rect x="296" y="316" width="46" height="8" rx="4" fill="#E0692A" fillOpacity="0.85" />

      <defs>
        <filter id="cardShadow" x="180" y="120" width="200" height="250" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="18" stdDeviation="22" floodColor="#0B1525" floodOpacity="0.14" />
        </filter>
      </defs>
    </svg>
  );
}
