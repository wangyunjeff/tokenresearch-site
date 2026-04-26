import { ReactNode } from "react"

import { cn } from "@/lib/utils"

import BrandLogo from "../../brand-logo"
import { LanguageToggle } from "../../ui/language-toggle"
import {
  Footer,
  FooterBottom,
  FooterColumn,
  FooterContent,
} from "../../ui/footer"
import { ModeToggle } from "../../ui/mode-toggle"

interface FooterLink {
  text: string
  href: string
}

interface FooterColumnProps {
  title: string
  links: readonly FooterLink[]
}

interface FooterProps {
  logo?: ReactNode
  name?: string
  description?: string
  columns?: readonly FooterColumnProps[]
  copyright?: string
  policies?: readonly FooterLink[]
  showModeToggle?: boolean
  showLanguageToggle?: boolean
  className?: string
}

export default function FooterSection({
  name = "TokenResearch",
  logo = <BrandLogo name={name} logoAlt={`${name} logo`} size={30} />,
  description = "AI-native research workspace for deeper reading, sharper experiments, and better scientific handoffs.",
  columns = [
    {
      title: "Narrative",
      links: [
        { text: "Mission", href: "#mission" },
        { text: "Capabilities", href: "#capabilities" },
        { text: "FAQ", href: "#footer" },
      ],
    },
    {
      title: "Product",
      links: [
        { text: "Workspace screenshot", href: "#product-ui" },
        { text: "Academic skills", href: "#skills" },
        { text: "Research workflow", href: "#capabilities" },
      ],
    },
    {
      title: "Placeholders",
      links: [
        { text: "Founder photos", href: "#team" },
        { text: "Contact email", href: "#footer" },
        { text: "GitHub or waitlist link", href: "#footer" },
      ],
    },
  ],
  copyright = "© 2026 TokenResearch. Launch page draft prepared for content fill-in.",
  policies = [
    { text: "Email placeholder", href: "#footer" },
    { text: "LinkedIn placeholder", href: "#footer" },
  ],
  showModeToggle = true,
  showLanguageToggle = true,
  className,
}: FooterProps) {
  return (
    <footer id="footer" className={cn("w-full bg-background px-4", className)}>
      <div className="mx-auto max-w-container">
        <Footer>
          <FooterContent>
            <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
              <div className="flex items-center gap-3">
                {logo}
                <div>
                  <p className="mt-2 max-w-[240px] text-sm leading-7 text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            </FooterColumn>
            {columns.map((column, index) => (
              <FooterColumn key={index}>
                <h3 className="text-md pt-1 font-semibold">{column.title}</h3>
                {column.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.href}
                    className="text-sm text-muted-foreground"
                  >
                    {link.text}
                  </a>
                ))}
              </FooterColumn>
            ))}
          </FooterContent>
          <FooterBottom>
            <div>{copyright}</div>
            <div className="flex items-center gap-4">
              {policies.map((policy, index) => (
                <a key={index} href={policy.href}>
                  {policy.text}
                </a>
              ))}
              {showLanguageToggle && <LanguageToggle />}
              {showModeToggle && <ModeToggle />}
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  )
}
