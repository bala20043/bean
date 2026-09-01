import heroImage from "@/assets/hero-macchiato.jpg";
import { useCafe } from "./cafe-store";

export function Hero() {
  const { openReserve } = useCafe();

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-aqua via-lagoon to-lagoon-deep" />
      <div className="pointer-events-none absolute -top-24 left-1/4 size-[600px] rounded-full bg-aqua/30 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:px-8 md:py-32">
        <div className="text-foam">
          <span className="inline-flex items-center gap-2 rounded-full border border-foam/25 bg-foam/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]">
            <span className="size-1.5 animate-pulse rounded-full bg-coral" />
            Freshly brewed daily
          </span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
            Good Coffee. <span className="text-coral">Great</span> Moments.
          </h1>
          <p className="mt-5 max-w-md text-lg text-foam/85">
            Handcrafted coffee, delicious bites, and a warm place to slow down.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#menu"
              className="inline-flex items-center rounded-full bg-foam px-6 py-3 text-sm font-semibold text-lagoon-deep shadow-lift transition hover:-translate-y-0.5"
            >
              Explore Menu
            </a>
            <button
              type="button"
              onClick={openReserve}
              className="inline-flex items-center rounded-full border border-foam/40 px-6 py-3 text-sm font-semibold text-foam transition hover:bg-foam/10"
            >
              Reserve a Table
            </button>
          </div>
        </div>

        <div className="relative">
          <img
            src={heroImage}
            alt="Caramel macchiato in a tall glass with layered milk and caramel"
            width={1024}
            height={1280}
            className="aspect-[4/5] w-full rounded-3xl object-cover shadow-panel outline outline-foam/25"
          />
          <div className="absolute -bottom-5 -left-2 rounded-2xl bg-foam px-5 py-4 text-ink shadow-lift md:-left-5">
            <p className="font-display text-2xl font-semibold text-lagoon">₹180</p>
            <p className="text-xs font-medium text-ink/60">Caramel Macchiato</p>
          </div>
        </div>
      </div>
    </section>
  );
}
