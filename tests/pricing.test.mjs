import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { seed, withPriceImport } from '../server/import-catalog.js';
import { validateCatalog, publicCatalog } from '../server/catalog.js';
import snapshot from '../server/data/price-snapshot.json' with { type: 'json' };
import { modelPrice, formatPrice, originalDollarPrice } from '../server/pricing.js';
const model = (code) => seed.models.find((m) => m.code === code);
const group = (id) => seed.groups.find((g) => g.id === 'sub2api-' + id);
const approx = (actual, expected) =>
  assert.ok(Math.abs(actual - expected) < 1e-10, `${actual} != ${expected}`);
test('all 166 observed records match the supplied source; null and zero stay distinct', async () => {
  const text = await readFile(
    new URL('../server/data/sub2api-model-prices-20260910.md', import.meta.url),
    'utf8',
  );
  let current,
    count = 0;
  for (const line of text.split('\n')) {
    const header = line.match(/group_id=(\d+)/);
    if (header) current = snapshot.groups.find((g) => g.id === 'sub2api-' + header[1]);
    if (!line.startsWith('| token |')) continue;
    const [, , input, cache, output, codes] = line.split('|').map((s) => s.trim());
    for (const code of codes.split(', ')) {
      const p = modelPrice(model(code), current, seed.divisor);
      for (const [key, raw] of Object.entries({ input, cache, output }))
        raw === '-' ? assert.equal(p[key], null) : approx(p[key], Number(raw) * 1e6);
      count++;
    }
  }
  assert.equal(count, 166);
  assert.equal(seed.models.length, 85);
  assert.equal(seed.groups.length, 10);
  assert.equal(formatPrice(modelPrice(model('deepseek-v4-flash'), group(59), 35).cache), '0.00014');
  assert.equal(modelPrice(model('qwen3.8-max-0902'), group(59), 35).cache, 0);
  assert.equal(modelPrice(model('qwen3.8-max'), group(59), 35).cache, null);
  for (const protocol of ['openai', 'anthropic'])
    assert.deepEqual(
      modelPrice(
        model('glm-5.2'),
        snapshot.groups.find((g) => g.id === 'sub2api-protocol-' + protocol),
        35,
      ),
      {
        input: 1.92,
        cache: 0.48,
        output: 6.72,
      },
    );
});
test('changing an imported multiplier scales once; manual USD prices keep the divisor rule', () => {
  const g = { ...group(2), multiplier: 1.5 };
  const actual = modelPrice(model('gpt-6-astra'), g, 35);
  approx(actual.input, 3);
  approx(actual.output, 15);
  approx(actual.cache, 0.3);
  assert.deepEqual(
    modelPrice(
      { id: 'manual', inputUsd: 3.5, outputUsd: 7, cacheReadUsd: 0 },
      { multiplier: 1.5 },
      35,
    ),
    { input: 0.15, output: 0.3, cache: 0 },
  );
});
test('validation and public filtering preserve group overrides and case-sensitive model IDs', () => {
  const data = validateCatalog(structuredClone(seed));
  assert.equal(data.models.length, 85);
  assert.ok(model('GPT-5.5'));
  assert.ok(model('gpt-5.5'));
  assert.deepEqual(
    publicCatalog({ data, revision: 1, updatedAt: null }).data.groups[0].prices,
    data.groups[0].prices,
  );
  const invalid = structuredClone(data);
  invalid.groups[0].referenceMultiplier = 0;
  assert.throws(() => validateCatalog(invalid), /参考倍率/);
});
test('import preserves custom records and never reapplies after an owner saves edits', () => {
  const initial = {
    divisor: 40,
    models: [{ ...model('gpt-6-astra'), id: 'custom-model', description: 'Owner description' }],
    groups: [
      {
        id: 'owner-group',
        name: 'Owner group',
        multiplier: 3,
        description: '',
        enabled: true,
        modelIds: ['custom-model'],
      },
    ],
  };
  const migrated = withPriceImport(initial);
  assert.equal(initial.models.length, 1);
  assert.equal(migrated.divisor, 40);
  assert.equal(
    migrated.models.find((m) => m.id === 'custom-model').description,
    'Owner description',
  );
  assert.ok(migrated.groups.find((g) => g.id === 'sub2api-2').prices['custom-model']);
  assert.ok(migrated.groups.some((g) => g.id === 'owner-group'));
  const saved = validateCatalog(migrated);
  saved.groups = saved.groups.filter((g) => g.id !== 'sub2api-2');
  assert.equal(
    withPriceImport(saved).groups.some((g) => g.id === 'sub2api-2'),
    false,
  );
});

