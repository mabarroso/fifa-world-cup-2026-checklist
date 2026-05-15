import Conf from 'conf';
import type { CollectionRepository } from '../../domain/repositories/CollectionRepository';
import type { CollectionState } from '../../domain/entities/CollectionState';
import { CollectionState as CollectionStateClass } from '../../domain/entities/CollectionState';

export class ConfStorageAdapter implements CollectionRepository {
  private config: Conf;

  constructor(namespace: string = 'panini-stickers') {
    this.config = new Conf({
      projectName: namespace,
    });
  }

  async load(): Promise<CollectionState> {
    const owned = this.config.get('owned', {}) as Record<string, number>;
    const duplicates = this.config.get('duplicates', {}) as Record<string, number>;
    return CollectionStateClass.fromJSON({ owned, duplicates });
  }

  async save(state: CollectionState): Promise<void> {
    const data = state.toJSON();
    this.config.set('owned', data.owned);
    this.config.set('duplicates', data.duplicates);
  }
}