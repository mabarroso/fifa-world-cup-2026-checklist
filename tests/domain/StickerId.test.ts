import { describe, it, expect } from 'vitest';
import { StickerId } from '../../src/domain/value-objects/StickerId';

describe('StickerId', () => {
  describe('team sticker creation', () => {
    it('should create valid team sticker ID', () => {
      const id = new StickerId('MEX-01');
      expect(id.value).toBe('MEX-01');
      expect(id.teamCode).toBe('MEX');
      expect(id.number).toBe(1);
    });

    it('should create sticker ID with two-digit number', () => {
      const id = new StickerId('ARG-20');
      expect(id.value).toBe('ARG-20');
      expect(id.teamCode).toBe('ARG');
      expect(id.number).toBe(20);
    });

    it('should create sticker ID with three-digit number', () => {
      const id = new StickerId('TEAM-100');
      expect(id.value).toBe('TEAM-100');
      expect(id.teamCode).toBe('TEAM');
      expect(id.number).toBe(100);
    });
  });

  describe('FWC sticker creation', () => {
    it('should create valid FWC sticker ID', () => {
      const id = new StickerId('FWC-01');
      expect(id.value).toBe('FWC-01');
      expect(id.teamCode).toBe('FWC');
      expect(id.number).toBe(1);
    });

    it('should create FWC sticker with two-digit number', () => {
      const id = new StickerId('FWC-19');
      expect(id.value).toBe('FWC-19');
      expect(id.teamCode).toBe('FWC');
      expect(id.number).toBe(19);
    });
  });

  describe('Logo sticker creation', () => {
    it('should create logo sticker ID', () => {
      const id = new StickerId('LOGO-00');
      expect(id.value).toBe('LOGO-00');
      expect(id.teamCode).toBe('LOGO');
      expect(id.number).toBe(0);
    });
  });

  describe('Extra sticker creation', () => {
    it('should create extra sticker ID with variant', () => {
      const id = new StickerId('EXTRA-messi-purple');
      expect(id.value).toBe('EXTRA-messi-purple');
      expect(id.teamCode).toBe('EXTRA');
      expect(id.isExtra).toBe(true);
      expect(id.extraVariant).toBe('purple');
    });

    it('should create extra sticker with gold variant', () => {
      const id = new StickerId('EXTRA-ronaldo-gold');
      expect(id.value).toBe('EXTRA-ronaldo-gold');
      expect(id.isExtra).toBe(true);
      expect(id.extraVariant).toBe('gold');
    });
  });

  describe('Coca-Cola sticker creation', () => {
    it('should create Coca-Cola sticker ID', () => {
      const id = new StickerId('CC-01');
      expect(id.value).toBe('CC-01');
      expect(id.teamCode).toBe('CC');
      expect(id.number).toBe(1);
    });

    it('should create Coca-Cola sticker with two-digit number', () => {
      const id = new StickerId('CC-12');
      expect(id.value).toBe('CC-12');
      expect(id.teamCode).toBe('CC');
      expect(id.number).toBe(12);
    });
  });

  describe('validation', () => {
    it('should throw error for invalid ID format', () => {
      expect(() => new StickerId('')).toThrow();
      expect(() => new StickerId('INVALID')).toThrow();
      expect(() => new StickerId('MEX')).toThrow();
      expect(() => new StickerId('MEX-')).toThrow();
    });

    it('should throw error for invalid team code', () => {
      expect(() => new StickerId('-01')).toThrow();
      expect(() => new StickerId('A-01')).toThrow();
    });

    it('should throw error for invalid number', () => {
      expect(() => new StickerId('MEX-abc')).toThrow();
      expect(() => new StickerId('MEX--1')).toThrow();
    });
  });

  describe('toString', () => {
    it('should return the value as string', () => {
      const id = new StickerId('MEX-15');
      expect(id.toString()).toBe('MEX-15');
    });
  });

  describe('equality', () => {
    it('should be equal for same value', () => {
      const id1 = new StickerId('MEX-15');
      const id2 = new StickerId('MEX-15');
      expect(id1.equals(id2)).toBe(true);
    });

    it('should not be equal for different values', () => {
      const id1 = new StickerId('MEX-15');
      const id2 = new StickerId('MEX-16');
      expect(id1.equals(id2)).toBe(false);
    });
  });
});