import { Coffee, Utensils, Armchair } from "lucide-react";
import aboutImage from "@/assets/about-cafe.jpg";

const pillars = [
  {
    icon: Coffee,
    title: "Freshly Roasted Beans",
    copy: "Small batches roasted in-house every week and ground to order at the bar.",
  },
  {
    icon: Utensils,
    title: "Artisanal Kitchen",
    copy: "Croissants laminated before dawn, sourdough sandwiches crafted to order.",
  },
  {
    icon: Armchair,
    title: "Unsaved Ambience",
    copy: "Low warm pendant lights, deep acoustic vinyl playlists, and room to breathe.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#12100E] py-20 text-[#F5EFE6] md:py-28 border-t border-[#D9A15B]/10">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-[#D9A15B]/20 shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
            <img
              src={aboutImage}
              alt="Bright Brew & Bean café interior with teal chairs and marble tables"
              loading="lazy"
              width={1200}
              height={900}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 right-4 rounded-2xl bg-[#1C1815] border border-[#D9A15B]/30 px-6 py-4 text-center shadow-2xl md:right-8 animate-float">
            <p className="font-display text-4xl font-bold text-[#D9A15B]">7+</p>
            <p className="text-xs font-semibold text-[#A89F91]">Years of Pouring Joy</p>
          </div>
        </div>

        <div className="space-y-6">
          <p className="eyebrow text-[#D9A15B]">About Us</p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-[#F5EFE6] md:text-5xl">
            A little corner built for unhurried moments
          </h2>
          <p className="text-base leading-relaxed text-[#A89F91]">
            Brew &amp; Bean began in 2019 in Bandra with one second-hand roaster, a dark oak bar counter, and a stubborn belief that a good cup of coffee deserves an unhurried room. Today we still roast in the back, bake before sunrise, and know most of our regulars by their usual order.
          </p>

          <div className="space-y-5 pt-2">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="group flex min-w-0 items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#1C1815] border border-[#D9A15B]/20 text-[#D9A15B] transition-all duration-300 group-hover:bg-[#D9A15B] group-hover:text-[#12100E] group-hover:scale-110">
                  <pillar.icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-lg font-bold text-[#F5EFE6] group-hover:text-[#D9A15B] transition-colors">
                    {pillar.title}
                  </p>
                  <p className="mt-0.5 text-xs text-[#A89F91] leading-relaxed">{pillar.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

