import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ConfStorageAdapter } from '../../../src/infrastructure/storage/ConfStorageAdapter';

vi.mock('conf', () => {
  const mockConfig = {
    get: vi.fn(),
    set: vi.fn(),
  };
  return { default: vi.fn(() => mockConfig) };
});

vi.mock('conf', () => ({
  default: vi.fn().mockImplementation(() => ({
    get: vi.fn((key: string) => {
      if (key === 'owned' || key === 'duplicates') return {};
      return {};
    }),
    set: vi.fn(),
  })),
}));

describe('ConfStorageAdapter', () => {
  let adapter: ConfStorageAdapter;

  beforeEach(() => {
    adapter = new ConfStorageAdapter('test-panini');
  });

  describe('load', () => {
    it('should load collection state from storage', async () => {
      const state = await adapter.load();

      expect(state).toBeDefined();
      expect(state.owned).toEqual({});
      expect(state.duplicates).toEqual({});
    });
  });

  describe('save', () => {
    it('should save collection state to storage', async () => {
      const { CollectionState } = await import('../../../src/domain/entities/CollectionState');
      const state = new CollectionState({ owned: { 'MEX-01': 1 } });

      await adapter.save(state);
    });
  });
});