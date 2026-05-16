import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { homedir } from 'os';
import type { Sticker } from '../../domain/entities/Sticker';
import { BaseExporter } from './BaseExporter';

export interface CsvExporterOptions {
  stickers: Sticker[];
  filename?: string;
}

export class CsvExporter extends BaseExporter {
  constructor(options: CsvExporterOptions) {
    super(options);
  }

  protected getExtension(): string {
    return 'csv';
  }

  protected generateContent(): string {
    const header = 'id,nombre,equipo,tipo\n';
    const rows = this.stickers.map((s) => {
      const escapedName = s.name.replace(/"/g, '""');
      const escapedTeam = s.team.replace(/"/g, '""');
      return `${s.id},"${escapedName}","${escapedTeam}",${s.type}`;
    }).join('\n');

    return header + rows;
  }

  async export(destination: string = 'downloads'): Promise<string> {
    const ext = this.getExtension();
    let fullPath: string;

    if (destination === 'downloads') {
      const downloadDir = join(homedir(), 'Downloads');
      if (!existsSync(downloadDir)) {
        mkdirSync(downloadDir, { recursive: true });
      }
      fullPath = join(downloadDir, `${this.filename}.${ext}`);
    } else {
      fullPath = join(destination, `${this.filename}.${ext}`);
    }

    const content = this.generateContent();
    const { writeFileSync } = await import('fs');
    writeFileSync(fullPath, content, 'utf-8');

    return fullPath;
  }
}