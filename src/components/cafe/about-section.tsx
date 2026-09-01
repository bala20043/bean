import { Coffee, Utensils, Armchair } from "lucide-react";
import aboutImage from "@/assets/about-cafe.jpg";

const pillars = [
  {
    icon: Coffee,
    title: "Freshly roasted beans",
    copy: "Small batches roasted every week and ground to order at the bar.",
  },
  {
    icon: Utensils,
    title: "Freshly prepared food",
    copy: "Pastries laminated at dawn, sandwiches built to order all day.",
  },
  {
    icon: Armchair,
    title: "Comfortable ambience",
    copy: "Soft seating, gentle light and space to breathe between sips.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-foam py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-panel transition-transform duration-500 hover:scale-[1.02]">
            <img
              src={aboutImage}
              alt="Bright Brew & Bean café interior with teal chairs and marble tables"
              loading="lazy"
              width={1200}
              height={900}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 right-4 rounded-2xl bg-card border border-border px-6 py-4 text-center shadow-lift md:right-8 animate-float">
            <p className="font-display text-4xl font-bold text-lagoon">7+</p>
            <p className="text-xs font-semibold text-ink/70">Years of Pouring Joy</p>
          </div>
        </div>

        <div>
          <p className="eyebrow">About Us</p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            A little corner built for slow mornings
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/75">
            Brew &amp; Bean began in 2019 with one second-hand roaster, a marble counter, and a
            stubborn belief that a good cup deserves an unhurried room. Today we still roast in the
            back, bake before sunrise, and know most of our regulars by their usual order.
          </p>

          <div className="mt-8 space-y-5">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="group flex min-w-0 items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sand text-lagoon transition-all duration-300 group-hover:bg-lagoon group-hover:text-foam group-hover:scale-110">
                  <pillar.icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold text-ink group-hover:text-lagoon transition-colors">
                    {pillar.title}
                  </p>
                  <p className="mt-0.5 text-sm text-ink/65">{pillar.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
