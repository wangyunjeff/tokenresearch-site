// Both the public cards and the editor use this calculation.
// Imported prices are RMB per million tokens at referenceMultiplier.
export function modelPrice(model, group, divisor) {
  const entry = group.prices?.[model.id];
  const factor =
    group.multiplier == null
      ? null
      : entry
        ? group.multiplier / (group.referenceMultiplier || 1)
        : group.multiplier / divisor;
  const scale = (value) => (value == null || factor == null ? null : value * factor);
  return entry
    ? { input: scale(entry.input), output: scale(entry.output), cache: scale(entry.cache) }
    : {
        input: scale(model.inputUsd),
        output: scale(model.outputUsd),
        cache: scale(model.cacheReadUsd),
      };
}
export function formatPrice(value) {
  if (value == null) return '—';
  if (value !== 0 && Math.abs(value) < 0.000001)
    return value.toExponential(2).replace(/\.?0+e/, 'e');
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 6, useGrouping: false }).format(
    value,
  );
}

export function originalDollarPrice(model, group) {
  const entry = group.prices?.[model.id];
  if (entry) return entry.originalUsd || { input: null, output: null, cache: null };
  return { input: model.inputUsd, output: model.outputUsd, cache: model.cacheReadUsd };
}
