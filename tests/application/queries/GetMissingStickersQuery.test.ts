import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetMissingStickersQuery } from '../../../src/application/queries/GetMissingStickersQuery';
import type { CollectionRepository } from '../../../src/domain/repositories/CollectionRepository';
import { CollectionState } from '../../../src/domain/entities/CollectionState';
import { Sticker } from '../../../src/domain/entities/Sticker';
import { StickerType } from '../../../src/domain/value-objects/StickerType';

vi.mock('../../../src/data/stickers', () => ({
  getAllStickers: () => [
    new Sticker({ id: 'MEX1', name: 'Escudo', team: 'Mexico', type: StickerType.TEAM_BADGE }),
    new Sticker({ id: 'MEX2', name: 'Player 1', team: 'Mexico', type: StickerType.PLAYER }),
    new Sticker({ id: 'RSA1', name: 'Escudo', team: 'South Africa', type: StickerType.TEAM_BADGE }),
    new Sticker({ id: 'FWC1', name: 'Special', team: 'FIFA World Cup 2026', type: StickerType.FWC_SPECIAL }),
  ],
}));

describe('GetMissingStickersQuery', () => {
  let mockRepository: CollectionRepository;
  let query: GetMissingStickersQuery;
  let state: CollectionState;

  beforeEach(() => {
    state = new CollectionState({ owned: { 'MEX1': 1 } });
    mockRepository = {
      load: vi.fn().mockResolvedValue(state),
      save: vi.fn().mockResolvedValue(undefined),
    };
    query = new GetMissingStickersQuery(mockRepository);
  });

  describe('execute', () => {
    it('should return all missing stickers', async () => {
      const missing = await query.execute();

      expect(missing.length).toBe(3);
      expect(missing.map(s => s.id)).toEqual(['MEX2', 'RSA1', 'FWC1']);
    });

    it('should filter by type', async () => {
      const missing = await query.execute({ type: 'player' });

      expect(missing.length).toBe(1);
      expect(missing[0].id).toBe('MEX2');
    });

    it('should filter by type for team badges', async () => {
      const missing = await query.execute({ type: 'team_badge' });

      expect(missing.length).toBe(1);
      expect(missing[0].id).toBe('RSA1');
    });

    it('should filter by type for FWC special', async () => {
      const missing = await query.execute({ type: 'fwc_special' });

      expect(missing.length).toBe(1);
      expect(missing[0].id).toBe('FWC1');
    });
  });
});