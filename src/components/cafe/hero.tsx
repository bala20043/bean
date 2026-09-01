import heroImage from "@/assets/hero-macchiato.jpg";
import { useCafe } from "./cafe-store";
import { Coffee, Star, Sparkles } from "lucide-react";

export function Hero() {
  const { openReserve } = useCafe();

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-aqua via-lagoon to-lagoon-deep" />
      <div className="pointer-events-none absolute -top-24 left-1/4 size-[600px] rounded-full bg-aqua/30 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute bottom-0 right-10 size-[400px] rounded-full bg-coral/20 blur-3xl animate-pulse-glow" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:px-8 md:py-32">
        <div className="text-foam animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-foam/25 bg-foam/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-md">
            <span className="size-2 animate-ping rounded-full bg-coral" />
            <Sparkles className="size-3.5 text-coral" />
            Freshly brewed daily
          </span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
            Good Coffee. <span className="text-coral drop-shadow-sm">Great</span> Moments.
          </h1>
          <p className="mt-5 max-w-md text-lg text-foam/90 leading-relaxed">
            Handcrafted artisanal coffee, delicious freshly baked pastries, and a cozy space designed for unhurried moments.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#menu"
              className="group inline-flex items-center gap-2 rounded-full bg-foam px-7 py-3.5 text-sm font-semibold text-lagoon-deep shadow-lift transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-2xl active:scale-95"
            >
              <Coffee className="size-4 text-lagoon transition-transform group-hover:rotate-12" />
              Explore Menu
            </a>
            <button
              type="button"
              onClick={openReserve}
              className="inline-flex items-center rounded-full border border-foam/40 bg-foam/10 px-7 py-3.5 text-sm font-semibold text-foam backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-foam/25 active:scale-95"
            >
              Reserve a Table
            </button>
          </div>

          <div className="mt-10 flex items-center gap-6 border-t border-foam/20 pt-6">
            <div>
              <p className="font-display text-2xl font-bold text-foam">4.9★</p>
              <p className="text-xs text-foam/70">Over 1,200 Reviews</p>
            </div>
            <div className="h-8 w-px bg-foam/20" />
            <div>
              <p className="font-display text-2xl font-bold text-foam">100%</p>
              <p className="text-xs text-foam/70">Organic Arabica Beans</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl shadow-panel outline outline-foam/25 transition-transform duration-500 hover:scale-[1.02]">
            <img
              src={heroImage}
              alt="Caramel macchiato in a tall glass with layered milk and caramel"
              width={1024}
              height={1280}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          {/* Floating Price Tag */}
          <div className="absolute -bottom-6 -left-2 rounded-2xl bg-foam/95 p-4 text-ink shadow-lift backdrop-blur-md md:-left-6 animate-float">
            <div className="flex items-center gap-2">
              <span className="flex text-amber-500">
                <Star className="size-4 fill-amber-400 text-amber-400" />
              </span>
              <span className="text-xs font-bold text-coral">Bestseller</span>
            </div>
            <p className="mt-1 font-display text-2xl font-semibold text-lagoon">₹180</p>
            <p className="text-xs font-medium text-ink/70">Caramel Macchiato</p>
          </div>

          {/* Floating Quality Tag */}
          <div className="absolute -top-4 -right-2 hidden rounded-2xl bg-lagoon-deep/90 p-4 text-foam shadow-lift backdrop-blur-md sm:block md:-right-4 animate-float-slow">
            <p className="text-xs font-semibold text-aqua">100% Roasted In-House</p>
            <p className="text-[11px] text-foam/70">Signature Blend</p>
          </div>
        </div>
      </div>
    </section>
  );
}
