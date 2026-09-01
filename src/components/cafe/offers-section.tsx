import { toast } from "sonner";
import { offers } from "@/data/cafe";

export function OffersSection() {
  return (
    <section id="offers" className="bg-gradient-to-br from-lagoon to-lagoon-deep py-20 text-foam md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-aqua">Special Offers</p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Brew More, Save More
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {offers.map((offer) => (
            <article
              key={offer.id}
              className="rounded-3xl border border-foam/20 bg-foam/10 p-6 backdrop-blur-sm transition hover:-translate-y-1.5 hover:bg-foam/15"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-coral">{offer.tag}</span>
              <h3 className="mt-3 font-display text-2xl font-semibold">{offer.title}</h3>
              <p className="mt-2 text-sm text-foam/80">{offer.description}</p>
              <p className="mt-4 font-display text-3xl font-semibold text-aqua">{offer.highlight}</p>
              <button
                type="button"
                onClick={() =>
                  toast.success("Offer claimed!", {
                    description: `${offer.title} has been applied to your next visit.`,
                  })
                }
                className="mt-5 inline-flex items-center rounded-full bg-foam px-5 py-2.5 text-sm font-semibold text-lagoon-deep transition hover:brightness-95"
              >
                Claim Offer
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
