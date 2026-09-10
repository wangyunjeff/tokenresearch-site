import snapshot from './data/price-snapshot.json' with { type: 'json' };

const portalRevision = 'catalog-groups-2026-09-11-model-audit';
const removedGroups = new Set([
  'sub2api-protocol-openai',
  'sub2api-protocol-anthropic',
  'sub2api-50',
]);
const openAIModels = [
  'codex-auto-review',
  'gpt-5.3-codex-spark',
  'gpt-5.5',
  'gpt-5.6-sol',
  'gpt-5.6-terra',
  'gpt-6-astra',
  'gpt-5.6-luna',
];
const anthropicModels = [
  'claude-haiku-4-5-20251001',
  'claude-opus-4-20250514',
  'claude-opus-4-5-20251101',
  'claude-opus-4-6',
  'claude-opus-4-7',
  'claude-opus-4-8',
  'claude-opus-5',
  'claude-sonnet-4-20250514',
  'claude-sonnet-4-5-20250929',
  'claude-sonnet-4-6',
  'claude-sonnet-5',
];
const domesticModels = [
  'MiniMax-M2.7',
  'MiniMax-M2.7-highspeed',
  'MiniMax-M3',
  'deepseek-v4-flash',
  'deepseek-v4-flash-0731',
  'deepseek-v4-pro',
  'deepseek-v4-pro-0813',
  'doubao-seed-2-1-pro',
  'doubao-seed-2-1-turbo',
  'glm-5.1',
  'glm-5.2',
  'glm-5.2-fast-preview',
  'glm-5.3',
  'glm-5.3-flash',
  'kimi-k2.5',
  'kimi-k2.6',
  'kimi-k2.7-code',
  'kimi-k3',
  'mimo-v2.5-pro',
  'qwen3.6-flash',
  'qwen3.6-plus',
  'qwen3.7-flash',
  'qwen3.7-max',
  'qwen3.7-plus',
  'qwen3.8-flash',
  'qwen3.8-max',
];
const grokModels = [
  'grok',
  'grok-4.5',
  'grok-4.5-latest',
  'grok-4.6',
  'grok-4.6-latest',
  'grok-latest',
];
const domesticProviders = {
  MiniMax: new Set(['MiniMax-M2.7', 'MiniMax-M2.7-highspeed', 'MiniMax-M3']),
  DeepSeek: new Set(['deepseek-v4-flash', 'deepseek-v4-flash-0731', 'deepseek-v4-pro', 'deepseek-v4-pro-0813']),
  豆包: new Set(['doubao-seed-2-1-pro', 'doubao-seed-2-1-turbo']),
  智谱: new Set(['glm-5.1', 'glm-5.2', 'glm-5.2-fast-preview', 'glm-5.3', 'glm-5.3-flash']),
  Moonshot: new Set(['kimi-k2.5', 'kimi-k2.6', 'kimi-k2.7-code', 'kimi-k3']),
  小米: new Set(['mimo-v2.5-pro']),
  通义千问: new Set(['qwen3.6-flash', 'qwen3.6-plus', 'qwen3.7-flash', 'qwen3.7-max', 'qwen3.7-plus', 'qwen3.8-flash', 'qwen3.8-max']),
};
const curatedGroups = new Map([
  ['sub2api-2', { name: '【OpenAI】plus', models: openAIModels }],
  ['sub2api-13', { name: '【OpenAI】pro', models: openAIModels }],
  [
    'sub2api-32',
    { name: '【OpenAI】薅资本主义羊毛（慈禧太后已经付过钱了）', models: openAIModels },
  ],
  ['sub2api-42', { name: '【OpenAI】pro快速通道', models: openAIModels }],
  ['sub2api-35', { name: '【Anthropic】kiro-高缓存1m上下文', models: anthropicModels }],
  ['sub2api-56', { name: '【Anthropic】Kiro-claude正价版', models: anthropicModels }],
  ['sub2api-30', { name: '【Anthropic】claude-max满血', models: anthropicModels }],
  ['sub2api-59', { name: '【国产模型补贴】', models: domesticModels }],
  ['sub2api-60', { name: '【国产模型】', models: domesticModels }],
  ['sub2api-39', { name: '【Grok】Grok-heavy', models: grokModels }],
]);
const supplementalModels = [
  'claude-opus-4-5-20251101',
  'claude-sonnet-4-5-20250929',
].map((code) => ({
  id: `portal-${code}`,
  code,
  name: code,
  provider: 'Anthropic',
  description: '围绕长篇材料、研究写作与代码展开协作。',
  unit: 'tokens',
  inputUsd: null,
  outputUsd: null,
  cacheReadUsd: null,
  cacheWriteUsd: null,
  scope: '',
  source: '',
  verifiedAt: '2026-09-11',
  enabled: true,
}));
function upgradePortal(data) {
  if (data.portalRevision === portalRevision) return data;
  const result = structuredClone(data);
  result.groups = result.groups.filter((g) => !removedGroups.has(g.id));
  const modelsByCode = new Map(result.models.map((model) => [model.code, model]));
  const modelsById = new Map(result.models.map((model) => [model.id, model]));
  for (const code of new Set([...openAIModels, ...anthropicModels, ...domesticModels, ...grokModels])) {
    if (modelsByCode.has(code)) continue;
    const source =
      snapshot.models.find((model) => model.code === code) ||
      supplementalModels.find((model) => model.code === code) ||
      {
        id: `portal-${code}`,
        code,
        name: code,
        provider:
          Object.entries(domesticProviders).find(([, codes]) => codes.has(code))?.[0] ||
          (grokModels.includes(code) ? 'xAI' : '未知'),
        description: '模型可见于当前目录；价格待核对。',
        unit: 'tokens',
        inputUsd: null,
        outputUsd: null,
        cacheReadUsd: null,
        cacheWriteUsd: null,
        scope: '',
        source: '',
        verifiedAt: '2026-09-11',
        enabled: true,
      };
    const existing = modelsById.get(source.id);
    if (existing) {
      modelsByCode.set(code, existing);
      continue;
    }
    const model = structuredClone(source);
    result.models.push(model);
    modelsByCode.set(code, model);
    modelsById.set(model.id, model);
  }
  for (const group of result.groups) {
    const curated = curatedGroups.get(group.id);
    if (!curated) continue;
    group.name = curated.name;
    group.modelIds = curated.models.map((code) => modelsByCode.get(code).id);
    const allowed = new Set(group.modelIds);
    group.prices = Object.fromEntries(
      Object.entries(group.prices || {}).filter(([id]) => allowed.has(id)),
    );
  }
  for (const group of result.groups) {
    const originalGroup = snapshot.groups.find((g) => g.id === group.id);
    if (!originalGroup) continue;
    for (const [id, entry] of Object.entries(group.prices || {})) {
      if (entry.originalUsd) continue;
      const originalModel =
        snapshot.models.find((m) => m.id === id) ||
        snapshot.models.find((m) => m.code === modelsById.get(id)?.code);
      const original = originalGroup.prices?.[originalModel?.id];
      if (!original) continue;
      // Source: database USD × multiplier / 5 = recorded CNY. Freeze the USD
      // baseline from the immutable source, independently of later CNY edits.
      entry.originalUsd = Object.fromEntries(
        ['input', 'output', 'cache'].map((key) => [
          key,
          original[key] == null
            ? null
            : Number(((original[key] * 5) / originalGroup.referenceMultiplier).toPrecision(12)),
        ]),
      );
    }
  }
  result.portalRevision = portalRevision;
  return result;
}
export const seed = upgradePortal(snapshot);
// Apply this supplied snapshot once. A later owner save preserves edits/deletions.
// Existing custom models and groups remain intact.
export function withPriceImport(data) {
  if (data.importVersion === snapshot.importVersion) return upgradePortal(data);
  const result = structuredClone(data);
  const codeMap = new Map(result.models.map((model) => [model.code, model.id]));
  const importedIds = new Map();
  for (const model of snapshot.models) {
    const id = codeMap.get(model.code) || model.id;
    importedIds.set(model.id, id);
    if (!codeMap.has(model.code)) result.models.push({ ...model, id });
  }
  const groupIds = new Set(result.groups.map((group) => group.id));
  const groupNames = new Set(result.groups.map((group) => group.name.trim().toLowerCase()));
  for (const group of snapshot.groups) {
    if (!groupIds.has(group.id)) {
      let name = group.name;
      let suffix = 1;
      while (groupNames.has(name.toLowerCase())) {
        name = `${group.name} · 2026-09-10${suffix > 1 ? ` (${suffix})` : ''}`;
        suffix++;
      }
      groupNames.add(name.toLowerCase());
      result.groups.push({
        ...structuredClone(group),
        name,
        modelIds: group.modelIds.map((id) => importedIds.get(id)),
        prices: Object.fromEntries(
          Object.entries(group.prices).map(([id, price]) => [importedIds.get(id), price]),
        ),
      });
    }
  }
  result.importVersion = snapshot.importVersion;
  return upgradePortal(result);
}
