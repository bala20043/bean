import { Armchair, Laptop, Lightbulb, Music4, Wifi } from "lucide-react";

const features = [
  { icon: Armchair, title: "Cozy Banquette Seating", copy: "Deep velvet nooks and window seats made for lingering over espresso." },
  { icon: Lightbulb, title: "Warm Amber Lighting", copy: "Low pendant filaments that soften every hour of the evening." },
  { icon: Wifi, title: "High-Speed Fiber Wi-Fi", copy: "Fast, reliable and unlimited — perfect for deep focus work." },
  { icon: Laptop, title: "Workspace Outlets", copy: "Power sockets at every seat and quiet alcoves for meetings." },
  { icon: Music4, title: "Acoustic Vinyl Playlists", copy: "Hand-curated jazz & lofi playlists kept right below conversation level." },
];

export function AmbienceSection() {
  return (
    <section className="bg-[#161311] py-20 text-[#F5EFE6] md:py-28 border-t border-[#D9A15B]/10">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-xl text-center space-y-2">
          <p className="eyebrow text-[#D9A15B]">Ambience</p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-[#F5EFE6] md:text-5xl">
            The Room Around the Cup
          </h2>
          <p className="text-sm text-[#A89F91]">
            Thoughtfully designed for quiet focus, slow afternoons, and warm conversations
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="surface-card group p-7 bg-[#1C1815] border border-[#D9A15B]/15 rounded-3xl transition-all duration-300 hover:border-[#D9A15B]/40 hover:-translate-y-2 hover:shadow-2xl"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-[#12100E] border border-[#D9A15B]/20 text-[#D9A15B] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#D9A15B] group-hover:text-[#12100E]">
                <feature.icon className="size-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-[#F5EFE6] group-hover:text-[#D9A15B] transition-colors">
                {feature.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#A89F91]">{feature.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

