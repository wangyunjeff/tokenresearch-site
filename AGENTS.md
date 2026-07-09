# Project Rules

This project is a Nuxt UI Docs Template based tutorial site.

Goals:
- Build a documentation website similar in structure to docs.ylsagi.io, but keep content editable in this repository.
- Expand the site beyond a single tutorial page: include foundation tutorials, model evaluations, workflow playbooks, and a Skill Gallery/showcase area.
- Use Nuxt 4, Nuxt UI v4, Nuxt Content, Tailwind CSS, and Markdown/MDC.
- Keep the default docs layout: header search, left navigation, right table of contents, dark mode, previous/next links.
- All tutorial pages live under `content/`.
- Use numeric prefixes in content folders/files to control sidebar order.
- Preserve `/codex/model` and its source file `content/3.codex/5.model.md` as the replicated baseline page.
- Preserve `/raw/codex/model.md` as the raw mirror for baseline verification.
- Keep project-referenced visual assets under `public/`; the homepage hero bitmap is `public/images/hero-docs-workspace.png`.
- Save visual QA evidence under `output/playwright/`.
- Customize `app/app.config.ts` for branding, header links, footer credits, and edit links.
- Customize `nuxt.config.ts` `llms` settings to match this site's domain and tutorial sections.
- Before finishing, run `pnpm lint`, `pnpm typecheck`, `pnpm check:routes`, and `pnpm build`.
