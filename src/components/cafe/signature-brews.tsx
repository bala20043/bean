import { formatPrice, signatureItems } from "@/data/cafe";
import { useCafe } from "./cafe-store";
import { Plus, Star, ArrowRight } from "lucide-react";

export function SignatureBrews() {
  const { addItem } = useCafe();

  return (
    <section className="bg-[#161311] py-20 text-[#F5EFE6] md:py-28 border-t border-[#D9A15B]/10">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-[#D9A15B]">Signature Brews</p>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-[#F5EFE6] md:text-5xl">
              Crafted to Perfection
            </h2>
            <p className="mt-2 text-sm text-[#A89F91]">
              Our most celebrated espresso creations, extracted with precision
            </p>
          </div>
          <a
            href="#menu"
            className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D9A15B] transition-all hover:text-[#E5A958]"
          >
            View full menu
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {signatureItems.map((item) => (
            <article
              key={item.id}
              className="surface-card group relative flex flex-col justify-between overflow-hidden bg-[#1C1815] border border-[#D9A15B]/15 rounded-3xl transition-all duration-300 hover:border-[#D9A15B]/40 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div>
                <div className="relative overflow-hidden rounded-t-3xl aspect-[5/4]">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    width={800}
                    height={640}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1815] via-transparent to-transparent opacity-60" />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-[#D9A15B] px-3 py-1 text-[11px] font-bold text-[#12100E] shadow-lg">
                    <Star className="size-3 fill-[#12100E]" />
                    Signature
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg font-bold text-[#F5EFE6] group-hover:text-[#D9A15B] transition-colors">
                      {item.name}
                    </h3>
                    <span className="shrink-0 font-display text-base font-bold text-[#D9A15B]">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-[#A89F91] line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => addItem(item)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#D9A15B] text-[#12100E] text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#E5A958] transition-all hover:scale-105 active:scale-95"
                >
                  <Plus className="size-4 stroke-[3]" />
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

