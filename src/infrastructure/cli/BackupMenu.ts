import inquirer from 'inquirer';
import chalk from 'chalk';
import type { LoadCollectionBackupCommand, SaveCollectionBackupCommand } from '../../application';
import type { CollectionRepository } from '../../domain/repositories/CollectionRepository';
import { FilePicker } from './FilePicker';

export class BackupMenu {
  private filePicker: FilePicker;

  constructor(
    private saveBackupCommand: SaveCollectionBackupCommand,
    private loadBackupCommand: LoadCollectionBackupCommand,
    private repository: CollectionRepository,
  ) {
    this.filePicker = new FilePicker();
  }

  async save(): Promise<void> {
    console.log(chalk.cyan('\n--- Guardar copia de seguridad ---\n'));

    const filePath = await this.filePicker.pickSavePath();
    if (!filePath) {
      console.log(chalk.yellow('Operación cancelada.\n'));
      return;
    }

    await this.saveBackupCommand.execute(filePath);
    console.log(chalk.green('\n✓ Copia de seguridad guardada correctamente.'));
    console.log(chalk.white(`  ${filePath}\n`));
  }

  async load(): Promise<void> {
    console.log(chalk.cyan('\n--- Abrir copia de seguridad ---\n'));

    const currentState = await this.repository.load();
    const hasExistingData = currentState.getTotalOwned() > 0 || currentState.getTotalDuplicates() > 0;

    if (hasExistingData) {
      const warningAnswer = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: chalk.red(
            'ATENCION: tu colección actual no está vacía. Si continúas, será reemplazada por el contenido del backup. ¿Deseas continuar?',
          ),
          default: false,
        },
      ]);

      if (!warningAnswer.confirm) {
        console.log(chalk.yellow('Importación cancelada.\n'));
        return;
      }
    }

    const filePath = await this.filePicker.pickOpenPath();
    if (!filePath) {
      console.log(chalk.yellow('Operación cancelada.\n'));
      return;
    }

    const confirmAnswer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: '¿Confirmas que deseas cargar este backup y reemplazar la colección actual?',
        default: false,
      },
    ]);

    if (!confirmAnswer.confirm) {
      console.log(chalk.yellow('Importación cancelada.\n'));
      return;
    }

    const result = await this.loadBackupCommand.execute(filePath);
    console.log(chalk.green('\n✓ Backup cargado correctamente.'));
    console.log(chalk.white(`  Versión del backup: ${result.importedVersion}`));
    console.log(chalk.white(`  Archivo: ${filePath}\n`));
  }
}