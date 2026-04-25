import Image from "next/image"

import type { SiteContent, SiteLocale } from "@/content/site"
import { LocaleToggle } from "@/components/ui/locale-toggle"
import { Section } from "@/components/ui/section"

type FooterProps = {
  content: SiteContent
  locale: SiteLocale
  onLocaleChange: (locale: SiteLocale) => void
}

export default function Footer({
  content,
  locale,
  onLocaleChange,
}: FooterProps) {
  return (
    <footer className="border-t border-black/8">
      <Section className="pb-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/tokenresearch-mark.png"
                alt={content.brand.markAlt}
                width={44}
                height={44}
                className="h-11 w-11 rounded-xl border border-black/8 bg-white object-cover"
              />
              <div>
                <div className="text-base font-semibold">{content.brand.name}</div>
                <div className="text-sm text-black/55">{content.brand.domain}</div>
              </div>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-black/56">{content.footer.note}</p>
          </div>
          <div className="space-y-4">
            <LocaleToggle locale={locale} onChange={onLocaleChange} />
            <div className="text-sm text-black/46">{content.footer.legal}</div>
          </div>
        </div>
      </Section>
    </footer>
  )
}
