import { Menu } from "lucide-react"
import { ReactNode } from "react"

import { cn } from "@/lib/utils"

import TokenResearch from "../../logos/tokenresearch"
import { Button } from "../../ui/button"
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
  links?: NavbarLink[]
  className?: string
}

export default function Navbar({
  logo = <TokenResearch className="size-7 text-brand" />,
  name = "TokenResearch",
  homeUrl = "#top",
  links = [
    { text: "Mission", href: "#mission" },
    { text: "Capabilities", href: "#capabilities" },
    { text: "Skills", href: "#skills" },
    { text: "Team", href: "#team" },
  ],
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
              className="flex items-center gap-3 text-xl font-bold"
            >
              {logo}
              <span>{name}</span>
            </a>
          </NavbarLeft>

          <NavbarCenter className="hidden gap-6 md:flex">
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
            <Button
              variant="outline"
              size="sm"
              asChild
              className="hidden md:inline-flex"
            >
              <a href="#skills">Browse Skills</a>
            </Button>
            <Button size="sm" asChild className="hidden md:inline-flex">
              <a href="#mission">Read the Mission</a>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="size-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="grid gap-8 pt-6">
                  <a
                    href={homeUrl}
                    className="flex items-center gap-3 text-xl font-bold"
                  >
                    {logo}
                    <span>{name}</span>
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
                    <Button variant="outline" asChild>
                      <a href="#skills">Browse Skills</a>
                    </Button>
                    <Button asChild>
                      <a href="#mission">Read the Mission</a>
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
