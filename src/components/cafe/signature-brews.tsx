import { formatPrice, signatureItems } from "@/data/cafe";
import { useCafe } from "./cafe-store";

export function SignatureBrews() {
  const { openOrder } = useCafe();

  return (
    <section className="bg-foam py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="eyebrow">Signature</p>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
              Our Signature Brews
            </h2>
          </div>
          <a href="#menu" className="text-sm font-semibold text-lagoon transition hover:text-lagoon-deep">
            View full menu →
          </a>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {signatureItems.map((item) => (
            <article key={item.id} className="surface-card group overflow-hidden">
              <div className="overflow-hidden rounded-t-3xl">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  width={800}
                  height={640}
                  className="aspect-[5/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
