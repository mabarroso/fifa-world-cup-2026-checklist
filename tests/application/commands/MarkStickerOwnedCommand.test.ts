import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MarkStickerOwnedCommand } from '../../../src/application/commands/MarkStickerOwnedCommand';
import type { CollectionRepository } from '../../../src/domain/repositories/CollectionRepository';
import { CollectionState } from '../../../src/domain/entities/CollectionState';

describe('MarkStickerOwnedCommand', () => {
  let mockRepository: CollectionRepository;
  let command: MarkStickerOwnedCommand;
  let state: CollectionState;

  beforeEach(() => {
    state = new CollectionState();
    mockRepository = {
      load: vi.fn().mockResolvedValue(state),
      save: vi.fn().mockResolvedValue(undefined),
    };
    command = new MarkStickerOwnedCommand(mockRepository);
  });

  describe('execute', () => {
    it('should mark sticker as owned with quantity 1', async () => {
      await command.execute('MEX-01');

      expect(state.owned['MEX-01']).toBe(1);
      expect(mockRepository.save).toHaveBeenCalledWith(state);
    });

    it('should mark sticker as owned with custom quantity', async () => {
      await command.execute('MEX-02', 3);

      expect(state.owned['MEX-02']).toBe(3);
    });

    it('should increment existing owned quantity', async () => {
      state.markOwned('MEX-01', 2);
      await command.execute('MEX-01', 1);

      expect(state.owned['MEX-01']).toBe(3);
    });
  });

  describe('undo', () => {
    it('should decrement owned quantity', async () => {
      state.markOwned('MEX-01', 3);
      await command.undo('MEX-01', 1);

      expect(state.owned['MEX-01']).toBe(2);
    });

    it('should remove sticker when quantity reaches zero', async () => {
      state.markOwned('MEX-01', 1);
      await command.undo('MEX-01', 1);

      expect(state.owned['MEX-01']).toBeUndefined();
    });
  });
});