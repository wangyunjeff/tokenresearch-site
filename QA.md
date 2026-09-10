# Interaction regression check — 2026-09-10

## Root cause

The classic script declared a global `function top`. In a browser this collides with the non-redefinable `window.top` property. Chrome reported `SyntaxError: Identifier 'top' has already been declared` before executing the script. The first tutorial article remained empty and the Next button had no event listener.

## Repair

- Rename the window-header helper to `renderWindowHeader`.
- Enclose application code in a private IIFE so helpers cannot collide with browser globals.
- Version the script URL to avoid retaining the failed script in browser caches.
- Use immediate scrolling on narrow screens when switching steps, avoiding competing smooth scrolls during rapid navigation.
- Add a Vite development configuration for repeatable supervised browser testing; deployment remains static.

## Verified in Chrome against the actual static application

- Reproduced the original exception and clicked the unresponsive Next button before fixing it.
- Windows and Mac: steps 1–6, previous step, sidebar navigation, completion and return to step 1.
- Switching operating systems and reloading to retain progress.
- Mac hidden-folder demonstration; key-creation demonstration; FAQ expansion.
- Key visibility toggle, placeholder rejection, enabled download with a dummy key, and cleared input after leaving the step.
- Generated auth.json downloaded to the browser shared-files location and parsed as JSON with the exact dummy test key.
- Both operating-system flows at a real 390-pixel iframe viewport, including Next, Previous and system switching; visually inspected the narrow layout.
- No new application-script errors after the fix; the log retains the deliberately reproduced pre-fix exception.

## Test boundaries

Tests exercised the tutorial, not a real Codex installation or paid API call. The browser's download-event waiter timed out even though the generated file arrived; the synchronized file was checked directly. The HTTP preview uses the legacy copy fallback, which reports success but does not populate this browser tool's separate virtual clipboard; clipboard contents were therefore not independently verified. Static ZIP contents are valid and its download link was exercised, but the browser did not expose a saved ZIP file in this test session.

The temporary narrow-viewport harness is excluded from the deliverable.

# Website redesign regression — 2026-09-10

## New experience

- Full-height brand entrance with animated typography, a locally drawn 3D particle sculpture, orbit lights, pointer response, and direct entry into the model catalog.
- Independent documentation home, sidebar, article pages and article navigation. Codex installation is one article.
- Eight model capability references with text search, category/provider intersections, an empty-state reset, native model details dialog and source links.

## Browser-verified on the final redesign

- Desktop and an actual 390px iframe viewport: the entrance renders, the sculpture changes orientation over time, model exploration opens, search finds the expected model, and the detail dialog opens/closes.
- Desktop: search for Claude returns two models; clearing the input restores eight; a mismatched image/OpenAI combination shows no results and reset restores the catalog. Escape closes the dialog.
- Desktop: all five document routes render; document search narrows results and shows an empty message for an unmatched query; the 401 troubleshooting disclosure expands; copy controls show completion feedback.
- Desktop and mobile: every Windows and Mac installation step, step navigation, previous/next, and returning to the beginning. Both 6-step flows passed after the new article integration.
- Mac Finder hidden-folder demonstration and API key creation demonstration work.
- Placeholder key rejected; dummy key allows generation; visibility toggle works. Leaving the key step and returning clears the key and disables generation.
- A newly downloaded auth (1).json was parsed and exactly matched the dummy test key used in this run. Downloadable ZIP contains only config.toml and placeholder auth.json, and its files match standalone downloads.
- Mobile documentation directory expands and article selection works. Inspected final mobile key-input article after the transition finished.
- Final browser error logs contained no application errors; browser-extension metadata errors were excluded.

## Resolved during this check

The managed browser does not expose a WebGL context. The final sculpture uses Canvas 2D with perspective projection and animated depth, so it renders in that environment as well. Mobile section jumps use immediate scrolling to avoid competing smooth scrolls during rapid actions. One exact-text QA selector initially missed the disclosure's appended plus sign; corrected using the observed summary text.

## Limits

This is interface and downloadable-file verification, not a real Codex installation or a paid API call. The preview is HTTP: clipboard controls report success through their fallback, but the browser tool's separate virtual clipboard cannot independently confirm copied contents. System reduced-motion handling is implemented but was not emulated in this browser session. The temporary mobile harness is removed before publishing.

# Continuation refinement — 2026-09-10

- Updated the hero and documentation copy to the research-team service positioning.
- Added a scattered-to-assembled entrance and moving surface highlights. Geometry and colour strings are reused; additive rendering removes the previous depth sorting and per-frame nested-object arrays. No numeric performance claim was made.
- Added a visible pause/play control; desktop and 390px mobile tests verified its accessible name and pressed state change. The paused state survives a trip from home to the catalog and back because the existing plaza is reused.
- Tested direct catalog entry, repeated clicks on the same navigation item, search persistence, model dialog opening and Escape closing, and navigation into documentation.
- The mobile header console link remains visible and points to the expected console URL.
- Increased regular reading sizes and inspected desktop documentation and the mobile entrance. Repeated every Windows and Mac tutorial transition in the 390px view after the typography changes; the Finder demonstration also worked. Desktop Next still works.
- No application errors appeared in the final desktop/mobile browser logs (extension metadata errors excluded). JavaScript syntax, both stylesheets and local HTML entry assets passed checks.
- A visibility check immediately after hash navigation ran before the new article appeared; the subsequent live snapshot and successful article navigation confirmed the expected page. No fixed-delay waits were needed.
- The broader download/key validation from the prior redesign remains applicable; the tutorial module and downloadable files were not changed in this refinement.


## 2026-09-10：价格目录与后台

- 新增分组、1.5倍率、模型成员勾选、保存与刷新读取：浏览器通过。
- 添加测试模型：原价35/70/0，标准组1/2/0元，1.5组1.5/3/0元；缓存写入3.5美元分别为0.1/0.15元。编辑输入为70后自动联动到各组。
- 清空缓存通过键盘删除后保存，后台显示—，不等同0。浏览器空字符串fill不会清空number控件，改用真实键盘全选删除核对。
- 手机390px：前台分组选择、后台分组表单与固定保存按钮，截图检查通过。
- 原文档可打开，Codex下一步从目录页推进到配置文件页。
- SQLite真实迁移+共享Worker路由测试：无身份401、非管理员403、跨源403、保存后重新读取、旧revision409、隐藏分组过滤、非法/极小基数和负价格拒绝、null请求体400。
- 浏览器初次测试发现HTTP下randomUUID不支持，已改用getRandomValues。保存期间锁定表单及关闭按钮。
- 生产使用平台认证头与管理员邮箱授权；预览身份固定在独立Vite配置中，构建不包含该配置/测试身份或本地数据库。未在生产模拟账号登录或写入测试数据。
