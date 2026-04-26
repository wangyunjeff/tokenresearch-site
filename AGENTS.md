# Local Agent Rules

- For networked shell commands in this environment, prepend:
  `export https_proxy=http://127.0.0.1:7890; export http_proxy=http://127.0.0.1:7890; export all_proxy=socks5://127.0.0.1:7890`
- Keep the proxy exports in the same shell invocation as the network command.
- Only unset these proxy variables when a task explicitly requires direct network access.

# Website Editing Rules

- When changing the website UI, prefer using Launch UI Components and shadcn-compatible registry materials before creating fully custom UI from scratch.
- Treat Launch UI as a source-code component registry, not as a runtime dependency. Use the shadcn CLI to add or preview components from `https://www.launchuicomponents.com/r`.
- Before installing or updating registry components, preview the effect with `npx shadcn@latest add <registry-url> --dry-run`, `--diff`, or `--view` whenever the change may touch existing files.
- Review every added registry file after installation. Fix imports, aliases, icon usage, client/server boundaries, and composition issues so the code matches this project's `components.json`, Next.js App Router setup, and existing style.
- Prefer composing existing local components, Launch UI sections, and shadcn/ui primitives over hand-building equivalent markup.
- Do not blindly overwrite existing components, `app/globals.css`, or shared layout files. If overwriting is necessary, inspect the diff first and preserve project-specific content.
- Use original implementation only when no suitable Launch UI/shadcn material exists or when adapting registry code would create more complexity than a focused local component.
- Keep visual changes consistent with the existing project rather than importing a full unrelated look wholesale.
