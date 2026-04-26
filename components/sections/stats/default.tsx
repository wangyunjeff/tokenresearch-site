import { Section } from "../../ui/section"

interface StatItemProps {
  label?: string
  value: string | number
  suffix?: string
  description?: string
}

interface StatsProps {
  items?: readonly StatItemProps[] | false
  className?: string
}

export default function Stats({
  items = [
    {
      label: "mission page signal",
      value: 80,
      suffix: "%",
      description:
        "of a researcher's time can disappear into reading, coding, and bug fixing overhead",
    },
    {
      label: "founders",
      value: 2,
      description: "team profiles structured and waiting for final portraits",
    },
    {
      label: "visible today",
      value: 12,
      description:
        "academic skills already showcased from the existing library",
    },
    {
      label: "research stages",
      value: 5,
      description: "literature, ideation, experiment, analysis, and writing",
    },
  ],
  className,
}: StatsProps) {
  return (
    <Section className={className}>
      <div className="container mx-auto max-w-[960px]">
        {items !== false && items.length > 0 && (
          <div className="grid grid-cols-2 gap-12 sm:grid-cols-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="rounded-[1.75rem] border border-border/60 bg-card/70 p-5 text-left backdrop-blur"
              >
                {item.label && (
                  <div className="text-sm font-semibold text-muted-foreground">
                    {item.label}
                  </div>
                )}
                <div className="flex items-baseline gap-2">
                  <div className="bg-linear-to-r from-foreground to-foreground bg-clip-text text-4xl font-medium text-transparent drop-shadow-[2px_1px_24px_var(--brand-foreground)] transition-all duration-300 sm:text-5xl md:text-6xl dark:to-brand">
                    {item.value}
                  </div>
                  {item.suffix && (
                    <div className="text-2xl font-semibold text-brand">
                      {item.suffix}
                    </div>
                  )}
                </div>
                {item.description && (
                  <div className="text-sm font-semibold text-pretty text-muted-foreground">
                    {item.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}
