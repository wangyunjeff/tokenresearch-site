import { describe, expect, it } from "vitest"

import { getSiteContent, locales } from "@/lib/site-content"

describe("site content", () => {
  it("exposes zh and en locales", () => {
    expect(locales).toEqual(["zh", "en"])
  })

  it("returns hero copy for zh", () => {
    const content = getSiteContent("zh")

    expect(content.hero.title.length).toBeGreaterThan(0)
    expect(content.services.items).toHaveLength(2)
  })

  it("falls back to zh for unsupported locales", () => {
    const content = getSiteContent("fr")

    expect(content.locale).toBe("zh")
  })
})
