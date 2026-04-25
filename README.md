# TokenResearch Site

TokenResearch 的首版双语官网。项目使用 Next.js App Router、React、Tailwind CSS v4 和 Vitest，页面内容集中在 `content/site.ts`，支持中文 / English 切换。

## Development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Project Structure

- `app/` - Next.js routes, layout, and global styles.
- `components/sections/` - Page sections used by the homepage.
- `components/ui/` - Shared UI primitives.
- `content/site.ts` - Bilingual site copy and section data.
- `tests/` - Vitest unit and interaction tests.
