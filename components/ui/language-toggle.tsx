"use client"

import { LanguagesIcon } from "lucide-react"

import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

import { Button } from "./button"

interface LanguageToggleProps {
  className?: string
  showLabel?: boolean
}

export function LanguageToggle({
  className,
  showLabel = true,
}: LanguageToggleProps) {
  const { language, toggleLanguage } = useLanguage()
  const currentLanguageLabel = language === "en" ? "EN" : "中"
  const actionLabel =
    language === "en" ? "Switch language to Chinese" : "切换到英文"

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      aria-label={actionLabel}
      title={actionLabel}
      className={cn("h-8 gap-1.5 px-2 text-xs", className)}
    >
      <LanguagesIcon className="size-3.5" />
      {showLabel && <span>{currentLanguageLabel}</span>}
    </Button>
  )
}
