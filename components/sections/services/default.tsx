import type { SiteContent } from "@/content/site"
import { Section } from "@/components/ui/section"

type ServicesProps = {
  content: SiteContent
}

export default function Services({ content }: ServicesProps) {
  return (
    <Section id="services">
      <div className="space-y-10">
        <div className="max-w-3xl space-y-3">
          <div className="text-sm font-medium text-[#2563EB]">{content.services.eyebrow}</div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{content.services.title}</h2>
          <p className="text-lg leading-8 text-black/64">{content.services.description}</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {content.services.items.map((item) => (
            <article
              key={item.title}
              className="rounded-[28px] border border-black/8 bg-white/86 p-7 shadow-sm"
            >
              <div className="space-y-4">
                <div className="inline-flex rounded-full border border-[#2563EB]/20 bg-[#2563EB]/10 px-3 py-1 text-sm font-medium text-[#2563EB]">
                  {item.idealFor}
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">{item.title}</h3>
                <p className="text-base leading-8 text-black/64">{item.description}</p>
              </div>
              <div className="mt-6 space-y-3">
                {item.deliverables.map((deliverable) => (
                  <div
                    key={deliverable}
                    className="rounded-[18px] border border-black/8 bg-[#f8fafc] px-4 py-3 text-sm leading-6 text-black/74"
                  >
                    {deliverable}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
