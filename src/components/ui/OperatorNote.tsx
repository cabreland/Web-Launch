export function OperatorNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 border-l-4 border-sky bg-sky/[0.06] px-5 py-4 not-prose">
      <p className="mb-1.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-sky">
        Operator ·
      </p>
      <div className="text-[15px] leading-relaxed text-ink/90 [&_p]:mb-2 [&_p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
