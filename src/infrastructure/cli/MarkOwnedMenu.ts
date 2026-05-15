import inquirer from 'inquirer';
import chalk from 'chalk';
import { getStickerById } from '../../data/stickers';
import type { MarkStickerOwnedCommand } from '../../application/commands/MarkStickerOwnedCommand';

export class MarkOwnedMenu {
  async show(command: MarkStickerOwnedCommand): Promise<void> {
    console.log(chalk.cyan('\n--- Marcar cromo como obtenido ---\n'));

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'stickerId',
        message: 'Ingresa el ID del cromo (ej: MEX-01):',
        validate: (input: string) => {
          if (!input.trim()) return 'Debes ingresar un ID';
          return true;
        },
      },
      {
        type: 'number',
        name: 'quantity',
        message: '¿Cuántas unidades tienes? (default: 1):',
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

    console.log(chalk.green(`\n✓ Marcada(s) ${quantity} unidad(es) de [${stickerId}] ${sticker.name}`));
  }

  async quickMark(command: MarkStickerOwnedCommand): Promise<string | null> {
    console.log(chalk.cyan('\n--- Marcar cromo como obtenido ---\n'));

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'stickerId',
        message: 'Ingresa el ID del cromo (ej: MEX-01) o "salir" para volver:',
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
      console.log(chalk.red(`\n❌ Cromo "${stickerId}" no encontrado.`));
      return null;
    }

    await command.execute(stickerId, 1);

    console.log(chalk.green(`\n✓ Marcado [${stickerId}] ${sticker.name}`));
    return stickerId;
  }

  async interactiveMark(command: MarkStickerOwnedCommand): Promise<void> {
    console.log(chalk.cyan('\n--- Modo interactivo: Marcar cromos ---\n'));
    console.log(chalk.gray('Ingresa el ID de cada cromo. Escribe "salir" para terminar.\n'));

    while (true) {
      const result = await this.quickMark(command);
      if (result === null) break;

      console.log(chalk.gray('Presiona Enter para marcar otro cromo...\n'));
      await inquirer.prompt([
        {
          type: 'input',
          name: 'continue',
          message: '',
        },
      ]);
    }
  }
}