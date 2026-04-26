import { type VariantProps } from "class-variance-authority"
import { ReactNode } from "react"

import { cn } from "@/lib/utils"

import { Button, buttonVariants } from "../../ui/button"
import Glow from "../../ui/glow"
import { Section } from "../../ui/section"

interface CTAButtonProps {
  href: string
  text: string
  variant?: VariantProps<typeof buttonVariants>["variant"]
  icon?: ReactNode
  iconRight?: ReactNode
}

interface CTAProps {
  title?: string
  description?: string
  buttons?: readonly CTAButtonProps[] | false
  className?: string
}

export default function CTA({
  title = "Ready to move from curiosity to evidence at thought speed?",
  description = "TokenResearch is designed for researchers who want to ask sharper questions, release agents on the execution layer, and keep the final judgment in human hands.",
  buttons = [
    {
      href: "#product-ui",
      text: "Start researching",
      variant: "default",
    },
    {
      href: "#mission",
      text: "Read the mission",
      variant: "outline",
    },
  ],
  className,
}: CTAProps) {
  return (
    <Section className={cn("group relative overflow-hidden", className)}>
      <div className="relative z-10 mx-auto flex max-w-container flex-col items-center gap-6 text-center sm:gap-8">
        <h2 className="max-w-[760px] font-[family-name:var(--font-display)] text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
          {title}
        </h2>
        <p className="max-w-[760px] text-base leading-8 text-muted-foreground sm:text-lg">
          {description}
        </p>
        {buttons !== false && buttons.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
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
      </div>
      <div className="absolute top-0 left-0 h-full w-full translate-y-[1rem] opacity-80 transition-all duration-500 ease-in-out group-hover:translate-y-[-2rem] group-hover:opacity-100">
        <Glow variant="bottom" />
      </div>
    </Section>
  )
}
