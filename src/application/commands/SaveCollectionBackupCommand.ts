import type { CollectionRepository } from '../../domain/repositories/CollectionRepository';
import type { CollectionBackupFileGateway } from '../ports/CollectionBackupFileGateway';

export class SaveCollectionBackupCommand {
  constructor(
    private repository: CollectionRepository,
    private backupGateway: CollectionBackupFileGateway,
    private appVersion: string,
  ) {}

  async execute(filePath: string): Promise<void> {
    const state = await this.repository.load();

    await this.backupGateway.writeBackup(filePath, {
      appVersion: this.appVersion,
      collection: state.toJSON(),
    });
  }
}