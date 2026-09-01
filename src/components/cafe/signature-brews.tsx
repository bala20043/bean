import { formatPrice, signatureItems } from "@/data/cafe";
import { useCafe } from "./cafe-store";
import { Plus, Star, ArrowRight } from "lucide-react";

export function SignatureBrews() {
  const { openOrder } = useCafe();

  return (
    <section className="bg-foam py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="eyebrow">Signature Brews</p>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
              Crafted to Perfection
            </h2>
          </div>
          <a
            href="#menu"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-lagoon transition-all hover:text-lagoon-deep"
          >
            View full menu
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {signatureItems.map((item) => (
            <article
              key={item.id}
              className="surface-card group relative flex flex-col justify-between overflow-hidden transition-all duration-300"
            >
              <div>
                <div className="relative overflow-hidden rounded-t-3xl">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    width={800}
                    height={640}
                    className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-coral px-3 py-1 text-[11px] font-bold text-foam shadow-soft">
                    <Star className="size-3 fill-foam" />
                    Signature
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold text-ink group-hover:text-lagoon transition-colors">
                      {item.name}
                    </h3>
                    <span className="shrink-0 font-bold text-lagoon">{formatPrice(item.price)}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65 line-clamp-2">{item.description}</p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => openOrder(item)}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-lagoon py-2.5 text-xs font-semibold text-foam shadow-soft transition-all duration-300 hover:scale-[1.02] hover:bg-lagoon-deep active:scale-95"
                >
                  <Plus className="size-3.5" />
                  Order Coffee
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
