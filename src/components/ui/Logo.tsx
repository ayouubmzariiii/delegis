/** Mark: a blue ledger tile with a reconciliation tick. */
export function LogoMark({ className = 'h-8 w-8', inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={inverse ? 'lg-i' : 'lg-d'} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={inverse ? '#FFFFFF' : '#4A72FF'} />
          <stop offset="1" stopColor={inverse ? '#DCE4FF' : '#1834B0'} />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#${inverse ? 'lg-i' : 'lg-d'})`} />
      <path d="M9 10h14M9 14h8" stroke={inverse ? '#1834B0' : '#FFFFFF'} strokeOpacity=".45" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m10.5 20.5 3.5 3.3 8-8.3" fill="none" stroke={inverse ? '#1834B0' : '#FFFFFF'} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5" dir="ltr">
      <LogoMark inverse={inverse} />
      <span className={`font-display text-xl font-bold tracking-[-0.03em] ${inverse ? 'text-white' : 'text-ink'}`}>Delegis</span>
    </span>
  );
}
