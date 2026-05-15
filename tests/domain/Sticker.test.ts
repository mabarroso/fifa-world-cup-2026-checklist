import { describe, it, expect } from 'vitest';
import { Sticker } from '../../src/domain/entities/Sticker';
import { StickerType } from '../../src/domain/value-objects/StickerType';

describe('Sticker', () => {
  describe('creation', () => {
    it('should create a player sticker', () => {
      const sticker = new Sticker({
        id: 'MEX-02',
        number: 2,
        name: 'Luis Malagón',
        team: 'Mexico',
        teamCode: 'MEX',
        group: 'A',
        type: StickerType.PLAYER,
        extraVariant: null,
      });

      expect(sticker.id).toBe('MEX-02');
      expect(sticker.number).toBe(2);
      expect(sticker.name).toBe('Luis Malagón');
      expect(sticker.team).toBe('Mexico');
      expect(sticker.teamCode).toBe('MEX');
      expect(sticker.group).toBe('A');
      expect(sticker.type).toBe(StickerType.PLAYER);
      expect(sticker.extraVariant).toBeNull();
    });

    it('should create a team badge sticker', () => {
      const sticker = new Sticker({
        id: 'MEX-01',
        number: 1,
        name: 'Escudo',
        team: 'Mexico',
        teamCode: 'MEX',
        group: 'A',
        type: StickerType.TEAM_BADGE,
        extraVariant: null,
      });

      expect(sticker.id).toBe('MEX-01');
      expect(sticker.type).toBe(StickerType.TEAM_BADGE);
      expect(sticker.name).toBe('Escudo');
    });

    it('should create a FWC special sticker', () => {
      const sticker = new Sticker({
        id: 'FWC-01',
        number: 1,
        name: 'Logo Mundial - Parte Superior',
        team: 'FIFA',
        teamCode: 'FWC',
        group: null,
        type: StickerType.FWC_SPECIAL,
        extraVariant: null,
      });

      expect(sticker.id).toBe('FWC-01');
      expect(sticker.group).toBeNull();
      expect(sticker.type).toBe(StickerType.FWC_SPECIAL);
    });

    it('should create an extra sticker with variant', () => {
      const sticker = new Sticker({
        id: 'EXTRA-messi-purple',
        number: 1,
        name: 'Lionel Messi',
        team: 'Argentina',
        teamCode: 'ARG',
        group: null,
        type: StickerType.SPECIAL,
        extraVariant: 'purple',
      });

      expect(sticker.id).toBe('EXTRA-messi-purple');
      expect(sticker.type).toBe(StickerType.SPECIAL);
      expect(sticker.extraVariant).toBe('purple');
    });

    it('should create a logo sticker', () => {
      const sticker = new Sticker({
        id: 'LOGO-00',
        number: 0,
        name: 'Logo Panini',
        team: 'Panini',
        teamCode: 'LOGO',
        group: null,
        type: StickerType.LOGO,
        extraVariant: null,
      });

      expect(sticker.id).toBe('LOGO-00');
      expect(sticker.type).toBe(StickerType.LOGO);
    });

    it('should create a Coca-Cola sticker', () => {
      const sticker = new Sticker({
        id: 'CC-01',
        number: 1,
        name: 'Lamine Yamal',
        team: 'Spain',
        teamCode: 'ESP',
        group: null,
        type: StickerType.COCA_COLA,
        extraVariant: null,
      });

      expect(sticker.id).toBe('CC-01');
      expect(sticker.type).toBe(StickerType.COCA_COLA);
    });
  });

  describe('isTeamSticker', () => {
    it('should return true for team stickers', () => {
      const sticker = new Sticker({
        id: 'MEX-02',
        number: 2,
        name: 'Luis Malagón',
        team: 'Mexico',
        teamCode: 'MEX',
        group: 'A',
        type: StickerType.PLAYER,
        extraVariant: null,
      });

      expect(sticker.isTeamSticker()).toBe(true);
    });

    it('should return false for FWC stickers', () => {
      const sticker = new Sticker({
        id: 'FWC-01',
        number: 1,
        name: 'Logo Mundial',
        team: 'FIFA',
        teamCode: 'FWC',
        group: null,
        type: StickerType.FWC_SPECIAL,
        extraVariant: null,
      });

      expect(sticker.isTeamSticker()).toBe(false);
    });

    it('should return false for Extra stickers', () => {
      const sticker = new Sticker({
        id: 'EXTRA-messi-purple',
        number: 1,
        name: 'Lionel Messi',
        team: 'Argentina',
        teamCode: 'ARG',
        group: null,
        type: StickerType.SPECIAL,
        extraVariant: 'purple',
      });

      expect(sticker.isTeamSticker()).toBe(false);
    });
  });

  describe('toString', () => {
    it('should return formatted string', () => {
      const sticker = new Sticker({
        id: 'MEX-02',
        number: 2,
        name: 'Luis Malagón',
        team: 'Mexico',
        teamCode: 'MEX',
        group: 'A',
        type: StickerType.PLAYER,
        extraVariant: null,
      });

      expect(sticker.toString()).toBe('[MEX-02] Luis Malagón - Mexico (A)');
    });
  });

  describe('toJSON', () => {
    it('should serialize to JSON object', () => {
      const sticker = new Sticker({
        id: 'MEX-02',
        number: 2,
        name: 'Luis Malagón',
        team: 'Mexico',
        teamCode: 'MEX',
        group: 'A',
        type: StickerType.PLAYER,
        extraVariant: null,
      });

      const json = sticker.toJSON();
      expect(json).toEqual({
        id: 'MEX-02',
        number: 2,
        name: 'Luis Malagón',
        team: 'Mexico',
        teamCode: 'MEX',
        group: 'A',
        type: 'player',
        extraVariant: null,
      });
    });
  });
});