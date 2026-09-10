import { copyText } from './clipboard';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Download,
  Search,
  Terminal,
} from 'lucide-react';
import content from './content.json';
import { GALLERY_OPEN } from './availability';
import { agentTools, agentCategories } from './agent-tools';
import tutorialTemplate from './tutorial-template.html?raw';

type DocsModule = { docBody: (id: string) => string; toc: Record<string, string[][]> };
function Tutorial() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let stop: (() => void) | undefined,
      disposed = false;
    import('./legacy/tutorial.js').then((module) => {
      if (!disposed && ref.current) stop = module.mountTutorial(ref.current);
    });
    return () => {
      disposed = true;
      stop?.();
    };
  }, []);
  return (
    <div
      className="portal-tutorial"
      ref={ref}
      dangerouslySetInnerHTML={{ __html: tutorialTemplate }}
    />
  );
}
function PricingArticle() {
  return (
    <>
      <div className="article-heading">
        <p className="p-eyebrow">PRICING / REFERENCE</p>
        <h1>读懂模型价格</h1>
        <p>选好分组，再看输入、输出与缓存。先看币种，再看单价。</p>
      </div>
      <div className="prose">
        <section id="pricing-currencies">
          <h2>美元原价，人民币现价</h2>
          <p>
            卡片上的划线价格带有 <strong>$ / USD</strong> 标识；下方醒目的 <strong>¥ / CNY</strong>{' '}
            是所选分组的人民币现价。两行价格使用相同的计量单位，可以直接看清每种用量对应的计价。
          </p>
          <div className="doc-price-example">
            <div>
              <span>美元原价 · USD</span>
              <s>$10</s>
            </div>
            <ArrowRight size={24} />
            <div>
              <span>人民币现价 · CNY</span>
              <strong>¥2.10</strong>
            </div>
            <small>plus · gpt-6-astra 输入 / 1M tokens</small>
          </div>
          <p>
            美元原价沿用来源价格表的美元计价基准。导入记录的关系为「美元基准价 × 分组倍率 ÷ 5 =
            人民币价」；按这条关系还原并保留美元原价。手动添加的模型可以单独填写美元基准价。这是平台计价规则，不是美元兑人民币汇率。
          </p>
        </section>
        <section id="pricing-units">
          <h2>三个数字，对应三种用量</h2>
          <div className="reference-table">
            {[
              ['输入', '发送给模型的提示、对话历史和材料中，未命中缓存的 token。'],
              ['输出', '模型生成的回复所产生的 token。'],
              ['缓存读取', '请求命中缓存时，读取部分对应的 token。'],
            ].map(([title, text]) => (
              <div key={title}>
                <code>{title}</code>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <p>
            单位统一为 <strong>元 / 100 万 tokens（1M）</strong>
            。「—」表示尚无对应价格记录；缓存没有记录，不等于模型不支持缓存。记录为 0 的项目按 0
            展示，图片模型的 token 单价也不等于整次图片生成费用。
          </p>
        </section>
        <section id="pricing-groups">
          <h2>分组与价格</h2>
          <p>
            同一个模型在不同分组中，可以有不同的输入、输出和缓存价格。模型广场显示的是所选分组的当前价格。
          </p>
          <div className="doc-callout">
            <BookOpen size={20} />
            <div>
              <strong>本次价格记录 · 2026-09-10</strong>
              <p>
                已将价格表中的「人民币 / token」换为「人民币 / 100 万
                tokens」。卡片中的人民币价格与这份价格记录对应。
              </p>
            </div>
          </div>
          <p>
            例如 plus 分组的 <code>gpt-6-astra</code>：输入 ¥2.10、输出 ¥10.50、缓存读取
            ¥0.21，均为每百万 tokens 的价格。
          </p>
          <details>
            <summary>管理者如何设置计价</summary>
            <p>
              导入分组保留表内人民币价格及参考倍率；调整倍率后，价格按「参考人民币价 × 新倍率 ÷
              参考倍率」更新。新建分组也可以沿用统一美元基准价，按「美元价 ÷ 折算系数 ×
              分组倍率」计算，折算系数初始为 35。
            </p>
          </details>
        </section>
        <section id="estimate-usage">
          <h2>算一次任务的费用</h2>
          <p>
            以 plus 的 gpt-6-astra 为例，一次请求有 20,000 个未缓存输入 tokens 和 5,000 个输出
            tokens：
          </p>
          <pre>
            <code>
              {
                '输入：20,000 ÷ 1,000,000 × ¥2.10 = ¥0.042\n输出： 5,000 ÷ 1,000,000 × ¥10.50 = ¥0.0525\n合计：¥0.0945'
              }
            </code>
          </pre>
          <p>若其中一部分输入命中缓存，将这一部分从普通输入用量中扣除，改用缓存读取单价计算。</p>
          <a className="p-primary" href="#/models">
            查看模型广场 <ArrowRight size={15} />
          </a>
        </section>
      </div>
    </>
  );
}
export default function Docs({ id = 'overview' }: { id?: string }) {
  const [query, setQuery] = useState(''),
    [module, setModule] = useState<DocsModule | null>(null),
    [error, setError] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  useEffect(() => {
    let active = true;
    import('./legacy/docs.js')
      .then((m) => {
        if (active) setModule(m);
      })
      .catch(() => {
        if (active) setError('文档暂时无法打开，请刷新页面重试。');
      });
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    if (!copyStatus) return;
    const timer = setTimeout(() => setCopyStatus(''), 1800);
    return () => clearTimeout(timer);
  }, [copyStatus]);
  const doc = content.docs.find((d) => d.id === id),
    index = content.docs.findIndex((d) => d.id === id);
  const docs = content.docs.filter((d) =>
    (d.title + d.summary).toLowerCase().includes(query.toLowerCase()),
  );
  const tool = agentTools.find((t) => t.id === id);
  const filteredTools = agentTools.filter((t) =>
    (t.name + t.team + t.category).toLowerCase().includes(query.toLowerCase()),
  );
  const references = docs.filter((d) => !['overview', 'codex'].includes(d.id));
  return (
    <div className="portal-page docs-page">
      <div className="docs-layout">
        <aside className="docs-sidebar">
          <a className="docs-brand" href="#/docs">
            <BookOpen size={19} />
            文档<span>DOCS</span>
          </a>
          <label className="p-search">
            <Search size={15} />
            <input
              placeholder="搜索文档"
              aria-label="搜索文档"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <a className={'doc-home-link ' + (id === 'overview' ? 'active' : '')} href="#/docs">
            所有 Agent 工具 <ArrowRight size={14} />
          </a>
          {agentCategories.map((category) => (
            <div className="doc-nav-group agent-nav-group" key={category}>
              {filteredTools.some((t) => t.category === category) && <span>{category}</span>}
              {filteredTools
                .filter((t) => t.category === category)
                .map((t) => (
                  <a
                    key={t.id}
                    href={'#/docs/' + t.id}
                    className={id === t.id ? 'active' : ''}
                    aria-current={id === t.id ? 'page' : undefined}
                  >
                    <span>{t.name}</span>
                    {t.ready ? (
                      <span className="tool-ready-dot" title="完整教程" />
                    ) : (
                      <small>筹备中</small>
                    )}
                  </a>
                ))}
            </div>
          ))}
          {!!references.length && (
            <div className="doc-nav-group">
              <span>通用参考与 Codex 配置</span>
              {references.map((d) => (
                <a key={d.id} href={'#/docs/' + d.id} className={id === d.id ? 'active' : ''}>
                  {d.title}
                  <ArrowRight size={13} />
                </a>
              ))}
            </div>
          )}
          {!filteredTools.length && !references.length && (
            <p className="p-muted">没有找到相关工具或文档</p>
          )}
          <a className="docs-download" href="/downloads/codex-config.zip" download>
            <Download size={18} />
            <span>
              Codex 配置文件<small>config.toml + auth.json</small>
            </span>
            <ArrowUpRight size={14} />
          </a>
        </aside>
        <article
          className={'doc-reading ' + (id === 'codex' ? 'tutorial-reading' : '')}
          onClick={async (e) => {
            const button = (e.target as HTMLElement).closest<HTMLElement>('[data-copy-global]');
            if (button) {
              try {
                await copyText(button.dataset.copyGlobal || '');
                setCopyStatus('已复制');
              } catch {
                setCopyStatus('请手动选择并复制内容');
              }
            }
          }}
        >
          {tool && !tool.ready ? (
            <div className="agent-placeholder">
              <a className="p-text-link" href="#/docs">
                <ArrowLeft size={14} /> 所有 Agent 工具
              </a>
              <div className="agent-placeholder-top">
                <span className="agent-mark">{tool.mark}</span>
                <span className="p-badge">教程筹备中</span>
              </div>
              <p className="p-eyebrow">
                {tool.category} / {tool.team}
              </p>
              <h1>{tool.name}</h1>
              <p className="docs-lead">{tool.description}</p>
              <div className="agent-placeholder-note">
                <BookOpen size={22} />
                <div>
                  <h2>接入教程，正在整理。</h2>
                  <p>安装、密钥配置和首次使用的详细步骤将在这里更新。</p>
                </div>
              </div>
              <div className="app-coming-actions">
                <a className="p-primary" href={tool.url} target="_blank" rel="noreferrer">
                  访问 {tool.name} 官网 <ArrowUpRight size={15} />
                </a>
                <a className="p-text-link" href="#/docs/codex">
                  先看 Codex 完整教程 <ArrowRight size={15} />
                </a>
              </div>
              <div className="agent-other">
                <p className="p-eyebrow">继续浏览</p>
                {agentTools
                  .filter((t) => t.id !== id)
                  .slice(0, 4)
                  .map((t) => (
                    <a href={'#/docs/' + t.id} key={t.id}>
                      {t.name}
                      <ArrowUpRight size={14} />
                    </a>
                  ))}
              </div>
            </div>
          ) : !doc ? (
            <div className="p-empty">
              <h1>这篇文档不存在</h1>
              <a href="#/docs">返回文档首页 →</a>
            </div>
          ) : id === 'overview' ? (
            <>
              <div className="p-eyebrow">THE DOCUMENTATION</div>
              <h1 className="docs-intro-title">
                工具就位。
                <br />
                <span>把注意力交还给研究。</span>
              </h1>
              <p className="docs-lead">
                选择你正在使用的 Agent 工具。
                <br />
                从安装、连接模型，到开始第一次任务。
              </p>
              <a id="getting-started" className="doc-feature" href="#/docs/codex">
                <span className="doc-feature-symbol">
                  <Terminal size={29} />
                </span>
                <div>
                  <small>从这里开始 · 6 个步骤</small>
                  <h2>Codex 安装与配置</h2>
                  <p>Windows 与 macOS，跟着图示完成首次连接。</p>
                  <span>
                    打开教程 <ArrowRight size={15} />
                  </span>
                </div>
                <span className="doc-feature-number">01</span>
              </a>
              {agentCategories.map((category) => (
                <section className="agent-category" id={'category-' + category} key={category}>
                  <div className="doc-start-heading">
                    <h2>{category}</h2>
                    <span>{agentTools.filter((t) => t.category === category).length} TOOLS</span>
                  </div>
                  <div className="agent-card-grid">
                    {filteredTools
                      .filter((t) => t.category === category)
                      .map((t) => (
                        <a className="agent-tool-card" href={'#/docs/' + t.id} key={t.id}>
                          <div className="agent-card-top">
                            <span className="agent-mark">{t.mark}</span>
                            <span className={'agent-card-status ' + (t.ready ? 'ready' : '')}>
                              {t.ready ? '完整教程' : '教程筹备中'}
                            </span>
                          </div>
                          <h3>{t.name}</h3>
                          <small>{t.team}</small>
                          <p>{t.description}</p>
                          <span className="agent-card-link">
                            {t.ready ? '开始使用' : '查看工具'}
                            <ArrowUpRight size={16} />
                          </span>
                        </a>
                      ))}
                  </div>
                </section>
              ))}
              <div id="learning-path" className="doc-next-research">
                <span>连接之后，开始一个真实任务。</span>
                <a href="#/gallery">
                  {GALLERY_OPEN ? '浏览科研展柜' : '科研展柜 · 筹备中'} <ArrowRight size={15} />
                </a>
              </div>
            </>
          ) : id === 'codex' ? (
            <>
              <div className="article-heading">
                <p className="p-eyebrow">QUICK START / 01</p>
                <h1>Codex 安装与配置</h1>
                <p>从下载到第一次对话，跟着六步完成。</p>
              </div>
              <Tutorial />
              <a className="p-text-link" href="#/docs/config">
                继续阅读配置文件说明 <ArrowRight size={15} />
              </a>
            </>
          ) : id === 'pricing' ? (
            <PricingArticle />
          ) : error ? (
            <p role="alert">{error}</p>
          ) : !module ? (
            <p role="status">正在打开文档…</p>
          ) : (
            <div
              className="legacy-doc-body"
              dangerouslySetInnerHTML={{ __html: module.docBody(id) }}
            />
          )}
          {doc && id !== 'overview' && (
            <div className="doc-pagination">
              {index > 0 && (
                <a href={'#/docs/' + content.docs[index - 1].id}>
                  <small>
                    <ArrowLeft size={13} /> 上一篇
                  </small>
                  {content.docs[index - 1].title}
                </a>
              )}
              {index < content.docs.length - 1 && (
                <a href={'#/docs/' + content.docs[index + 1].id}>
                  <small>
                    下一篇 <ArrowRight size={13} />
                  </small>
                  {content.docs[index + 1].title}
                </a>
              )}
            </div>
          )}
        </article>
        {id !== 'codex' && (!tool || tool.ready) && (
          <aside className="docs-toc">
            <span>本页内容</span>
            {(id === 'overview'
              ? [
                  ['getting-started', 'Codex 快速开始'],
                  ...agentCategories.map((c) => ['category-' + c, c]),
                ]
              : id === 'pricing'
                ? [
                    ['pricing-currencies', '美元与人民币'],
                    ['pricing-units', '计量单位'],
                    ['pricing-groups', '分组与价格'],
                    ['estimate-usage', '估算用量'],
                  ]
                : module?.toc[id] || []
            ).map(([anchor, title]) => (
              <button
                key={anchor}
                onClick={() =>
                  document
                    .getElementById(anchor)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              >
                {title}
              </button>
            ))}
            <a href="#/gallery">
              {GALLERY_OPEN ? '科研展柜' : '科研展柜 · 筹备中'} <ArrowUpRight size={13} />
            </a>
          </aside>
        )}
      </div>
      {copyStatus && (
        <div className="portal-toast" role="status">
          {copyStatus}
        </div>
      )}
    </div>
  );
}
