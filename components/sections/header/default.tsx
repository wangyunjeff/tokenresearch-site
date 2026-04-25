import Image from "next/image"

import type { SiteContent, SiteLocale } from "@/content/site"
import { LocaleToggle } from "@/components/ui/locale-toggle"

type HeaderProps = {
  content: SiteContent
  locale: SiteLocale
  onLocaleChange: (locale: SiteLocale) => void
}

export default function Header({
  content,
  locale,
  onLocaleChange,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-black/6 bg-white/78 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 md:px-8">
        <a href="#hero" className="flex items-center gap-3">
          <Image
            src="/tokenresearch-mark.png"
            alt={content.brand.markAlt}
            width={36}
            height={36}
            className="h-9 w-9 rounded-xl border border-black/8 bg-white object-cover"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight">{content.brand.name}</span>
            <span className="text-xs text-black/55">{content.brand.tagline}</span>
          </div>
        </a>

        <nav className="hidden items-center gap-6 text-sm text-black/65 lg:flex">
          {content.nav.links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-black">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleToggle locale={locale} onChange={onLocaleChange} />
          <a
            href="#cta"
            className="hidden rounded-full bg-[#2563EB] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#1d4ed8] md:inline-flex"
          >
            {content.nav.consultLabel}
          </a>
        </div>
      </div>
    </header>
  )
}
