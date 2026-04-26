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
  title?: string
  description?: string
  mockup?: ReactNode | false
  badge?: ReactNode | false
  buttons?: HeroButtonProps[] | false
  highlights?: string[] | false
  className?: string
}

export default function Hero({
  title = "TokenResearch turns scientific ambition into AI-native research workflows",
  description = "A research workspace for literature review, skill-driven experimentation, evidence synthesis, and reproducible reporting. Built around the idea of an AI co-scientist that augments how researchers think and work.",
  mockup = (
    <Image
      src="/workspace.png"
      alt="TokenResearch workspace interface"
      width={1680}
      height={945}
      className="w-full"
      priority
    />
  ),
  badge = (
    <Badge
      variant="outline"
      className="animate-appear border-brand/30 bg-brand/10 text-brand"
    >
      <span>Democratizing scientific discovery</span>
    </Badge>
  ),
  buttons = [
    {
      href: "#mission",
      text: "Explore the mission",
      variant: "default",
      iconRight: <ArrowRightIcon className="size-4" />,
    },
    {
      href: "#skills",
      text: "Browse academic skills",
      variant: "glow",
    },
  ],
  highlights = [
    "Literature review",
    "Research agent",
    "Reusable SOP skills",
    "Deep research reports",
  ],
  className,
}: HeroProps) {
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
          {badge !== false && badge}
          <h1 className="relative z-10 inline-block max-w-[1080px] animate-appear bg-linear-to-r from-foreground via-foreground to-brand bg-clip-text font-[family-name:var(--font-display)] text-4xl leading-tight font-semibold text-balance text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight">
            {title}
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
