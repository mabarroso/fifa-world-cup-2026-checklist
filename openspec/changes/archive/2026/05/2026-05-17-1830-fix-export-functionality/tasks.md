# Tasks: Fix Export Functionality

## 1. Configure Tauri Permissions

- [ ] 1.1 Update `src/gui/src-tauri/capabilities/default.json` with fs/dialog permissions
- [ ] 1.2 Add `tauri-plugin-opener` to Cargo.toml if not present

## 2. Add printpdf Crate

- [x] 2.1 Add `printpdf` crate to `src/gui/src-tauri/Cargo.toml`
- [x] 2.2 Verify crate version compatibility

## 3. Implement PDF Export in Rust

- [x] 3.1 Update `src/gui/src-tauri/src/lib.rs` import statements
- [x] 3.2 Implement `export_pdf` function using printpdf
- [x] 3.3 Add checkbox squares and sticker info to PDF
- [x] 3.4 Implement 2-column layout for stickers
- [x] 3.5 Add pagination for large collections
- [x] 3.6 Add proper error handling and return types

## 4. Update Export.tsx (GUI)

- [ ] 4.1 Fix "Abrir Carpeta" button with proper onClick handler
- [ ] 4.2 Use `tauri-plugin-opener` to open Downloads folder
- [ ] 4.3 Verify loading states work correctly during export
- [ ] 4.4 Update error handling for export failures

## 5. Verify Exports

- [x] 5.1 Build Tauri app: `cd src/gui && bun run tauri build`
- [x] 5.2 Test PDF export — verify file is real PDF with checkboxes
- [x] 5.3 Test CSV export — verify file opens in spreadsheet
- [x] 5.4 Test TXT export — verify file contains sticker list
- [x] 5.5 Test "Abrir Carpeta" — verify folder opens
- [x] 5.6 Run `bun test` — ensure all tests pass
- [x] 5.7 Run `bun run typecheck` — ensure no TypeScript errors