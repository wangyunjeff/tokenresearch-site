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
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet"

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
  menuLabel?: string
  className?: string
}

export default function Navbar({
  name = "TokenResearch",
  logo = <BrandLogo name={name} logoAlt={`${name} logo`} size={30} priority />,
  homeUrl = "#top",
  links = [
    { text: "Mission", href: "#mission" },
    { text: "Perspectives", href: "#capabilities" },
    { text: "Publications", href: "#skills" },
    { text: "Skills", href: "#skills" },
  ],
  dashboardLabel = "Dashboard",
  menuLabel = "Toggle navigation menu",
  className,
}: NavbarProps) {
  return (
    <header className={cn("sticky top-0 z-50 -mb-4 px-4 pb-4", className)}>
      <div className="absolute left-0 h-24 w-full bg-background/55 fade-bottom backdrop-blur-xl" />
      <div className="relative mx-auto max-w-container">
        <NavbarComponent className="rounded-full border border-white/10 bg-background/55 px-5 shadow-xl shadow-black/10 backdrop-blur-xl">
          <NavbarLeft className="gap-3">
            <a
              href={homeUrl}
              className="flex items-center text-xl font-bold"
            >
              {logo}
            </a>
          </NavbarLeft>

          <NavbarCenter className="hidden gap-6 lg:flex">
            {links.map((link) => (
              <a
                key={link.text}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
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
              <a href="#product-ui">
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
                      <a href="#product-ui">
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
