import { seed, withPriceImport } from './import-catalog.js';
export { seed };

function invalid(message) {
  throw Object.assign(new Error(message), { status: 400 });
}
const plain = (x) => x && typeof x === 'object' && !Array.isArray(x);
const str = (value, label, max, required = false) => {
  if (typeof value !== 'string' || value.length > max || (required && !value.trim()))
    invalid(`${label}填写不正确`);
  return value.trim();
};
const num = (v, label, nullable = true) => {
  if (v === null && nullable) return null;
  if (typeof v !== 'number' || !Number.isFinite(v) || v < 0 || v > 1e9)
    invalid(`${label}必须是有效的非负数字`);
  return v;
};
const flag = (v) => {
  if (typeof v !== 'boolean') invalid('展示状态不正确');
  return v;
};
export function validateCatalog(data) {
  if (
    !plain(data) ||
    !Array.isArray(data.models) ||
    !Array.isArray(data.groups) ||
    data.models.length > 500 ||
    data.groups.length > 100
  )
    invalid('目录数据不正确或数量过多');
  const divisor = num(data.divisor, '折算基数', false);
  if (divisor < 0.000001) invalid('折算基数不能小于 0.000001');
  const modelIds = new Set(),
    codes = new Set(),
    groupIds = new Set(),
    groupNames = new Set();
  const models = data.models.map((m) => {
    if (!plain(m)) invalid('模型数据不正确');
    const id = str(m.id, '模型标识', 100, true),
      code = str(m.code, '模型 ID', 150, true);
    if (modelIds.has(id) || codes.has(code)) invalid('模型 ID 不能重复');
    modelIds.add(id);
    codes.add(code);
    if (!['tokens', 'request'].includes(m.unit)) invalid('计费单位不正确');
    const source = str(m.source, '价格来源', 500);
    if (source) {
      try {
        if (new URL(source).protocol !== 'https:') invalid('价格来源须为 HTTPS 地址');
      } catch {
        invalid('价格来源须为有效的 HTTPS 地址');
      }
    }
    return {
      id,
      code,
      name: str(m.name, '模型名称', 100, true),
      provider: str(m.provider, '厂商', 60, true),
      description: str(m.description, '模型介绍', 500),
      unit: m.unit,
      inputUsd: num(m.inputUsd, '输入价格'),
      outputUsd: num(m.outputUsd, '输出价格'),
      cacheReadUsd: num(m.cacheReadUsd, '缓存读取价格'),
      cacheWriteUsd: num(m.cacheWriteUsd, '缓存写入价格'),
      scope: str(m.scope, '价格适用范围', 150),
      source,
      verifiedAt: str(m.verifiedAt, '价格核对日期', 20),
      enabled: flag(m.enabled),
    };
  });
  const groups = data.groups.map((g) => {
    if (!plain(g)) invalid('分组数据不正确');
    const id = str(g.id, '分组标识', 100, true),
      name = str(g.name, '分组名称', 60, true);
    if (groupIds.has(id) || groupNames.has(name.toLowerCase())) invalid('分组名称不能重复');
    groupIds.add(id);
    groupNames.add(name.toLowerCase());
    const multiplier = num(g.multiplier, '分组倍率');
    if (multiplier !== null && multiplier < 0.000001) invalid('分组倍率不能小于 0.000001');
    if (
      !Array.isArray(g.modelIds) ||
      g.modelIds.length > 500 ||
      g.modelIds.some((id) => !modelIds.has(id)) ||
      new Set(g.modelIds).size !== g.modelIds.length
    )
      invalid('分组内的模型不正确');
    const prices = {};
    if (g.prices !== undefined) {
      if (!plain(g.prices)) invalid('分组价格不正确');
      for (const [mid, p] of Object.entries(g.prices)) {
        if (!g.modelIds.includes(mid) || !plain(p)) invalid('分组价格对应的模型不正确');
        if (p.originalUsd !== undefined && !plain(p.originalUsd)) invalid('美元原价不正确');
        prices[mid] = {
          ...(p.originalUsd
            ? {
                originalUsd: {
                  input: num(p.originalUsd.input, '输入美元原价'),
                  output: num(p.originalUsd.output, '输出美元原价'),
                  cache: num(p.originalUsd.cache, '缓存美元原价'),
                },
              }
            : {}),
          input: num(p.input, '分组输入价'),
          output: num(p.output, '分组输出价'),
          cache: num(p.cache, '分组缓存价'),
        };
      }
    }
    const referenceMultiplier =
      g.referenceMultiplier === undefined ? 1 : num(g.referenceMultiplier, '参考倍率', false);
    if (referenceMultiplier < 0.000001) invalid('参考倍率不能小于 0.000001');
    const priceBasis = g.priceBasis || 'official';
    if (!['observed', 'configured', 'official'].includes(priceBasis)) invalid('价格类型不正确');
    return {
      id,
      name,
      multiplier,
      prices,
      referenceMultiplier,
      priceBasis,
      priceDate: str(g.priceDate || '', '价格日期', 20),
      description: str(g.description, '分组说明', 200),
      enabled: flag(g.enabled),
      modelIds: g.modelIds,
    };
  });
  return {
    divisor,
    models,
    groups,
    importVersion: str(data.importVersion || '', '导入版本', 80),
    portalRevision: str(data.portalRevision || '', '目录版本', 80),
  };
}
export async function readCatalog(db) {
  if (!db) throw new Error('Database binding unavailable');
  const row = await db
    .prepare('SELECT data, revision, updated_at FROM catalog WHERE id = ?')
    .bind('main')
    .first();
  return row
    ? {
        data: withPriceImport(JSON.parse(row.data)),
        revision: row.revision,
        updatedAt: row.updated_at,
      }
    : { data: structuredClone(seed), revision: 0, updatedAt: null };
}
export function publicCatalog(value) {
  const models = value.data.models.filter((m) => m.enabled);
  const ids = new Set(models.map((m) => m.id));
  return {
    revision: value.revision,
    updatedAt: value.updatedAt,
    data: {
      importVersion: value.data.importVersion,
      divisor: value.data.divisor,
      models,
      groups: value.data.groups
        .filter((g) => g.enabled)
        .map((g) => ({ ...g, modelIds: g.modelIds.filter((id) => ids.has(id)) })),
    },
  };
}
export function isAdmin(request, env) {
  return Boolean(
    request.headers.get('oai-authenticated-user-id') &&
    env.ADMIN_EMAIL &&
    request.headers.get('oai-authenticated-user-email')?.toLowerCase() ===
      env.ADMIN_EMAIL.toLowerCase(),
  );
}
const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });

