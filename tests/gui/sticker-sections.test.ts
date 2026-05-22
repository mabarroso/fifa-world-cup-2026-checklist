import {
  getPaniniGroupPrefixFromId,
  getStickerIdFix,
  getStickerSection,
  isStickerInSection,
} from '../../src/gui/src/lib/sticker-sections';

describe('sticker sections', () => {
  it('classifies sticker 0 as Panini', () => {
    expect(getStickerSection('0')).toBe('Panini');
  });

  it('classifies Panini prefix IDs as Panini', () => {
    expect(getStickerSection('MEX01')).toBe('Panini');
    expect(getStickerSection('PAN13')).toBe('Panini');
  });

  it('classifies Coca Cola IDs by CC- prefix', () => {
    expect(getStickerSection('CC-EU07')).toBe('Coca Cola');
    expect(getStickerSection('CC-US01')).toBe('Coca Cola');
  });

  it("classifies McDonald's IDs by mc suffix", () => {
    expect(getStickerSection('AUS13mc')).toBe("McDonald's");
  });

  it('classifies non matching IDs as Extras', () => {
    expect(getStickerSection('LEG01')).toBe('Extras');
  });

  it('extracts Panini group prefix when present', () => {
    expect(getPaniniGroupPrefixFromId('ARG12')).toBe('ARG');
    expect(getPaniniGroupPrefixFromId('CC-EU07')).toBeNull();
  });

  it('extracts ID_FIX for regular, Coca Cola and 0 IDs', () => {
    expect(getStickerIdFix('ARG12')).toBe('ARG');
    expect(getStickerIdFix('CC-EU07')).toBe('CC-EU');
    expect(getStickerIdFix('0')).toBe('FWC');
  });

  it('checks membership by section including Todas', () => {
    expect(isStickerInSection('CC-EU07', 'Coca Cola')).toBe(true);
    expect(isStickerInSection('CC-EU07', 'Panini')).toBe(false);
    expect(isStickerInSection('CC-EU07', 'Todas')).toBe(true);
  });
});
