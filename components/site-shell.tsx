"use client"

import { ReactNode } from "react"

import Footer from "@/components/sections/footer/default"
import Navbar from "@/components/sections/navbar/default"
import { useLanguage } from "@/components/language-provider"
import { getNavLinks, getPageCopy } from "@/lib/site-pages"

interface SiteShellProps {
  children: ReactNode
}

export default function SiteShell({ children }: SiteShellProps) {
  const { language } = useLanguage()
  const copy = getPageCopy(language)

  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <Navbar
        name={language === "zh" ? "词元智研" : "TokenResearch"}
        homeUrl="/"
        links={getNavLinks(language)}
        dashboardLabel={copy.common.dashboard}
        dashboardHref="/gateway"
        menuLabel={copy.common.menuLabel}
      />
      {children}
      <Footer
        name={language === "zh" ? "词元智研" : "TokenResearch"}
        description={copy.common.footerDescription}
        columns={copy.common.footerColumns}
        copyright={copy.common.copyright}
        policies={copy.common.policies}
      />
    </main>
  )
}
