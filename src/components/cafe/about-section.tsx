import { Coffee, CroissantIcon, Sofa } from "lucide-react";
import aboutImage from "@/assets/about-cafe.jpg";

const pillars = [
  {
    icon: Coffee,
    title: "Freshly roasted beans",
    copy: "Small batches roasted every week and ground to order at the bar.",
  },
  {
    icon: CroissantIcon,
    title: "Freshly prepared food",
    copy: "Pastries laminated at dawn, sandwiches built to order all day.",
  },
  {
    icon: Sofa,
    title: "Comfortable ambience",
    copy: "Soft seating, gentle light and space to breathe between sips.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="bg-foam py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        <div className="relative">
          <img
            src={aboutImage}
            alt="Bright Brew & Bean café interior with teal chairs and marble tables"
            loading="lazy"
            width={1200}
            height={900}
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift"
          />
          <div className="absolute -bottom-6 right-4 rounded-2xl bg-card px-5 py-4 text-center shadow-lift md:right-8">
            <p className="font-display text-3xl font-semibold text-lagoon">7</p>
            <p className="text-xs font-medium text-ink/60">years of pouring</p>
          </div>
        </div>

        <div>
          <p className="eyebrow">About Us</p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            A little corner built for slow mornings
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/70">
            Brew &amp; Bean began in 2019 with one second-hand roaster, a marble counter and a
            stubborn belief that a good cup deserves an unhurried room. Today we still roast in the
            back, bake before sunrise, and know most of our regulars by their usual order.
          </p>

          <div className="mt-8 space-y-4">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="flex min-w-0 items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sand text-lagoon">
                  <pillar.icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold text-ink">{pillar.title}</p>
                  <p className="text-sm text-ink/60">{pillar.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
