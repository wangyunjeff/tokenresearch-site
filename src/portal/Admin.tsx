import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowUpRight,
  Check,
  Download,
  Plus,
  Save,
  Search,
  Settings2,
  Trash2,
  X,
} from 'lucide-react';
import {
  requestCatalog,
  type Catalog,
  type CatalogGroup,
  type CatalogModel,
  type CatalogResponse,
  type Amounts,
} from './catalog';
import { formatPrice, modelPrice, originalDollarPrice } from '../../server/pricing.js';
import { ModelMark, Price } from './Models';

const uid = (prefix: string) =>
  prefix +
  '-' +
  (globalThis.crypto?.randomUUID?.() ||
    Date.now().toString(36) + '-' + Math.random().toString(36).slice(2));
const emptyModel = (): CatalogModel => ({
  id: uid('model'),
  code: '',
  name: '',
  provider: 'OpenAI',
  description: '',
  unit: 'tokens',
  inputUsd: null,
  outputUsd: null,
  cacheReadUsd: null,
  cacheWriteUsd: null,
  scope: '',
  source: '',
  verifiedAt: '',
  enabled: true,
});
function Modal({
  title,
  children,
  close,
  error,
}: {
  title: string;
  children: ReactNode;
  close: () => void;
  error?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="admin-dialog"
      onCancel={close}
      onClick={(e) => {
        if (e.target === ref.current) close();
      }}
      aria-label={title}
    >
      <div className="admin-dialog-top">
        <h2>{title}</h2>
        <button className="p-copy" onClick={close} aria-label="关闭编辑">
          <X size={19} />
        </button>
      </div>
      {error && (
        <p className="admin-message error" role="alert">
          {error}
        </p>
      )}
      {children}
    </dialog>
  );
}
function NumberField({
  label,
  value,
  change,
  required = false,
}: {
  label: string;
  value: number | null;
  change: (n: number | null) => void;
  required?: boolean;
}) {
  return (
    <label className="p-field">
      {label}
      <input
        type="number"
        min="0"
        max="1000000000"
        step="any"
        value={value ?? ''}
        required={required}
        placeholder="留空表示暂无记录"
        onChange={(e) => change(e.target.value === '' ? null : Number(e.target.value))}
      />
    </label>
  );
}
export default function Admin() {
  const draftGeneration = useRef(0);
  const [record, setRecord] = useState<CatalogResponse | null>(null),
    [draft, setDraft] = useState<Catalog | null>(null),
    [error, setError] = useState(''),
    [notice, setNotice] = useState(''),
    [dirty, setDirty] = useState(false),
    [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<'models' | 'groups' | 'settings'>('models'),
    [groupId, setGroupId] = useState(''),
    [query, setQuery] = useState('');
  const [groupEdit, setGroupEdit] = useState<CatalogGroup | null>(null),
    [modelEdit, setModelEdit] = useState<CatalogModel | null>(null),
    [originalEdit, setOriginalEdit] = useState<Amounts>({ input: null, output: null, cache: null }),
    [priceEdit, setPriceEdit] = useState<Amounts>({ input: null, output: null, cache: null }),
    [priceMode, setPriceMode] = useState<'rmb' | 'official'>('official');
  const [removeId, setRemoveId] = useState<{
      type: 'model' | 'group';
      id: string;
      name: string;
    } | null>(null),
    [memberQuery, setMemberQuery] = useState(''),
    [reload, setReload] = useState(0);
  useEffect(() => {
    let active = true;
    setError('');
    requestCatalog(true)
      .then((r) => {
        if (active) {
          setRecord(r);
          setDraft(r.data);
          setGroupId(r.data.groups[0]?.id || '');
          setDirty(false);
        }
      })
      .catch((e) => {
        if (active) setError(e.message);
      });
    return () => {
      active = false;
    };
  }, [reload]);
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  const group = draft?.groups.find((g) => g.id === groupId);
  function change(next: Catalog) {
    draftGeneration.current++;
    setDraft(next);
    setDirty(true);
    setNotice('');
    setError('');
  }
  function editModel(model: CatalogModel) {
    setModelEdit(structuredClone(model));
    setPriceMode(group?.prices?.[model.id] ? 'rmb' : 'official');
    setOriginalEdit(
      group
        ? originalDollarPrice(model, group)
        : { input: model.inputUsd, output: model.outputUsd, cache: model.cacheReadUsd },
    );
    setPriceEdit(
      group ? modelPrice(model, group, draft!.divisor) : { input: null, output: null, cache: null },
    );
  }
  function exportDraft() {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' }),
    );
    const a = document.createElement('a');
    a.href = url;
    a.download = 'model-catalog.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function save() {
    if (!draft || !record) return;
    const submittedGeneration = draftGeneration.current;
    setSaving(true);
    setError('');
    try {
      const response = await fetch('/api/admin/catalog', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: draft, revision: record.revision }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || '保存失败');
      setRecord(body);
      if (draftGeneration.current === submittedGeneration) {
        setDraft(body.data);
        setDirty(false);
        setNotice('已保存，模型广场已同步更新。');
      } else {
        setDirty(true);
        setNotice('上一次保存已完成。你刚刚继续编辑的内容仍待保存。');
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }
  return (
    <div className="portal-page admin-page">
      <div className="p-heading">
        <div>
          <span className="p-eyebrow">CATALOG MANAGEMENT</span>
          <h1>模型与分组管理</h1>
          <p>录入模型，设置倍率，让价格在前台自动更新。</p>
        </div>
        <div className="admin-heading-actions">
          <a className="p-text-link" href="#/models" target="_blank" rel="noreferrer">
            查看前台 <ArrowUpRight size={15} />
          </a>
          {draft && (
            <button className="p-primary" onClick={save} disabled={!dirty || saving}>
              <Save size={16} />
              {saving ? '正在保存…' : dirty ? '保存并更新前台' : '已保存'}
            </button>
          )}
        </div>
      </div>
      {error && (
        <div className="admin-message error" role="alert">
          {error}
          {!draft && <a href="/admin">登录管理账号 →</a>}
        </div>
      )}
      {notice && (
        <div className="admin-message" role="status">
          <Check size={17} />
          {notice}
        </div>
      )}
      {!draft ? (
        !error && <p className="p-loading">正在读取管理目录…</p>
      ) : (
        <>
          <div className="admin-tabs">
            <div className="p-filter-tabs">
              {(
                [
                  ['models', '模型价格'],
                  ['groups', '分组设置'],
                  ['settings', '计价与备份'],
                ] as const
              ).map(([key, title]) => (
                <button
                  key={key}
                  className={tab === key ? 'active' : ''}
                  onClick={() => setTab(key)}
                >
                  {title}
                </button>
              ))}
            </div>
            <span>
              {dirty ? '有尚未保存的修改' : `版本 ${record?.revision || 0}`} · {draft.models.length}{' '}
              个模型 / {draft.groups.length} 个分组
            </span>
          </div>
          {tab === 'models' && (
            <>
              <div className="admin-model-toolbar">
                <select
                  aria-label="管理分组"
                  value={groupId}
                  onChange={(e) => setGroupId(e.target.value)}
                >
                  <option value="all">全部模型 · 管理基础信息</option>
                  {draft.groups.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name} · ×{g.multiplier ?? '待定'}
                    </option>
                  ))}
                </select>
                <label className="p-search">
                  <Search size={16} />
                  <input
                    aria-label="搜索管理模型"
                    placeholder="搜索模型"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </label>
                <button className="button outline" onClick={() => editModel(emptyModel())}>
                  <Plus size={16} />
                  添加模型
                </button>
              </div>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>模型 / ID</th>
                      <th>输入</th>
                      <th>输出</th>
                      <th>缓存读取</th>
                      <th>计价来源</th>
                      <th>展示</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {draft.models
                      .filter(
                        (m) =>
                          (!group || group.modelIds.includes(m.id)) &&
                          (m.code + m.provider).toLowerCase().includes(query.toLowerCase()),
                      )
                      .map((m) => {
                        const prices = group
                          ? modelPrice(m, group, draft.divisor)
                          : { input: null, output: null, cache: null };
                        return (
                          <tr key={m.id}>
                            <td>
                              <div className="admin-model-name">
                                <ModelMark provider={m.provider} />
                                <div>
                                  <b>{m.code}</b>
                                  <small>{m.provider}</small>
                                </div>
                              </div>
                            </td>
                            <td>
                              <Price value={prices.input} />
                            </td>
                            <td>
                              <Price value={prices.output} />
                            </td>
                            <td>
                              <Price value={prices.cache} />
                            </td>
                            <td>{group?.prices?.[m.id] ? '分组人民币价' : '统一美元基准'}</td>
                            <td>
                              <input
                                type="checkbox"
                                aria-label={'展示 ' + m.code}
                                checked={m.enabled}
                                onChange={(e) =>
                                  change({
                                    ...draft,
                                    models: draft.models.map((x) =>
                                      x.id === m.id ? { ...x, enabled: e.target.checked } : x,
                                    ),
                                  })
                                }
                              />
                            </td>
                            <td>
                              <button className="admin-edit" onClick={() => editModel(m)}>
                                编辑
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <p className="p-muted admin-caption">
                价格单位：人民币 / 100 万
                tokens。选择分组后，可编辑该分组的人民币价格，也可使用统一美元基准价。
              </p>
            </>
          )}
          {tab === 'groups' && (
            <>
              <div className="admin-section-top">
                <p>已导入分组按参考人民币价随倍率调整；预留组填入倍率后即可启用。</p>
                <button
                  className="button outline"
                  onClick={() => {
                    setMemberQuery('');
                    setGroupEdit({
                      id: uid('group'),
                      name: '',
                      multiplier: null,
                      description: '',
                      enabled: false,
                      modelIds: [],
                      prices: {},
                      referenceMultiplier: 1,
                      priceBasis: 'official',
                      priceDate: '',
                    });
                  }}
                >
                  <Plus size={16} />
                  添加分组
                </button>
              </div>
              <div className="admin-groups">
                {draft.groups.map((g) => (
                  <article key={g.id}>
                    <div>
                      <span className="p-eyebrow">{g.enabled ? '前台展示中' : '未启用'}</span>
                      <h2>{g.name}</h2>
                      <p>
                        {g.modelIds.length} 个模型 ·{' '}
                        {Object.keys(g.prices || {}).length ? '分组人民币价格' : '统一美元基准价格'}
                      </p>
                    </div>
                    <strong>×{g.multiplier ?? '待定'}</strong>
                    <button
                      className="button outline"
                      onClick={() => {
                        setMemberQuery('');
                        setGroupEdit(structuredClone(g));
                      }}
                    >
                      <Settings2 size={15} />
                      编辑分组
                    </button>
                  </article>
                ))}
              </div>
            </>
          )}
          {tab === 'settings' && (
            <div className="admin-settings">
              <section>
                <h2>统一美元价格折算</h2>
                <p>使用统一基准价的模型，按「美元价格 ÷ 折算系数 × 分组倍率」计算人民币价格。</p>
                <NumberField
                  label="折算系数"
                  value={draft.divisor}
                  required
                  change={(n) => {
                    if (n != null) change({ ...draft, divisor: n });
                  }}
                />
                <p className="p-muted">
                  已录入的分组人民币价格使用各组的参考倍率，不受这里的折算系数影响。
                </p>
              </section>
              <section>
                <h2>目录备份</h2>
                <p>下载当前目录，保留全部模型、分组倍率和价格。未保存的修改也会包含在备份中。</p>
                <button className="button outline" onClick={exportDraft}>
                  <Download size={16} />
                  导出当前目录 JSON
                </button>
                <button
                  className="p-text-link"
                  disabled={dirty}
                  onClick={() => setReload(reload + 1)}
                >
                  重新读取已保存目录
                </button>
              </section>
            </div>
          )}
        </>
      )}
      {groupEdit && draft && (
        <Modal error={error} title="编辑分组" close={() => setGroupEdit(null)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (groupEdit.enabled && groupEdit.multiplier === null) {
                setError('启用分组前，请填写倍率。');
                return;
              }
              if (groupEdit.multiplier !== null && groupEdit.multiplier < 0.000001) {
                setError('分组倍率不能小于 0.000001');
                return;
              }
              const committedGroup = {
                ...groupEdit,
                prices: Object.fromEntries(
                  Object.entries(groupEdit.prices || {}).filter(([id]) =>
                    groupEdit.modelIds.includes(id),
                  ),
                ),
              };
              change({
                ...draft,
                groups: draft.groups.some((g) => g.id === groupEdit.id)
                  ? draft.groups.map((g) => (g.id === groupEdit.id ? committedGroup : g))
                  : [...draft.groups, committedGroup],
              });
              setGroupId(groupEdit.id);
              setGroupEdit(null);
            }}
          >
            <div className="admin-form">
              <label className="p-field">
                分组名称
                <input
                  required
                  maxLength={60}
                  value={groupEdit.name}
                  onChange={(e) => setGroupEdit({ ...groupEdit, name: e.target.value })}
                />
              </label>
              <NumberField
                label="分组倍率"
                value={groupEdit.multiplier}
                change={(n) => setGroupEdit({ ...groupEdit, multiplier: n })}
              />
              <label className="p-field">
                简短说明
                <input
                  maxLength={200}
                  value={groupEdit.description}
                  onChange={(e) => setGroupEdit({ ...groupEdit, description: e.target.value })}
                />
              </label>
              <label className="p-check">
                <input
                  type="checkbox"
                  checked={groupEdit.enabled}
                  onChange={(e) => setGroupEdit({ ...groupEdit, enabled: e.target.checked })}
                />
                在前台展示此分组
              </label>
              {Object.keys(groupEdit.prices || {}).length > 0 && (
                <p className="admin-form-note">
                  参考倍率 ×{groupEdit.referenceMultiplier || 1}
                  。当前输入、输出与缓存价格会按新倍率同比例调整。
                </p>
              )}
              <div className="member-heading">
                <b>组内模型 · {groupEdit.modelIds.length}</b>
                <button
                  type="button"
                  onClick={() =>
                    setGroupEdit({ ...groupEdit, modelIds: draft.models.map((m) => m.id) })
                  }
                >
                  全选
                </button>
              </div>
              <label className="p-search">
                <Search size={15} />
                <input
                  placeholder="查找要加入的模型"
                  aria-label="查找组内模型"
                  value={memberQuery}
                  onChange={(e) => setMemberQuery(e.target.value)}
                />
              </label>
              <div className="member-list">
                {draft.models
                  .filter((m) => m.code.toLowerCase().includes(memberQuery.toLowerCase()))
                  .map((m) => (
                    <label key={m.id}>
                      <input
                        type="checkbox"
                        checked={groupEdit.modelIds.includes(m.id)}
                        onChange={(e) => {
                          const ids = e.target.checked
                            ? [...groupEdit.modelIds, m.id]
                            : groupEdit.modelIds.filter((id) => id !== m.id);
                          setGroupEdit({
                            ...groupEdit,
                            modelIds: ids,
                          });
                        }}
                      />
                      {m.code}
                    </label>
                  ))}
              </div>
            </div>
            <div className="admin-form-actions">
              {draft.groups.some((g) => g.id === groupEdit.id) && (
                <button
                  type="button"
                  className="danger-button"
                  onClick={() => {
                    setRemoveId({ type: 'group', id: groupEdit.id, name: groupEdit.name });
                    setGroupEdit(null);
                  }}
                >
                  <Trash2 size={14} />
                  删除分组
                </button>
              )}
              <button className="p-primary" type="submit">
                应用修改
              </button>
            </div>
          </form>
        </Modal>
      )}
      {modelEdit && draft && (
        <Modal
          error={error}
          title={draft.models.some((m) => m.id === modelEdit.id) ? '编辑模型与价格' : '添加模型'}
          close={() => setModelEdit(null)}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const model = { ...modelEdit, name: modelEdit.code.slice(0, 100) };
              if (draft.models.some((m) => m.id !== model.id && m.code === model.code)) {
                setError('模型 ID 已存在。');
                return;
              }
              const models = draft.models.some((m) => m.id === model.id)
                ? draft.models.map((m) => (m.id === model.id ? model : m))
                : [...draft.models, model];
              const groups = draft.groups.map((g) => {
                if (g.id !== groupId) return g;
                const prices = { ...g.prices };
                if (priceMode === 'rmb') {
                  const factor = (g.referenceMultiplier || 1) / (g.multiplier || 1);
                  prices[model.id] = {
                    originalUsd: { ...originalEdit },
                    ...(Object.fromEntries(
                      Object.entries(priceEdit).map(([key, n]) => [
                        key,
                        n == null ? null : n * factor,
                      ]),
                    ) as Amounts),
                  };
                } else delete prices[model.id];
                return {
                  ...g,
                  referenceMultiplier: g.referenceMultiplier || 1,
                  prices,
                  modelIds: g.modelIds.includes(model.id) ? g.modelIds : [...g.modelIds, model.id],
                };
              });
              change({ ...draft, models, groups });
              setModelEdit(null);
            }}
          >
            <div className="admin-form">
              <label className="p-field">
                模型 ID
                <input
                  required
                  maxLength={150}
                  value={modelEdit.code}
                  onChange={(e) => setModelEdit({ ...modelEdit, code: e.target.value })}
                />
              </label>
              <label className="p-field">
                厂商
                <input
                  required
                  maxLength={60}
                  value={modelEdit.provider}
                  onChange={(e) => setModelEdit({ ...modelEdit, provider: e.target.value })}
                />
              </label>
              <label className="p-field">
                卡片简介
                <textarea
                  maxLength={500}
                  rows={2}
                  value={modelEdit.description}
                  onChange={(e) => setModelEdit({ ...modelEdit, description: e.target.value })}
                />
              </label>
              <label className="p-field">
                当前分组的计价方式
                <select
                  value={priceMode}
                  onChange={(e) => setPriceMode(e.target.value as 'rmb' | 'official')}
                >
                  {group && <option value="rmb">直接编辑人民币单价</option>}
                  <option value="official">统一美元基准价 ÷ {draft.divisor} × 分组倍率</option>
                </select>
              </label>
              {priceMode === 'rmb' ? (
                <>
                  <p className="admin-form-note">
                    {group?.name} · 当前倍率 ×{group?.multiplier ?? '待定'} · 人民币 / 100 万 tokens
                  </p>
                  <p className="admin-form-note">卡片划线原价 · USD / 100 万 tokens</p>
                  <div className="admin-price-fields">
                    {(
                      [
                        ['input', '输入美元原价'],
                        ['output', '输出美元原价'],
                        ['cache', '缓存美元原价'],
                      ] as const
                    ).map(([key, label]) => (
                      <NumberField
                        key={key}
                        label={label}
                        value={originalEdit[key]}
                        change={(n) => setOriginalEdit({ ...originalEdit, [key]: n })}
                      />
                    ))}
                  </div>
                  <p className="admin-form-note">卡片当前价格 · CNY / 100 万 tokens</p>
                  <div className="admin-price-fields">
                    {(
                      [
                        ['input', '输入人民币价'],
                        ['output', '输出人民币价'],
                        ['cache', '缓存人民币价'],
                      ] as const
                    ).map(([key, label]) => (
                      <NumberField
                        key={key}
                        label={label}
                        value={priceEdit[key]}
                        change={(n) => setPriceEdit({ ...priceEdit, [key]: n })}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p className="admin-form-note">
                    基准美元价供所有使用统一基准的分组共用，单位为美元 / 100 万 tokens。
                  </p>
                  <div className="admin-price-fields">
                    {(
                      [
                        ['inputUsd', '输入美元价'],
                        ['outputUsd', '输出美元价'],
                        ['cacheReadUsd', '缓存美元价'],
                      ] as const
                    ).map(([key, label]) => (
                      <NumberField
                        key={key}
                        label={label}
                        value={modelEdit[key]}
                        change={(n) => setModelEdit({ ...modelEdit, [key]: n })}
                      />
                    ))}
                  </div>
                </>
              )}
              <label className="p-check">
                <input
                  type="checkbox"
                  checked={modelEdit.enabled}
                  onChange={(e) => setModelEdit({ ...modelEdit, enabled: e.target.checked })}
                />
                在前台展示此模型
              </label>
            </div>
            <div className="admin-form-actions">
              {draft.models.some((m) => m.id === modelEdit.id) && (
                <button
                  type="button"
                  className="danger-button"
                  onClick={() => {
                    setRemoveId({
                      type: 'model',
                      id: modelEdit.id,
                      name: modelEdit.code.slice(0, 100),
                    });
                    setModelEdit(null);
                  }}
                >
                  <Trash2 size={14} />
                  删除模型
                </button>
              )}
              <button className="p-primary" type="submit">
                应用修改
              </button>
            </div>
          </form>
        </Modal>
      )}
      {removeId && draft && (
        <Modal title="确认删除" close={() => setRemoveId(null)}>
          <div className="admin-form">
            <p>
              删除「{removeId.name}」？
              {removeId.type === 'model' ? '它会从所有分组移除。' : '组内模型仍保留在模型目录中。'}
            </p>
          </div>
          <div className="admin-form-actions">
            <button className="button outline" onClick={() => setRemoveId(null)}>
              取消
            </button>
            <button
              className="danger-button"
              onClick={() => {
                const target = removeId;
                change(
                  target.type === 'group'
                    ? { ...draft, groups: draft.groups.filter((g) => g.id !== target.id) }
                    : {
                        ...draft,
                        models: draft.models.filter((m) => m.id !== target.id),
                        groups: draft.groups.map((g) => ({
                          ...g,
                          modelIds: g.modelIds.filter((id) => id !== target.id),
                          prices: Object.fromEntries(
                            Object.entries(g.prices || {}).filter(([id]) => id !== target.id),
                          ),
                        })),
                      },
                );
                if (target.type === 'group' && groupId === target.id)
                  setGroupId(draft.groups.find((g) => g.id !== target.id)?.id || '');
                setRemoveId(null);
              }}
            >
              确认删除
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
