export function mountTutorial(root) {
'use strict';

const icons = {
  windows: '<path d="M3 4.5 11 3.4v8H3zm10-1.4 8-1.1v9h-8zM3 13h8v8l-8-1.1zm10 0h8v9l-8-1.1z" fill="currentColor" stroke="none"/>',
  apple: '<path d="M15.6 5.5c.9-1.1 1.5-2.5 1.3-3.9-1.3.1-2.8.9-3.7 1.9-.8.9-1.6 2.3-1.4 3.7 1.5.1 2.9-.7 3.8-1.7ZM19.9 17c-.5 1.1-.8 1.5-1.5 2.5-.9 1.3-2.1 2.9-3.6 2.9-1.3 0-1.7-.9-3.5-.9s-2.3.9-3.6.9c-1.5 0-2.6-1.4-3.5-2.7-2.5-3.5-2.8-7.6-1.3-9.8 1-1.5 2.5-2.4 4-2.4 1.6 0 2.6.9 3.9.9 1.3 0 2.2-.9 3.9-.9 1.3 0 2.8.7 3.8 1.8-3.3 1.9-2.8 6.5 1.4 7.7Z" fill="currentColor" stroke="none"/>',
  download: '<path d="M12 3v12m-4-4 4 4 4-4M4 15v5h16v-5"/>',
  folder: '<path d="M3 7V5a1 1 0 0 1 1-1h6l2 3h8a1 1 0 0 1 1 1v11H3z"/>',
  file: '<path d="M14 3H5v18h14V8zM14 3v5h5M8 12h8M8 16h6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.1"/>',
  copy: '<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V3H3v13h5"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
  terminal: '<path d="m5 5 7 7-7 7m8 0h6"/>',
  key: '<circle cx="8" cy="8" r="5"/><path d="m12 12 9 9m-6-6 3-3m0 6 3-3"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4M12 14v3"/>',
  restart: '<path d="M4 10a8 8 0 1 1 1 7M4 4v6h6"/>',
};
const icon = name => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.info}</svg>`;
const labels = ['安装客户端', '找到配置目录', '放入配置文件', '创建 API 密钥', '写入你的密钥', '重启，开始使用'];
const state = { os: 'windows', step: 0, done: {windows: [], mac: []}, key: '', showKey: false, folderShown: false, demoCreated: false };
try {
  const saved = JSON.parse(localStorage.getItem('tr-codex-guide-progress') || 'null');
  if (saved) {
    if (['windows','mac'].includes(saved.os)) state.os = saved.os;
    if (Number.isInteger(saved.step) && saved.step >= 0 && saved.step < 6) state.step = saved.step;
    for (const os of ['windows','mac']) if (Array.isArray(saved.done?.[os])) state.done[os] = [...new Set(saved.done[os].filter(n => Number.isInteger(n) && n >= 0 && n < 6))];
  }
} catch (_) {}
const $ = s => root.querySelector(s);
const pad = n => String(n).padStart(2, '0');
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const isMac = () => state.os === 'mac';
const path = () => isMac() ? '~/.codex' : '%userprofile%\\.codex';
function saveProgress() { try { localStorage.setItem('tr-codex-guide-progress', JSON.stringify({os: state.os, step: state.step, done: state.done})); } catch (_) {} }
function instruction(n, title, body) { return `<div class="instruction"><span class="small-number">${n}</span><div><h3>${title}</h3>${body}</div></div>`; }
function note(text, neutral = false) { return `<div class="note ${neutral?'neutral':''}">${icon('info')}<span>${text}</span></div>`; }
function renderWindowHeader(title, mac = false) { return `<div class="window-top ${mac?'dots-mac':''}"><i class="window-dot"></i><i class="window-dot"></i><i class="window-dot"></i><span>${title}</span></div>`; }
function copyPath(value) { return `<div class="path-copy"><code>${esc(value)}</code><button class="copy-btn" data-copy="${esc(value)}" aria-label="复制路径 ${esc(value)}">${icon('copy')}复制</button></div>`; }
function external(url, text, type='primary-link') { return `<a class="${type}" href="${url}" target="_blank" rel="noopener noreferrer">${text} <span aria-hidden="true">↗</span></a>`; }
function visual(content, caption, tag='操作示意') { return `<div class="visual-area"><span class="visual-label">${tag}</span>${content}<p class="visual-caption">${caption}</p></div>`; }
function renderStep() {
  const mac = isMac();
  let title, description, instructions, drawing, faqs;
  if (state.step === 0) {
    title = '先把 Codex 安装好';
    description = '从官方下载入口，选择适合你的桌面版本。';
    instructions = instruction(1, '打开官方下载页面', `<p>点击下面的按钮，找到 ${mac ? 'macOS' : 'Windows'} 下载入口。</p>${external('https://openai.com/zh-Hans-CN/codex/', '前往官方下载')}`)
      + instruction(2, mac ? '将应用放入“应用程序”' : '按照提示完成安装', `<p>${mac ? '下载后打开安装包，按照提示把 Codex 放入<strong>“应用程序”</strong>，再从那里启动。' : '按照官方页面和安装程序的提示操作。安装完成后，从<strong>开始菜单</strong>打开 Codex。'}</p>`)
      + instruction(3, '打开一次，然后完全退出', '<p>如果出现登录页面，先继续下面的文件配置；配置完成后，再重新启动。</p>')
      + note(mac ? '当前官方 Mac 桌面版面向 Apple 芯片。点击  → 关于本机，查看你的芯片型号。' : '下载与安装时，需要能正常访问 OpenAI 的网络环境。');
    drawing = visual(`<div class="demo-window">${renderWindowHeader('Codex · Desktop', mac)}<div class="install-center"><div class="codex-symbol">${icon('terminal')}</div><h3>Codex</h3><p>准备好你的 AI 工作伙伴</p><a class="install-button" href="https://openai.com/zh-Hans-CN/codex/" target="_blank" rel="noopener noreferrer">${icon(mac?'apple':'windows')}前往 ${mac?'Mac':'Windows'} 下载入口 ${icon('download')}</a><div class="visual-info"><span>官方客户端</span><span>${mac?'Apple silicon':'Windows'}</span></div></div></div>`, '安装结束后，下一步找到配置文件夹。', '01 / DOWNLOAD');
    faqs = [
      ['下载页面打不开怎么办？', '先检查是否能正常访问 OpenAI 官网，再刷新或稍后重试。词元智研的访问环境与官方下载页面可能不同。'],
      ['装好后，必须先登录吗？', '本教程先配置词元智研服务与密钥，再重新启动。下载客户端和配置词元智研是两个步骤。'],
      [mac?'Intel 芯片的 Mac 可以吗？':'我用的是 WSL，要放在哪里？', mac?'当前官方 Mac 桌面版页面标注 Apple Silicon；Intel Mac 请先查看官方的其他使用方式，不要直接使用不兼容的安装包。':'本教程按 Windows 原生桌面环境说明。WSL 内的 ~/.codex 属于另一套用户目录，与 Windows 的配置目录不同。'],
      ['两个系统的配置文件一样吗？', '本页提供的基础配置包可用于 Windows 和 Mac。需要打开的文件夹位置、快捷键和保存方式不同，切换系统后会显示对应步骤。']
    ];
  }
  if (state.step === 1) {
    title = '找到 .codex 文件夹';
    description = '这是 Codex 读取配置的位置，放对目录很重要。';
    if (!mac) {
      instructions = instruction(1, '打开“运行”窗口', '<p>同时按下键盘上的 <kbd>Win</kbd> + <kbd>R</kbd>。</p>')
        + instruction(2, '粘贴路径，按回车', `<p>复制下面整行路径，粘贴到“打开”输入框。</p>${copyPath(path())}`)
        + instruction(3, '确认打开的是 .codex', '<p>路径通常是 <code>C:\\Users\\你的用户名\\.codex</code>。下一步会把两个文件放在这里。</p>')
        + note('如果提示找不到目录：打开 %userprofile%，新建一个文件夹，命名为 .codex（开头有一个英文句点）。');
      drawing = visual(`<div class="keyboard-row"><kbd>Win</kbd><span>+</span><kbd>R</kbd></div><div class="demo-window">${renderWindowHeader('运行')}<div class="run-body"><p>输入配置目录路径，然后按回车打开。</p><div class="run-input"><span>打开：</span><div class="run-field">${esc(path())}</div></div><div class="run-actions"><span class="demo-button highlight">确定</span><span class="demo-button">取消</span></div></div></div><div class="callout-label">${icon('arrow')}路径中的 %userprofile% 会自动找到你的用户目录</div>`, '示意窗口 · 请在你自己的电脑上操作', '02 / LOCATE');
    } else {
      instructions = instruction(1, '打开访达，进入个人文件夹', '<p>点击 Dock 中的<strong>访达 Finder</strong>，再点屏幕顶部的<strong>“前往” → “个人”</strong>。也可按 <kbd>⇧ Shift</kbd> + <kbd>⌘ Command</kbd> + <kbd>H</kbd>。</p>')
        + instruction(2, '显示隐藏文件夹', '<p>在访达中，同时按 <kbd>⌘ Command</kbd> + <kbd>⇧ Shift</kbd> + <kbd>.</kbd>（英文句点）。找到颜色稍浅的 <strong>.codex</strong>，双击打开。</p>')
        + instruction(3, '也可以直接前往', `<p>按 <kbd>⇧ Shift</kbd> + <kbd>⌘ Command</kbd> + <kbd>G</kbd>，粘贴以下路径，再按回车。</p>${copyPath(path())}`)
        + note('如果文件夹不存在，可在“终端”输入 mkdir -p ~/.codex 并回车，再回到访达打开。');
      drawing = visual(`<div class="demo-window">${renderWindowHeader('访达 · 个人', true)}<div class="finder-layout"><div class="finder-side"><span>最近使用</span><span>应用程序</span><span class="selected">个人</span><span>下载</span></div><div class="finder-content"><div class="folder-row">${icon('folder')}Desktop</div><div class="folder-row">${icon('folder')}Documents</div><div id="hidden-folder" class="folder-row ${state.folderShown?'target':'hidden-folder'}">${icon('folder')}.codex</div></div></div></div><button class="mini-action" id="show-folders">${state.folderShown?'再次演示：隐藏文件夹':'点此演示：显示隐藏文件夹'}</button><div class="keyboard-row"><kbd>⌘ Command</kbd><span>+</span><kbd>⇧ Shift</kbd><span>+</span><kbd>.</kbd></div>`, '最后一个按键是英文句点，不是中文句号。', '02 / FINDER');
    }
    faqs = [
      [mac?'为什么我看不到 .codex？':'提示“找不到路径”怎么办？', mac?'以英文句点开头的文件夹默认是隐藏的。在访达中按 Command + Shift + 英文句点，或者用“前往文件夹”直接打开 ~/.codex。':'先打开一次 Codex 并退出。若仍不存在，按 Win + R 输入 %userprofile%，在打开的用户目录中新建名为 .codex 的文件夹。'],
      [mac?'“个人”是哪个文件夹？':'需要把“用户名”改成什么？', mac?'“个人”就是当前 Mac 账户的主文件夹，不是桌面，也不是 iCloud 云盘。用菜单“前往 → 个人”或 Command + Shift + H 可以直接进入。':'用 %userprofile%\\.codex 这个快捷路径不需要改用户名。只有手动输入 C:\\Users\\… 的完整路径时，才需要使用自己的 Windows 用户目录名。'],
      ['文件夹名称有什么要注意的？', '正确名称是 .codex，前面只有一个英文句点，中间没有空格。不要把文件放进叫 codex 的普通文件夹。'],
      ['可以把配置放在桌面吗？', '可以先下载到桌面，但最终必须放到当前用户的 .codex 文件夹里。Codex 不会自动从桌面读取这两个文件。']
    ];
  }
  if (state.step === 2) {
    title = '把两个配置文件放进去';
    description = '一个指定连接方式，一个保存你的 API 密钥。';
    instructions = instruction(1, '下载并解压配置包', '<p>解压后，你会看到 <code>config.toml</code> 和 <code>auth.json</code>。</p><a class="primary-link" href="downloads/codex-config.zip" download>'+icon('download')+'下载配置文件包</a>')
      + instruction(2, '复制两个文件到 .codex', `<p>将<strong>文件本身</strong>复制到 <code>${esc(path())}</code>，不要把整个外层文件夹放进去。</p><div class="file-list"><a class="file-link" href="downloads/config.toml" download>${icon('file')}config.toml</a><a class="file-link" href="downloads/auth.json" download>${icon('file')}auth.json</a></div>`)
      + instruction(3, '已有同名文件，先备份再替换', '<p>首次使用直接放入即可。之前配置过的话，先把原文件复制到别处留底，再确认替换。</p>')
      + note('config.toml 已包含词元智研的连接设置；下一步创建密钥后，只需要填写 auth.json。');
    drawing = visual(`<div class="demo-window files-visual">${renderWindowHeader('.codex',mac)}<div class="path-caption">${esc(path())}</div><div class="file-detail">${icon('file')}<div>config.toml<small>连接地址与模型配置</small></div><span class="file-tag">已配好</span></div><div class="file-detail">${icon('file')}<div>auth.json<small>下一步填入你的密钥</small></div><span class="file-tag">待填写</span></div></div><div class="callout-label">${icon('check')}两个文件直接位于 .codex 内</div>`, 'config.toml 保持原样 · 只修改 auth.json', '03 / CONFIG FILES');
    faqs = [
      ['这两个文件分别做什么？', 'config.toml 指定模型、服务地址及连接方式。auth.json 保存你在词元智研创建的 API 密钥；它不能一直保留示例占位文字。'],
      ['文件名后面多了 .txt 怎么办？', mac?'在访达中打开“设置 → 高级”，勾选“显示所有文件扩展名”，确认真实名称为 auth.json 与 config.toml，不是 auth.json.txt。':'在资源管理器的“查看 → 显示”中勾选“文件扩展名”。如果实际名称是 auth.json.txt，请去掉最后的 .txt。'],
      ['解压出来的文件夹要整个复制吗？', '不用。打开解压后的文件夹，只复制里面的 config.toml 和 auth.json。最终路径应为 .codex/config.toml 和 .codex/auth.json，中间没有另一层文件夹。'],
      ['替换会影响已有配置吗？', '会替换原文件中的设置，因此已有配置时请先备份。需要保留自定义插件或其他配置的用户，可对照原文件合并设置。']
    ];
  }
  if (state.step === 3) {
    title = '创建你的 API 密钥';
    description = '在词元智研完成注册，拿到属于你自己的 Key。';
    instructions = instruction(1, '注册或登录词元智研', `<p>打开网站后，完成注册或登录，点击<strong>“进入控制台”</strong>。</p>${external('https://tokenresearch.com.cn', '打开词元智研')}`)
      + instruction(2, '进入“API 密钥”，点击创建', '<p>在控制台左侧选择<strong>“API 密钥”</strong>，点击<strong>“创建密钥”</strong>。填写一个便于辨认的名称，例如“我的 Codex”，按你的账户情况选择分组。</p>')
      + instruction(3, '创建后，复制完整 Key', '<p>点击密钥旁的复制按钮，或打开<strong>“使用密钥”</strong>查看配置。不要手抄列表中带省略号的显示内容。</p>')
      + note('API 密钥用于你的账户调用，请只填入你自己的配置文件。右侧只是操作演示，不会创建真实密钥。');
    drawing = visual(`<div class="demo-window">${renderWindowHeader('词元智研 · 控制台')}<div class="console-body"><div class="console-sidebar"><span>仪表盘</span><span class="selected">API 密钥</span><span>使用记录</span><span>我的订阅</span></div><div class="console-main"><h4>API 密钥</h4><button id="demo-create" class="console-create ${state.demoCreated?'active':''}">${icon(state.demoCreated?'check':'plus')}${state.demoCreated?'演示已创建':'创建密钥'}</button><div class="console-table-label"><span>名称</span><span>密钥</span></div><div id="demo-key" class="console-key">${state.demoCreated?'<span>我的 Codex</span><code>sk-••••••</code><span class="key-check">✓</span>':'<span>点击上方按钮，看下一步</span>'}</div><p class="console-demo-note">交互示意 · 实际操作请前往词元智研控制台</p></div></div></div>`, '进入控制台 → API 密钥 → 创建密钥', '04 / API KEY');
    faqs = [
      ['Key 是我的登录密码吗？', '不是。API 密钥是给应用调用服务用的凭据。请从“API 密钥”页面创建，不要填写账号密码。'],
      ['应该选择哪个分组？', '选择你账户下可用且支持 Codex 所需模型的分组。具体模型与额度以词元智研控制台显示为准。'],
      ['看到的密钥有省略号，能直接填吗？', '不能。列表为了简洁可能只显示首尾字符。请使用旁边的“复制”按钮或“使用密钥”中的完整配置。'],
      ['词元智研页面暂时打不开？', '按原教程，词元智研配置通常无需代理。可以先检查网络、刷新或稍后重试；如果持续打不开，再联系服务方确认访问地址与状态。']
    ];
  }
  if (state.step === 4) {
    title = '把 Key 写入 auth.json';
    description = '保留原有格式，只替换双引号中的密钥内容。';
    instructions = instruction(1, mac?'用纯文本方式打开文件':'用记事本打开文件', `<p>${mac?'右键 auth.json → 打开方式 → 文本编辑。如显示富文本，选择“格式 → 制作纯文本”。':'右键 auth.json → 打开方式 → 记事本。'}找到 <code>OPENAI_API_KEY</code> 这一行。</p>`)
      + instruction(2, '替换占位文字，然后保存', `<p>将 <code>YOUR_API_KEY_HERE</code> 替换成刚复制的完整 Key。保留两侧英文双引号。按 <kbd>${mac?'⌘ Command':'Ctrl'}</kbd> + <kbd>S</kbd> 保存。</p>`)
      + instruction(3, '也可以在这里直接生成文件', '<label class="field-label" for="api-key">粘贴你自己的 API Key</label><div class="key-entry"><input id="api-key" type="password" autocomplete="off" spellcheck="false" autocapitalize="off" aria-describedby="key-privacy key-error" placeholder="粘贴完整 Key"><button id="toggle-key" type="button" aria-label="显示密钥" aria-pressed="false">显示</button></div><p id="key-privacy" class="local-note">仅在当前页面生成文件，不上传、不保存密钥。</p><p id="key-error" class="key-error" role="status"></p><button class="primary-link key-download" id="download-auth" disabled>'+icon('download')+'生成并下载 auth.json</button>')
      + note('用上方工具下载后，再把新 auth.json 放回 .codex 文件夹并替换同名文件。',true);
    drawing = visual(`<div class="demo-window code-window">${renderWindowHeader('auth.json',mac)}<pre class="code-body"><span class="line-num">1</span>{
<span class="line-num">2</span>  <span class="code-key">"OPENAI_API_KEY"</span>:
<span class="line-num">3</span>  <span class="code-value" id="key-preview">"YOUR_API_KEY_HERE"</span>
<span class="line-num">4</span>}</pre><div class="code-help">${icon('arrow')}只替换绿色区域内的文字，保留引号</div></div><div class="callout-label">${icon('lock')}页面不会连接服务或消耗你的额度</div>`, '英文双引号 · 没有多余逗号 · 文件名保持 auth.json', '05 / AUTHENTICATION');
    faqs = [
      ['能把 Key 直接粘贴成整个文件吗？', '不能只留下 Key 本身。需要保留完整 JSON 结构，包括外层大括号、OPENAI_API_KEY 字段、冒号与双引号。也可以用本页工具生成格式正确的文件。'],
      ['这里会保存我的 API Key 吗？', '不会。本页只用浏览器内存临时生成文件，不把密钥写入本地存储，也不上传到服务器。离开密钥步骤后会清空输入；教程进度会单独保存在当前浏览器。'],
      ['Mac 保存后为什么不能用？', '检查是否保存为纯文本、是否使用英文直双引号，以及文件名是否被自动加上 .txt 或变成 .rtf。用本页工具下载可避免手动编辑格式。'],
      ['下载变成 auth (1).json 怎么办？', '这是浏览器为避免重名自动加上的序号。将文件改名为 auth.json，再放入 .codex 并替换同名文件；不要保留括号与序号。']
    ];
  }
  if (state.step === 5) {
    title = '重启 Codex，试着聊一句';
    description = '让新配置生效，再用一次真实对话确认连接。';
    instructions = instruction(1, '完全退出，再重新打开', `<p>${mac?'点击顶部菜单“Codex → 退出 Codex”，或按 <kbd>⌘ Command</kbd> + <kbd>Q</kbd>。只关窗口可能不会退出应用。':'关闭 Codex；若它仍在系统托盘运行，请从托盘菜单退出。'}然后重新打开 Codex。</p>`)
      + instruction(2, '新建对话，发送一句简单的问题', '<p>例如：“请回复：连接成功。”收到真实回复后，再开始你的工作。</p>'+copyPath('请回复：连接成功。'))
      + instruction(3, '收到回复，就可以开始使用', '<p>如果仍显示登录页，先检查配置目录与密钥，完全退出后再启动。没有收到回复时，查看下面的排查说明。</p>')
      + note('点击“我已收到回复”只记录你的完成进度；连接是否成功，以你在 Codex 中收到的实际回复为准。');
    drawing = visual(`<div class="demo-window">${renderWindowHeader('Codex · 新对话',mac)}<div class="restart-visual"><div class="success-symbol">${icon('restart')}</div><h4>准备好，开始第一次对话</h4><p>保存配置 → 完全退出 → 重新打开</p><div class="chat-demo"><div><span>请回复：连接成功。</span>${icon('arrow')}</div></div><div class="restart-disclaimer">操作示意 · 本页面不会检测实际连接</div></div></div>`, '看到真实回复，再把这一步标记为完成。', '06 / FIRST MESSAGE');
    faqs = [
      ['重启后仍然显示登录页？', '先确认文件位于当前账户的 .codex 中，auth.json 中填的是完整有效 Key，然后完全退出重开。当前官方界面也提供“Sign in another way”输入 API key 的入口；使用时仍需保留词元智研 provider 配置。'],
      ['提示 401 或密钥无效？', '重新从词元智研控制台复制完整 Key，检查它是否已禁用或过期，以及是否误填了占位文字、空格或显示用省略号。保存后重新启动。'],
      ['提示模型不可用、无额度或请求失败？', '在词元智研控制台核对密钥分组、账户额度和可用模型。配置包沿用原教程的模型设置；若服务端模型已调整，请以服务方当前配置为准。'],
      ['没有报错，但一直没有回复？', '检查网络与服务状态，确认 config.toml 和 auth.json 没放错目录，且文件名没有额外后缀。如果修改过服务地址，可重新对照下载包或控制台说明。']
    ];
  }
  $('#guide').innerHTML = `<div class="step-header"><span class="big-number">${pad(state.step+1)}</span><div><h2 id="step-title">${title}</h2><p>${description}</p></div><span class="step-tag">${['INSTALL','DIRECTORY','CONFIGURE','CONNECT','AUTHORIZE','READY'][state.step]}</span></div><div class="step-body"><div class="instructions">${instructions}</div>${drawing}</div>${state.done[state.os].length===6 && state.step===5?'<div class="completed-banner">'+icon('check')+' 你已标记完成全部 6 步。现在可以回到 Codex 开始使用。</div>':''}`;
  $('#faq-list').innerHTML = faqs.map(([q,a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('');
  $('#guide').classList.remove('swap-in');
  requestAnimationFrame(() => $('#guide').classList.add('swap-in'));
  if (state.step === 4) bindKeyInput();
}
function render() {
  $('#step-nav').innerHTML = labels.map((label,i)=>`<button class="nav-step ${state.step===i?'active':''} ${state.done[state.os].includes(i)?'done':''}" data-step="${i}" ${state.step===i?'aria-current="step"':''} aria-label="第 ${i+1} 步：${label}${state.done[state.os].includes(i)?'，已标记完成':''}"><span class="nav-number">${state.done[state.os].includes(i)?'✓':pad(i+1)}</span><span class="nav-text">${label}</span>${state.step===i?'<span class="nav-arrow" aria-hidden="true">↗</span>':''}</button>`).join('');
  for (const os of ['windows','mac']) $('#os-'+os).setAttribute('aria-pressed',String(state.os===os));
  const count = state.done[state.os].length;
  $('#progress-count').textContent = `${count} / 6`;
  $('#progress-fill').style.width = `${count/6*100}%`;
  $('#progress').setAttribute('aria-valuenow',count);
  $('#guide-position').textContent = `步骤 ${pad(state.step+1)} / 06`;
  $('#os-hint').textContent = isMac() ? 'Mac 桌面版' : 'Windows 桌面版';
  $('#previous').disabled = state.step === 0;
  $('#next').innerHTML = state.step === 5 ? (count===6?'已完成，回到第一步 ↗':'我已收到回复 '+icon('check')) : '已完成，下一步 <span aria-hidden="true">→</span>';
  $('#action-hint').textContent = count===6?'全部步骤已标记完成':'完成当前操作后，继续下一步';
  renderStep(); saveProgress();
}
function go(step) {
  if (state.step === 4) { state.key = ''; state.showKey = false; }
  state.step = Math.min(5,Math.max(0,step)); render();
  $('#guide').focus({preventScroll:true});
  if (window.innerWidth < 1000) $('#guide').scrollIntoView({behavior:'instant',block:'start'});
}
let toastTimer;
function toast(message) { const el=$('#toast'); el.textContent=message; el.classList.add('visible'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('visible'),2700); }
async function copy(text) {
  try {
    if (navigator.clipboard?.writeText && window.isSecureContext) await navigator.clipboard.writeText(text);
    else { const field=document.createElement('textarea'); field.value=text;field.setAttribute('readonly','');field.style.cssText='position:fixed;opacity:0;left:0;top:0';document.body.append(field);field.select();const success=document.execCommand('copy');field.remove();if(!success)throw new Error('copy unavailable'); }
    toast('已复制，可以粘贴到你的电脑上。');
  } catch (_) { toast('浏览器未允许复制，请手动选中文字复制。'); }
}
function downloadFile(name, text, type) { const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000); }
function keyError(key) {
  if (!key) return '';
  if (/\s|[“”‘’"'<>]/u.test(key)) return '请粘贴 Key 本身，不要包含引号、空格或换行。';
  if (/\.\.\.|…|•|YOUR_API_KEY|你的|填入/i.test(key)) return '这是占位或缩略内容，请复制控制台中的完整 Key。';
  if (key.length<12) return '密钥似乎不完整，请重新复制完整 Key。';
  return '';
}
function updateKey() {
  const error = keyError(state.key);
  $('#key-error').textContent = error;
  $('#download-auth').disabled = !state.key || !!error;
  $('#api-key').setAttribute('aria-invalid',String(!!error));
  const shown = !state.key ? 'YOUR_API_KEY_HERE' : state.showKey ? state.key : '••••••••••••••••';
  $('#key-preview').textContent = JSON.stringify(shown);
}
function bindKeyInput() {
  const field=$('#api-key');field.value=state.key;field.type=state.showKey?'text':'password';
  field.addEventListener('input',e=>{state.key=e.target.value.trim();updateKey();});
  $('#toggle-key').addEventListener('click',()=>{state.showKey=!state.showKey;field.type=state.showKey?'text':'password';$('#toggle-key').textContent=state.showKey?'隐藏':'显示';$('#toggle-key').setAttribute('aria-label',state.showKey?'隐藏密钥':'显示密钥');$('#toggle-key').setAttribute('aria-pressed',String(state.showKey));updateKey();});
  $('#download-auth').addEventListener('click',()=>{if(!state.key||keyError(state.key))return;downloadFile('auth.json',JSON.stringify({OPENAI_API_KEY:state.key},null,2)+'\n','application/json;charset=utf-8');toast('已生成 auth.json，请放回 .codex 并替换。');});
  updateKey();
}
root.addEventListener('click',e=>{
  const nav=e.target.closest('[data-step]');if(nav){go(Number(nav.dataset.step));return;}
  const os=e.target.closest('[data-os]');if(os){if(state.os!==os.dataset.os){state.key='';state.showKey=false;state.os=os.dataset.os;state.folderShown=false;render();toast(`已切换到 ${isMac()?'Mac':'Windows'} 教程。`);}return;}
  const cp=e.target.closest('[data-copy]');if(cp){copy(cp.dataset.copy);return;}
  if(e.target.closest('#show-folders')){state.folderShown=!state.folderShown;$('#hidden-folder').className=`folder-row ${state.folderShown?'target':'hidden-folder'}`;$('#show-folders').textContent=state.folderShown?'再次演示：隐藏文件夹':'点此演示：显示隐藏文件夹';return;}
  if(e.target.closest('#demo-create')){state.demoCreated=true;$('#demo-create').classList.add('active');$('#demo-create').innerHTML=icon('check')+'演示已创建';$('#demo-key').innerHTML='<span>我的 Codex</span><code>sk-••••••</code><span class="key-check">✓</span>';toast('演示完成。请到词元智研创建真实密钥。');}
});
$('#previous').addEventListener('click',()=>go(state.step-1));
$('#next').addEventListener('click',()=>{
  if(state.step===5&&state.done[state.os].length===6){go(0);return;}
  if(!state.done[state.os].includes(state.step))state.done[state.os].push(state.step);
  if(state.step<5)go(state.step+1);else{render();toast(state.done[state.os].length===6?'全部步骤已标记完成，开始使用 Codex 吧。':'已标记这一步完成；还可回看并完成前面的步骤。');}
});
const clearSensitive = () => { state.key=''; state.showKey=false; const field=$('#api-key'); if(field){field.value='';updateKey();} };
window.addEventListener('pagehide', clearSensitive);
root.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
render();

return () => {clearTimeout(toastTimer);clearSensitive();window.removeEventListener('pagehide',clearSensitive);};
}
