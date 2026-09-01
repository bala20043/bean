import heroImage from "@/assets/hero-macchiato.jpg";
import { useCafe } from "./cafe-store";
import { menuItems } from "@/data/cafe";
import { Coffee, Star, Sparkles, Plus } from "lucide-react";

export function Hero() {
  const { openReserve, addItem, openCart } = useCafe();
  const bestseller = menuItems[0]; // Caramel Macchiato

  return (
    <section id="home" className="relative overflow-hidden bg-[#12100E] py-20 text-[#F5EFE6] md:py-32">
      {/* Glow Overlays */}
      <div className="pointer-events-none absolute -top-32 left-1/4 size-[650px] rounded-full bg-[#D9A15B]/10 blur-[130px] animate-pulse-glow" />
      <div className="pointer-events-none absolute bottom-0 right-10 size-[450px] rounded-full bg-[#8C5D27]/15 blur-[120px] animate-pulse-glow" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 md:px-8">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D9A15B]/25 bg-[#D9A15B]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#D9A15B] backdrop-blur-md">
            <Sparkles className="size-3.5 text-[#D9A15B]" />
            Freshly Roasted Daily · Bandra West
          </span>

          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-[#F5EFE6] md:text-6xl lg:text-7xl">
            Good Coffee. <br />
            <span className="text-[#D9A15B] italic font-normal">Unforgettable</span> Moments.
          </h1>

          <p className="max-w-md text-base leading-relaxed text-[#A89F91] md:text-lg">
            Artisanal single-origin Arabica, freshly laminated pastries, and a quiet, moody space built for slow unhurried mornings and warm evenings.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#menu"
              className="group inline-flex items-center gap-2 rounded-full bg-[#D9A15B] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#12100E] shadow-glow transition-all duration-300 hover:scale-105 hover:bg-[#E5A958] active:scale-95"
            >
              <Coffee className="size-4 text-[#12100E] transition-transform group-hover:rotate-12" />
              Explore Menu
            </a>

            <button
              type="button"
              onClick={openReserve}
              className="inline-flex items-center rounded-full border border-[#D9A15B]/30 bg-[#1C1815]/60 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#F5EFE6] backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-[#D9A15B] hover:bg-[#D9A15B]/15 hover:text-[#D9A15B] active:scale-95"
            >
              Reserve a Table
            </button>
          </div>

          {/* Restyled Glass Chips */}
          <div className="grid grid-cols-2 gap-4 border-t border-[#D9A15B]/15 pt-6 max-w-md">
            <div className="glass-chip p-4 rounded-2xl border border-[#D9A15B]/15">
              <p className="font-display text-2xl font-bold text-[#D9A15B]">4.9 ★</p>
              <p className="text-xs font-medium text-[#A89F91] mt-0.5">Over 1,200 Reviews</p>
            </div>
            <div className="glass-chip p-4 rounded-2xl border border-[#D9A15B]/15">
              <p className="font-display text-2xl font-bold text-[#D9A15B]">100%</p>
              <p className="text-xs font-medium text-[#A89F91] mt-0.5">Organic Arabica Beans</p>
            </div>
          </div>
        </div>

        {/* Hero Image Container */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-[#D9A15B]/20 shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-transparent to-transparent opacity-60 z-10" />
            <img
              src={heroImage}
              alt="Caramel macchiato in a tall glass with layered milk and caramel"
              width={1024}
              height={1280}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          {/* Floating Bestseller Card */}
          <div className="absolute -bottom-6 -left-4 z-20 rounded-2xl bg-[#1C1815]/95 border border-[#D9A15B]/30 p-4 text-[#F5EFE6] shadow-2xl backdrop-blur-md animate-float min-w-[220px]">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1 text-[#D9A15B]">
                <Star className="size-3.5 fill-[#D9A15B]" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Bestseller</span>
              </div>
              <span className="font-display text-lg font-bold text-[#D9A15B]">₹180</span>
            </div>
            <p className="mt-1 text-sm font-bold text-[#F5EFE6]">{bestseller.name}</p>
            <p className="text-[11px] text-[#A89F91] line-clamp-1">{bestseller.description}</p>
            <button
              type="button"
              onClick={() => addItem(bestseller)}
              className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#D9A15B] text-[#12100E] text-xs font-bold hover:bg-[#E5A958] transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="size-3.5 stroke-[3]" />
              Add to Order
            </button>
          </div>

          {/* Floating House Blend Tag */}
          <div className="absolute -top-4 -right-4 z-20 hidden rounded-2xl bg-[#12100E]/90 border border-[#D9A15B]/30 p-4 text-[#F5EFE6] shadow-2xl backdrop-blur-md sm:block animate-float-slow">
            <p className="text-xs font-bold text-[#D9A15B]">Roasted In-House Weekly</p>
            <p className="text-[11px] text-[#A89F91] mt-0.5">Custom Bandra Espresso Roast</p>
          </div>
        </div>
      </div>
    </section>
  );
}

