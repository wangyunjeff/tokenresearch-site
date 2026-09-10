import snapshot from './data/price-snapshot.json' with { type: 'json' };

const portalRevision = 'entry-2026-09-10';
const removedGroups = new Set([
  'sub2api-protocol-openai',
  'sub2api-protocol-anthropic',
  'sub2api-50',
]);
function upgradePortal(data) {
  if (data.portalRevision === portalRevision) return data;
  const result = structuredClone(data);
  result.groups = result.groups.filter((g) => !removedGroups.has(g.id));
  const modelsById = new Map(result.models.map((m) => [m.id, m]));
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
