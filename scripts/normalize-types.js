import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// StickerType mapping based on ID patterns
function getStickerType(id) {
  // Logo
  if (id === '0') return 'logo';
  
  // FIFA World Cup specials (FWC1, FWC2, etc.)
  if (id.startsWith('FWC')) return 'fwc_special';
  
  // Coca-Cola variants
  if (id.startsWith('CC-US')) return 'cocacola_us';
  if (id.startsWith('CC-LAM')) return 'cocacola_lam';
  if (id.startsWith('CC-RW')) return 'cocacola_rw';
  if (id.startsWith('CC-EU')) return 'cocacola_eu';
  
  // McDonald's
  if (id.startsWith('MC-')) return 'mcdonalds';
  
  // Extra variants (suffixes -b, -s, -g)
  if (id.endsWith('-b')) return 'extra_bronze';
  if (id.endsWith('-s')) return 'extra_silver';
  if (id.endsWith('-g')) return 'extra_gold';
  
  // Extra Base (no suffix, but check team patterns - these are the extra stickers with different team codes)
  // Extra stickers use different team codes like ARG, BEL, BRA, etc.
  // We need to check if it's an extra by looking at the pattern
  const extraTeamCodes = [
    'ARG', 'BEL', 'BRA', 'CAN', 'COL', 'CRO', 'ECU', 'EGY', 'ENG', 'FRA',
    'GER', 'JPN', 'MAR', 'MEX', 'NED', 'NOR', 'POR', 'RSA', 'KOR', 'ESP',
    'SUI', 'TUR', 'URU', 'USA', 'AUS', 'ALG', 'BIH', 'COD', 'CIV', 'CPV',
    'CZE', 'GHA', 'HAI', 'IRN', 'IRQ', 'JOR', 'NZL', 'PAN', 'PAR', 'QAT',
    'SEN', 'SCO', 'SWE', 'TUN', 'UZB'
  ];
  
  // Check if it's an Extra (by team code and no suffix)
  const dashIndex = id.indexOf('-');
  if (dashIndex > 0) {
    const teamCode = id.substring(0, dashIndex);
    if (extraTeamCodes.includes(teamCode) && !id.includes('s')) {
      // Check if it's Panini Extra (has 's' suffix like MEX1s)
      if (id.endsWith('s')) {
        return 'panini_extra';
      }
      // Otherwise it's Extra Base
      return 'extra_base';
    }
  }
  
  // Panini Normal: Check if it's the first sticker of a team (team badge)
  if (/^[A-Z]{2,4}\d+$/.test(id)) {
    const numberPart = id.match(/\d+$/)[0];
    if (numberPart === '1') {
      return 'team_badge';
    }
    return 'player';
  }
  
  // Default to player for unknown patterns
  return 'player';
}

function normalizeStickers(csvPath, outputPath) {
  console.log('Reading CSV file:', csvPath);
  
  const content = readFileSync(csvPath, 'utf8');
  const lines = content.split('\n');
  
  const headers = lines[0].split(',');
  const typeIndex = headers.indexOf('type');
  
  console.log('Processing', lines.length - 1, 'stickers');
  
  const newLines = [lines[0]]; // Keep header
  
  let stats = {
    logo: 0,
    fwc_special: 0,
    team_badge: 0,
    player: 0,
    panini_extra: 0,
    cocacola_us: 0,
    cocacola_lam: 0,
    cocacola_rw: 0,
    cocacola_eu: 0,
    mcdonalds: 0,
    extra_base: 0,
    extra_bronze: 0,
    extra_silver: 0,
    extra_gold: 0,
  };
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    // Parse CSV line (handling quoted values)
    const values = parseCSVLine(line);
    
    if (values.length < 4) continue;
    
    const id = values[0].replace(/^"|"$/g, '');
    const name = values[1].replace(/^"|"$/g, '');
    const team = values[2].replace(/^"|"$/g, '');
    
    const newType = getStickerType(id);
    stats[newType]++;
    
    // Replace the type column with the new type
    values[typeIndex] = newType;
    
    // Reconstruct CSV line
    newLines.push(values.map(v => `"${v.replace(/"/g, '""')}"`).join(','));
  }
  
  console.log('\nType distribution:');
  for (const [type, count] of Object.entries(stats)) {
    if (count > 0) {
      console.log(`  ${type}: ${count}`);
    }
  }
  
  writeFileSync(outputPath, newLines.join('\n'), 'utf8');
  console.log('\nNormalized CSV written to:', outputPath);
  
  return stats;
}

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

const csvPath = resolve(__dirname, '../src/data/stickers.csv');
const outputPath = resolve(__dirname, '../src/data/stickers.csv');

const stats = normalizeStickers(csvPath, outputPath);
console.log('\nTotal stickers processed:', Object.values(stats).reduce((a, b) => a + b, 0));