import { computeStatisticsModel, SORTED_PANINI_GROUPS } from '../../src/gui/src/lib/statistics-model';
import type { Sticker } from '../../src/gui/src/data/stickers';

function makeSticker(id: string, team: string): Sticker {
  return {
    id,
    number: 0,
    name: id,
    team,
    teamCode: '',
    group: null,
    type: 'player',
    extraVariant: null,
  };
}

describe('statistics model', () => {
  const stickers: Sticker[] = [
    makeSticker('MEX01', 'Mexico'),
    makeSticker('ARG02', 'Argentina'),
    makeSticker('CC-EU07', 'Canada'),
    makeSticker('AUS13mc', 'Australia'),
    makeSticker('LEG01', 'Legends'),
  ];

  it('computes section completion metrics', () => {
    const stats = computeStatisticsModel(
      stickers,
      { MEX01: 1, ARG02: 1, 'CC-EU07': 1 },
      { 'CC-EU07': 2 },
    );

    expect(stats.sectionStats.Panini).toEqual({ owned: 2, total: 2, percentage: 100 });
    expect(stats.sectionStats['Coca Cola']).toEqual({ owned: 1, total: 1, percentage: 100 });
    expect(stats.sectionStats["McDonald's"]).toEqual({ owned: 0, total: 1, percentage: 0 });
    expect(stats.sectionStats.Extras).toEqual({ owned: 0, total: 1, percentage: 0 });
  });

  it('excludes non-panini IDs from Por Grupo and keeps alphabetical keys', () => {
    const stats = computeStatisticsModel(
      stickers,
      { MEX01: 1, ARG02: 1, 'CC-EU07': 1, AUS13mc: 1 },
      {},
    );

    expect(SORTED_PANINI_GROUPS[0]).toBe('ALG');
    expect(stats.groupStats.MEX).toEqual({ owned: 1, total: 1 });
    expect(stats.groupStats.ARG).toEqual({ owned: 1, total: 1 });
    expect(stats.groupStats.AUS).toEqual({ owned: 0, total: 0 });
  });
});
