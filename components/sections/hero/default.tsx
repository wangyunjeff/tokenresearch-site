import Image from "next/image"

import type { SiteContent } from "@/content/site"
import { Section } from "@/components/ui/section"

type HeroProps = {
  content: SiteContent
}

export default function Hero({ content }: HeroProps) {
  return (
    <Section id="hero" className="pt-12 md:pt-18">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex rounded-full border border-[#2563EB]/20 bg-[#2563EB]/10 px-3 py-1 text-sm font-medium text-[#2563EB]">
            {content.hero.eyebrow}
          </div>
          <div className="space-y-5">
            <h1 className="max-w-4xl text-4xl leading-tight font-semibold tracking-tight text-balance md:text-6xl">
              {content.hero.title}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-black/68 md:text-xl">
              {content.hero.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={content.hero.primaryHref}
              className="inline-flex rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-black/88"
            >
              {content.hero.primaryCta}
            </a>
            <a
              href={content.hero.secondaryHref}
              className="inline-flex rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-medium text-black transition hover:border-black/20"
            >
              {content.hero.secondaryCta}
            </a>
          </div>

          <div className="flex flex-wrap gap-2">
            {content.hero.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-black/8 bg-white/70 px-3 py-1 text-sm text-black/70"
              >
                {chip}
              </span>
            ))}
          </div>

          <p className="max-w-2xl text-sm leading-7 text-black/52">{content.hero.note}</p>
        </div>

        <div className="rounded-[28px] border border-black/8 bg-white/82 p-5 shadow-[var(--shadow)] backdrop-blur">
          <div className="rounded-[22px] border border-black/8 bg-gradient-to-br from-white to-[#eef4ff] p-6">
            <div className="rounded-[18px] border border-black/8 bg-white p-5">
              <Image
                src="/tokenresearch-lockup.png"
                alt={content.brand.lockupAlt}
                width={640}
                height={200}
                className="h-auto w-full"
                priority
              />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[18px] border border-black/8 bg-white p-4">
                <div className="text-sm font-medium text-black/48">Domain</div>
                <div className="mt-2 text-lg font-semibold">{content.brand.domain}</div>
              </div>
              <div className="rounded-[18px] border border-black/8 bg-[#111111] p-4 text-white">
                <div className="text-sm font-medium text-white/58">Focus</div>
                <div className="mt-2 text-lg font-semibold">{content.hero.chips[0]}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
