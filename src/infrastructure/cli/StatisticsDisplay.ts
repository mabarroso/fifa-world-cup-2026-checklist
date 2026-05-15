import chalk from 'chalk';
import type { CollectionStats } from '../../application/queries/GetCollectionStatsQuery';
import { getAllStickers } from '../../data/stickers';
import type { CollectionState } from '../../domain/entities/CollectionState';

export class StatisticsDisplay {
  printStats(stats: CollectionStats): void {
    console.log(chalk.bold.cyan('\n╔══════════════════════════════════════╗'));
    console.log(chalk.bold.cyan('║    ESTADÍSTICAS DE COLECCIÓN         ║'));
    console.log(chalk.bold.cyan('╚══════════════════════════════════════╝\n'));

    console.log(`  ${chalk.white('Total figuritas:')}     ${chalk.bold(stats.total)}`);
    console.log(`  ${chalk.green('Obtenidas:')}          ${chalk.green.bold(stats.owned)}`);
    console.log(`  ${chalk.red('Faltantes:')}           ${chalk.red.bold(stats.missing)}`);
    console.log(`  ${chalk.yellow('Repetidas:')}         ${chalk.yellow.bold(stats.duplicates)}`);

    console.log('\n  ' + this.renderProgressBar(stats.percentage));

    console.log(`\n  ${chalk.white('Porcentaje completado:')} ${chalk.green.bold(stats.percentage)}%`);

    console.log('\n' + chalk.cyan('─'.repeat(42)) + '\n');
  }

  printDetailedStats(state: CollectionState): void {
    const allStickers = getAllStickers();

    const byGroup: Record<string, { owned: number; total: number }> = {};
    const byType: Record<string, { owned: number; total: number }> = {};

    for (const sticker of allStickers) {
      const isOwned = state.getOwnedQuantity(sticker.id) > 0;

      if (sticker.group) {
        if (!byGroup[sticker.group]) {
          byGroup[sticker.group] = { owned: 0, total: 0 };
        }
        byGroup[sticker.group].total++;
        if (isOwned) byGroup[sticker.group].owned++;
      }

      const typeKey = sticker.type.toString();
      if (!byType[typeKey]) {
        byType[typeKey] = { owned: 0, total: 0 };
      }
      byType[typeKey].total++;
      if (isOwned) byType[typeKey].owned++;
    }

    console.log(chalk.bold.cyan('\n=== ESTADÍSTICAS POR GRUPO ===\n'));
    const sortedGroups = Object.keys(byGroup).sort();
    for (const group of sortedGroups) {
      const data = byGroup[group];
      const pct = Math.round((data.owned / data.total) * 100);
      const color = pct === 100 ? chalk.green : pct > 50 ? chalk.yellow : chalk.red;
      console.log(`  ${chalk.white(`Grupo ${group}:`)} ${color(`${data.owned}/${data.total} (${pct}%)`)}`);
    }

    console.log(chalk.bold.cyan('\n=== ESTADÍSTICAS POR TIPO ===\n'));
    for (const [type, data] of Object.entries(byType)) {
      const pct = Math.round((data.owned / data.total) * 100);
      const color = pct === 100 ? chalk.green : pct > 50 ? chalk.yellow : chalk.red;
      console.log(`  ${chalk.white(`${type}:`)} ${color(`${data.owned}/${data.total} (${pct}%)`)}`);
    }

    console.log('');
  }

  private renderProgressBar(percentage: number): string {
    const width = 30;
    const filled = Math.round((percentage / 100) * width);
    const empty = width - filled;

    const progressBar = chalk.green('█'.repeat(filled)) + chalk.gray('░'.repeat(empty));

    return `[${progressBar}]`;
  }

  printTopDuplicates(state: CollectionState, limit: number = 5): void {
    const duplicates = Object.entries(state.duplicates)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit);

    if (duplicates.length === 0) {
      console.log(chalk.gray('\nNo tienes figuritas repetidas aún.\n'));
      return;
    }

    console.log(chalk.bold.cyan('\n=== TOP REPETIDAS ===\n'));

    for (let i = 0; i < duplicates.length; i++) {
      const [id, qty] = duplicates[i];
      const marker = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '  ';
      console.log(`  ${chalk.yellow(marker)} [${id}] x${qty}`);
    }

    console.log('');
  }
}