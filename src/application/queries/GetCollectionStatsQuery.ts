import type { CollectionRepository } from '../../domain/repositories/CollectionRepository';
import { getAllStickers } from '../../data/stickers';

export interface CollectionStats {
  total: number;
  owned: number;
  missing: number;
  duplicates: number;
  percentage: number;
}

export class GetCollectionStatsQuery {
  constructor(private repository: CollectionRepository) {}

  async execute(): Promise<CollectionStats> {
    const state = await this.repository.load();
    const allStickers = getAllStickers();
    const total = allStickers.length;
    const owned = state.getTotalOwned();
    const duplicates = state.getTotalDuplicates();
    const missing = total - owned;

    const uniqueOwned = Object.keys(state.owned).length;
    const percentage = total > 0 ? Math.round((uniqueOwned / total) * 100) : 0;

    return {
      total,
      owned,
      missing,
      duplicates,
      percentage,
    };
  }
}