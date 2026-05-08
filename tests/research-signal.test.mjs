import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import { test } from "node:test"

const root = new URL("../", import.meta.url)

function readWorkspaceFile(path) {
  return readFileSync(new URL(path, root), "utf8")
}

test("research signal section is present and wired before stats", () => {
  assert.equal(
    existsSync(
      new URL("components/sections/research-signal/default.tsx", root)
    ),
    true
  )

  const page = readWorkspaceFile("components/home-page.tsx")

  assert.match(
    page,
    /import ResearchSignal from "@\/components\/sections\/research-signal\/default"/
  )
  assert.ok(page.indexOf("<ResearchSignal") > -1)
  assert.ok(page.indexOf("<ResearchSignal") < page.indexOf("<Stats"))
})

test("site copy has bilingual research signal data with provider cards", () => {
  const copy = readWorkspaceFile("lib/site-copy.ts")
  const sections = copy.match(/researchSignal:\s*\{[\s\S]*?cards:\s*\[/g) ?? []

  assert.equal(sections.length, 2)
  assert.match(copy, /sourceLabel:/)
  assert.match(copy, /OpenAI/)
  assert.match(copy, /Anthropic/)
  assert.match(copy, /Gemini/)
})
