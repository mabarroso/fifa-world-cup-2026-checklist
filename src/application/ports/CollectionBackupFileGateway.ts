import type { CollectionStateData } from '../../domain/entities/CollectionState';

export interface CollectionBackupFile {
  appVersion: string;
  collection: CollectionStateData;
}

export interface CollectionBackupFileGateway {
  writeBackup(filePath: string, backup: CollectionBackupFile): Promise<void>;
  readBackup(filePath: string): Promise<unknown>;
}