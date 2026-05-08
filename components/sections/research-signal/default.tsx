import { ExternalLink } from "lucide-react"
import { ReactNode } from "react"

import { Badge } from "../../ui/badge"
import { Section } from "../../ui/section"

interface ResearchSignalCard {
  provider: string
  signal: string
  description: string
  sourceHref: string
  icon: ReactNode
}

interface ResearchSignalProps {
  badgeLabel?: string
  title?: string
  description?: string
  sourceLabel?: string
  cards?: readonly ResearchSignalCard[] | false
  className?: string
}

export default function ResearchSignal({
  badgeLabel = "Research signal",
  title = "Token economics are now part of research infrastructure",
  description = "Modern model APIs expose cost, cache, and context controls that matter when agents run long research loops.",
  sourceLabel = "Source",
  cards = [],
  className,
}: ResearchSignalProps) {
  return (
    <Section id="research-signal" className={className}>
      <div className="mx-auto grid max-w-container gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="space-y-5">
          <Badge
            variant="outline"
            className="border-brand/30 bg-brand/10 text-brand"
          >
            {badgeLabel}
          </Badge>
          <div className="space-y-4">
            <h2 className="max-w-[680px] font-[family-name:var(--font-display)] text-3xl leading-tight font-semibold text-balance sm:text-5xl">
              {title}
            </h2>
            <p className="max-w-[720px] text-base leading-8 text-muted-foreground sm:text-lg">
              {description}
            </p>
          </div>
        </div>

        {cards !== false && cards.length > 0 && (
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {cards.map((card) => (
              <article
                key={card.provider}
                className="rounded-[1.75rem] border border-border/60 bg-card/70 p-5 backdrop-blur transition-colors hover:border-brand/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-brand">{card.icon}</div>
                  <span className="text-xs font-semibold text-muted-foreground">
                    {card.provider}
                  </span>
                </div>
                <h3 className="mt-5 text-lg leading-tight font-semibold text-balance">
                  {card.signal}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {card.description}
                </p>
                <a
                  href={card.sourceHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand underline-offset-4 hover:underline"
                >
                  {sourceLabel}
                  <ExternalLink className="size-3.5" />
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}
