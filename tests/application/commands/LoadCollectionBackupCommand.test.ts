import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoadCollectionBackupCommand } from '../../../src/application/commands/LoadCollectionBackupCommand';
import type { CollectionRepository } from '../../../src/domain/repositories/CollectionRepository';
import type { CollectionBackupFileGateway } from '../../../src/application/ports/CollectionBackupFileGateway';
import { CollectionState } from '../../../src/domain/entities/CollectionState';

describe('LoadCollectionBackupCommand', () => {
  let mockRepository: CollectionRepository;
  let mockBackupGateway: CollectionBackupFileGateway;
  let command: LoadCollectionBackupCommand;

  beforeEach(() => {
    mockRepository = {
      load: vi.fn().mockResolvedValue(new CollectionState()),
      save: vi.fn().mockResolvedValue(undefined),
    };

    mockBackupGateway = {
      writeBackup: vi.fn(),
      readBackup: vi.fn(),
    };

    command = new LoadCollectionBackupCommand(mockRepository, mockBackupGateway, '1.0.1');
  });

  it('should load a compatible backup and replace active collection', async () => {
    const readBackupMock = mockBackupGateway.readBackup as any;
    readBackupMock.mockResolvedValue({
      appVersion: '1.0.0',
      collection: {
        owned: { 'ESP-01': 1 },
        duplicates: { 'ESP-01': 2 },
      },
    });

    const result = await command.execute('/tmp/coleccion.fwc26');

    expect(result).toEqual({ importedVersion: '1.0.0' });
    expect(mockRepository.save).toHaveBeenCalledTimes(1);

    const saveMock = mockRepository.save as any;
    const savedState = saveMock.mock.calls[0]?.[0];
    expect(savedState?.toJSON()).toEqual({
      owned: { 'ESP-01': 1 },
      duplicates: { 'ESP-01': 2 },
    });
  });

  it('should accept backup with same app version', async () => {
    const readBackupMock = mockBackupGateway.readBackup as any;
    readBackupMock.mockResolvedValue({
      appVersion: '1.0.1',
      collection: { owned: {}, duplicates: {} },
    });

    await expect(command.execute('/tmp/coleccion.fwc26')).resolves.toEqual({ importedVersion: '1.0.1' });
  });

  it('should reject backup created with newer version', async () => {
    const readBackupMock = mockBackupGateway.readBackup as any;
    readBackupMock.mockResolvedValue({
      appVersion: '1.1.0',
      collection: { owned: {}, duplicates: {} },
    });

    await expect(command.execute('/tmp/coleccion.fwc26')).rejects.toThrow(/más nueva/i);
  });

  it('should reject files that are not .fwc26', async () => {
    await expect(command.execute('/tmp/coleccion.json')).rejects.toThrow(/\.fwc26/i);
  });

  it('should reject invalid backup payload', async () => {
    const readBackupMock = mockBackupGateway.readBackup as any;
    readBackupMock.mockResolvedValue({
      appVersion: '1.0.0',
      collection: {
        owned: { 'ESP-01': -1 },
        duplicates: {},
      },
    });

    await expect(command.execute('/tmp/coleccion.fwc26')).rejects.toThrow(/debe ser un número/i);
  });
});
