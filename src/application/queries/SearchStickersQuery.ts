import { searchStickers } from '../../data/stickers';
import type { Sticker } from '../../domain/entities/Sticker';

export interface SearchStickersOptions {
  group?: string;
  team?: string;
  type?: string;
}

export class SearchStickersQuery {
  execute(query: string, options?: SearchStickersOptions): Sticker[] {
    let results = searchStickers(query);

    if (options?.group) {
      results = results.filter((s) => s.group === options.group);
    }

    if (options?.team) {
      results = results.filter((s) => s.teamCode === options.team);
    }

    if (options?.type) {
      results = results.filter((s) => s.type.toString() === options.type);
    }

    return results;
  }
}