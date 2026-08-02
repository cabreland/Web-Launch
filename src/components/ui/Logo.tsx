import Link from "next/link";

export function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  const inkColor = variant === "dark" ? "#F7F7F5" : "#0B1525";
  const skyColor = variant === "dark" ? "#5BA6FF" : "#1B5FCC";

  return (
    <Link href="/" className="flex items-center gap-2 group" aria-label="WebLaunch home">
      <svg
        width="28"
        height="28"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-sky"
        style={{ color: skyColor }}
        aria-hidden="true"
      >
        <g transform="rotate(35 20 20)">
          <path
            d="M20 4C24 9 26 15 26 21C26 25 24 28 20 30C16 28 14 25 14 21C14 15 16 9 20 4Z"
            fill="currentColor"
          />
          <path d="M14 22L8 28L14 27.5V22Z" fill="currentColor" opacity="0.7" />
          <path d="M26 22L32 28L26 27.5V22Z" fill="currentColor" opacity="0.7" />
          <circle cx="20" cy="16" r="2.4" fill={variant === "dark" ? "#0B1525" : "#F7F7F5"} />
          <path d="M17 30C17 33 18.3 35 20 36C21.7 35 23 33 23 30H17Z" fill="currentColor" opacity="0.9" />
        </g>
      </svg>
      <span className="font-display text-lg font-semibold tracking-tight">
        <span style={{ color: inkColor }}>Web</span>
        <span style={{ color: skyColor }}>Launch</span>
      </span>
    </Link>
  );
}
