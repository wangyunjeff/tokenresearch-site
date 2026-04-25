import type { SiteContent } from "@/content/site"
import { Section } from "@/components/ui/section"

type CTAProps = {
  content: SiteContent
}

export default function CTA({ content }: CTAProps) {
  return (
    <Section id="cta">
      <div className="rounded-[30px] border border-[#2563EB]/18 bg-white/88 p-8 shadow-[var(--shadow)] md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-4">
            <div className="text-sm font-medium text-[#2563EB]">Contact</div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{content.cta.title}</h2>
            <p className="max-w-3xl text-lg leading-8 text-black/64">{content.cta.description}</p>
          </div>
          <div className="rounded-[24px] border border-black/8 bg-[#111111] p-6 text-white">
            <div className="text-sm font-medium text-white/56">{content.brand.domain}</div>
            <div className="mt-3 text-2xl font-semibold">{content.brand.tagline}</div>
            <a
              href={content.cta.buttonHref}
              className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
              target="_blank"
              rel="noreferrer"
            >
              {content.cta.buttonText}
            </a>
            <p className="mt-4 text-sm leading-7 text-white/60">{content.cta.note}</p>
          </div>
        </div>
      </div>
    </Section>
  )
}
