export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-aqua to-lagoon-deep shadow-soft">
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
          <ellipse
            cx="12"
            cy="12"
            rx="6"
            ry="8.5"
            transform="rotate(-35 12 12)"
            fill="var(--color-foam)"
            opacity="0.95"
          />
          <path
            d="M7.6 15.8C9.6 12.4 12.8 10 16.4 8.2"
            stroke="var(--color-lagoon-deep)"
            strokeWidth="1.3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </span>
      <span
        className={`truncate font-display text-xl font-semibold tracking-tight ${
          tone === "light" ? "text-foam" : "text-ink"
        }`}
      >
        Brew <span className={tone === "light" ? "text-aqua" : "text-lagoon"}>&amp;</span> Bean
      </span>
    </span>
  );
}
