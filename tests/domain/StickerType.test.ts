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

    it('should have panini_extra type', () => {
      expect(StickerType.PANINI_EXTRA).toBe('panini_extra');
    });

    it('should have cocacola_us type', () => {
      expect(StickerType.COCA_COLA_US).toBe('cocacola_us');
    });

    it('should have cocacola_lam type', () => {
      expect(StickerType.COCA_COLA_LAM).toBe('cocacola_lam');
    });

    it('should have cocacola_rw type', () => {
      expect(StickerType.COCA_COLA_RW).toBe('cocacola_rw');
    });

    it('should have cocacola_eu type', () => {
      expect(StickerType.COCA_COLA_EU).toBe('cocacola_eu');
    });

    it('should have mcdonalds type', () => {
      expect(StickerType.MC_DONALDS).toBe('mcdonalds');
    });

    it('should have extra_base type', () => {
      expect(StickerType.EXTRA_BASE).toBe('extra_base');
    });

    it('should have extra_bronze type', () => {
      expect(StickerType.EXTRA_BRONZE).toBe('extra_bronze');
    });

    it('should have extra_silver type', () => {
      expect(StickerType.EXTRA_SILVER).toBe('extra_silver');
    });

    it('should have extra_gold type', () => {
      expect(StickerType.EXTRA_GOLD).toBe('extra_gold');
    });
  });

  describe('isValid', () => {
    it('should return true for valid types', () => {
      expect(StickerType.isValid('logo')).toBe(true);
      expect(StickerType.isValid('fwc_special')).toBe(true);
      expect(StickerType.isValid('team_badge')).toBe(true);
      expect(StickerType.isValid('player')).toBe(true);
      expect(StickerType.isValid('panini_extra')).toBe(true);
      expect(StickerType.isValid('cocacola_us')).toBe(true);
      expect(StickerType.isValid('cocacola_lam')).toBe(true);
      expect(StickerType.isValid('cocacola_rw')).toBe(true);
      expect(StickerType.isValid('cocacola_eu')).toBe(true);
      expect(StickerType.isValid('mcdonalds')).toBe(true);
      expect(StickerType.isValid('extra_base')).toBe(true);
      expect(StickerType.isValid('extra_bronze')).toBe(true);
      expect(StickerType.isValid('extra_silver')).toBe(true);
      expect(StickerType.isValid('extra_gold')).toBe(true);
    });

    it('should return false for invalid types', () => {
      expect(StickerType.isValid('invalid')).toBe(false);
      expect(StickerType.isValid('')).toBe(false);
      expect(StickerType.isValid('LOGO')).toBe(false);
    });
  });

  describe('getLabel', () => {
    it('should return Spanish labels', () => {
      expect(StickerType.getLabel(StickerType.LOGO)).toBe('Logo Panini');
      expect(StickerType.getLabel(StickerType.FWC_SPECIAL)).toBe('Especial FIFA');
      expect(StickerType.getLabel(StickerType.TEAM_BADGE)).toBe('Escudo');
      expect(StickerType.getLabel(StickerType.PLAYER)).toBe('Jugador');
      expect(StickerType.getLabel(StickerType.PANINI_EXTRA)).toBe('Panini Extra');
      expect(StickerType.getLabel(StickerType.COCA_COLA_US)).toBe('Coca-Cola USA/Canada');
      expect(StickerType.getLabel(StickerType.MC_DONALDS)).toBe("McDonald's");
      expect(StickerType.getLabel(StickerType.EXTRA_BASE)).toBe('Extra Base');
      expect(StickerType.getLabel(StickerType.EXTRA_BRONZE)).toBe('Extra Bronze');
      expect(StickerType.getLabel(StickerType.EXTRA_SILVER)).toBe('Extra Silver');
      expect(StickerType.getLabel(StickerType.EXTRA_GOLD)).toBe('Extra Gold');
    });
  });

  describe('fromString', () => {
    it('should parse valid strings', () => {
      expect(StickerType.fromString('player')).toBe(StickerType.PLAYER);
      expect(StickerType.fromString('cocacola_us')).toBe(StickerType.COCA_COLA_US);
      expect(StickerType.fromString('extra_gold')).toBe(StickerType.EXTRA_GOLD);
    });

    it('should throw for invalid strings', () => {
      expect(() => StickerType.fromString('invalid')).toThrow();
      expect(() => StickerType.fromString('')).toThrow();
    });
  });
});