export enum StickerType {
  LOGO = 'logo',
  FWC_SPECIAL = 'fwc_special',
  TEAM_BADGE = 'team_badge',
  PLAYER = 'player',
  SPECIAL = 'special',
  COCA_COLA = 'coca_cola',
}

export namespace StickerType {
  export function isValid(value: string): value is StickerType {
    return Object.values(StickerType).includes(value as StickerType);
  }

  export function fromString(value: string): StickerType {
    if (!isValid(value)) {
      throw new Error(`Invalid StickerType: ${value}`);
    }
    return value;
  }

  export function getLabel(type: StickerType): string {
    const labels: Record<StickerType, string> = {
      [StickerType.LOGO]: 'Logo Panini',
      [StickerType.FWC_SPECIAL]: 'Especial FIFA',
      [StickerType.TEAM_BADGE]: 'Escudo',
      [StickerType.PLAYER]: 'Jugador',
      [StickerType.SPECIAL]: 'Extra',
      [StickerType.COCA_COLA]: 'Coca-Cola',
    };
    return labels[type];
  }
}