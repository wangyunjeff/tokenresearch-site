"use client"

import { CheckIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { useLanguage } from "@/components/language-provider"

import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"

const themeOptions = [
  { value: "light", labels: { en: "Light", zh: "日间" }, icon: SunIcon },
  { value: "dark", labels: { en: "Dark", zh: "夜间" }, icon: MoonIcon },
  { value: "system", labels: { en: "System", zh: "系统" }, icon: MonitorIcon },
] as const

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const { language } = useLanguage()

  const currentTheme = theme ?? "system"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          aria-label={language === "zh" ? "切换主题" : "Change theme"}
        >
          <MonitorIcon className="size-4" aria-hidden="true" />
          <span className="sr-only">
            {language === "zh" ? "切换主题" : "Change theme"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        <DropdownMenuRadioGroup value={currentTheme} onValueChange={setTheme}>
          {themeOptions.map(({ value, labels, icon: Icon }) => (
            <DropdownMenuRadioItem key={value} value={value}>
              <Icon className="size-4" aria-hidden="true" />
              <span>{labels[language]}</span>
              {currentTheme === value && (
                <CheckIcon
                  className="ml-auto size-4 text-foreground"
                  aria-hidden="true"
                />
              )}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
