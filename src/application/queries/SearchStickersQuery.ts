import { searchStickers } from '../../data/stickers';
import type { Sticker } from '../../domain/entities/Sticker';

export interface SearchStickersOptions {
  type?: string;
}

export class SearchStickersQuery {
  execute(query: string, options?: SearchStickersOptions): Sticker[] {
    let results = searchStickers(query);

    if (options?.type) {
      results = results.filter((s) => s.type.toString() === options.type);
    }

    return results;
  }
}