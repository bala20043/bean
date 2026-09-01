import { Armchair, Laptop, Lightbulb, Music4, Wifi } from "lucide-react";

const features = [
  { icon: Armchair, title: "Cozy Seating", copy: "Deep banquettes and window nooks made for lingering." },
  { icon: Lightbulb, title: "Warm Lighting", copy: "Low amber pendants that soften every hour of the day." },
  { icon: Wifi, title: "Free High-Speed Wi-Fi", copy: "Fast, reliable and free — no code, no time limit." },
  { icon: Laptop, title: "Workspace Friendly", copy: "Power outlets at every table and quiet corners for deep work." },
  { icon: Music4, title: "Relaxing Acoustic Playlists", copy: "Hand-picked playlists kept just below conversation level." },
];

export function AmbienceSection() {
  return (
    <section className="bg-sand py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow">Ambience</p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            The Room Around the Cup
          </h2>
          <p className="mt-3 text-sm text-ink/70">
            Thoughtfully designed for comfort, productivity, and genuine conversations
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="surface-card group p-7 transition-all duration-300 hover:-translate-y-2 hover:border-lagoon/40 hover:shadow-lift"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-lagoon/10 text-lagoon transition-all duration-300 group-hover:scale-110 group-hover:bg-lagoon group-hover:text-foam">
                <feature.icon className="size-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-ink group-hover:text-lagoon transition-colors">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{feature.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
