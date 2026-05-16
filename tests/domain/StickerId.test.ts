import { describe, it, expect } from 'vitest';
import { StickerId } from '../../src/domain/value-objects/StickerId';

describe('StickerId', () => {
  describe('team sticker creation', () => {
    it('should create valid team sticker ID', () => {
      const id = new StickerId('MEX1');
      expect(id.value).toBe('MEX1');
      expect(id.teamCode).toBe('MEX');
      expect(id.number).toBe(1);
    });

    it('should create sticker ID with two-digit number', () => {
      const id = new StickerId('ARG20');
      expect(id.value).toBe('ARG20');
      expect(id.teamCode).toBe('ARG');
      expect(id.number).toBe(20);
    });
  });

  describe('FWC sticker creation', () => {
    it('should create valid FWC sticker ID', () => {
      const id = new StickerId('FWC1');
      expect(id.value).toBe('FWC1');
      expect(id.teamCode).toBe('FWC');
      expect(id.number).toBe(1);
    });

    it('should create FWC sticker with two-digit number', () => {
      const id = new StickerId('FWC19');
      expect(id.value).toBe('FWC19');
      expect(id.teamCode).toBe('FWC');
      expect(id.number).toBe(19);
    });
  });

  describe('Logo sticker creation', () => {
    it('should create logo sticker ID', () => {
      const id = new StickerId('0');
      expect(id.value).toBe('0');
      expect(id.teamCode).toBe('LOGO');
      expect(id.number).toBe(0);
    });
  });

  describe('Extra sticker creation', () => {
    it('should create extra sticker ID with bronze variant', () => {
      const id = new StickerId('LM-b');
      expect(id.value).toBe('LM-b');
      expect(id.teamCode).toBe('LM');
      expect(id.isExtra).toBe(true);
      expect(id.extraVariant).toBe('bronze');
    });

    it('should create extra sticker with silver variant', () => {
      const id = new StickerId('JD-s');
      expect(id.value).toBe('JD-s');
      expect(id.isExtra).toBe(true);
      expect(id.extraVariant).toBe('silver');
    });

    it('should create extra sticker with gold variant', () => {
      const id = new StickerId('VJ-g');
      expect(id.value).toBe('VJ-g');
      expect(id.isExtra).toBe(true);
      expect(id.extraVariant).toBe('gold');
    });
  });

  describe('Coca-Cola sticker creation', () => {
    it('should create Coca-Cola US sticker ID', () => {
      const id = new StickerId('CC-US1');
      expect(id.value).toBe('CC-US1');
      expect(id.teamCode).toBe('CC-US');
      expect(id.number).toBe(1);
    });

    it('should create Coca-Cola LAM sticker ID', () => {
      const id = new StickerId('CC-LAM12');
      expect(id.value).toBe('CC-LAM12');
      expect(id.teamCode).toBe('CC-LAM');
      expect(id.number).toBe(12);
    });

    it('should create Coca-Cola RW sticker ID', () => {
      const id = new StickerId('CC-RW8');
      expect(id.value).toBe('CC-RW8');
      expect(id.teamCode).toBe('CC-RW');
      expect(id.number).toBe(8);
    });

    it('should create Coca-Cola EU sticker ID', () => {
      const id = new StickerId('CC-EU5');
      expect(id.value).toBe('CC-EU5');
      expect(id.teamCode).toBe('CC-EU');
      expect(id.number).toBe(5);
    });
  });

  describe('McDonalds sticker creation', () => {
    it('should create McDonalds sticker ID', () => {
      const id = new StickerId('MC-1');
      expect(id.value).toBe('MC-1');
      expect(id.teamCode).toBe('MC');
      expect(id.number).toBe(1);
    });
  });

  describe('validation', () => {
    it('should throw error for invalid ID format', () => {
      expect(() => new StickerId('')).toThrow();
    });
  });

  describe('toString', () => {
    it('should return the value as string', () => {
      const id = new StickerId('MEX15');
      expect(id.toString()).toBe('MEX15');
    });
  });

  describe('equality', () => {
    it('should be equal for same value', () => {
      const id1 = new StickerId('MEX15');
      const id2 = new StickerId('MEX15');
      expect(id1.equals(id2)).toBe(true);
    });

    it('should not be equal for different values', () => {
      const id1 = new StickerId('MEX15');
      const id2 = new StickerId('MEX16');
      expect(id1.equals(id2)).toBe(false);
    });
  });
});