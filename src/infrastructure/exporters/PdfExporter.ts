import PDFDocument from 'pdfkit';
import { homedir } from 'os';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import type { Sticker } from '../../domain/entities/Sticker';
import { BaseExporter } from './BaseExporter';

export interface PdfExporterOptions {
  stickers: Sticker[];
  filename?: string;
}

export class PdfExporter extends BaseExporter {
  private stickersPerPage: number = 40;
  private rowsPerColumn: number = 20;

  constructor(options: PdfExporterOptions) {
    super(options);
  }

  protected getExtension(): string {
    return 'pdf';
  }

  protected generateContent(): string | Buffer {
    return Buffer.from([]);
  }

  async export(destination: string = 'downloads'): Promise<string> {
    const path = this.getDestinationPath(destination);
    const dir = join(homedir(), 'Downloads');

    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    const fullPath = destination === 'downloads' ? join(dir, `${this.filename}.pdf`) : path;

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 30 });
      const stream = require('fs').createWriteStream(fullPath);

      doc.pipe(stream);

      this.renderContent(doc);

      doc.end();

      stream.on('finish', () => resolve(fullPath));
      stream.on('error', reject);
    });
  }

  private renderContent(doc: PDFKit.PDFDocument): void {
    const pageWidth = doc.page.width - 60;
    const colWidth = pageWidth / 2;
    const startX = 30;
    const startY = 50;
    const rowHeight = 20;
    const checkboxSize = 12;

    let currentPage = 1;
    const totalPages = Math.ceil(this.stickers.length / this.stickersPerPage);

    this.renderHeader(doc, currentPage, totalPages);

    for (let i = 0; i < this.stickers.length; i++) {
      const sticker = this.stickers[i];
      const indexOnPage = i % this.stickersPerPage;
      const col = Math.floor(indexOnPage / this.rowsPerColumn);
      const row = indexOnPage % this.rowsPerColumn;

      if (indexOnPage > 0 && indexOnPage % this.stickersPerPage === 0) {
        doc.addPage();
        currentPage++;
        this.renderHeader(doc, currentPage, totalPages);
      }

      const x = startX + col * colWidth;
      const y = startY + 30 + row * rowHeight;

      doc.rect(x, y, checkboxSize, checkboxSize).stroke();

      const textX = x + checkboxSize + 5;
      const textWidth = colWidth - checkboxSize - 10;

      doc.fontSize(8).fillColor('#000');

      const idText = `[${sticker.id}]`;
      const nameText = ` ${sticker.name}`;
      const teamText = ` - ${sticker.team}`;

      let truncatedId = idText;
      const fullText = idText + nameText + teamText;

      if (doc.widthOfString(fullText) > textWidth) {
        const maxNameLen = Math.floor((textWidth - doc.widthOfString(idText) - doc.widthOfString(teamText)) / 5);
        truncatedId = idText + nameText.substring(0, Math.max(5, maxNameLen)) + '..';
      }

      doc.text(truncatedId + teamText, textX, y, {
        width: textWidth,
        continued: false,
      });
    }
  }

  private renderHeader(doc: PDFKit.PDFDocument, currentPage: number, totalPages: number): void {
    const pageWidth = doc.page.width;

    doc.fontSize(14).fillColor('#1a1a2e');
    doc.text('Album Panini FIFA World Cup 2026', 30, 20, { align: 'center', width: pageWidth - 60 });

    doc.fontSize(10).fillColor('#666');
    doc.text(`Faltantes - Página ${currentPage}/${totalPages}`, 30, 38, { align: 'center', width: pageWidth - 60 });

    doc.moveTo(30, 48).lineTo(pageWidth - 30, 48).stroke();
  }
}