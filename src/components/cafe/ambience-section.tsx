import { Armchair, Laptop, Lightbulb, Music4, Wifi } from "lucide-react";

const features = [
  { icon: Armchair, title: "Cozy seating", copy: "Deep banquettes and window nooks made for lingering." },
  { icon: Lightbulb, title: "Warm lighting", copy: "Low amber pendants that soften every hour of the day." },
  { icon: Wifi, title: "Free Wi-Fi", copy: "Fast, reliable and free — no code, no time limit." },
  { icon: Laptop, title: "Workspace friendly", copy: "Power at every table and quiet corners for deep work." },
  { icon: Music4, title: "Relaxing music", copy: "Hand-picked playlists kept just below conversation level." },
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
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="surface-card p-6">
              <span className="grid size-11 place-items-center rounded-2xl bg-lagoon/10 text-lagoon">
                <feature.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-ink">{feature.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{feature.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
