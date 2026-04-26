import Image from "next/image"
import { type VariantProps } from "class-variance-authority"
import { ArrowRightIcon } from "lucide-react"
import { ReactNode } from "react"

import { cn } from "@/lib/utils"

import { Badge } from "../../ui/badge"
import { Button, buttonVariants } from "../../ui/button"
import Glow from "../../ui/glow"
import { Mockup, MockupFrame } from "../../ui/mockup"
import { Section } from "../../ui/section"

interface HeroButtonProps {
  href: string
  text: string
  variant?: VariantProps<typeof buttonVariants>["variant"]
  icon?: ReactNode
  iconRight?: ReactNode
}

interface HeroProps {
  badgeStatus?: string
  badgeText?: string
  eyebrow?: ReactNode | false
  title?: ReactNode | false
  titlePrefix?: string
  researchFields?: readonly string[]
  researchFieldsLabel?: string
  description?: string
  mockupAlt?: string
  mockup?: ReactNode | false
  badge?: ReactNode | false
  buttons?: readonly HeroButtonProps[] | false
  highlights?: readonly string[] | false
  className?: string
}

const researchFields = [
  "Machine Learning",
  "Data Science",
  "Computer Science",
  "Artificial Intelligence",
  "Neural Language Processing",
  "Computer Vision",
  "Machine Learning",
]

const researchFieldRollStyles = `
@keyframes tokenresearch-research-field-roll {
  0%,
  10% {
    transform: translateY(0);
  }
  14%,
  24% {
    transform: translateY(-1.08em);
  }
  28%,
  38% {
    transform: translateY(-2.16em);
  }
  42%,
  52% {
    transform: translateY(-3.24em);
  }
  56%,
  66% {
    transform: translateY(-4.32em);
  }
  70%,
  80% {
    transform: translateY(-5.4em);
  }
  84%,
  100% {
    transform: translateY(-6.48em);
  }
}

@media (prefers-reduced-motion: reduce) {
  [data-tokenresearch-rolling-track="true"] {
    animation: none !important;
    transform: translateY(0) !important;
  }
}
`

function RollingResearchField({
  fields,
  label,
}: {
  fields: readonly string[]
  label: string
}) {
  return (
    <span
      className="block h-[1.08em] overflow-hidden text-[0.9em] leading-[1.08]"
      aria-label={label}
    >
      <span
        data-tokenresearch-rolling-track="true"
        className="flex flex-col will-change-transform"
        aria-hidden="true"
        style={{
          animation:
            "tokenresearch-research-field-roll 18s cubic-bezier(0.76, 0, 0.24, 1) infinite",
        }}
      >
        {fields.map((field, index) => (
          <span
            key={`${field}-${index}`}
            className="block h-[1.08em] whitespace-nowrap bg-linear-to-r from-brand via-brand to-cyan-400 bg-clip-text leading-[1.08] text-transparent"
          >
            {field}
          </span>
        ))}
      </span>
    </span>
  )
}

export default function Hero({
  badgeStatus = "New",
  badgeText = "Introducing the New TokenResearch",
  eyebrow = "AI for Science, From Idea to Publication",
  title,
  titlePrefix = "Vibe Research for",
  researchFields: rollingFields = researchFields,
  researchFieldsLabel = "Machine Learning, Data Science, Computer Science, Artificial Intelligence, Neural Language Processing, and Computer Vision",
  description = "An AI-Native Vibe Research platform — you stay in control of the science while agents handle the heavy lifting.",
  mockupAlt = "TokenResearch workspace interface",
  mockup = (
    <>
      <Image
        src="/soft-light.png"
        alt={mockupAlt}
        width={1672}
        height={941}
        className="w-full dark:hidden"
        priority
      />
      <Image
        src="/workspace.png"
        alt={mockupAlt}
        width={1672}
        height={941}
        className="hidden w-full dark:block"
        priority
      />
    </>
  ),
  badge,
  buttons = [
    {
      href: "#product-ui",
      text: "Get Started",
      variant: "default",
      iconRight: <ArrowRightIcon className="size-4" />,
    },
    {
      href: "#mission",
      text: "Our Mission",
      variant: "outline",
    },
  ],
  highlights = [
    "Search literature",
    "Brainstorm",
    "Plan experiments",
    "Run GPU jobs",
    "Analyze results",
    "Draft publications",
  ],
  className,
}: HeroProps) {
  const renderedTitle =
    title !== undefined ? (
      title
    ) : (
      <>
        {titlePrefix}
        <br />
        <RollingResearchField
          fields={rollingFields}
          label={researchFieldsLabel}
        />
      </>
    )
  const renderedBadge =
    badge !== undefined ? (
      badge
    ) : (
      <Badge
        variant="outline"
        className="animate-appear border-brand/30 bg-brand/10 text-brand"
      >
        <span className="inline-flex size-2 rounded-full bg-emerald-400" />
        <span>{badgeStatus}</span>
        <span className="h-4 w-px bg-brand-foreground/40" />
        <span>{badgeText}</span>
        <ArrowRightIcon className="size-3.5" />
      </Badge>
    )

  return (
    <Section
      id="top"
      className={cn(
        "overflow-hidden fade-bottom pb-0 sm:pb-0 md:pb-0",
        className
      )}
    >
      <div className="mx-auto flex max-w-container flex-col gap-12 pt-16 sm:gap-24">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-10">
          <style>{researchFieldRollStyles}</style>
          {renderedBadge !== false && renderedBadge}
          {eyebrow !== false && (
            <p className="relative z-10 animate-appear font-[family-name:var(--font-display)] text-xl font-medium text-muted-foreground italic opacity-0 delay-75 sm:text-2xl md:text-3xl">
              {eyebrow}
            </p>
          )}
          <h1 className="relative z-10 inline-block max-w-[1120px] animate-appear font-[family-name:var(--font-display)] text-4xl leading-tight font-semibold text-balance text-foreground drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-7xl md:leading-tight xl:text-8xl xl:leading-tight">
            {renderedTitle}
          </h1>
          <p className="text-md relative z-10 max-w-[860px] animate-appear font-medium text-balance text-muted-foreground opacity-0 delay-100 sm:text-xl sm:leading-9">
            {description}
          </p>
          {buttons !== false && buttons.length > 0 && (
            <div className="relative z-10 flex animate-appear flex-wrap justify-center gap-4 opacity-0 delay-300">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  variant={button.variant || "default"}
                  size="lg"
                  asChild
                >
                  <a href={button.href}>
                    {button.icon}
                    {button.text}
                    {button.iconRight}
                  </a>
                </Button>
              ))}
            </div>
          )}
          {highlights !== false && highlights.length > 0 && (
            <div className="relative z-10 flex animate-appear flex-wrap justify-center gap-3 opacity-0 delay-500">
              {highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}
          {mockup !== false && (
            <div id="product-ui" className="relative w-full pt-8 sm:pt-12">
              <MockupFrame
                className="animate-appear opacity-0 delay-700"
                size="small"
              >
                <Mockup
                  type="responsive"
                  className="w-full rounded-xl border-0 bg-background/90"
                >
                  {mockup}
                </Mockup>
              </MockupFrame>
              <Glow
                variant="top"
                className="animate-appear-zoom opacity-0 delay-1000"
              />
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
