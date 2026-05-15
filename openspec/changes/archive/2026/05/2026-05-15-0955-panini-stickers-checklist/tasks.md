## 1. Project Setup

- [x] 1.1 Create `src/` directory structure (domain/, application/, infrastructure/, data/)
- [x] 1.2 Create `tests/` directory structure
- [x] 1.3 Update package.json with correct dependencies (chalk, conf, inquirer, pdfkit)
- [x] 1.4 Verify bun install completes without errors

## 2. Domain Layer

- [x] 2.1 Create `StickerType` enum (logo, fwc_special, team_badge, player, special, coca_cola)
- [x] 2.2 Create `StickerId` value object with validation for composite IDs
- [x] 2.3 Create `Sticker` entity (id, number, name, team, teamCode, group, type, extraVariant)
- [x] 2.4 Create `CollectionState` entity (owned map, duplicates map)
- [x] 2.5 Create `CollectionRepository` interface (load, save methods)
- [x] 2.6 Write unit tests for `Sticker` entity
- [x] 2.7 Write unit tests for `CollectionState` entity
- [x] 2.8 Write unit tests for `StickerId` value object

## 3. Application Layer

- [x] 3.1 Create `MarkStickerOwnedCommand` (increment/decrement owned)
- [x] 3.2 Create `MarkStickerDuplicateCommand` (increment/decrement duplicates)
- [x] 3.3 Create `ResetCollectionCommand`
- [x] 3.4 Create `GetCollectionStatsQuery` (owned, missing, duplicates, percentage)
- [x] 3.5 Create `GetMissingStickersQuery` (with optional filters)
- [x] 3.6 Create `SearchStickersQuery` (by ID, name, team, group)
- [x] 3.7 Write unit tests for all commands and queries (mock repository)

## 4. Infrastructure — Storage

- [x] 4.1 Create `ConfStorageAdapter` implementing `CollectionRepository`
- [x] 4.2 Implement `load()` with auto-create directory on first run
- [x] 4.3 Implement `save()` with atomic write
- [x] 4.4 Handle cross-platform paths (conf library)
- [x] 4.5 Write unit tests for `ConfStorageAdapter` (mock conf)

## 5. Infrastructure — Sticker Data

- [x] 5.1 Create `src/data/stickers.ts` with all 1072 stickers
- [x] 5.2 Add Logo Panini entry (LOGO-00)
- [x] 5.3 Add FWC pre-team stickers (FWC-01 to FWC-08)
- [x] 5.4 Add all 48 national teams × 20 stickers with group assignment
- [x] 5.5 Add FWC history stickers (FWC-09 to FWC-19)
- [x] 5.6 Add Extra stickers × 4 variants (80 entries)
- [x] 5.7 Add Coca-Cola Spain edition (CC-01 to CC-12)
- [x] 5.8 Create `getAllStickers()` helper function
- [x] 5.9 Create `getStickerById(id)` helper function
- [x] 5.10 Write unit tests for sticker data helpers

## 6. Infrastructure — Exporters

- [x] 6.1 Create `BaseExporter` abstract class
- [x] 6.2 Create `PdfExporter` with checklist layout (2 columns, checkboxes)
- [x] 6.3 Create `CsvExporter` with columns: numero, nombre, equipo
- [x] 6.4 Create `TxtExporter` with grouped team format
- [x] 6.5 Implement auto-naming with date stamp (faltantes_YYYY-MM-DD.*)
- [x] 6.6 Add export destination selection (desktop, downloads, current dir)
- [x] 6.7 Write unit tests for all exporters (mock fs, mock PDFKit)

## 7. Infrastructure — CLI

- [x] 7.1 Create `MainMenu` with 7 options
- [x] 7.2 Create `ViewCollectionMenu` with status filters (todos, faltantes, obtenidos, repetidos)
- [x] 7.3 Create `MarkOwnedMenu` with sticker ID input and quantity prompt
- [x] 7.4 Create `MarkDuplicateMenu` with sticker ID input and quantity prompt
- [x] 7.5 Create `StatisticsDisplay` with progress bar
- [x] 7.6 Create `SearchInterface` with input and results display
- [x] 7.7 Create `ExportMenu` with PDF/CSV/TXT selection
- [x] 7.8 Implement pagination for long lists (20 per page)
- [x] 7.9 All CLI text in Spanish
- [x] 7.10 Write integration tests for CLI flow (mock inquirer)

## 8. Entry Point

- [x] 8.1 Create `src/index.ts` as CLI bootstrap
- [x] 8.2 Initialize storage adapter
- [x] 8.3 Load sticker data
- [x] 8.4 Display main menu on startup
- [x] 8.5 Handle graceful exit with farewell message

## 9. Build & Distribution

- [x] 9.1 Configure rollup for standalone binary output
- [x] 9.2 Add executable permissions to output file
- [x] 9.3 Test binary runs without bun/node installed
- [x] 9.4 Verify all functionality works in built binary

## 10. Verification

- [x] 10.1 Run `bun test` — all tests pass
- [x] 10.2 Run `bun run typecheck` — no TypeScript errors
- [x] 10.3 Run `bun run lint` — no linting errors
- [x] 10.4 Manual testing of all CLI menus
- [x] 10.5 Test PDF/CSV/TXT export outputs