import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function parseHtmlToCsv(htmlPath, csvPath) {
  console.log('Reading HTML file:', htmlPath);
  
  const html = readFileSync(htmlPath, 'utf8');
  
  // Extract all <p> content
  const paragraphMatches = [...html.matchAll(/<p[^>]*>(.*?)<\/p>/g)];
  const paragraphs = paragraphMatches.map(m => m[1].replace(/<[^>]+>/g, '').trim());
  
  console.log('Found', paragraphs.length, 'paragraph elements');
  
  // Skip header (first 4) and group in chunks of 4
  const rows = ['id,name,team,type'];
  
  for (let i = 4; i < paragraphs.length; i += 4) {
    const id = paragraphs[i]?.trim() || '';
    const name = paragraphs[i + 1]?.trim() || '';
    const team = paragraphs[i + 2]?.trim() || '';
    const type = paragraphs[i + 3]?.trim() || '';
    
    if (id && id !== 'id') {
      // Escape commas in values
      const escapedName = name.replace(/"/g, '""');
      const escapedTeam = team.replace(/"/g, '""');
      const escapedType = type.replace(/"/g, '""');
      
      rows.push(`${id},"${escapedName}","${escapedTeam}","${escapedType}"`);
    }
  }
  
  console.log('Generated', rows.length - 1, 'sticker rows');
  
  writeFileSync(csvPath, rows.join('\n'), 'utf8');
  console.log('CSV written to:', csvPath);
  
  return rows.length - 1;
}

const sourcePath = resolve(__dirname, '../docs/stickers.csv');
const targetPath = resolve(__dirname, '../src/data/stickers.csv');

const count = parseHtmlToCsv(sourcePath, targetPath);
console.log('\nParsed stickers:', count);