import { useMemo, useState } from "react";
import { categories, formatPrice, menuItems, type Category } from "@/data/cafe";
import { useCafe } from "./cafe-store";
import { Plus } from "lucide-react";

export function MenuSection() {
  const { addItem } = useCafe();
  const [active, setActive] = useState<Category | "all">("all");

  const visible = useMemo(
    () => (active === "all" ? menuItems : menuItems.filter((item) => item.category === active)),
    [active],
  );

  return (
    <section id="menu" className="bg-[#12100E] py-20 text-[#F5EFE6] md:py-28 border-t border-[#D9A15B]/10">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-xl text-center space-y-2">
          <p className="eyebrow text-[#D9A15B]">The Menu</p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-[#F5EFE6] md:text-5xl">
            Something for Every Craving
          </h2>
          <p className="text-sm text-[#A89F91]">
            Handcrafted with organic single-origin beans and freshly prepared in-house
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActive(cat.id)}
              aria-pressed={active === cat.id}
              className={`rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                active === cat.id
                  ? "bg-[#D9A15B] text-[#12100E] shadow-glow scale-105"
                  : "border border-[#D9A15B]/20 bg-[#1C1815] text-[#A89F91] hover:border-[#D9A15B]/40 hover:text-[#F5EFE6]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <article
              key={item.id}
              className="surface-card group relative flex flex-col justify-between overflow-hidden bg-[#1C1815] border border-[#D9A15B]/15 rounded-3xl transition-all duration-400 hover:border-[#D9A15B]/40 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div>
                <div className="relative overflow-hidden rounded-t-3xl aspect-[4/3]">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1815] via-transparent to-transparent opacity-60" />
                  <span className="absolute top-3 right-3 rounded-full bg-[#12100E]/90 border border-[#D9A15B]/30 px-3.5 py-1 text-xs font-bold text-[#D9A15B] backdrop-blur-md shadow-lg">
                    {formatPrice(item.price)}
                  </span>
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg font-bold text-[#F5EFE6] group-hover:text-[#D9A15B] transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-xs leading-relaxed text-[#A89F91] line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D9A15B]/80 bg-[#D9A15B]/10 px-2.5 py-1 rounded-md">
                  {item.category}
                </span>
                <button
                  type="button"
                  onClick={() => addItem(item)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#D9A15B] px-5 py-2.5 text-xs font-bold text-[#12100E] uppercase tracking-wider shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#E5A958] active:scale-95"
                >
                  <Plus className="size-3.5 stroke-[3]" />
                  Order Now
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

