# Proposal: Fix Export Functionality

## Why

The GUI export functionality is broken. The "Abrir Carpeta" button does nothing, and PDF exports are plain text files with .pdf extension rather than proper PDFs. Additionally, Tauri plugins (fs, dialog) are declared in Cargo.toml but not properly configured, causing export failures.

## What Changes

### 1. Configure Tauri Plugins
- Add `fs` and `dialog` plugin configuration to `tauri.conf.json`
- Add proper permissions in `capabilities/default.json`

### 2. Implement Real PDF Export
- Add `printpdf` crate for proper PDF generation in Rust backend
- Generate PDFs with checkboxes in 2-column layout (matching CLI format)

### 3. Fix "Abrir Carpeta" Button
- Implement folder opening using `tauri-plugin-opener`

### 4. Verify CSV/TXT Exports
- Ensure existing implementations work correctly
- Add error handling for edge cases

## Capabilities

### New Capabilities
- `gui-pdf-export`: Proper PDF generation with checkboxes in Rust backend

### Modified Capabilities
- `gui-export`: Fix broken exports and add proper file system permissions

## Impact

### Affected Files
- `src/gui/src-tauri/tauri.conf.json` — Add plugin configurations
- `src/gui/src-tauri/capabilities/default.json` — Add fs/dialog permissions
- `src/gui/src-tauri/Cargo.toml` — Add printpdf crate
- `src/gui/src-tauri/src/lib.rs` — Implement PDF export
- `src/gui/src/screens/Export.tsx` — Fix "Abrir Carpeta" button