import inquirer from 'inquirer';
import chalk from 'chalk';
import { getStickerById } from '../../data/stickers';
import type { MarkStickerDuplicateCommand } from '../../application/commands/MarkStickerDuplicateCommand';

export class MarkDuplicateMenu {
  async show(command: MarkStickerDuplicateCommand): Promise<void> {
    console.log(chalk.cyan('\n--- Marcar figurita como repetida ---\n'));

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'stickerId',
        message: 'Ingresa el ID de la figurita repetida (ej: MEX-01):',
        validate: (input: string) => {
          if (!input.trim()) return 'Debes ingresar un ID';
          return true;
        },
      },
      {
        type: 'number',
        name: 'quantity',
        message: '¿Cuántas unidades repetidas tienes? (default: 1):',
        default: 1,
        filter: (val: number) => val || 1,
      },
    ]);

    const stickerId = answers.stickerId.trim().toUpperCase();
    const quantity = answers.quantity;

    const sticker = getStickerById(stickerId);

    if (!sticker) {
      console.log(chalk.red(`\n❌ Figurita "${stickerId}" no encontrada.`));
      return;
    }

    await command.execute(stickerId, quantity);

    console.log(chalk.yellow(`\n✓ Marcada(s) ${quantity} unidad(es) repetida(s) de [${stickerId}] ${sticker.name}`));
  }

  async quickMark(command: MarkStickerDuplicateCommand): Promise<string | null> {
    console.log(chalk.cyan('\n--- Marcar figurita como repetida ---\n'));

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'stickerId',
        message: 'Ingresa el ID de la figurita (ej: MEX-01) o "salir" para volver:',
        validate: (input: string) => {
          if (input.toLowerCase() === 'salir') return true;
          if (!input.trim()) return 'Debes ingresar un ID';
          return true;
        },
      },
    ]);

    if (answers.stickerId.toLowerCase() === 'salir') {
      return null;
    }

    const stickerId = answers.stickerId.trim().toUpperCase();
    const sticker = getStickerById(stickerId);

    if (!sticker) {
      console.log(chalk.red(`\n❌ Figurita "${stickerId}" no encontrada.`));
      return null;
    }

    await command.execute(stickerId, 1);

    console.log(chalk.yellow(`\n✓ Marcada repetida [${stickerId}] ${sticker.name}`));
    return stickerId;
  }
}