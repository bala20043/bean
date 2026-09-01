import { offers, menuItems } from "@/data/cafe";
import { useCafe } from "./cafe-store";
import { Sparkles, Tag, Plus, Check } from "lucide-react";

export function OffersSection() {
  const { addItem } = useCafe();

  const handleClaimOffer = (offer: (typeof offers)[0]) => {
    // Map offer to a custom cart item
    const offerItem = {
      id: `offer-${offer.id}`,
      name: offer.title,
      description: offer.description,
      price: offer.id === "morning" ? 220 : offer.id === "weekend" ? 340 : 150,
      category: "coffee" as const,
      image: menuItems[0].image,
    };

    addItem(offerItem, 1, true, offer.tag);
  };

  return (
    <section
      id="offers"
      className="relative overflow-hidden bg-gradient-to-b from-[#161311] via-[#12100E] to-[#1C1815] py-20 text-[#F5EFE6] md:py-28 border-t border-[#D9A15B]/10"
    >
      <div className="pointer-events-none absolute -bottom-20 -left-20 size-[500px] rounded-full bg-[#D9A15B]/10 blur-[140px] animate-pulse-glow" />
      <div className="pointer-events-none absolute top-10 right-10 size-[350px] rounded-full bg-[#8C5D27]/15 blur-[120px] animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#D9A15B]">
            <Sparkles className="size-3.5 text-[#D9A15B]" />
            Special Offers & Combos
          </span>
          <h2 className="font-display text-4xl font-bold tracking-tight text-[#F5EFE6] md:text-5xl">
            Brew More, Save More
          </h2>
          <p className="text-sm text-[#A89F91]">
            Curated daily combos and exclusive savings for our Bandra coffee lovers
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {offers.map((offer) => (
            <article
              key={offer.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-[#D9A15B]/25 bg-[#1C1815]/90 p-7 shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-[#D9A15B] hover:shadow-glow"
            >
              {/* Ribbon Badge */}
              <div className="absolute -top-3 right-6 rounded-full bg-[#D9A15B] px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-[#12100E] shadow-md flex items-center gap-1">
                <Tag className="size-3 stroke-[2.5]" />
                {offer.tag} Special
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#D9A15B]">
                  {offer.tag} Combo
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold text-[#F5EFE6] group-hover:text-[#D9A15B] transition-colors">
                  {offer.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#A89F91]">
                  {offer.description}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-[#D9A15B]/15">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-xs text-[#A89F91] uppercase tracking-wider">Offer Price</span>
                  <p className="font-display text-3xl font-bold text-[#D9A15B] drop-shadow-sm">
                    {offer.highlight}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleClaimOffer(offer)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#D9A15B] text-[#12100E] font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[#E5A958] transition-all hover:scale-105 active:scale-95"
                >
                  <Plus className="size-4 stroke-[3]" />
                  Claim & Add to Order
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

