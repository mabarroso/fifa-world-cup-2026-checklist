import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetMissingStickersQuery } from '../../../src/application/queries/GetMissingStickersQuery';
import type { CollectionRepository } from '../../../src/domain/repositories/CollectionRepository';
import { CollectionState } from '../../../src/domain/entities/CollectionState';
import { Sticker } from '../../../src/domain/entities/Sticker';
import { StickerType } from '../../../src/domain/value-objects/StickerType';

vi.mock('../../../src/data/stickers', () => ({
  getAllStickers: () => [
    new Sticker({ id: 'MEX-01', number: 1, name: 'Escudo', team: 'Mexico', teamCode: 'MEX', group: 'A', type: StickerType.TEAM_BADGE, extraVariant: null }),
    new Sticker({ id: 'MEX-02', number: 2, name: 'Player 1', team: 'Mexico', teamCode: 'MEX', group: 'A', type: StickerType.PLAYER, extraVariant: null }),
    new Sticker({ id: 'RSA-01', number: 1, name: 'Escudo', team: 'South Africa', teamCode: 'RSA', group: 'A', type: StickerType.TEAM_BADGE, extraVariant: null }),
    new Sticker({ id: 'FWC-01', number: 1, name: 'Special', team: 'FIFA', teamCode: 'FWC', group: null, type: StickerType.FWC_SPECIAL, extraVariant: null }),
  ],
}));

describe('GetMissingStickersQuery', () => {
  let mockRepository: CollectionRepository;
  let query: GetMissingStickersQuery;
  let state: CollectionState;

  beforeEach(() => {
    state = new CollectionState({ owned: { 'MEX-01': 1 } });
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
      expect(missing.map(s => s.id)).toEqual(['MEX-02', 'RSA-01', 'FWC-01']);
    });

    it('should filter by group', async () => {
      const missing = await query.execute({ group: 'A' });

      expect(missing.length).toBe(2);
    });

    it('should filter by team', async () => {
      const missing = await query.execute({ team: 'MEX' });

      expect(missing.length).toBe(1);
      expect(missing[0].id).toBe('MEX-02');
    });

    it('should filter by type', async () => {
      const missing = await query.execute({ type: 'player' });

      expect(missing.length).toBe(1);
      expect(missing[0].id).toBe('MEX-02');
    });
  });
});