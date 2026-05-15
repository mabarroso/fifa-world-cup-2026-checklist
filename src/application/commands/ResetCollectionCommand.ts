import type { CollectionRepository } from '../../domain/repositories/CollectionRepository';

export class ResetCollectionCommand {
  constructor(private repository: CollectionRepository) {}

  async execute(): Promise<void> {
    const state = await this.repository.load();
    state.reset();
    await this.repository.save(state);
  }
}