"use client"

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

export const languages = ["en", "zh"] as const

export type Language = (typeof languages)[number]

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
}

const LANGUAGE_STORAGE_KEY = "tokenresearch-language"
const DEFAULT_LANGUAGE: Language = "en"

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
)

function isLanguage(value: string | null): value is Language {
  return value === "en" || value === "zh"
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") {
      return DEFAULT_LANGUAGE
    }

    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)

    if (isLanguage(storedLanguage)) {
      return storedLanguage
    }

    return DEFAULT_LANGUAGE
  })

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage)

    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage)
      document.documentElement.lang = nextLanguage === "zh" ? "zh-CN" : "en"
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en"
  }, [language])

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage(language === "en" ? "zh" : "en"),
    }),
    [language, setLanguage]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }

  return context
}
