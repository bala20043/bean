export function Logo() {
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#D9A15B] to-[#8C5D27] shadow-glow border border-[#D9A15B]/30">
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
          <ellipse
            cx="12"
            cy="12"
            rx="6"
            ry="8.5"
            transform="rotate(-35 12 12)"
            fill="#F5EFE6"
            opacity="0.95"
          />
          <path
            d="M7.6 15.8C9.6 12.4 12.8 10 16.4 8.2"
            stroke="#12100E"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </span>
      <span className="truncate font-display text-xl font-bold tracking-tight text-[#F5EFE6]">
        Brew <span className="text-[#D9A15B]">&amp;</span> Bean
      </span>
    </span>
  );
}
