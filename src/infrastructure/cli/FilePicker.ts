import inquirer from 'inquirer';
import { readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';

interface DirectoryEntry {
  name: string;
  isDirectory: boolean;
}

async function listDirectoryEntries(currentDir: string): Promise<DirectoryEntry[]> {
  const entries = await readdir(currentDir, { withFileTypes: true });

  return entries
    .filter(entry => !entry.name.startsWith('.'))
    .map(entry => ({
      name: entry.name,
      isDirectory: entry.isDirectory(),
    }))
    .sort((left, right) => {
      if (left.isDirectory !== right.isDirectory) {
        return left.isDirectory ? -1 : 1;
      }
      return left.name.localeCompare(right.name, 'es');
    });
}

function toBackupFilename(fileName: string): string {
  const clean = fileName.trim();
  if (clean.toLowerCase().endsWith('.fwc26')) {
    return clean;
  }
  return `${clean}.fwc26`;
}

export class FilePicker {
  async pickSavePath(initialDir: string = process.cwd()): Promise<string | null> {
    let currentDir = resolve(initialDir);

    while (true) {
      const entries = await listDirectoryEntries(currentDir);
      const choices = [
        { name: `📁 Directorio actual: ${currentDir}`, value: 'choose_current' },
        { name: '⬆️  Subir al directorio padre', value: 'up' },
        ...entries.filter(entry => entry.isDirectory).map(entry => ({
          name: `📂 ${entry.name}`,
          value: `dir:${entry.name}`,
        })),
        { name: '← Cancelar', value: 'cancel' },
      ];

      const answer = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Selecciona el directorio destino para guardar el backup:',
          choices,
          pageSize: 12,
        },
      ]);

      if (answer.action === 'cancel') {
        return null;
      }

      if (answer.action === 'up') {
        currentDir = resolve(currentDir, '..');
        continue;
      }

      if (typeof answer.action === 'string' && answer.action.startsWith('dir:')) {
        currentDir = join(currentDir, answer.action.slice(4));
        continue;
      }

      const filenameAnswer = await inquirer.prompt([
        {
          type: 'input',
          name: 'filename',
          message: 'Nombre del archivo backup:',
          default: 'coleccion.fwc26',
          validate: (value: string) => value.trim().length > 0 || 'Debes indicar un nombre de archivo.',
        },
      ]);

      return join(currentDir, toBackupFilename(filenameAnswer.filename));
    }
  }

  async pickOpenPath(initialDir: string = process.cwd()): Promise<string | null> {
    let currentDir = resolve(initialDir);

    while (true) {
      const entries = await listDirectoryEntries(currentDir);
      const directories = entries.filter(entry => entry.isDirectory);
      const backupFiles = entries.filter(entry => !entry.isDirectory && entry.name.toLowerCase().endsWith('.fwc26'));

      const choices = [
        { name: `📁 Directorio actual: ${currentDir}`, value: 'current' },
        { name: '⬆️  Subir al directorio padre', value: 'up' },
        ...directories.map(entry => ({
          name: `📂 ${entry.name}`,
          value: `dir:${entry.name}`,
        })),
        ...backupFiles.map(entry => ({
          name: `📄 ${entry.name}`,
          value: `file:${entry.name}`,
        })),
        { name: '← Cancelar', value: 'cancel' },
      ];

      const answer = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Selecciona el archivo backup a abrir:',
          choices,
          pageSize: 14,
        },
      ]);

      if (answer.action === 'cancel') {
        return null;
      }

      if (answer.action === 'up') {
        currentDir = resolve(currentDir, '..');
        continue;
      }

      if (answer.action === 'current') {
        if (backupFiles.length === 0) {
          console.log('No hay archivos .fwc26 en este directorio.');
        }
        continue;
      }

      if (typeof answer.action === 'string' && answer.action.startsWith('dir:')) {
        currentDir = join(currentDir, answer.action.slice(4));
        continue;
      }

      if (typeof answer.action === 'string' && answer.action.startsWith('file:')) {
        return join(currentDir, answer.action.slice(5));
      }
    }
  }
}