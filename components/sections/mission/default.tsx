import { Badge } from "../../ui/badge"
import { Section } from "../../ui/section"

interface Principle {
  title: string
  description: string
  highlights?: readonly string[]
}

interface MissionProps {
  badgeLabel?: string
  title?: string
  description?: string
  operatingBeliefLabel?: string
  operatingBelief?: string
  operatingBeliefTags?: readonly string[]
  principles?: readonly Principle[] | false
  className?: string
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function HighlightedWords({
  highlights = [],
  text,
}: {
  highlights?: readonly string[]
  text: string
}) {
  const activeHighlights = highlights.filter(Boolean)

  if (activeHighlights.length === 0) {
    return text
  }

  const pattern = new RegExp(
    `(${activeHighlights.map(escapeRegExp).join("|")})`,
    "gi"
  )
  const parts = text.split(pattern)

  return (
    <>
      {parts.map((part, index) => {
        const isHighlighted = activeHighlights.some(
          (highlight) => highlight.toLowerCase() === part.toLowerCase()
        )

        if (!isHighlighted) {
          return part
        }

        return (
          <span
            key={`${part}-${index}`}
            className="mx-1 inline-flex rounded-full border border-brand/25 bg-brand/10 px-2 py-0.5 font-semibold text-brand shadow-sm shadow-brand/10"
          >
            {part}
          </span>
        )
      })}
    </>
  )
}

export default function Mission({
  badgeLabel = "Mission and goal",
  title = "Mission: Research at the Speed of Thought",
  description = "TokenResearch is built for the moment when AI compresses the execution layer of science. Our mission is to keep researchers in control of questions, judgment, taste, and obsession while agents handle the costly work between curiosity and evidence.",
  operatingBeliefLabel = "Goal",
  operatingBelief = "When execution becomes nearly free, researchers can finally move at the speed of thought.",
  operatingBeliefTags = ["Low-friction", "Researcher-led", "Thought-speed"],
  principles = [
    {
      title: "Collapse execution friction",
      description:
        "Literature review, experiments, analysis, and writing should become cheap enough that researchers can ask bigger questions without waiting weeks for setup.",
    },
    {
      title: "Move the bottleneck to judgment",
      description:
        "When agents can do more of the work, the human contribution becomes choosing the right problem, reading evidence clearly, and deciding what is worth pursuing.",
    },
    {
      title: "Amplify taste and obsession",
      highlights: ["taste", "obsession"],
      description:
        "The future researcher is not replaced by automation. They become a conductor who defines quality, follows the important thread, and keeps pushing when the first answers are not enough.",
    },
  ],
  className,
}: MissionProps) {
  return (
    <Section id="mission" className={className}>
      <div className="mx-auto max-w-container space-y-8">
        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr] xl:items-end">
          <div className="space-y-6">
            <Badge
              variant="outline"
              className="border-brand/30 bg-brand/10 text-brand"
            >
              {badgeLabel}
            </Badge>
            <div className="space-y-5">
              <h2 className="max-w-[780px] font-[family-name:var(--font-display)] text-3xl leading-tight font-semibold text-balance sm:text-5xl">
                {title}
              </h2>
              <p className="max-w-[760px] text-base leading-8 text-muted-foreground sm:text-lg">
                {description}
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border/60 bg-card/70 p-6 shadow-xl shadow-black/10 backdrop-blur">
            <p className="text-sm font-medium text-brand">
              {operatingBeliefLabel}
            </p>
            <p className="mt-4 font-[family-name:var(--font-display)] text-2xl leading-tight font-semibold text-balance sm:text-3xl">
              {operatingBelief}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {operatingBeliefTags.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-border/60 bg-background/55 px-4 py-3 text-sm font-medium"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {principles !== false && principles.length > 0 && (
          <div className="grid gap-4 md:grid-cols-3">
            {principles.map((principle) => (
              <article
                key={principle.title}
                className="rounded-3xl border border-border/60 bg-card/70 p-6 backdrop-blur"
              >
                <h3 className="text-lg font-semibold">
                  <HighlightedWords
                    text={principle.title}
                    highlights={principle.highlights}
                  />
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}
