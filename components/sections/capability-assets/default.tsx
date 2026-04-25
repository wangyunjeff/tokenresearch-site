import type { SiteContent } from "@/content/site"
import { Section } from "@/components/ui/section"

type CapabilityAssetsProps = {
  content: SiteContent
}

export default function CapabilityAssets({ content }: CapabilityAssetsProps) {
  return (
    <Section id="capability-assets">
      <div className="space-y-10">
        <div className="max-w-4xl space-y-3">
          <div className="text-sm font-medium text-[#2563EB]">{content.assets.eyebrow}</div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{content.assets.title}</h2>
          <p className="text-lg leading-8 text-black/64">{content.assets.description}</p>
        </div>
        <div className="inline-flex rounded-full border border-black/8 bg-white/84 px-4 py-2 text-sm text-black/56">
          {content.assets.disclaimer}
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {content.assets.items.map((item) => (
            <article
              key={item.title}
              className="rounded-[24px] border border-black/8 bg-white/88 p-6 shadow-sm"
            >
              <div className="inline-flex rounded-full bg-[#eef4ff] px-3 py-1 text-xs font-medium text-[#2563EB]">
                {item.status}
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-4 text-base leading-7 text-black/64">{item.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-black/8 bg-[#f8fafc] px-3 py-1 text-xs text-black/58"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