export async function handleAPI(request, env) {
  const url = new URL(request.url),
    admin = isAdmin(request, env);
  if (url.pathname === '/api/session')
    return json({
      isAdmin: admin,
      signedIn: Boolean(request.headers.get('oai-authenticated-user-id')),
    });
  if (url.pathname === '/api/catalog' && request.method === 'GET') {
    try {
      return json(publicCatalog(await readCatalog(env.DB)));
    } catch (error) {
      console.error('Catalog load failed', error.message);
      return json({ error: '模型目录暂时无法加载，请稍后重试。' }, 503);
    }
  }
  if (url.pathname !== '/api/admin/catalog') return json({ error: '页面不存在' }, 404);
  if (!admin)
    return json(
      {
        error: request.headers.get('oai-authenticated-user-id')
          ? '此账号没有管理权限。'
          : '请先登录管理账号。',
      },
      request.headers.get('oai-authenticated-user-id') ? 403 : 401,
    );
  try {
    if (request.method === 'GET') return json(await readCatalog(env.DB));
    if (request.method !== 'PUT') return json({ error: '不支持的操作' }, 405);
    if (
      request.headers.get('sec-fetch-site') === 'cross-site' ||
      (request.headers.get('origin') && request.headers.get('origin') !== url.origin)
    )
      return json({ error: '请求来源不正确' }, 403);
    if (!request.headers.get('content-type')?.startsWith('application/json'))
      return json({ error: '请使用 JSON 提交数据' }, 415);
    if (Number(request.headers.get('content-length')) > 1_000_000)
      return json({ error: '目录数据过大' }, 413);
    const raw = await request.text();
    if (raw.length > 1_000_000) return json({ error: '目录数据过大' }, 413);
    let body;
    try {
      body = JSON.parse(raw);
    } catch {
      return json({ error: '数据格式不正确' }, 400);
    }
    if (!plain(body) || !Number.isSafeInteger(body.revision) || body.revision < 0)
      return json({ error: '目录版本不正确' }, 400);
    const data = validateCatalog(body.data),
      date = new Date().toISOString(),
      user = request.headers.get('oai-authenticated-user-id');
    const result =
      body.revision === 0
        ? await env.DB.prepare(
            'INSERT INTO catalog (id, data, revision, updated_at, updated_by) VALUES (?, ?, ?, ?, ?) ON CONFLICT(id) DO NOTHING',
          )
            .bind('main', JSON.stringify(data), 1, date, user)
            .run()
        : await env.DB.prepare(
            'UPDATE catalog SET data = ?, revision = revision + 1, updated_at = ?, updated_by = ? WHERE id = ? AND revision = ?',
          )
            .bind(JSON.stringify(data), date, user, 'main', body.revision)
            .run();
    if (result.meta.changes !== 1)
      return json({ error: '目录已在其他页面更新。请先备份当前内容，再重新加载最新目录。' }, 409);
    return json({ data, revision: body.revision + 1, updatedAt: date });
  } catch (error) {
    if (error.status === 400) return json({ error: error.message }, 400);
    console.error('Catalog save failed', error.message);
    return json({ error: '暂时无法保存，你填写的内容仍保留在页面中，请稍后重试。' }, 503);
  }
}
