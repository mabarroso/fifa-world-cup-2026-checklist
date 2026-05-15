import { Sticker } from '../domain/entities/Sticker';
import { StickerType } from '../domain/value-objects/StickerType';
import { readFileSync } from 'fs';
import { resolve } from 'path';

interface StickerCsvRow {
  id: string;
  number: string;
  name: string;
  team: string;
  teamCode: string;
  group: string;
  type: string;
  extraVariant: string;
}

function parseCSV(content: string): StickerCsvRow[] {
  const lines = content.trim().split('\n');
  const header = lines[0].split(',');
  const rows: StickerCsvRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const row: Partial<StickerCsvRow> = {};
    for (let j = 0; j < header.length; j++) {
      (row as Record<string, string>)[header[j]] = values[j] || '';
    }
    rows.push(row as StickerCsvRow);
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
      number: parseInt(row.number, 10),
      name: row.name,
      team: row.team,
      teamCode: row.teamCode,
      group: row.group || null,
      type: StickerType.fromString(row.type),
      extraVariant: row.extraVariant ? (row.extraVariant as 'purple' | 'bronze' | 'silver' | 'gold') : null,
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

export function getStickersByGroup(group: string): Sticker[] {
  return stickers.filter((s) => s.group === group);
}

export function getStickersByTeam(teamCode: string): Sticker[] {
  return stickers.filter((s) => s.teamCode === teamCode);
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