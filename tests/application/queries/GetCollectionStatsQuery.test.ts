import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetCollectionStatsQuery } from '../../../src/application/queries/GetCollectionStatsQuery';
import type { CollectionRepository } from '../../../src/domain/repositories/CollectionRepository';
import { CollectionState } from '../../../src/domain/entities/CollectionState';

vi.mock('../../../src/data/stickers', () => ({
  getAllStickers: () => [
    { id: 'MEX-01' },
    { id: 'MEX-02' },
    { id: 'RSA-01' },
    { id: 'FWC-01' },
  ],
}));

describe('GetCollectionStatsQuery', () => {
  let mockRepository: CollectionRepository;
  let query: GetCollectionStatsQuery;
  let state: CollectionState;

  beforeEach(() => {
    state = new CollectionState({
      owned: { 'MEX-01': 1, 'MEX-02': 2 },
      duplicates: { 'MEX-02': 1 },
    });
    mockRepository = {
      load: vi.fn().mockResolvedValue(state),
      save: vi.fn().mockResolvedValue(undefined),
    };
    query = new GetCollectionStatsQuery(mockRepository);
  });

  describe('execute', () => {
    it('should return collection statistics', async () => {
      const stats = await query.execute();

      expect(stats.total).toBe(4);
      expect(stats.owned).toBe(3);
      expect(stats.missing).toBe(1);
      expect(stats.duplicates).toBe(1);
      expect(stats.percentage).toBe(50);
    });

    it('should handle empty collection', async () => {
      state = new CollectionState();
      mockRepository.load = vi.fn().mockResolvedValue(state);

      const stats = await query.execute();

      expect(stats.total).toBe(4);
      expect(stats.owned).toBe(0);
      expect(stats.missing).toBe(4);
      expect(stats.percentage).toBe(0);
    });
  });
});