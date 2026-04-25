import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { LocaleToggle } from "@/components/ui/locale-toggle"

describe("LocaleToggle", () => {
  it("calls onChange with the next locale", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<LocaleToggle locale="zh" onChange={onChange} />)

    await user.click(screen.getByRole("button", { name: "EN" }))

    expect(onChange).toHaveBeenCalledWith("en")
  })
})
