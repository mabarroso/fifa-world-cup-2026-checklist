export type ExtraVariant = 'bronze' | 'silver' | 'gold';

export class StickerId {
  readonly value: string;
  readonly teamCode: string;
  readonly number: number;
  readonly isExtra: boolean;
  readonly extraVariant: ExtraVariant | null;

  constructor(value: string) {
    this.validate(value);
    this.value = value;

    // Logo (id: "0")
    if (value === '0') {
      this.teamCode = 'LOGO';
      this.number = 0;
      this.isExtra = false;
      this.extraVariant = null;
      return;
    }

    // FWC specials (FWC1, FWC2, etc.)
    if (value.startsWith('FWC')) {
      this.teamCode = 'FWC';
      this.number = parseInt(value.substring(3), 10);
      this.isExtra = false;
      this.extraVariant = null;
      return;
    }

    // Coca-Cola variants (CC-US1, CC-LAM1, CC-RW1, CC-EU1)
    if (value.startsWith('CC-')) {
      const parts = value.substring(3).match(/^([A-Z]+)(\d+)$/);
      if (parts) {
        this.teamCode = 'CC-' + parts[1];
        this.number = parseInt(parts[2], 10);
        this.isExtra = false;
        this.extraVariant = null;
        return;
      }
    }

    // McDonald's (MC-1, MC-2, etc.)
    if (value.startsWith('MC-')) {
      this.teamCode = 'MC';
      this.number = parseInt(value.substring(3), 10);
      this.isExtra = false;
      this.extraVariant = null;
      return;
    }

    // Extra variants with suffixes (-b, -s, -g)
    // For formats like LM-b (where LM is the base team code)
    if (value.endsWith('-b')) {
      const base = value.slice(0, -2);
      const match = base.match(/^([A-Z]+)(\d*)$/);
      if (match) {
        this.teamCode = match[1];
        this.number = match[2] ? parseInt(match[2], 10) : 0;
        this.isExtra = true;
        this.extraVariant = 'bronze';
        return;
      }
    }

    if (value.endsWith('-s')) {
      const base = value.slice(0, -2);
      const match = base.match(/^([A-Z]+)(\d*)$/);
      if (match) {
        this.teamCode = match[1];
        this.number = match[2] ? parseInt(match[2], 10) : 0;
        this.isExtra = true;
        this.extraVariant = 'silver';
        return;
      }
    }

    if (value.endsWith('-g')) {
      const base = value.slice(0, -2);
      const match = base.match(/^([A-Z]+)(\d*)$/);
      if (match) {
        this.teamCode = match[1];
        this.number = match[2] ? parseInt(match[2], 10) : 0;
        this.isExtra = true;
        this.extraVariant = 'gold';
        return;
      }
    }

    // Standard team stickers (MEX1, RSA1, etc.)
    // Also handles MEX15, ARG20, etc. (no dash)
    const match = value.match(/^([A-Z]+)(\d+)$/);
    if (match) {
      this.teamCode = match[1];
      this.number = parseInt(match[2], 10);
      this.isExtra = false;
      this.extraVariant = null;
      return;
    }

    // Fallback: try with dash for formats like MEX-15
    const dashIndex = value.indexOf('-');
    if (dashIndex > 0) {
      this.teamCode = value.substring(0, dashIndex);
      this.number = parseInt(value.substring(dashIndex + 1), 10);
      this.isExtra = false;
      this.extraVariant = null;
      return;
    }

    // If no pattern matched, throw error
    throw new Error(`Invalid Sticker ID format: ${value}`);
  }

  private validate(value: string): void {
    if (!value || value.trim() === '') {
      throw new Error('Sticker ID cannot be empty');
    }
  }

  toString(): string {
    return this.value;
  }

  equals(other: StickerId): boolean {
    return this.value === other.value;
  }
}