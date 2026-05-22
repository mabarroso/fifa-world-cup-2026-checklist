export type StickerSection = 'Panini' | 'Coca Cola' | "McDonald's" | 'Extras';

export const PANINI_PREFIXES = [
  'FWC', 'MEX', 'RSA', 'KOR', 'CZE', 'CAN', 'BIH', 'QAT', 'SUI', 'BRA',
  'MAR', 'HAI', 'SCO', 'USA', 'PAR', 'AUS', 'TUR', 'GER', 'CUW', 'CIV',
  'ECU', 'NED', 'JPN', 'SWE', 'TUN', 'BEL', 'EGY', 'IRN', 'NZL', 'ESP',
  'CPV', 'KSA', 'URU', 'FRA', 'SEN', 'IRQ', 'NOR', 'ARG', 'ALG', 'AUT',
  'JOR', 'POR', 'COD', 'UZB', 'COL', 'ENG', 'CRO', 'GHA', 'PAN',
] as const;

const PANINI_PREFIX_SET = new Set<string>(PANINI_PREFIXES);

export function getStickerSection(id: string): StickerSection {
  if (id === '0') {
    return 'Panini';
  }

  if (id.startsWith('CC-')) {
    return 'Coca Cola';
  }

  if (id.endsWith('mc')) {
    return "McDonald's";
  }

  const prefix = getPaniniGroupPrefixFromId(id);
  if (prefix && PANINI_PREFIX_SET.has(prefix)) {
    return 'Panini';
  }

  return 'Extras';
}

export function getPaniniGroupPrefixFromId(id: string): string | null {
  for (const prefix of PANINI_PREFIXES) {
    if (id.startsWith(prefix)) {
      return prefix;
    }
  }

  return null;
}

export function getStickerIdFix(id: string): string {
  if (id === '0') {
    return 'FWC';
  }

  if (id.startsWith('CC-')) {
    const match = id.match(/^CC-[A-Z]+/);
    return match ? match[0] : 'CC';
  }

  const alphaPrefix = id.match(/^[A-Z]+/);
  if (alphaPrefix) {
    return alphaPrefix[0];
  }

  return id;
}

export function isStickerInSection(id: string, section: StickerSection | 'Todas'): boolean {
  if (section === 'Todas') {
    return true;
  }

  return getStickerSection(id) === section;
}