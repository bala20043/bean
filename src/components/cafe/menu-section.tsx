import { useMemo, useState } from "react";
import { categories, formatPrice, menuItems, type Category } from "@/data/cafe";
import { useCafe } from "./cafe-store";
import { Plus } from "lucide-react";

export function MenuSection() {
  const { openOrder } = useCafe();
  const [active, setActive] = useState<Category | "all">("all");

  const visible = useMemo(
    () => (active === "all" ? menuItems : menuItems.filter((item) => item.category === active)),
    [active],
  );

  return (
    <section id="menu" className="bg-sand py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow">The Menu</p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            Something for Every Craving
          </h2>
          <p className="mt-3 text-sm text-ink/70">
            Handcrafted with organic ingredients and served fresh daily
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActive(cat.id)}
              aria-pressed={active === cat.id}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                active === cat.id
                  ? "bg-lagoon text-foam shadow-soft scale-105"
                  : "border border-border bg-card text-lagoon-deep hover:border-lagoon/40 hover:bg-foam/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <article key={item.id} className="surface-card group overflow-hidden transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-3xl">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute top-3 right-3 rounded-full bg-foam/90 px-3 py-1 text-xs font-bold text-lagoon backdrop-blur-md">
                  {formatPrice(item.price)}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold text-ink group-hover:text-lagoon transition-colors">
                    {item.name}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink/65 line-clamp-2">{item.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-ink/50">{item.category}</span>
                  <button
                    type="button"
                    onClick={() => openOrder(item)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-lagoon px-4 py-2 text-xs font-semibold text-foam shadow-soft transition-all duration-300 hover:scale-105 hover:bg-lagoon-deep active:scale-95"
                  >
                    <Plus className="size-3.5" />
                    Order Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
