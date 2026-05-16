import { describe, it, expect } from 'vitest';
import { Sticker } from '../../src/domain/entities/Sticker';
import { StickerType } from '../../src/domain/value-objects/StickerType';

describe('Sticker', () => {
  describe('creation', () => {
    it('should create a player sticker', () => {
      const sticker = new Sticker({
        id: 'MEX2',
        name: 'Luis Malagón',
        team: 'Mexico',
        type: StickerType.PLAYER,
      });

      expect(sticker.id).toBe('MEX2');
      expect(sticker.name).toBe('Luis Malagón');
      expect(sticker.team).toBe('Mexico');
      expect(sticker.type).toBe(StickerType.PLAYER);
    });

    it('should create a team badge sticker', () => {
      const sticker = new Sticker({
        id: 'MEX1',
        name: 'Escudo',
        team: 'Mexico',
        type: StickerType.TEAM_BADGE,
      });

      expect(sticker.id).toBe('MEX1');
      expect(sticker.type).toBe(StickerType.TEAM_BADGE);
      expect(sticker.name).toBe('Escudo');
    });

    it('should create an FWC special sticker', () => {
      const sticker = new Sticker({
        id: 'FWC1',
        name: 'Official Emblem 1',
        team: 'FIFA World Cup 2026',
        type: StickerType.FWC_SPECIAL,
      });

      expect(sticker.id).toBe('FWC1');
      expect(sticker.type).toBe(StickerType.FWC_SPECIAL);
    });

    it('should create a logo sticker', () => {
      const sticker = new Sticker({
        id: '0',
        name: 'Panini Logo',
        team: 'We Are Panini',
        type: StickerType.LOGO,
      });

      expect(sticker.id).toBe('0');
      expect(sticker.type).toBe(StickerType.LOGO);
    });

    it('should create a Coca-Cola sticker', () => {
      const sticker = new Sticker({
        id: 'CC-US1',
        name: 'Lamine Yamal',
        team: 'Spain',
        type: StickerType.COCA_COLA_US,
      });

      expect(sticker.id).toBe('CC-US1');
      expect(sticker.type).toBe(StickerType.COCA_COLA_US);
    });

    it('should create an extra sticker', () => {
      const sticker = new Sticker({
        id: 'LM-b',
        name: 'Lionel Messi',
        team: 'Argentina',
        type: StickerType.EXTRA_BRONZE,
      });

      expect(sticker.id).toBe('LM-b');
      expect(sticker.type).toBe(StickerType.EXTRA_BRONZE);
    });

    it('should create a McDonalds sticker', () => {
      const sticker = new Sticker({
        id: 'MC-1',
        name: 'McDonalds Exclusive',
        team: 'McDonalds',
        type: StickerType.MC_DONALDS,
      });

      expect(sticker.id).toBe('MC-1');
      expect(sticker.type).toBe(StickerType.MC_DONALDS);
    });
  });

  describe('toString', () => {
    it('should return formatted string', () => {
      const sticker = new Sticker({
        id: 'MEX2',
        name: 'Luis Malagón',
        team: 'Mexico',
        type: StickerType.PLAYER,
      });

      expect(sticker.toString()).toBe('[MEX2] Luis Malagón - Mexico');
    });
  });

  describe('toJSON', () => {
    it('should serialize to JSON object', () => {
      const sticker = new Sticker({
        id: 'MEX2',
        name: 'Luis Malagón',
        team: 'Mexico',
        type: StickerType.PLAYER,
      });

      const json = sticker.toJSON();
      expect(json).toEqual({
        id: 'MEX2',
        name: 'Luis Malagón',
        team: 'Mexico',
        type: 'player',
      });
    });
  });
});