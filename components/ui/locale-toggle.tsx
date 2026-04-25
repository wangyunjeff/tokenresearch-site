import type { SiteLocale } from "@/content/site"

type LocaleToggleProps = {
  locale: SiteLocale
  onChange: (locale: SiteLocale) => void
}

export function LocaleToggle({ locale, onChange }: LocaleToggleProps) {
  return (
    <div className="inline-flex rounded-full border border-black/10 bg-white/70 p-1 shadow-sm backdrop-blur">
      <button
        type="button"
        onClick={() => onChange("zh")}
        aria-pressed={locale === "zh"}
        className={`rounded-full px-3 py-1 text-sm transition ${
          locale === "zh" ? "bg-black text-white" : "text-black/60 hover:text-black"
        }`}
      >
        中文
      </button>
      <button
        type="button"
        onClick={() => onChange("en")}
        aria-pressed={locale === "en"}
        className={`rounded-full px-3 py-1 text-sm transition ${
          locale === "en" ? "bg-black text-white" : "text-black/60 hover:text-black"
        }`}
      >
        EN
      </button>
    </div>
  )
}
