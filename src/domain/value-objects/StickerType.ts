export enum StickerType {
  LOGO = 'logo',
  FWC_SPECIAL = 'fwc_special',
  TEAM_BADGE = 'team_badge',
  PLAYER = 'player',
  PANINI_EXTRA = 'panini_extra',
  COCA_COLA_US = 'cocacola_us',
  COCA_COLA_LAM = 'cocacola_lam',
  COCA_COLA_RW = 'cocacola_rw',
  COCA_COLA_EU = 'cocacola_eu',
  MC_DONALDS = 'mcdonalds',
  EXTRA_BASE = 'extra_base',
  EXTRA_BRONZE = 'extra_bronze',
  EXTRA_SILVER = 'extra_silver',
  EXTRA_GOLD = 'extra_gold',
}

export namespace StickerType {
  export function isValid(value: string): value is StickerType {
    return Object.values(StickerType).includes(value as StickerType);
  }

  export function fromString(value: string): StickerType {
    if (isValid(value)) {
      return value;
    }
    throw new Error(`Invalid StickerType: ${value}`);
  }

  export function getLabel(type: StickerType): string {
    const labels: Record<StickerType, string> = {
      [StickerType.LOGO]: 'Logo Panini',
      [StickerType.FWC_SPECIAL]: 'Especial FIFA',
      [StickerType.TEAM_BADGE]: 'Escudo',
      [StickerType.PLAYER]: 'Jugador',
      [StickerType.PANINI_EXTRA]: 'Panini Extra',
      [StickerType.COCA_COLA_US]: 'Coca-Cola USA/Canada',
      [StickerType.COCA_COLA_LAM]: 'Coca-Cola Latin America',
      [StickerType.COCA_COLA_RW]: 'Coca-Cola Rest of World',
      [StickerType.COCA_COLA_EU]: 'Coca-Cola Europe',
      [StickerType.MC_DONALDS]: "McDonald's",
      [StickerType.EXTRA_BASE]: 'Extra Base',
      [StickerType.EXTRA_BRONZE]: 'Extra Bronze',
      [StickerType.EXTRA_SILVER]: 'Extra Silver',
      [StickerType.EXTRA_GOLD]: 'Extra Gold',
    };
    return labels[type];
  }
}