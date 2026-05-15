import type { CollectionRepository } from '../../domain/repositories/CollectionRepository';
import type { Sticker } from '../../domain/entities/Sticker';
import { getAllStickers } from '../../data/stickers';

export interface GetMissingStickersOptions {
  group?: string;
  team?: string;
  type?: string;
}

export class GetMissingStickersQuery {
  constructor(private repository: CollectionRepository) {}

  async execute(options?: GetMissingStickersOptions): Promise<Sticker[]> {
    const state = await this.repository.load();
    const allStickers = getAllStickers();

    let missing = allStickers.filter((sticker) => {
      const owned = state.getOwnedQuantity(sticker.id);
      return owned === 0;
    });

    if (options?.group) {
      missing = missing.filter((s) => s.group === options.group);
    }

    if (options?.team) {
      missing = missing.filter((s) => s.teamCode === options.team);
    }

    if (options?.type) {
      missing = missing.filter((s) => s.type.toString() === options.type);
    }

    return missing;
  }
}