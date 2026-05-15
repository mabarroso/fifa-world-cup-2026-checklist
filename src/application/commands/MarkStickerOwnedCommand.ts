import type { CollectionRepository } from '../../domain/repositories/CollectionRepository';

export class MarkStickerOwnedCommand {
  constructor(private repository: CollectionRepository) {}

  async execute(stickerId: string, quantity: number = 1): Promise<void> {
    const state = await this.repository.load();
    state.markOwned(stickerId, quantity);
    await this.repository.save(state);
  }

  async undo(stickerId: string, quantity: number = 1): Promise<void> {
    const state = await this.repository.load();
    state.unmarkOwned(stickerId, quantity);
    await this.repository.save(state);
  }
}