test('import resolves group-name collisions without renaming owner groups', () => {
  const existing = {
    divisor: 35,
    models: [],
    groups: [
      {
        id: 'owner-plus',
        name: 'plus',
        description: 'Owner group',
        multiplier: 2,
        enabled: true,
        modelIds: [],
      },
    ],
  };
  const result = validateCatalog(withPriceImport(existing));
  assert.equal(result.groups.find((g) => g.id === 'owner-plus').name, 'plus');
  assert.equal(result.groups.find((g) => g.id === 'sub2api-2').name, '【OpenAI】plus');
  assert.equal(new Set(result.groups.map((g) => g.name)).size, 11);
});

test('very small configured prices remain nonzero in display', () => {
  assert.equal(formatPrice(1.4e-9), '1.4e-9');
  assert.equal(formatPrice(0), '0');
});

test('portal update curates provider groups and preserves owner records and multipliers', () => {
  const original = structuredClone(snapshot);
  original.groups.push({
    id: 'mine',
    name: '我的分组',
    modelIds: [],
    multiplier: 2,
    enabled: true,
    description: '',
  });
  const migrated = withPriceImport(original);
  for (const id of ['sub2api-50', 'sub2api-protocol-openai', 'sub2api-protocol-anthropic'])
    assert.ok(!migrated.groups.some((g) => g.id === id));
  assert.equal(migrated.groups.find((g) => g.id === 'mine').multiplier, 2);
  for (const g of migrated.groups.filter((g) => g.id !== 'mine'))
    assert.equal(g.multiplier, snapshot.groups.find((old) => old.id === g.id).multiplier);
  assert.equal(original.groups.length, 14);
  const codes = (id) => {
    const ids = migrated.groups.find((g) => g.id === id).modelIds;
    return ids.map((modelId) => migrated.models.find((m) => m.id === modelId).code);
  };
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
  for (const [id, name] of [
    ['sub2api-2', '【OpenAI】plus'],
    ['sub2api-13', '【OpenAI】pro'],
    ['sub2api-32', '【OpenAI】薅资本主义羊毛（慈禧太后已经付过钱了）'],
    ['sub2api-42', '【OpenAI】pro快速通道'],
  ]) {
    assert.equal(migrated.groups.find((g) => g.id === id).name, name);
    assert.deepEqual(codes(id), openAIModels);
  }
  for (const [id, name] of [
    ['sub2api-35', '【Anthropic】kiro-高缓存1m上下文'],
    ['sub2api-56', '【Anthropic】Kiro-claude正价版'],
    ['sub2api-30', '【Anthropic】claude-max满血'],
  ]) {
    assert.equal(migrated.groups.find((g) => g.id === id).name, name);
    assert.deepEqual(codes(id), anthropicModels);
  }
  for (const code of ['claude-opus-4-5-20251101', 'claude-sonnet-4-5-20250929'])
    assert.equal(migrated.models.find((m) => m.code === code).provider, 'Anthropic');
  for (const group of migrated.groups)
    assert.ok(Object.keys(group.prices || {}).every((id) => group.modelIds.includes(id)));
  const saved = validateCatalog(migrated);
  assert.equal(withPriceImport(saved), saved);
});

test('USD originals come from the immutable source and remain stable after CNY and multiplier edits', () => {
  const m = model('gpt-6-astra');
  const g = structuredClone(group(2));
  assert.deepEqual(originalDollarPrice(m, g), { input: 10, output: 50, cache: 1 });
  g.multiplier = 1.5;
  assert.deepEqual(originalDollarPrice(m, g), { input: 10, output: 50, cache: 1 });
  approx(modelPrice(m, g, 35).input, 3);
  g.prices[m.id].input = 99;
  assert.equal(originalDollarPrice(m, g).input, 10);
  const draft = structuredClone(seed);
  draft.groups = [g];
  assert.deepEqual(validateCatalog(draft).groups[0].prices[m.id].originalUsd, {
    input: 10,
    output: 50,
    cache: 1,
  });
  const old = structuredClone(snapshot);
  old.groups.find((g) => g.id === 'sub2api-2').prices[m.id].input = 99;
  const updated = withPriceImport(old).groups.find((g) => g.id === 'sub2api-2');
  assert.equal(updated.prices[m.id].input, 99);
  assert.equal(updated.prices[m.id].originalUsd.input, 10);
});

test('renamed imported model still receives its original USD baseline', () => {
  const old = structuredClone(snapshot),
    astra = old.models.find((m) => m.code === 'gpt-6-astra');
  astra.code = 'my-astra';
  const updated = withPriceImport(old);
  assert.equal(
    updated.groups.find((g) => g.id === 'sub2api-2').prices[astra.id].originalUsd.input,
    10,
  );
});
