import type { CollectionRepository } from '../../domain/repositories/CollectionRepository';

export class MarkStickerDuplicateCommand {
  constructor(private repository: CollectionRepository) {}

  async execute(stickerId: string, quantity: number = 1): Promise<void> {
    const state = await this.repository.load();
    state.markDuplicate(stickerId, quantity);
    await this.repository.save(state);
  }

  async undo(stickerId: string, quantity: number = 1): Promise<void> {
    const state = await this.repository.load();
    state.unmarkDuplicate(stickerId, quantity);
    await this.repository.save(state);
  }
}