import {
  BookOpen,
  Bot,
  FileSearch,
  FileText,
  FlaskConical,
  Layers3,
  Microscope,
  ScrollText,
} from "lucide-react"
import { ReactNode } from "react"

import { Item, ItemDescription, ItemIcon, ItemTitle } from "../../ui/item"
import { Section } from "../../ui/section"

interface ItemProps {
  title: string
  description: string
  icon: ReactNode
}

interface ItemsProps {
  title?: string
  description?: string | false
  items?: ItemProps[] | false
  className?: string
}

export default function Items({
  title = "Core capabilities for the TokenResearch workspace",
  description = "This section replaces the generic template feature list with the product surfaces that matter for TokenResearch. The cards can evolve with the platform, but the structure already fits the current direction.",
  items = [
    {
      title: "Literature review",
      description:
        "Synthesize prior work, map related papers, and keep reading connected to the active question.",
      icon: <BookOpen className="stroke-1.5 size-5" />,
    },
    {
      title: "Research agent",
      description:
        "Turn broad research goals into structured plans, subproblems, and evidence-backed next steps.",
      icon: <Bot className="stroke-1.5 size-5" />,
    },
    {
      title: "AI search",
      description:
        "Find relevant papers, methods, and datasets without losing context between tools and tabs.",
      icon: <FileSearch className="stroke-1.5 size-5" />,
    },
    {
      title: "Extract data",
      description:
        "Convert messy papers, notes, or experiment traces into structured facts that can be compared and reused.",
      icon: <Layers3 className="stroke-1.5 size-5" />,
    },
    {
      title: "SOP skills",
      description:
        "Package recurring research workflows into named skills so the best process becomes easy to repeat.",
      icon: <FlaskConical className="stroke-1.5 size-5" />,
    },
    {
      title: "Deep research",
      description:
        "Run longer investigations that connect sources, compare evidence, and preserve citations.",
      icon: <Microscope className="stroke-1.5 size-5" />,
    },
    {
      title: "Reports",
      description:
        "Transform findings into briefings, research memos, and publication-ready narrative artifacts.",
      icon: <FileText className="stroke-1.5 size-5" />,
    },
    {
      title: "Research handoffs",
      description:
        "Keep decisions, evidence, and procedural knowledge traceable across teammates and future runs.",
      icon: <ScrollText className="stroke-1.5 size-5" />,
    },
  ],
  className,
}: ItemsProps) {
  return (
    <Section id="capabilities" className={className}>
      <div className="mx-auto flex max-w-container flex-col items-center gap-6 sm:gap-20">
        <div className="flex max-w-[880px] flex-col items-center gap-5 text-center">
          <h2 className="max-w-[700px] text-center font-[family-name:var(--font-display)] text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
            {title}
          </h2>
          {description && (
            <p className="text-base leading-8 text-muted-foreground sm:text-lg">
              {description}
            </p>
          )}
        </div>
        {items !== false && items.length > 0 && (
          <div className="grid auto-rows-fr grid-cols-2 gap-0 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {items.map((item, index) => (
              <Item
                key={index}
                className="rounded-[1.75rem] border border-border/60 bg-card/70 p-5 backdrop-blur"
              >
                <ItemTitle className="flex items-center gap-2">
                  <ItemIcon>{item.icon}</ItemIcon>
                  {item.title}
                </ItemTitle>
                <ItemDescription>{item.description}</ItemDescription>
              </Item>
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}
