import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import type { CollectionBackupFile, CollectionBackupFileGateway } from '../../application';

function ensureExtension(filePath: string): string {
  const normalized = filePath.trim();
  if (normalized.toLowerCase().endsWith('.fwc26')) {
    return normalized;
  }
  return `${normalized}.fwc26`;
}

export class FileBackupAdapter implements CollectionBackupFileGateway {
  async writeBackup(filePath: string, backup: CollectionBackupFile): Promise<void> {
    const pathWithExtension = resolve(ensureExtension(filePath));
    await mkdir(dirname(pathWithExtension), { recursive: true });
    await writeFile(pathWithExtension, `${JSON.stringify(backup, null, 2)}\n`, 'utf-8');
  }

  async readBackup(filePath: string): Promise<unknown> {
    const absolutePath = resolve(filePath);
    const content = await readFile(absolutePath, 'utf-8');
    return JSON.parse(content);
  }
}