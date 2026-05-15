## Context

The Panini FIFA World Cup 2026 sticker album contains 1072 stickers across 48 national teams, special FIFA stickers, 80 Extra stickers (4 variants each), and 12 Coca-Cola Spain edition stickers. The current approach to tracking this collection is manual (spreadsheet or pen-and-paper), which is error-prone given the volume. The user needs a cross-platform CLI tool that persists collection data locally, provides interactive menus, and generates exportable wish lists in multiple formats.

The project is built from scratch with Bun + TypeScript + Rollup. No existing architecture to maintain.

## Goals / Non-Goals

**Goals:**
- Cross-platform CLI executable (Linux, Unix, macOS) via Bun bundling
- Embedded sticker data (no external API or download required)
- Track owned stickers with quantity counters and separate duplicate tracking
- Interactive CLI menus using Inquirer (Spanish UI)
- Export missing stickers to PDF (printable checklist), CSV, and TXT
- Persistent JSON storage in `~/.config/panini-stickers/`
- Clean Architecture + DDD with domain-only core (no external dependencies)
- Unit tests with Vitest (>=80% coverage on domain layer)

**Non-Goals:**
- Web or desktop GUI (CLI only)
- Cloud sync or multi-device support
- Inventory management (price, condition, trade value)
- Stickers sold separately (no purchasing functionality)
- Offline-first without bundled data (all data is embedded)

## Decisions

### 1. Runtime: Bun over Node.js

**Decision:** Use Bun as runtime and bundler instead of Node.js + npm.

**Rationale:** Bun produces self-contained executables via `bun build --target=bun` or Rollup. The final binary has zero external dependencies on the user's machine—no need for them to have Bun or Node.js installed. The project also uses Bun scripts for `dev`, `build`, and `test`.

**Alternative considered:** Node.js with pkg or nexe for binary compilation. More mature but slower bundling and larger output size.

### 2. Persistence: conf library

**Decision:** Use the `conf` npm package for JSON persistence.

**Rationale:** `conf` automatically resolves the correct config directory per OS (`~/.config/panini-stickers/` on Linux/macOS, `%APPDATA%` on Windows). It handles directory creation and file locking. No manual path handling needed.

**Alternative considered:** Raw `fs` with manual path resolution. Would require OS-specific logic and extra boilerplate for directory creation and atomic writes.

### 3. Sticker Data: Embedded TypeScript file

**Decision:** Embed all 1072 stickers as a const array in `src/data/stickers.ts` (compiled into the binary).

**Rationale:** No external data files to ship. The data is co-located with the code. TypeScript typing ensures consistency. The file is small (~200KB) and bundling it into the executable means one file to distribute.

**Alternative considered:** Separate JSON file + loader. Would require distributing multiple files and handling file-not-found errors.

### 4. ID System: Group-based composite keys

**Decision:** Use composite IDs (`MEX-01`, `FWC-09`, `EXTRA-messi-purple`, `CC-01`) instead of continuous numbering.

**Rationale:** Directly maps to the album layout. Easier for users to navigate ("I need MEX-15, not sticker #247"). The composite key also groups related stickers naturally for filtering.

**Alternative considered:** Continuous 1-to-1072 numbering. Simpler storage but loses the album structure. Users would need to know that MEX-15 is position 247.

### 5. Architecture: Clean Architecture + CQRS

**Decision:** Domain (entities, value objects, repository interfaces) → Application (use cases/commands) → Infrastructure (CLI, storage adapter, exporters).

**Rationale:** Domain has zero external dependencies—fully testable without mocks. Application layer follows CQRS (commands for writes, queries for reads) keeping logic isolated. Infrastructure is the only layer that touches external libraries (Inquirer, PDFKit, conf).

**Alternative considered:** Simple service modules. Faster to write but creates tight coupling and harder to test in isolation.

### 6. CLI Framework: Inquirer

**Decision:** Use Inquirer.js for interactive menus.

