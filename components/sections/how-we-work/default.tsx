import type { SiteContent } from "@/content/site"
import { Section } from "@/components/ui/section"

type HowWeWorkProps = {
  content: SiteContent
}

export default function HowWeWork({ content }: HowWeWorkProps) {
  return (
    <Section id="how-we-work">
      <div className="space-y-10">
        <div className="max-w-3xl space-y-3">
          <div className="text-sm font-medium text-[#2563EB]">{content.process.eyebrow}</div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{content.process.title}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {content.process.steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-[24px] border border-black/8 bg-white/88 p-6 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                {index + 1}
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-4 text-base leading-7 text-black/64">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
