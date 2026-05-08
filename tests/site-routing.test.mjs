import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import { test } from "node:test"

const root = new URL("../", import.meta.url)

function readWorkspaceFile(path) {
  return readFileSync(new URL(path, root), "utf8")
}

test("primary product pages have App Router entries", () => {
  const routes = ["mission", "gateway", "skills", "perspectives", "signals"]

  for (const route of routes) {
    assert.equal(existsSync(new URL(`app/${route}/page.tsx`, root)), true)
  }
})

test("top navigation uses page routes instead of homepage anchors", () => {
  const copy = [
    readWorkspaceFile("lib/site-copy.ts"),
    readWorkspaceFile("lib/site-pages.ts"),
  ].join("\n")

  for (const route of ["/mission", "/gateway", "/skills", "/perspectives", "/signals"]) {
    assert.match(copy, new RegExp(`href:\\s*"${route}"`))
  }

  assert.doesNotMatch(copy, /href:\s*"#capabilities"/)
  assert.doesNotMatch(copy, /href:\s*"#skills"/)
})

test("gateway and monitor URLs are modeled in page copy", () => {
  const pages = readWorkspaceFile("lib/site-pages.ts")

  assert.match(pages, /http:\/\/124\.221\.138\.39:6008\//)
  assert.match(pages, /http:\/\/8\.137\.174\.4\//)
})
