import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ResetCollectionCommand } from '../../../src/application/commands/ResetCollectionCommand';
import type { CollectionRepository } from '../../../src/domain/repositories/CollectionRepository';
import { CollectionState } from '../../../src/domain/entities/CollectionState';

describe('ResetCollectionCommand', () => {
  let mockRepository: CollectionRepository;
  let command: ResetCollectionCommand;
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
    command = new ResetCollectionCommand(mockRepository);
  });

  describe('execute', () => {
    it('should reset all collection data', async () => {
      await command.execute();

      expect(state.owned).toEqual({});
      expect(state.duplicates).toEqual({});
      expect(mockRepository.save).toHaveBeenCalledWith(state);
    });
  });
});