# Build README

This note records the build and deployment issues seen while updating the TokenResearch site, plus the workflows that worked.

## Project Context

- Local repo: `E:\0_Code\site-tokenresearch`
- Branch: `nuxt-docs-replica`
- Production host: `209.209.50.150`
- Production path: `/opt/tokenresearch-site`
- Production service: `tokenresearch-site.service`
- App bind: `127.0.0.1:3001`
- Public URL: `https://www.tokenresearch.com.cn`
- Direct fallback: `http://209.209.50.150:8888`

## What Worked

Local verification:

```powershell
pnpm lint
pnpm typecheck

$env:SITE_CHECK_BASE_URL='http://127.0.0.1:3001'
pnpm check:routes
```

When a dev server is already running, use a temporary port:

```powershell
$env:NUXT_IGNORE_LOCK='1'
pnpm dev --host 127.0.0.1 --port 3013
```

Production preview from an already-built `.output`:

```powershell
$env:HOST='127.0.0.1'
$env:PORT='3001'
node .output/server/index.mjs
```

Remote build environment:

```bash
cd /opt/tokenresearch-site
export PATH=/opt/node/bin:$PATH
export NODE_OPTIONS=--max-old-space-size=4096
export NUXT_PUBLIC_SITE_URL=https://www.tokenresearch.com.cn
export NUXT_SITE_URL=https://www.tokenresearch.com.cn
pnpm build
systemctl restart tokenresearch-site.service
```

Post-deploy checks:

```bash
systemctl is-active tokenresearch-site.service
curl -fsS -o /dev/null -w "/ %{http_code}\n" http://127.0.0.1:3001/
curl -fsS -o /dev/null -w "/models/market %{http_code}\n" http://127.0.0.1:3001/models/market
```

External checks:

```powershell
Invoke-WebRequest https://www.tokenresearch.com.cn/ -UseBasicParsing
Invoke-WebRequest https://www.tokenresearch.com.cn/models/market -UseBasicParsing
```

## Failure Patterns

### 1. SSH Port 22 Refused

This host does not use port 22.

Use:

```bash
ssh -p 22705 root@209.209.50.150
```

### 2. Nuxt Dev Lock

Nuxt refuses to start a second dev server if another dev process is already running:

```text
Another Nuxt dev server is already running
```

Use `NUXT_IGNORE_LOCK=1` and a free port for temporary visual QA.

### 3. Port Conflicts

Observed local ports:

- `3000`: old Nuxt dev
- `3001`: local production preview
- `3010`: another project
- `5174`: old static home test server

Check before starting:

```powershell
Get-NetTCPConnection -LocalPort 3000,3001,3010,3013 -State Listen -ErrorAction SilentlyContinue
```

### 4. Nuxt Content Dev Cache Goes Stale

After changing content files or `.navigation.yml`, the dev server can temporarily return site-wide `404` or Nuxt Content sqlite errors such as:

```text
no such table: _content_docs
Database integrity check failed
```

Best fix: restart the temporary dev server and rerun route checks. Do not treat this as proof that the content route is broken until a fresh dev/preview process also fails.

### 5. `.output` Locked By Running Preview

`pnpm build` can fail on Windows when an existing preview process is holding `.output`:

```text
EBUSY: resource busy or locked, rmdir '.output'
```

Fix:

```powershell
Get-NetTCPConnection -LocalPort 3001 -State Listen
Stop-Process -Id <OwningProcess> -Force
pnpm build
```

Then restart preview:

```powershell
$env:HOST='127.0.0.1'
$env:PORT='3001'
node .output/server/index.mjs
```

### 6. Local `pnpm build` Can Hang After Output Is Generated

On Windows, `pnpm build` reached:

```text
Build complete
```

and `.output/server/index.mjs` existed, but the node build process did not exit. In that case:

1. Confirm `.output/server/index.mjs` exists.
2. Stop only the stuck `nuxt build` process.
3. Start `node .output/server/index.mjs`.
4. Run `pnpm check:routes` against the preview.

Do not leave stuck build processes running.

### 7. Remote Build Needs More Heap

The VPS has limited memory. Build with:

```bash
export NODE_OPTIONS=--max-old-space-size=4096
```

The host also has a swapfile from the earlier Nuxt deployment because production builds exceeded default memory.

### 8. Curl Immediately After Restart Can Return `000`

Right after:

```bash
systemctl restart tokenresearch-site.service
```

the first curl may run before Node has bound `127.0.0.1:3001`.

Wait a few seconds or poll:

```bash
for i in {1..20}; do
  curl -fsS -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3001/models/market && break
  sleep 2
done
```

### 9. Missing `robots.txt` Logs Are Not This Build Issue

The service logged a `robots.txt` 404. That is separate from the page build and does not mean `/` or `/models/market` failed. Real health checks should hit known routes.

## Recommended Flow

1. Run local code checks:

```powershell
pnpm lint
pnpm typecheck
```

2. Start local preview/dev on a known port.

3. Run route checks:

```powershell
$env:SITE_CHECK_BASE_URL='http://127.0.0.1:3001'
pnpm check:routes
```

4. Capture Playwright screenshots for changed pages:

```powershell
npx playwright screenshot --viewport-size=1440,1400 http://127.0.0.1:3001/models/market output/playwright/preview-model-market.png
npx playwright screenshot --viewport-size=390,1200 http://127.0.0.1:3001/ output/playwright/preview-home-mobile.png
```

5. Deploy to the server.

6. Run remote local checks on `127.0.0.1:3001`.

7. Run public checks on `https://www.tokenresearch.com.cn`.

## Current Deployment Note

The 2026-07-09 model marketplace and homepage refresh was uploaded from the local working tree and built on the server. The remote git worktree is intentionally dirty until these changes are committed and pushed.
