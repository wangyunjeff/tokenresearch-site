import { siteContent, type SiteContent, type SiteLocale } from "@/content/site"

export const locales = ["zh", "en"] as const

export function isSiteLocale(locale: string | null): locale is SiteLocale {
  return locale === "zh" || locale === "en"
}

export function getSiteContent(locale: string | null): SiteContent {
  if (isSiteLocale(locale)) {
    return siteContent[locale]
  }

  return siteContent.zh
}
