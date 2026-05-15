export type ExtraVariant = 'purple' | 'bronze' | 'silver' | 'gold';

export class StickerId {
  readonly value: string;
  readonly teamCode: string;
  readonly number: number;
  readonly isExtra: boolean;
  readonly extraVariant: ExtraVariant | null;

  constructor(value: string) {
    this.validate(value);
    this.value = value;

    if (value.startsWith('EXTRA-')) {
      this.teamCode = 'EXTRA';
      this.isExtra = true;
      const parts = value.substring(6).split('-');
      this.extraVariant = parts[parts.length - 1] as ExtraVariant;
      this.number = 1;
    } else if (value === 'LOGO-00') {
      this.teamCode = 'LOGO';
      this.number = 0;
      this.isExtra = false;
      this.extraVariant = null;
    } else if (value.startsWith('FWC-')) {
      this.teamCode = 'FWC';
      this.number = parseInt(value.substring(4), 10);
      this.isExtra = false;
      this.extraVariant = null;
    } else if (value.startsWith('CC-')) {
      this.teamCode = 'CC';
      this.number = parseInt(value.substring(3), 10);
      this.isExtra = false;
      this.extraVariant = null;
    } else {
      const dashIndex = value.indexOf('-');
      this.teamCode = value.substring(0, dashIndex);
      this.number = parseInt(value.substring(dashIndex + 1), 10);
      this.isExtra = false;
      this.extraVariant = null;
    }
  }

  private validate(value: string): void {
    if (!value || value.trim() === '') {
      throw new Error('Sticker ID cannot be empty');
    }

    if (value.startsWith('EXTRA-')) {
      const parts = value.substring(6).split('-');
      if (parts.length < 2) {
        throw new Error('Invalid Extra sticker ID format');
      }
      const variant = parts[parts.length - 1];
      const validVariants = ['purple', 'bronze', 'silver', 'gold'];
      if (!validVariants.includes(variant)) {
        throw new Error(`Invalid Extra variant: ${variant}`);
      }
      return;
    }

    if (value === 'LOGO-00') {
      return;
    }

    const parts = value.split('-');
    if (parts.length !== 2) {
      throw new Error('Invalid Sticker ID format (expected TEAM-NUMBER)');
    }

    const [teamCode, numberStr] = parts;

    if (!teamCode || teamCode.length < 2) {
      throw new Error('Invalid team code');
    }

    const number = parseInt(numberStr, 10);
    if (isNaN(number) || number < 0) {
      throw new Error('Invalid sticker number');
    }
  }

  toString(): string {
    return this.value;
  }

  equals(other: StickerId): boolean {
    return this.value === other.value;
  }
}