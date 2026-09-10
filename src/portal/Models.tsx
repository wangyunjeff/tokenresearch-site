import { copyText } from './clipboard';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Check, Copy, Search, SlidersHorizontal } from 'lucide-react';
import { requestCatalog, type CatalogResponse, type CatalogModel } from './catalog';
import { modelPrice, formatPrice, originalDollarPrice } from '../../server/pricing.js';

export function CopyButton({ value, label = '复制模型 ID' }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false),
    [error, setError] = useState(false);
  useEffect(() => {
    if (!copied && !error) return;
    const timer = setTimeout(() => {
      setCopied(false);
      setError(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, [copied, error]);
  return (
    <button
      className="p-copy"
      aria-label={copied ? '已复制' : label}
      title={error ? '复制失败，请手动选择文字' : label}
      onClick={async () => {
        try {
          await copyText(value);
          setCopied(true);
        } catch {
          setError(true);
        }
      }}
    >
      {copied ? <Check size={15} /> : <Copy size={15} />}
      {error && <span>请手动复制</span>}
    </button>
  );
}
export function ModelMark({ provider }: { provider: string }) {
  const marks: Record<string, string> = {
    OpenAI: '◎',
    Anthropic: '✳',
    xAI: '𝕏',
    DeepSeek: 'D',
    MiniMax: 'M',
    Moonshot: 'K',
    智谱: 'Z',
    通义千问: 'Q',
  };
  return (
    <span
      className={'model-mark maker-' + provider.replace(/[^a-z]/gi, '').toLowerCase()}
      aria-hidden="true"
    >
      {marks[provider] || provider[0]}
    </span>
  );
}
export function Price({ value }: { value: number | null }) {
  return (
    <strong className={'p-price ' + (formatPrice(value).length > 6 ? 'p-price-long' : '')}>
      {value !== null && <span>¥</span>}
      {formatPrice(value)}
    </strong>
  );
}
const featured = [
  'gpt-6-astra',
  'gpt-5.6-sol',
  'gpt-5.6-terra',
  'gpt-5.6-luna',
  'claude-opus-5',
  'claude-sonnet-5',
];
const priority = (m: CatalogModel) => {
  const n = featured.indexOf(m.code);
  return n < 0 ? 100 : n;
};
export default function Models() {
  const [result, setResult] = useState<CatalogResponse | null>(null),
    [error, setError] = useState('');
  const [groupId, setGroupId] = useState(''),
    [query, setQuery] = useState(''),
    [provider, setProvider] = useState('all');
  const [reload, setReload] = useState(0);
  useEffect(() => {
    let active = true;
    setError('');
    requestCatalog()
      .then((value) => {
        if (active) {
          setResult(value);
          setGroupId((old) =>
            old === 'all' || value.data.groups.some((g) => g.id === old)
              ? old
              : value.data.groups.find((g) => g.id === 'sub2api-2')?.id ||
                value.data.groups[0]?.id ||
                '',
          );
        }
      })
      .catch((e) => {
        if (active) setError(e.message);
      });
    return () => {
      active = false;
    };
  }, [reload]);
  const data = result?.data,
    group = data?.groups.find((g) => g.id === groupId);
  const selectedGroups = data?.groups.filter((g) => groupId === 'all' || g.id === groupId) || [];
  const groupModels =
    data?.models.filter((m) => selectedGroups.some((g) => g.modelIds.includes(m.id))) || [];
  const providers = [...new Set(groupModels.map((m) => m.provider))];
  const models = selectedGroups.flatMap((g) =>
    groupModels
      .filter(
        (m) =>
          g.modelIds.includes(m.id) &&
          (provider === 'all' || m.provider === provider) &&
          [m.code, m.provider, m.description].join(' ').toLowerCase().includes(query.toLowerCase()),
      )
      .sort((a, b) => priority(a) - priority(b) || a.code.localeCompare(b.code))
      .map((m) => ({ m, g })),
  );
  const [limit, setLimit] = useState(30);
  useEffect(() => setLimit(30), [query, provider, groupId]);
  return (
    <div className="portal-page models-page">
      <div className="p-heading">
        <div>
          <span className="p-eyebrow">MODEL DIRECTORY / 01</span>
          <h1>
            模型广场<span className="p-heading-dot">.</span>
          </h1>
          <p>找到合适的模型，也看清每一项价格。</p>
        </div>
        <a className="p-text-link" href="#/docs/pricing">
          计价说明 <ArrowUpRight size={16} />
        </a>
      </div>
      {error ? (
        <div className="p-empty" role="alert">
          <h2>{error}</h2>
          <button className="button outline" onClick={() => setReload(reload + 1)}>
            重新加载
          </button>
        </div>
      ) : !result ? (
        <div className="p-loading" role="status">
          正在读取模型与分组…
        </div>
      ) : (
        <div className="directory-layout">
          <aside className="group-sidebar">
            <div className="sidebar-label">
              <SlidersHorizontal size={15} />
              <span>选择分组</span>
              <small>{data!.groups.length}</small>
            </div>
            <div className="filter-chips group-chips">
              <button
                className={groupId === 'all' ? 'selected' : ''}
                aria-pressed={groupId === 'all'}
                onClick={() => {
                  setGroupId('all');
                  setProvider('all');
                }}
              >
                所有分组
              </button>
              {data!.groups.map((g) => (
                <button
                  key={g.id}
                  className={g.id === groupId ? 'selected' : ''}
                  aria-pressed={g.id === groupId}
                  onClick={() => {
                    setGroupId(g.id);
                    setProvider('all');
                  }}
                >
                  <span>{g.name}</span>
                  <em>×{g.multiplier == null ? '待定' : formatPrice(g.multiplier)}</em>
                </button>
              ))}
            </div>
            <div className="sidebar-label provider-filter-label">
              <span>所有供应商</span>
            </div>
            <div className="filter-chips provider-chips">
              <button
                className={provider === 'all' ? 'selected' : ''}
                aria-pressed={provider === 'all'}
                onClick={() => setProvider('all')}
              >
                所有供应商 <small>{groupModels.length}</small>
              </button>
              {providers.map((p) => (
                <button
                  key={p}
                  className={provider === p ? 'selected' : ''}
                  aria-pressed={provider === p}
                  onClick={() => setProvider(p)}
                >
                  <ModelMark provider={p} />
                  <span>{p}</span>
                  <small>{groupModels.filter((m) => m.provider === p).length}</small>
                </button>
              ))}
            </div>
            <a className="sidebar-link" href="#/admin">
              管理模型与分组 <ArrowUpRight size={14} />
            </a>
          </aside>
          <section className="models-content" aria-label="模型列表">
            <div className="directory-tools">
              <label className="p-search">
                <Search size={17} />
                <input
                  aria-label="搜索模型"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="搜索模型名称或关键词"
                />
                {query && (
                  <button onClick={() => setQuery('')} aria-label="清除搜索">
                    ×
                  </button>
                )}
              </label>
              <button
                className="filter-reset"
                onClick={() => {
                  setQuery('');
                  setProvider('all');
                  setGroupId('all');
                }}
              >
                重置筛选
              </button>
            </div>
            <div className="group-heading">
              <div>
                <h2>{groupId === 'all' ? '所有分组' : group?.name || '暂无分组'}</h2>
                <span>
                  {models.length} {groupId === 'all' ? '项分组报价' : '个模型'} <i>·</i> 人民币 /
                  100 万 tokens
                </span>
              </div>
              {group?.priceDate && (
                <span className="p-badge">
                  {group.priceBasis === 'configured' ? '配置价格' : '价格记录'} · {group.priceDate}
                </span>
              )}
            </div>
            {group?.description && <p className="group-description">{group.description}</p>}
            <div className="currency-legend">
              <span>
                <s>美元原价</s> <b>USD $</b>
              </span>
              <ArrowRight size={17} />
              <span className="currency-current">
                人民币现价 <b>CNY ¥</b>
              </span>
              <a href="#/docs/pricing" aria-label="查看美元原价与人民币现价的计价说明">
                如何计价 ↗
              </a>
            </div>
            <div className="model-grid" key={groupId + provider}>
              {models.slice(0, limit).map(({ m, g }, i) => {
                const prices = modelPrice(m, g, data!.divisor),
                  original = originalDollarPrice(m, g);
                return (
                  <motion.article
                    className="model-tile"
                    key={g.id + m.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(i, 8) * 0.025 }}
                  >
                    <div className="model-tile-top">
                      <ModelMark provider={m.provider} />
                      <span>{m.provider}</span>
                      <CopyButton value={m.code} />
                    </div>
                    <h3>{m.code}</h3>
                    <div className="model-prices">
                      {(
                        [
                          ['input', '输入'],
                          ['output', '输出'],
                          ['cache', '缓存读取'],
                        ] as const
                      ).map(([key, label]) => (
                        <div key={key}>
                          <span>{label}</span>
                          <span className="usd-original">
                            {original[key] == null ? (
                              <span>原价待补充</span>
                            ) : (
                              <>
                                <s>${formatPrice(original[key])}</s>
                                <small>USD</small>
                              </>
                            )}
                          </span>
                          <motion.div
                            className="cny-reveal"
                            initial={{ opacity: 0, y: 7 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: 0.16 + Math.min(i, 8) * 0.025 }}
                          >
                            <Price value={prices[key]} />
                          </motion.div>
                        </div>
                      ))}
                    </div>
                    <p>{m.description}</p>
                    <div className="model-tile-footer">
                      <span>{m.unit === 'request' ? '人民币 / 次' : '人民币 / 1M tokens'}</span>
                      <span className="card-group-name" title={g.name}>
                        {g.name} <b>×{formatPrice(g.multiplier)}</b>
                      </span>
                    </div>
                  </motion.article>
                );
              })}
            </div>
            {models.length > limit && (
              <button className="p-load-more" onClick={() => setLimit(limit + 30)}>
                查看更多报价{' '}
                <span>
                  {Math.min(limit, models.length)} / {models.length}
                </span>
                <ArrowRight size={15} />
              </button>
            )}
            {!models.length && (
              <div className="p-empty">
                <Search size={26} />
                <h3>没有找到匹配的模型</h3>
                <p>换一个关键词，或选择其他分组。</p>
                <button
                  className="button outline"
                  onClick={() => {
                    setQuery('');
                    setProvider('all');
                  }}
                >
                  清除筛选
                </button>
              </div>
            )}
            <div className="price-note">
              <span>划线价为美元原价，突出显示的 ¥ 金额为当前分组的人民币价格。</span>
              <a href="#/docs/pricing">
                了解输入与缓存 <ArrowRight size={14} />
              </a>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
