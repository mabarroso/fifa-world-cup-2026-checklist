import { describe, it, expect } from 'vitest';
import { CollectionState } from '../../src/domain/entities/CollectionState';

describe('CollectionState', () => {
  describe('creation', () => {
    it('should create with empty maps', () => {
      const state = new CollectionState();
      expect(state.owned).toEqual({});
      expect(state.duplicates).toEqual({});
    });

    it('should create with initial data', () => {
      const state = new CollectionState({
        owned: { 'MEX-01': 1, 'MEX-02': 2 },
        duplicates: { 'MEX-02': 1 },
      });

      expect(state.owned['MEX-01']).toBe(1);
      expect(state.owned['MEX-02']).toBe(2);
      expect(state.duplicates['MEX-02']).toBe(1);
    });
  });

  describe('markOwned', () => {
    it('should mark sticker as owned with quantity 1', () => {
      const state = new CollectionState();
      state.markOwned('MEX-01');

      expect(state.owned['MEX-01']).toBe(1);
    });

    it('should mark sticker as owned with custom quantity', () => {
      const state = new CollectionState();
      state.markOwned('MEX-02', 3);

      expect(state.owned['MEX-02']).toBe(3);
    });

    it('should increment existing owned quantity', () => {
      const state = new CollectionState({ owned: { 'MEX-01': 2 } });
      state.markOwned('MEX-01', 1);

      expect(state.owned['MEX-01']).toBe(3);
    });
  });

  describe('unmarkOwned', () => {
    it('should decrement owned quantity', () => {
      const state = new CollectionState({ owned: { 'MEX-01': 3 } });
      state.unmarkOwned('MEX-01', 1);

      expect(state.owned['MEX-01']).toBe(2);
    });

    it('should remove sticker when quantity reaches zero', () => {
      const state = new CollectionState({ owned: { 'MEX-01': 1 } });
      state.unmarkOwned('MEX-01', 1);

      expect(state.owned['MEX-01']).toBeUndefined();
    });

    it('should remove sticker if decrement goes below zero', () => {
      const state = new CollectionState({ owned: { 'MEX-01': 1 } });
      state.unmarkOwned('MEX-01', 5);

      expect(state.owned['MEX-01']).toBeUndefined();
    });

    it('should do nothing for non-existent sticker', () => {
      const state = new CollectionState();
      state.unmarkOwned('NON-EXISTENT');

      expect(state.owned['NON-EXISTENT']).toBeUndefined();
    });
  });

  describe('markDuplicate', () => {
    it('should mark sticker as duplicate', () => {
      const state = new CollectionState();
      state.markDuplicate('MEX-02');

      expect(state.duplicates['MEX-02']).toBe(1);
    });

    it('should mark sticker as duplicate with custom quantity', () => {
      const state = new CollectionState();
      state.markDuplicate('MEX-02', 3);

      expect(state.duplicates['MEX-02']).toBe(3);
    });

    it('should increment existing duplicate quantity', () => {
      const state = new CollectionState({ duplicates: { 'MEX-02': 2 } });
      state.markDuplicate('MEX-02', 1);

      expect(state.duplicates['MEX-02']).toBe(3);
    });
  });

  describe('unmarkDuplicate', () => {
    it('should decrement duplicate quantity', () => {
      const state = new CollectionState({ duplicates: { 'MEX-02': 3 } });
      state.unmarkDuplicate('MEX-02', 1);

      expect(state.duplicates['MEX-02']).toBe(2);
    });

    it('should remove sticker when quantity reaches zero', () => {
      const state = new CollectionState({ duplicates: { 'MEX-02': 1 } });
      state.unmarkDuplicate('MEX-02', 1);

      expect(state.duplicates['MEX-02']).toBeUndefined();
    });
  });

  describe('getOwnedQuantity', () => {
    it('should return owned quantity', () => {
      const state = new CollectionState({ owned: { 'MEX-02': 3 } });
      expect(state.getOwnedQuantity('MEX-02')).toBe(3);
    });

    it('should return 0 for non-owned sticker', () => {
      const state = new CollectionState();
      expect(state.getOwnedQuantity('MEX-03')).toBe(0);
    });
  });

  describe('getDuplicateQuantity', () => {
    it('should return duplicate quantity', () => {
      const state = new CollectionState({ duplicates: { 'MEX-02': 2 } });
      expect(state.getDuplicateQuantity('MEX-02')).toBe(2);
    });

    it('should return 0 for non-duplicate sticker', () => {
      const state = new CollectionState();
      expect(state.getDuplicateQuantity('MEX-03')).toBe(0);
    });
  });

  describe('reset', () => {
    it('should clear all data', () => {
      const state = new CollectionState({
        owned: { 'MEX-01': 1, 'MEX-02': 2 },
        duplicates: { 'MEX-02': 1 },
      });

      state.reset();

      expect(state.owned).toEqual({});
      expect(state.duplicates).toEqual({});
    });
  });

  describe('getTotalOwned', () => {
    it('should return sum of all owned quantities', () => {
      const state = new CollectionState({
        owned: { 'MEX-01': 1, 'MEX-02': 2, 'RSA-01': 1 },
      });

      expect(state.getTotalOwned()).toBe(4);
    });

    it('should return 0 for empty collection', () => {
      const state = new CollectionState();
      expect(state.getTotalOwned()).toBe(0);
    });
  });

  describe('getTotalDuplicates', () => {
    it('should return sum of all duplicate quantities', () => {
      const state = new CollectionState({
        duplicates: { 'MEX-01': 1, 'MEX-02': 2 },
      });

      expect(state.getTotalDuplicates()).toBe(3);
    });

    it('should return 0 for no duplicates', () => {
      const state = new CollectionState();
      expect(state.getTotalDuplicates()).toBe(0);
    });
  });

  describe('toJSON', () => {
    it('should serialize to JSON', () => {
      const state = new CollectionState({
        owned: { 'MEX-01': 1 },
        duplicates: { 'MEX-02': 2 },
      });

      const json = state.toJSON();
      expect(json).toEqual({
        owned: { 'MEX-01': 1 },
        duplicates: { 'MEX-02': 2 },
      });
    });
  });

  describe('fromJSON', () => {
    it('should deserialize from JSON', () => {
      const json = {
        owned: { 'MEX-01': 1 },
        duplicates: { 'MEX-02': 2 },
      };

      const state = CollectionState.fromJSON(json);

      expect(state.owned['MEX-01']).toBe(1);
      expect(state.duplicates['MEX-02']).toBe(2);
    });

    it('should handle missing fields with defaults', () => {
      const json = {};

      const state = CollectionState.fromJSON(json);

      expect(state.owned).toEqual({});
      expect(state.duplicates).toEqual({});
    });
  });
});