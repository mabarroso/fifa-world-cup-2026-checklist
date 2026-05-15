## Why

The Panini FIFA World Cup 2026 sticker album is a large collection (1072 stickers) that requires manual tracking to know which stickers are owned, duplicated, or missing. This manual process is error-prone and time-consuming. A CLI tool would allow collectors to efficiently manage their collection and generate exportable wish lists for trading.

## What Changes

- **New project**: Panini FIFA World Cup 2026 Stickers Checklist CLI application
- **Cross-platform**: Linux, Unix, macOS support via Bun runtime
- **Embedded sticker data**: 1072 stickers organized by team, group, and type
- **Collection tracking**: Mark stickers as owned/duplicate with quantity counters
- **Progress statistics**: View completion percentage and counts by status
- **Multi-format export**: PDF (printable checklist), CSV, and TXT formats
- **Interactive CLI**: Inquirer-based menus for all operations
- **Persistent storage**: JSON stored in `~/.config/panini-stickers/`
- **Test coverage**: Unit tests with Vitest, targeting 80% for domain layer

## Capabilities

### New Capabilities

- `sticker-data`: Embedded JSON with all 1072 stickers (48 teams, FWC specials, Extra stickers, Coca-Cola edition). Group-based ID system (`MEX-01`, `FWC-01`, `CC-01`, `EXTRA-messi-purple`).

- `collection-tracking`: Track owned stickers (quantity) and duplicates per sticker ID. Support marking/unmarking individual stickers with increment/decrement operations.

- `progress-statistics`: Real-time statistics showing owned count, missing count, duplicate count, and completion percentage. Filter views by sticker type, group, or status.

- `sticker-search`: Search stickers by ID, name, team, or group. Case-insensitive matching with partial name support.

- `export-missing`: Export missing stickers to PDF (printable checklist with checkboxes), CSV (numero, nombre, equipo), and TXT (human-readable list). Auto-named with date stamp (`faltantes_YYYY-MM-DD.*`).

- `cli-menus`: Interactive CLI with main menu (view collection, mark owned, mark duplicate, statistics, search, export, exit) and submenus for filtering and pagination.

- `persistence`: JSON file persistence via `conf` library in `~/.config/panini-stickers/collection.json`. Auto-create directories if missing.

### Modified Capabilities

- None (new project)

## Impact

- **New files**: `src/domain/`, `src/application/`, `src/infrastructure/`, `src/data/stickers.ts`
- **Dependencies**: chalk, conf, inquirer, pdfkit, pdfkit-table (for PDF layout)
- **Build output**: Single executable `dist/panini-stickers` via Rollup bundling
- **Storage**: `~/.config/panini-stickers/collection.json` (user home directory)
- **Data**: `src/data/stickers.ts` — embedded JSON with 1072 sticker entries

## Sticker Data Structure

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (e.g., `MEX-01`, `FWC-09`, `EXTRA-messi-purple`) |
| `number` | number | Position within team (1-20) or sequence number |
| `name` | string | Player name or sticker label |
| `team` | string | Full team name |
| `teamCode` | string | 3-letter code (MEX, RSA, ARG, etc.) |
| `group` | string \| null | Group letter (A-L) or null for specials |
| `type` | enum | `logo`, `fwc_special`, `team_badge`, `player`, `special`, `coca_cola` |
| `extraVariant` | string \| null | `purple`, `bronze`, `silver`, `gold`, or null |

## Collection State Model

| Field | Type | Description |
|-------|------|-------------|
| `owned` | `Record<string, number>` | Sticker ID → quantity owned |
| `duplicates` | `Record<string, number>` | Sticker ID → duplicate count |

## Sticker Count by Category

| Category | ID Pattern | Count |
|----------|-----------|-------|
| Logo Panini | `LOGO-00` | 1 |
| FWC Pre-teams | `FWC-01` to `FWC-08` | 8 |
| 48 Teams × 20 | `{TEAM}-{NN}` | 960 |
| FWC History | `FWC-09` to `FWC-19` | 11 |
| Extra Stickers (×4) | `EXTRA-{name}-{variant}` | 80 |
| Coca-Cola Spain | `CC-01` to `CC-12` | 12 |
| **Total** | | **1072** |