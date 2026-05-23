import type { Sticker } from '../data/stickers';
import { getStickerIdFix, isStickerInSection, type StickerSection } from './sticker-sections';

export type CollectionFilterType = 'all' | 'missing' | 'owned' | 'duplicates';
export type CollectionSortOrder = 'album' | 'cromo';

export interface TeamOption {
  value: string;
  label: string;
}

export interface FilterCollectionStickersParams {
  allStickers: Sticker[];
  owned: Record<string, number>;
  duplicates: Record<string, number>;
  filter: CollectionFilterType;
  sortOrder: CollectionSortOrder;
  sectionFilter: 'Todas' | StickerSection;
  teamFilter: string;
}

export function buildTeamOptions(
  allStickers: Sticker[],
  sectionFilter: 'Todas' | StickerSection,
): TeamOption[] {
  const teams = new Map<string, { team: string; id: string }>();

  allStickers
    .filter((sticker) => isStickerInSection(sticker.id, sectionFilter))
    .forEach((sticker) => {
      const idFix = getStickerIdFix(sticker.id);
      if (!teams.has(idFix)) {
        teams.set(idFix, { team: sticker.team, id: idFix });
      }
    });

  const options: TeamOption[] = [{ value: 'all', label: 'Todos' }];

  Array.from(teams.values())
    .sort((a, b) => a.id.localeCompare(b.id))
    .forEach((team) => options.push({ value: team.id, label: `${team.id} - ${team.team}` }));

  return options;
}

export function getActiveTeamFilter(teamFilter: string, teamOptions: TeamOption[]): string {
  const teamOptionValues = new Set(teamOptions.map((opt) => opt.value));
  return teamOptionValues.has(teamFilter) ? teamFilter : 'all';
}

export function filterCollectionStickers({
  allStickers,
  owned,
  duplicates,
  filter,
  sortOrder,
  sectionFilter,
  teamFilter,
}: FilterCollectionStickersParams): Sticker[] {
  const sectionAndStatusFiltered = allStickers.filter((sticker) => {
    if (!isStickerInSection(sticker.id, sectionFilter)) {
      return false;
    }

    const ownedQty = owned[sticker.id] || 0;
    const dupQty = duplicates[sticker.id] || 0;

    switch (filter) {
      case 'missing':
        return ownedQty === 0;
      case 'owned':
        return ownedQty > 0;
      case 'duplicates':
        return dupQty > 0;
      default:
        return true;
    }
  });

  const teamFiltered = teamFilter !== 'all'
    ? sectionAndStatusFiltered.filter((sticker) => getStickerIdFix(sticker.id) === teamFilter)
    : sectionAndStatusFiltered;

  if (sortOrder === 'cromo') {
    return [...teamFiltered].sort((a, b) => a.id.localeCompare(b.id));
  }

  return teamFiltered;
}