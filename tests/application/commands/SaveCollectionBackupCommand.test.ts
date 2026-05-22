import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SaveCollectionBackupCommand } from '../../../src/application/commands/SaveCollectionBackupCommand';
import type { CollectionRepository } from '../../../src/domain/repositories/CollectionRepository';
import type { CollectionBackupFileGateway } from '../../../src/application/ports/CollectionBackupFileGateway';
import { CollectionState } from '../../../src/domain/entities/CollectionState';

describe('SaveCollectionBackupCommand', () => {
  let mockRepository: CollectionRepository;
  let mockBackupGateway: CollectionBackupFileGateway;
  let command: SaveCollectionBackupCommand;

  beforeEach(() => {
    mockRepository = {
      load: vi.fn().mockResolvedValue(
        new CollectionState({
          owned: { 'MEX-01': 1 },
          duplicates: { 'BRA-02': 2 },
        }),
      ),
      save: vi.fn().mockResolvedValue(undefined),
    };

    mockBackupGateway = {
      writeBackup: vi.fn().mockResolvedValue(undefined),
      readBackup: vi.fn(),
    };

    command = new SaveCollectionBackupCommand(mockRepository, mockBackupGateway, '1.0.1');
  });

  it('should save backup with appVersion and collection payload', async () => {
    await command.execute('/tmp/coleccion.fwc26');

    expect(mockBackupGateway.writeBackup).toHaveBeenCalledWith('/tmp/coleccion.fwc26', {
      appVersion: '1.0.1',
      collection: {
        owned: { 'MEX-01': 1 },
        duplicates: { 'BRA-02': 2 },
      },
    });
  });
});
