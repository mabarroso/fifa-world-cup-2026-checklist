import { Sticker } from '../domain/entities/Sticker';
import { StickerType } from '../domain/value-objects/StickerType';
import { readFileSync } from 'fs';
import { resolve } from 'path';

interface StickerCsvRow {
  id: string;
  name: string;
  team: string;
  type: string;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function parseCSV(content: string): StickerCsvRow[] {
  const lines = content.trim().split('\n');
  const rows: StickerCsvRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length >= 4) {
      rows.push({
        id: values[0],
        name: values[1],
        team: values[2],
        type: values[3],
      });
    }
  }

  return rows;
}

function loadStickersFromCsv(): Sticker[] {
  const csvPath = resolve(__dirname, 'stickers.csv');
  const csvContent = readFileSync(csvPath, 'utf-8');
  const rows = parseCSV(csvContent);

  return rows.map((row) =>
    new Sticker({
      id: row.id,
      name: row.name,
      team: row.team,
      type: StickerType.fromString(row.type),
    })
  );
}

export const stickers: Sticker[] = loadStickersFromCsv();

export function getAllStickers(): Sticker[] {
  return stickers;
}

export function getStickerById(id: string): Sticker | undefined {
  return stickers.find((s) => s.id === id);
}

export function getStickersByType(type: StickerType): Sticker[] {
  return stickers.filter((s) => s.type === type);
}

export function getStickersByTeam(team: string): Sticker[] {
  return stickers.filter((s) => s.team === team);
}

export function searchStickers(query: string): Sticker[] {
  const lowerQuery = query.toLowerCase();
  return stickers.filter(
    (s) =>
      s.id.toLowerCase().includes(lowerQuery) ||
      s.name.toLowerCase().includes(lowerQuery) ||
      s.team.toLowerCase().includes(lowerQuery)
  );
}

export const TOTAL_STICKERS = stickers.length;