import {
  BookOpen,
  BrainCircuit,
  FileText,
  FlaskConical,
  Search,
} from "lucide-react"
import { ReactNode } from "react"

import { Badge } from "../../ui/badge"
import { Section } from "../../ui/section"

interface WorkflowStep {
  title: string
  description: string
  icon: ReactNode
}

interface LogosProps {
  title?: string
  badge?: ReactNode | false
  steps?: WorkflowStep[] | false
  className?: string
}

export default function Logos({
  title = "A research loop instead of disconnected tools",
  badge = (
    <Badge variant="outline" className="border-brand/30 bg-brand/10 text-brand">
      5-stage workflow
    </Badge>
  ),
  steps = [
    {
      title: "Literature",
      description: "Map prior work and recover the relevant papers faster.",
      icon: <BookOpen className="size-5" />,
    },
    {
      title: "Ideation",
      description:
        "Turn questions into hypotheses, plans, and candidate directions.",
      icon: <BrainCircuit className="size-5" />,
    },
    {
      title: "Experiment",
      description: "Run structured workflows and reusable research skills.",
      icon: <FlaskConical className="size-5" />,
    },
    {
      title: "Analysis",
      description: "Extract evidence, compare results, and trace reasoning.",
      icon: <Search className="size-5" />,
    },
    {
      title: "Writing",
      description: "Draft reports, paper sections, and reproducible handoffs.",
      icon: <FileText className="size-5" />,
    },
  ],
  className,
}: LogosProps) {
  return (
    <Section className={className}>
      <div className="mx-auto flex max-w-container flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-6">
          {badge !== false && badge}
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold sm:text-4xl">
            {title}
          </h2>
        </div>
        {steps !== false && steps.length > 0 && (
          <div className="grid w-full gap-4 md:grid-cols-5">
            {steps.map((step) => (
              <article
                key={step.title}
                className="rounded-[1.75rem] border border-border/60 bg-card/65 p-5 text-left backdrop-blur"
              >
                <div className="text-brand">{step.icon}</div>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}
