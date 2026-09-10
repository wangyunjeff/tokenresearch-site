export type Amounts = { input: number | null; output: number | null; cache: number | null };
export type CatalogModel = {
  id: string;
  code: string;
  name: string;
  provider: string;
  description: string;
  unit: 'tokens' | 'request';
  inputUsd: number | null;
  outputUsd: number | null;
  cacheReadUsd: number | null;
  cacheWriteUsd: number | null;
  scope: string;
  source: string;
  verifiedAt: string;
  enabled: boolean;
};
export type CatalogGroup = {
  id: string;
  name: string;
  multiplier: number | null;
  description: string;
  enabled: boolean;
  modelIds: string[];
  prices?: Record<string, Amounts & { originalUsd?: Amounts }>;
  referenceMultiplier?: number;
  priceBasis?: 'observed' | 'configured' | 'official';
  priceDate?: string;
};
export type Catalog = {
  divisor: number;
  models: CatalogModel[];
  groups: CatalogGroup[];
  importVersion?: string;
  portalRevision?: string;
};
export type CatalogResponse = { data: Catalog; revision: number; updatedAt: string | null };
export async function requestCatalog(admin = false): Promise<CatalogResponse> {
  const response = await fetch(admin ? '/api/admin/catalog' : '/api/catalog', {
    cache: 'no-store',
  });
  const body = await response.json();
  if (!response.ok) throw new Error(body.error || '目录暂时无法加载');
  return body;
}
