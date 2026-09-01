import { toast } from "sonner";
import { offers } from "@/data/cafe";
import { Sparkles, Tag } from "lucide-react";

export function OffersSection() {
  return (
    <section id="offers" className="relative overflow-hidden bg-gradient-to-br from-lagoon via-lagoon-deep to-ink py-20 text-foam md:py-28">
      <div className="pointer-events-none absolute -bottom-20 -left-20 size-[500px] rounded-full bg-aqua/20 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute top-10 right-10 size-[350px] rounded-full bg-coral/15 blur-3xl animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-aqua">
            <Sparkles className="size-3.5" />
            Special Offers
          </span>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Brew More, Save More
          </h2>
          <p className="mt-3 text-sm text-foam/75">
            Exclusive deals designed for our coffee lovers & regular guests
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {offers.map((offer) => (
            <article
              key={offer.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-foam/20 bg-foam/10 p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-aqua/50 hover:bg-foam/15 hover:shadow-2xl"
            >
              <div>
                <span className="inline-flex items-center gap-1 rounded-full border border-coral/30 bg-coral/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-coral">
                  <Tag className="size-3" />
                  {offer.tag}
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold text-foam group-hover:text-aqua transition-colors">
                  {offer.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foam/80">{offer.description}</p>
              </div>

              <div className="mt-6 border-t border-foam/15 pt-5">
                <p className="font-display text-3xl font-bold text-aqua drop-shadow-sm">{offer.highlight}</p>
                <button
                  type="button"
                  onClick={() =>
                    toast.success("Offer claimed! 🎉", {
                      description: `${offer.title} has been saved for your next visit!`,
                    })
                  }
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-foam py-3 text-sm font-semibold text-lagoon-deep transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-lift active:scale-95"
                >
                  Claim Offer
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
