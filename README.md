# TokenResearch Docs

Nuxt UI Docs Template based documentation site for AI coding tutorials, model evaluations, workflow playbooks, and a Skill Gallery.

The replicated baseline page is preserved at:

- Route: `/codex/model`
- Source: `content/3.codex/5.model.md`
- Raw source mirror: `/raw/codex/model.md`

`pnpm check:routes` verifies that `/raw/codex/model.md` still matches `content/3.codex/5.model.md`, so the original replicated page can be safely compared after later edits.

## Stack

- Nuxt 4 / Vue
- Nuxt UI v4
- Nuxt Content
- Tailwind CSS
- `nuxt-llms`
- Nuxt MCP toolkit

## Content Layout

All editable content lives under `content/` with numeric prefixes controlling sidebar order:

- `1.start/`: quick start entry points
- `2.tutorials/`: foundation tutorials
- `3.codex/`: Codex setup and configuration
- `4.models/`: model evaluation notes
- `5.opencode/`: OpenCode notes
- `6.claude-code/`: Claude Code notes
- `7.gallery/`: Skill Gallery examples
- `8.workflows/`: end-to-end playbooks connecting tutorials, model evaluations, and Gallery examples
- `91.faq/`: common questions
- `92.skills-mcp/`: Skills and MCP configuration

## Visual Assets

- `public/images/hero-docs-workspace.png`: generated bitmap hero asset for the homepage first viewport.
- `output/playwright/`: local screenshot evidence for desktop, mobile, dark mode, and route-specific QA.

Keep project-referenced images inside `public/`; do not reference files directly from the Codex generated-images cache.

## Development

```bash
pnpm install
pnpm dev
```

Local URL:

```text
http://127.0.0.1:3000
```

## Verification

Run these before handing over changes:

```bash
pnpm lint
pnpm typecheck
pnpm check:routes
pnpm build
```

For visual QA, capture desktop and mobile screenshots with Playwright and save them under `output/playwright/`.

Recommended visual coverage:

- `/`
- `/codex/model`
- `/models`
- `/models/task-routing`
- `/gallery`
- `/skills-mcp/chrome-devtools-mcp`
