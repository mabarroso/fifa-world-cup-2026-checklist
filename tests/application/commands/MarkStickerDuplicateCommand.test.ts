import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MarkStickerDuplicateCommand } from '../../../src/application/commands/MarkStickerDuplicateCommand';
import type { CollectionRepository } from '../../../src/domain/repositories/CollectionRepository';
import { CollectionState } from '../../../src/domain/entities/CollectionState';

describe('MarkStickerDuplicateCommand', () => {
  let mockRepository: CollectionRepository;
  let command: MarkStickerDuplicateCommand;
  let state: CollectionState;

  beforeEach(() => {
    state = new CollectionState();
    mockRepository = {
      load: vi.fn().mockResolvedValue(state),
      save: vi.fn().mockResolvedValue(undefined),
    };
    command = new MarkStickerDuplicateCommand(mockRepository);
  });

  describe('execute', () => {
    it('should mark sticker as duplicate', async () => {
      await command.execute('MEX-02');

      expect(state.duplicates['MEX-02']).toBe(1);
      expect(mockRepository.save).toHaveBeenCalledWith(state);
    });

    it('should mark sticker as duplicate with custom quantity', async () => {
      await command.execute('MEX-02', 3);

      expect(state.duplicates['MEX-02']).toBe(3);
    });
  });

  describe('undo', () => {
    it('should decrement duplicate quantity', async () => {
      state.markDuplicate('MEX-02', 3);
      await command.undo('MEX-02', 1);

      expect(state.duplicates['MEX-02']).toBe(2);
    });
  });
});