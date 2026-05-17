# Design: Fix Export Functionality

## Context

The GUI export functionality has multiple issues:
1. PDF is plain text, not a real PDF file
2. "Abrir Carpeta" button has no implementation
3. Plugins declared but not configured

The CLI has proper export implementations using pdfkit. The GUI needs similar functionality using Rust.

## Goals / Non-Goals

**Goals:**
- Configure fs/dialog plugins in tauri.conf.json
- Implement real PDF generation using printpdf crate
- Fix "Abrir Carpeta" to open Downloads folder
- Auto-save exports to Downloads folder (matching CLI behavior)

**Non-Goals:**
- Add file save dialog (auto-save to Downloads is sufficient)
- Match CLI PDF exactly (format is close enough)
- Frontend PDF generation (use Rust backend)

## Decisions

### D1: PDF Library Choice

**Decision:** Use `printpdf` crate in Rust backend.

**Rationale:** Already using Rust for other functionality. printpdf is a pure Rust PDF library with no external dependencies.

**Alternative:** Use `lopdf` with manual PDF construction — more complex.

### D2: Plugin Configuration

**Decision:** Add minimal plugin config in tauri.conf.json.

```json
"plugins": {
  "opener": {}
}
```

**Rationale:** The `opener` plugin is already configured. fs/dialog are declared in Cargo.toml but don't need explicit config in tauri.conf.json for basic file operations.

### D3: Permissions

**Decision:** Use `fs:allow-write-text-file` permission in capabilities.

**Rationale:** More secure than full fs:default. Allows writing to Downloads folder only.

## Technical Approach

### PDF Generation (lib.rs)

```rust
use printpdf::*;

fn export_pdf(stickers: Vec<Sticker>) -> Result<String, String> {
    let (doc, page1, layer1) = PdfDocument::new("Faltantes", A4, Unit::Mm);
    // Add content with checkboxes
    // 2 columns, pagination
    doc.save(path)
}
```

### Opening Folder (Export.tsx)

```typescript
// Use @tauri-apps/plugin-opener
import { open } from '@tauri-apps/plugin-opener';
await open(downloadPath);
```

## Migration

No migration needed — this is a bug fix, not a feature change.
Existing exports will work correctly once fix is deployed.

## Open Questions

None — approach is straightforward.