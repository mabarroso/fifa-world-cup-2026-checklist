import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SearchStickersQuery } from '../../../src/application/queries/SearchStickersQuery';

vi.mock('../../../src/data/stickers', () => ({
  searchStickers: (query: string) => {
    const stickers = [
      { id: 'MEX-01', name: 'Escudo', team: 'Mexico', teamCode: 'MEX', group: 'A' },
      { id: 'MEX-02', name: 'Player One', team: 'Mexico', teamCode: 'MEX', group: 'A' },
      { id: 'RSA-01', name: 'Escudo', team: 'South Africa', teamCode: 'RSA', group: 'A' },
    ];
    return stickers.filter(s =>
      s.id.toLowerCase().includes(query.toLowerCase()) ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.team.toLowerCase().includes(query.toLowerCase())
    );
  },
}));

describe('SearchStickersQuery', () => {
  let query: SearchStickersQuery;

  beforeEach(() => {
    query = new SearchStickersQuery();
  });

  describe('execute', () => {
    it('should search by ID', () => {
      const results = query.execute('MEX-01');

      expect(results.length).toBe(1);
      expect(results[0].id).toBe('MEX-01');
    });

    it('should search by name', () => {
      const results = query.execute('Escudo');

      expect(results.length).toBe(2);
    });

    it('should search by team', () => {
      const results = query.execute('Mexico');

      expect(results.length).toBe(2);
    });

    it('should filter by group', () => {
      const results = query.execute('', { group: 'A' });

      expect(results.length).toBe(3);
    });

    it('should filter by team code', () => {
      const results = query.execute('', { team: 'MEX' });

      expect(results.length).toBe(2);
    });
  });
});