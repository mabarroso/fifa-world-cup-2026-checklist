import type { Sticker } from '../../domain/entities/Sticker';

export interface ExporterOptions {
  stickers: Sticker[];
  filename?: string;
}

export abstract class BaseExporter {
  protected stickers: Sticker[];
  protected filename: string;

  constructor(options: ExporterOptions) {
    this.stickers = options.stickers;
    this.filename = options.filename || this.generateFilename();
  }

  protected generateFilename(): string {
    const date = new Date().toISOString().split('T')[0];
    return `faltantes_${date}`;
  }

  abstract export(destination: string): Promise<string>;

  protected getDestinationPath(destination: string): string {
    const sanitizedFilename = this.filename.replace(/[^a-zA-Z0-9_\-.]/g, '_');
    const ext = this.getExtension();
    return `${destination}/${sanitizedFilename}.${ext}`;
  }

  protected abstract getExtension(): string;

  protected abstract generateContent(): string | Buffer;
}