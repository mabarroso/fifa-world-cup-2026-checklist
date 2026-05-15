import type { CollectionState } from '../entities/CollectionState';

export interface CollectionRepository {
  load(): Promise<CollectionState>;
  save(state: CollectionState): Promise<void>;
}