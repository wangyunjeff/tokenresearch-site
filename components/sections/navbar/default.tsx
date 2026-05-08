import { ArrowRight, Menu } from "lucide-react"
import { ReactNode } from "react"

import { cn } from "@/lib/utils"

import BrandLogo from "../../brand-logo"
import { Button } from "../../ui/button"
import { LanguageToggle } from "../../ui/language-toggle"
import { ModeToggle } from "../../ui/mode-toggle"
import {
  Navbar as NavbarComponent,
  NavbarCenter,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../../ui/sheet"

interface NavbarLink {
  text: string
  href: string
}

interface NavbarProps {
  logo?: ReactNode
  name?: string
  homeUrl?: string
  links?: readonly NavbarLink[]
  dashboardLabel?: string
  dashboardHref?: string
  menuLabel?: string
  className?: string
}

export default function Navbar({
  name = "TokenResearch",
  logo = <BrandLogo name={name} logoAlt={`${name} logo`} size={30} priority />,
  homeUrl = "#top",
  links = [
    { text: "Mission", href: "/mission" },
    { text: "Gateway", href: "/gateway" },
    { text: "Skills", href: "/skills" },
    { text: "Perspectives", href: "/perspectives" },
    { text: "AI Signals", href: "/signals" },
  ],
  dashboardLabel = "Dashboard",
  dashboardHref = "/gateway",
  menuLabel = "Toggle navigation menu",
  className,
}: NavbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/60 bg-background/82 px-4 backdrop-blur-xl",
        className
      )}
    >
      <div className="relative mx-auto max-w-container">
        <NavbarComponent className="min-h-18">
          <NavbarLeft className="gap-3">
            <a
              href={homeUrl}
              className="flex items-center text-xl font-bold"
            >
              {logo}
            </a>
          </NavbarLeft>

          <NavbarCenter className="hidden gap-8 lg:flex">
            {links.map((link) => (
              <a
                key={link.text}
                href={link.href}
                className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.text}
              </a>
            ))}
          </NavbarCenter>

          <NavbarRight>
            <div className="hidden items-center gap-1 lg:flex">
              <LanguageToggle />
              <ModeToggle />
            </div>
            <Button size="sm" asChild className="hidden lg:inline-flex">
              <a href={dashboardHref}>
                {dashboardLabel}
                <ArrowRight className="size-4" />
              </a>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 lg:hidden"
                >
                  <Menu className="size-5" />
                  <span className="sr-only">{menuLabel}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetTitle className="sr-only">{menuLabel}</SheetTitle>
                <div className="grid gap-8 pt-6">
                  <a
                    href={homeUrl}
                    className="flex items-center text-xl font-bold"
                  >
                    {logo}
                  </a>
                  <nav className="grid gap-4 text-base font-medium">
                    {links.map((link) => (
                      <a
                        key={link.text}
                        href={link.href}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.text}
                      </a>
                    ))}
                  </nav>
                  <div className="grid gap-3">
                    <div className="flex items-center gap-2">
                      <LanguageToggle />
                      <ModeToggle />
                    </div>
                    <Button asChild>
                      <a href={dashboardHref}>
                        {dashboardLabel}
                        <ArrowRight className="size-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  )
}
