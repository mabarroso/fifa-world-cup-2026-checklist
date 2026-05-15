import { describe, it, expect } from 'vitest';
import { StickerType } from '../../src/domain/value-objects/StickerType';

describe('StickerType', () => {
  describe('values', () => {
    it('should have logo type', () => {
      expect(StickerType.LOGO).toBe('logo');
    });

    it('should have fwc_special type', () => {
      expect(StickerType.FWC_SPECIAL).toBe('fwc_special');
    });

    it('should have team_badge type', () => {
      expect(StickerType.TEAM_BADGE).toBe('team_badge');
    });

    it('should have player type', () => {
      expect(StickerType.PLAYER).toBe('player');
    });

    it('should have special type', () => {
      expect(StickerType.SPECIAL).toBe('special');
    });

    it('should have coca_cola type', () => {
      expect(StickerType.COCA_COLA).toBe('coca_cola');
    });
  });

  describe('isValid', () => {
    it('should return true for valid types', () => {
      expect(StickerType.isValid('logo')).toBe(true);
      expect(StickerType.isValid('fwc_special')).toBe(true);
      expect(StickerType.isValid('team_badge')).toBe(true);
      expect(StickerType.isValid('player')).toBe(true);
      expect(StickerType.isValid('special')).toBe(true);
      expect(StickerType.isValid('coca_cola')).toBe(true);
    });

    it('should return false for invalid types', () => {
      expect(StickerType.isValid('invalid')).toBe(false);
      expect(StickerType.isValid('')).toBe(false);
      expect(StickerType.isValid('LOGO')).toBe(false);
    });
  });
});