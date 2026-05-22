import {
  assertCompatibleBackup,
  buildBackupPayload,
  compareSemver,
  parseBackup,
  serializeBackup,
} from '../../src/gui/src/lib/backup-file';

describe('backup file utils', () => {
  it('builds payload with app version and collection', () => {
    const payload = buildBackupPayload(
      {
        owned: { 'MEX-01': 1 },
        duplicates: { 'ARG-02': 2 },
      },
      '1.0.1',
    );

    expect(payload).toEqual({
      appVersion: '1.0.1',
      collection: {
        owned: { 'MEX-01': 1 },
        duplicates: { 'ARG-02': 2 },
      },
    });
  });

  it('serializes and parses a valid backup', () => {
    const raw = serializeBackup({
      appVersion: '1.0.0',
      collection: {
        owned: { 'MEX-01': 1 },
        duplicates: {},
      },
    });

    const parsed = parseBackup(raw);
    expect(parsed.appVersion).toBe('1.0.0');
    expect(parsed.collection.owned['MEX-01']).toBe(1);
  });

  it('rejects malformed backup payloads', () => {
    expect(() => parseBackup('{"appVersion":"1.0.0","collection":{"owned":[],"duplicates":{}}}')).toThrow(
      /owned/i,
    );
  });

  it('compares semantic versions correctly', () => {
    expect(compareSemver('1.0.1', '1.0.1')).toBe(0);
    expect(compareSemver('1.0.2', '1.0.1')).toBeGreaterThan(0);
    expect(compareSemver('1.0.0', '1.0.1')).toBeLessThan(0);
  });

  it('rejects backups from newer app versions', () => {
    expect(() => assertCompatibleBackup('1.1.0', '1.0.1')).toThrow(/más nueva/i);
  });
});
