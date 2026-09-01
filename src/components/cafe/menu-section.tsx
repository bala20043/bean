import { useMemo, useState } from "react";
import { categories, formatPrice, menuItems, type Category } from "@/data/cafe";
import { useCafe } from "./cafe-store";

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
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActive(cat.id)}
              aria-pressed={active === cat.id}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                active === cat.id
                  ? "bg-lagoon text-foam shadow-soft"
                  : "border border-border bg-card text-lagoon-deep hover:border-lagoon/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <article key={item.id} className="surface-card group overflow-hidden">
              <div className="overflow-hidden rounded-t-3xl">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold text-ink">{item.name}</h3>
                  <span className="shrink-0 font-semibold text-lagoon">{formatPrice(item.price)}</span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{item.description}</p>
                <button
                  type="button"
                  onClick={() => openOrder(item)}
                  className="mt-4 inline-flex items-center rounded-full bg-lagoon px-4 py-2 text-sm font-semibold text-foam transition hover:bg-lagoon-deep"
                >
                  Order
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
