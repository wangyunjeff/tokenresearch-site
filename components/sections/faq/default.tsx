import { ReactNode } from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion"
import { Badge } from "../../ui/badge"
import { Section } from "../../ui/section"

interface FAQItemProps {
  question: string
  answer: ReactNode
  value?: string
}

interface FAQProps {
  badgeLabel?: string
  title?: string
  items?: readonly FAQItemProps[] | false
  className?: string
}

export default function FAQ({
  badgeLabel = "FAQ",
  title = "Questions that matter for the launch page",
  items = [
    {
      question: "What does 'AI co-scientist' mean for TokenResearch?",
      answer: (
        <>
          <p className="mb-4 max-w-[640px] text-balance text-muted-foreground">
            It means the system is designed to strengthen scientific reasoning,
            not replace it. The product should help researchers search, compare,
            structure, and write with more rigor.
          </p>
          <p className="mb-4 max-w-[640px] text-balance text-muted-foreground">
            That is why the page language centers augmentation, evidence, and
            reusable skills rather than generic &quot;AI automation&quot;
            marketing.
          </p>
        </>
      ),
    },
    {
      question: "Why emphasize reusable skills instead of a simple chat box?",
      answer: (
        <>
          <p className="mb-4 max-w-[600px] text-muted-foreground">
            Because research quality depends on process. A named skill captures
            a repeatable workflow, the right prompts, domain context, and the
            structure needed for consistent execution.
          </p>
          <p className="mb-4 max-w-[600px] text-muted-foreground">
            The launch page therefore treats the skill library as a core product
            asset, not a secondary feature.
          </p>
        </>
      ),
    },
    {
      question: "Which content areas are intentionally placeholders right now?",
      answer: (
        <>
          <p className="mb-4 max-w-[580px] text-muted-foreground">
            Founder portraits, short bios, external profile links, case-study
            visuals, institution logos, and public contact links are all given
            dedicated placeholder space so you can add them later.
          </p>
          <p className="mb-4 max-w-[580px] text-muted-foreground">
            The layout is already structured so those additions will feel native
            instead of tacked on.
          </p>
        </>
      ),
    },
    {
      question:
        "Why keep both the product screenshot and the brand-asset board?",
      answer: (
        <>
          <p className="mb-4 max-w-[580px] text-muted-foreground">
            They tell two different parts of the story. The workspace screenshot
            shows what the software feels like, while the brand board shows
            identity, mascot usage, and launch-system consistency.
          </p>
          <p className="mb-4 max-w-[580px] text-muted-foreground">
            That combination is useful for a homepage until you have polished
            launch media and team photography.
          </p>
        </>
      ),
    },
    {
      question: "Can more sections be added later without another redesign?",
      answer: (
        <p className="mb-4 max-w-[580px] text-muted-foreground">
          Yes. The current page is organized around reusable sections, so you
          can add publications, testimonials, advisors, partner logos, or
          product videos as separate blocks without disturbing the existing
          hierarchy.
        </p>
      ),
    },
  ],
  className,
}: FAQProps) {
  return (
    <Section className={className}>
      <div className="mx-auto flex max-w-container flex-col items-center gap-8">
        <div className="space-y-4 text-center">
          <Badge
            variant="outline"
            className="border-brand/30 bg-brand/10 text-brand"
          >
            {badgeLabel}
          </Badge>
          <h2 className="text-center font-[family-name:var(--font-display)] text-3xl font-semibold sm:text-5xl">
            {title}
          </h2>
        </div>
        {items !== false && items.length > 0 && (
          <Accordion type="single" collapsible className="w-full max-w-[860px]">
            {items.map((item, index) => (
              <AccordionItem
                key={index}
                value={item.value || `item-${index + 1}`}
              >
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </Section>
  )
}
