import inquirer from 'inquirer';
import chalk from 'chalk';
import { SearchStickersQuery } from '../../application/queries/SearchStickersQuery';
import type { CollectionState } from '../../domain/entities/CollectionState';

export class SearchInterface {
  private searchQuery: SearchStickersQuery;

  constructor() {
    this.searchQuery = new SearchStickersQuery();
  }

  async show(state: CollectionState): Promise<void> {
    console.log(chalk.cyan('\n--- Buscar figuritas ---\n'));

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'query',
        message: 'Ingresa texto para buscar (nombre, equipo, o ID):',
        validate: (input: string) => {
          if (!input.trim()) return 'Debes ingresar un texto de búsqueda';
          return true;
        },
      },
    ]);

    const query = answers.query.trim();

    console.log(chalk.gray(`\nBuscando "${query}"...`));

    const results = this.searchQuery.execute(query);

    if (results.length === 0) {
      console.log(chalk.yellow('\nNo se encontraron figuritas que coincidan.\n'));
      return;
    }

    console.log(chalk.green(`\n✓ Se encontraron ${results.length} figurita(s):\n`));

    const pageSize = 20;
    let currentPage = 0;
    const totalPages = Math.ceil(results.length / pageSize);

    while (currentPage < totalPages) {
      const start = currentPage * pageSize;
      const end = Math.min(start + pageSize, results.length);
      const pageResults = results.slice(start, end);

      console.log(chalk.cyan(`--- Página ${currentPage + 1}/${totalPages} ---`));

      for (const sticker of pageResults) {
        const ownedQty = state.getOwnedQuantity(sticker.id);
        const dupQty = state.getDuplicateQuantity(sticker.id);

        let statusIcon = chalk.gray('[ ]');
        if (dupQty > 0) {
          statusIcon = chalk.yellow(`[R:${dupQty}]`);
        } else if (ownedQty > 0) {
          statusIcon = chalk.green(`[OK]`);
        }

        const groupInfo = sticker.group ? ` (${sticker.group})` : '';
        console.log(`${statusIcon} ${chalk.white(`[${sticker.id}]`)} ${sticker.name} - ${sticker.team}${groupInfo}`);
      }

      if (currentPage < totalPages - 1) {
        const nextAnswer = await inquirer.prompt([
          {
            type: 'list',
            name: 'next',
            message: '¿Qué quieres hacer?',
            choices: [
              { name: '➡️ Siguiente página', value: 'next' },
              { name: '⬅️ Página anterior', value: 'prev' },
              { name: '🚪 Salir', value: 'exit' },
            ],
            pageSize: 3,
          },
        ]);

        if (nextAnswer.next === 'exit') break;
        if (nextAnswer.next === 'next') currentPage++;
        else if (nextAnswer.next === 'prev' && currentPage > 0) currentPage--;
      } else {
        currentPage++;
      }
    }
  }
}