**Rationale:** Mature, well-documented, supports all menu patterns needed (list, checkbox, input, confirm). Compatible with Bun.

**Alternative considered:** Raw process.stdin / readline. Would require significant boilerplate for multi-option menus and validation.

### 7. PDF Export: PDFKit with pdfkit-table

**Decision:** Use PDFKit + pdfkit-table for PDF generation.

**Rationale:** PDFKit is the standard for programmatic PDF in Node.js. pdfkit-table provides table layout support for the checklist format (2 columns, printable). Both compatible with Bun.

**Alternative considered:** Print-to-PDF via headless browser (puppeteer). Overkill for simple list generation; adds ~100MB to bundle.

### 8. Testing: Vitest

**Decision:** Use Vitest for unit tests.

**Rationale:** Native ESM support, fast, and designed for TypeScript. Native compatibility with Bun. Works without extra configuration.

**Alternative considered:** Jest. More popular but slower and requires compatibility layers for ESM.

### 9. No Linter Configuration

**Decision:** Leave `lint` script as a placeholder for now.

**Rationale:** Project is in early stages. ESLint/Prettier can be added later when the codebase stabilizes and conventions are established.

## Sticker Type Classification

| Type | Description | Examples |
|------|-------------|----------|
| `logo` | Album logo | `LOGO-00` |
| `fwc_special` | FIFA World Cup special stickers | `FWC-01` to `FWC-19` |
| `team_badge` | Team crest/sticker | `MEX-01`, `RSA-01` |
| `player` | Player photo stickers | `MEX-02` to `MEX-20` |
| `special` | Extra premium stickers (4 variants) | `EXTRA-messi-purple` |
| `coca_cola` | Coca-Cola Spain edition | `CC-01` to `CC-12` |

## Project Structure

```
src/
  domain/
    entities/
      Sticker.ts           # Sticker entity with type enum
      CollectionState.ts   # Owned + duplicates tracking
    value-objects/
      StickerId.ts         # Composite ID value object
      StickerType.ts       # Type enum
    repositories/
      CollectionRepository.ts  # Interface for persistence
  application/
    commands/
      MarkStickerOwned.ts      # Increment/decrement owned
      MarkStickerDuplicate.ts   # Increment/decrement duplicates
      ResetCollection.ts       # Clear all progress
    queries/
      GetCollectionStats.ts    # Statistics query
      GetMissingStickers.ts    # Missing list query
      SearchStickers.ts        # Search query
  infrastructure/
    storage/
      ConfStorageAdapter.ts    # conf implementation
    exporters/
      PdfExporter.ts           # PDF checklist export
      CsvExporter.ts           # CSV export
      TxtExporter.ts           # TXT export
    cli/
      MenuService.ts           # Inquirer menu orchestration
      SearchService.ts         # Search implementation
  data/
    stickers.ts                # Embedded 1072 stickers
  index.ts                    # Entry point, CLI bootstrap
tests/
  domain/
    Sticker.test.ts
    CollectionState.test.ts
  infrastructure/
    ConfStorageAdapter.test.ts
```

## Open Questions

1. **CLI locale**: All user-facing text in Spanish. Confirm this covers all prompts, labels, error messages, and export filenames.

2. **Pagination**: For sticker lists with 1000+ entries, pagination is needed. Confirm expected page size (e.g., 20-50 per page) or prefer scrolling mode.

3. **Batch marking**: Do users need to mark a range of stickers at once (e.g., "I have all of team Mexico")? Not in MVP but worth noting for future.

4. **Extra variant handling**: When exporting, should `EXTRA-messi-purple` show as one entry or 4 separate entries? Current model treats each variant as a separate sticker, so 4 entries per player.

5. **FWC History ordering**: The list shows FWC 9-19 as post-teams. Confirm this matches the album's actual page order.

6. **Team codes**: Confirm the 3-letter codes used (e.g., `MEX`, `RSA`, `KOR`). Some may differ from ISO standard (e.g., `USA` not `US`).