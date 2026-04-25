import type { SiteContent } from "@/content/site"
import { Section } from "@/components/ui/section"

type WhoItIsForProps = {
  content: SiteContent
}

export default function WhoItIsFor({ content }: WhoItIsForProps) {
  return (
    <Section>
      <div className="space-y-10">
        <div className="max-w-3xl space-y-3">
          <div className="text-sm font-medium text-[#2563EB]">{content.audience.eyebrow}</div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{content.audience.title}</h2>
          <p className="text-lg leading-8 text-black/65">{content.audience.description}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {content.audience.items.map((item) => (
            <article
              key={item.title}
              className="rounded-[24px] border border-black/8 bg-white/84 p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-4 text-base leading-7 text-black/63">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
