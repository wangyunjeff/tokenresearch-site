import type { SiteContent } from "@/content/site"
import { Section } from "@/components/ui/section"

type FounderNoteProps = {
  content: SiteContent
}

export default function FounderNote({ content }: FounderNoteProps) {
  return (
    <Section>
      <div className="rounded-[30px] border border-black/8 bg-gradient-to-br from-[#111111] to-[#1f2937] p-8 text-white shadow-[var(--shadow)] md:p-10">
        <div className="max-w-4xl space-y-4">
          <div className="text-sm font-medium text-[#93c5fd]">{content.founder.eyebrow}</div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{content.founder.title}</h2>
          {content.founder.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-base leading-8 text-white/78 md:text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Section>
  )
}
