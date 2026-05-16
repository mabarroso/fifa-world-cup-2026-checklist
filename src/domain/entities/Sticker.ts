import { StickerType } from '../value-objects/StickerType';

export interface StickerData {
  id: string;
  name: string;
  team: string;
  type: StickerType;
}

export class Sticker {
  readonly id: string;
  readonly name: string;
  readonly team: string;
  readonly type: StickerType;

  constructor(data: StickerData) {
    this.id = data.id;
    this.name = data.name;
    this.team = data.team;
    this.type = data.type;
  }

  toString(): string {
    return `[${this.id}] ${this.name} - ${this.team}`;
  }

  toJSON(): StickerData {
    return {
      id: this.id,
      name: this.name,
      team: this.team,
      type: this.type,
    };
  }
}