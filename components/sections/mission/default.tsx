import type { SiteContent } from "@/content/site"
import { Section } from "@/components/ui/section"

type MissionProps = {
  content: SiteContent
}

export default function Mission({ content }: MissionProps) {
  return (
    <Section id="mission">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[28px] border border-black/8 bg-[#111111] p-8 text-white shadow-[var(--shadow)]">
          <div className="text-sm font-medium text-[#93c5fd]">{content.mission.eyebrow}</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            {content.mission.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/74">{content.mission.summary}</p>
          <p className="mt-8 border-t border-white/10 pt-6 text-base leading-8 text-white/88">
            {content.mission.statement}
          </p>
        </div>
        <div className="rounded-[28px] border border-black/8 bg-white/84 p-8">
          <div className="text-sm font-medium text-black/42">Execution friction often looks like this</div>
          <ul className="mt-5 space-y-4">
            {content.mission.painPoints.map((point) => (
              <li
                key={point}
                className="rounded-[20px] border border-black/8 bg-[#f8fafc] px-5 py-4 text-base leading-7 text-black/76"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
