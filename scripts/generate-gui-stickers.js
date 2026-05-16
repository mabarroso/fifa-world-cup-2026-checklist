import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function parseCSVLine(line) {
  const result = [];
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

function generateStickersJson() {
  const csvPath = resolve(__dirname, '../src/data/stickers.csv');
  const outputPath = resolve(__dirname, '../src/gui/src/data/stickers.json');

  console.log('Reading CSV:', csvPath);

  const content = readFileSync(csvPath, 'utf8');
  const lines = content.trim().split('\n');

  const stickers = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length >= 4) {
      stickers.push({
        id: values[0],
        name: values[1],
        team: values[2],
        type: values[3],
      });
    }
  }

  console.log('Generated', stickers.length, 'stickers');
  writeFileSync(outputPath, JSON.stringify(stickers, null, 2), 'utf8');
  console.log('Written to:', outputPath);
}

generateStickersJson();