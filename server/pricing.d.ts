import type { CatalogModel, CatalogGroup } from '../src/portal/catalog';
export function modelPrice(
  model: CatalogModel,
  group: CatalogGroup,
  divisor: number,
): { input: number | null; output: number | null; cache: number | null };
export function formatPrice(value: number | null): string;

export function originalDollarPrice(
  model: CatalogModel,
  group: CatalogGroup,
): { input: number | null; output: number | null; cache: number | null };
