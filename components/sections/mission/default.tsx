import Image from "next/image"

import { Badge } from "../../ui/badge"
import { Section } from "../../ui/section"

interface Principle {
  title: string
  description: string
}

interface MissionProps {
  title?: string
  description?: string
  principles?: Principle[] | false
  className?: string
}

export default function Mission({
  title = "Mission: Democratizing Scientific Discovery",
  description = "TokenResearch is being shaped around the idea that AI should augment scientific thinking, not flatten it. We want smaller teams, independent researchers, and ambitious domain experts to access the same rigorous research workflows that were once available only to large labs.",
  principles = [
    {
      title: "AI co-scientist, not autopilot",
      description:
        "The product should help researchers reason, compare evidence, and make better decisions instead of replacing scientific judgment.",
    },
    {
      title: "Augmentation before automation",
      description:
        "Literature review, ideation, experimentation, analysis, and writing should feel faster and deeper without becoming opaque black-box output.",
    },
    {
      title: "Discovery for more people",
      description:
        "The long-term goal is to lower the barrier to high-quality research so that more citizen scientists and small teams can contribute meaningful work.",
    },
  ],
  className,
}: MissionProps) {
  return (
    <Section id="mission" className={className}>
      <div className="mx-auto grid max-w-container gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-6">
          <Badge
            variant="outline"
            className="border-brand/30 bg-brand/10 text-brand"
          >
            Mission-aligned narrative
          </Badge>
          <div className="space-y-5">
            <h2 className="max-w-[720px] font-[family-name:var(--font-display)] text-3xl leading-tight font-semibold text-balance sm:text-5xl">
              {title}
            </h2>
            <p className="max-w-[720px] text-base leading-8 text-muted-foreground sm:text-lg">
              {description}
            </p>
            <p className="max-w-[720px] text-base leading-8 text-muted-foreground sm:text-lg">
              The page copy here intentionally mirrors the Orchestra mission in
              spirit: scientific progress should become more accessible through
              better tools, stronger interfaces, and reusable research systems.
            </p>
          </div>

          {principles !== false && principles.length > 0 && (
            <div className="grid gap-4 md:grid-cols-3">
              {principles.map((principle) => (
                <article
                  key={principle.title}
                  className="rounded-3xl border border-border/60 bg-card/70 p-5 backdrop-blur"
                >
                  <h3 className="text-base font-semibold">{principle.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {principle.description}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-[2rem] border border-border/60 bg-card/75 p-4 shadow-2xl shadow-black/20 backdrop-blur">
          <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
            <Image
              src="/app.png"
              alt="TokenResearch brand applications and mascot studies"
              width={1399}
              height={1080}
              className="h-auto w-full"
            />
          </div>
          <div className="mt-4 rounded-[1.25rem] border border-dashed border-brand/30 bg-background/60 p-4">
            <p className="text-sm font-medium">Brand and launch-asset block</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              This slot uses the current TokenResearch visual system. It can be
              swapped later for a final hero illustration, mascot render, or
              launch campaign image without changing the layout.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
