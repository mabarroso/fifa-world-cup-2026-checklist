import { StickerType } from '../value-objects/StickerType';
import type { ExtraVariant } from '../value-objects/StickerId';

export interface StickerData {
  id: string;
  number: number;
  name: string;
  team: string;
  teamCode: string;
  group: string | null;
  type: StickerType;
  extraVariant: ExtraVariant | null;
}

export class Sticker {
  readonly id: string;
  readonly number: number;
  readonly name: string;
  readonly team: string;
  readonly teamCode: string;
  readonly group: string | null;
  readonly type: StickerType;
  readonly extraVariant: ExtraVariant | null;

  constructor(data: StickerData) {
    this.id = data.id;
    this.number = data.number;
    this.name = data.name;
    this.team = data.team;
    this.teamCode = data.teamCode;
    this.group = data.group;
    this.type = data.type;
    this.extraVariant = data.extraVariant;
  }

  isTeamSticker(): boolean {
    return this.type === StickerType.TEAM_BADGE || this.type === StickerType.PLAYER;
  }

  toString(): string {
    const groupStr = this.group ? ` (${this.group})` : '';
    return `[${this.id}] ${this.name} - ${this.team}${groupStr}`;
  }

  toJSON(): StickerData {
    return {
      id: this.id,
      number: this.number,
      name: this.name,
      team: this.team,
      teamCode: this.teamCode,
      group: this.group,
      type: this.type,
      extraVariant: this.extraVariant,
    };
  }
}