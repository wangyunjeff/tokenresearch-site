"use client"

import { useCallback, useEffect, useSyncExternalStore } from "react"

import CapabilityAssets from "@/components/sections/capability-assets/default"
import CTA from "@/components/sections/cta/default"
import Footer from "@/components/sections/footer/default"
import FounderNote from "@/components/sections/founder-note/default"
import Header from "@/components/sections/header/default"
import Hero from "@/components/sections/hero/default"
import HowWeWork from "@/components/sections/how-we-work/default"
import Mission from "@/components/sections/mission/default"
import Services from "@/components/sections/services/default"
import WhoItIsFor from "@/components/sections/who-it-is-for/default"
import type { SiteLocale } from "@/content/site"
import { getSiteContent, isSiteLocale } from "@/lib/site-content"

const STORAGE_KEY = "tokenresearch-locale"
const LOCALE_EVENT = "tokenresearch-locale-change"

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined
  }

  window.addEventListener("storage", onStoreChange)
  window.addEventListener(LOCALE_EVENT, onStoreChange)

  return () => {
    window.removeEventListener("storage", onStoreChange)
    window.removeEventListener(LOCALE_EVENT, onStoreChange)
  }
}

function getLocaleSnapshot(): SiteLocale {
  if (typeof window === "undefined") {
    return "zh"
  }

  const storedLocale = window.localStorage.getItem(STORAGE_KEY)

  return isSiteLocale(storedLocale) ? storedLocale : "zh"
}

function getServerLocaleSnapshot(): SiteLocale {
  return "zh"
}

export default function Page() {
  const locale = useSyncExternalStore<SiteLocale>(
    subscribe,
    getLocaleSnapshot,
    getServerLocaleSnapshot,
  )

  const setLocale = useCallback((nextLocale: SiteLocale) => {
    window.localStorage.setItem(STORAGE_KEY, nextLocale)
    window.dispatchEvent(new Event(LOCALE_EVENT))
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const content = getSiteContent(locale)

  return (
    <main className="min-h-screen">
      <Header content={content} locale={locale} onLocaleChange={setLocale} />
      <Hero content={content} />
      <WhoItIsFor content={content} />
      <Mission content={content} />
      <Services content={content} />
      <HowWeWork content={content} />
      <CapabilityAssets content={content} />
      <FounderNote content={content} />
      <CTA content={content} />
      <Footer content={content} locale={locale} onLocaleChange={setLocale} />
    </main>
  )
}
