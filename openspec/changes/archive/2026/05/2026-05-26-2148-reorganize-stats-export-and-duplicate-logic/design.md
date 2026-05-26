## Context

The GUI (React + Zustand) has several behavioral inconsistencies with the CLI (domain model) and with itself:
- The Statistics screen includes a "Borrar colección" button that duplicates an identical action in the Export screen.
- The Export screen places "Copia de seguridad" before "Generar checklist de faltantes", prioritizing secondary functionality over the primary use case.
- The GUI's Zustand store implements `markDuplicate` as a toggle (0→1, 1→0) rather than increment, contradicting the domain model (`CollectionState.markDuplicate` uses `current + quantity`).
- The ViewCollection's "remove" button (`handleRemoveFromAlbum`) removes ALL traces (both owned and duplicates) instead of decrementing duplicates incrementally.
- The Search screen disables the "Repetir" button when a sticker already has duplicates, preventing the user from incrementing the count.

## Goals / Non-Goals

**Goals:**
- Remove the redundant reset button from the GUI Statistics screen.
- Reorder the GUI Export screen panels (checklist first, backup last).
- Fix the GUI Zustand store's `markDuplicate` to increment (matching the domain model) and auto-mark as owned when not owned.
- Fix the GUI ViewCollection's `handleRemoveFromAlbum` to decrement duplicates instead of clearing all traces.
- Fix the GUI Search screen's "Repetir" and "Quitar" buttons to use the new increment/decrement semantics.

**Non-Goals:**
- No changes to the CLI menus or CLI entry point.
- No changes to the domain layer (`CollectionState`, `Sticker`, value objects) — they already implement correct semantics.
- No changes to the application layer commands/queries.
- No changes to the export logic (PDF/CSV/TXT generation).
- No new features or capabilities.

## Decisions

### Decision 1: GUI store markDuplicate uses increment instead of toggle
**Why**: The domain model (`CollectionState.markDuplicate`) explicitly implements increment semantics (`current + quantity`). The GUI store should mirror the same behavior. Toggle was an incorrect implementation that made it impossible to track duplicate counts beyond 1.

**How**: Replace the current toggle logic:
```typescript
// Old (toggle):
if (newOwned === 0) { newOwned = 1; newDuplicates = 0; }
else if (newOwned === 1) { newDuplicates = 1 - currentDuplicates; }

// New (increment):
if (currentOwned === 0) { set owned=1, dup=1; }
else { increment dup by 1; }
```

### Decision 2: handleRemoveFromAlbum uses decrement
**Why**: The current behavior (removing all owned + duplicate traces with a single click) is destructive. The user expects incremental removal: decrement duplicates first, then remove from album.

**How**:
```typescript
if (dupQty > 1)   → set dup = dup - 1
else if (dupQty === 1) → delete from duplicates
else (no dup)    → unmarkOwned (removes from album)
```

### Decision 3: Search screen "Repetir" always enabled
**Why**: The current behavior disables the "Repetir" button when a sticker already has duplicates, making it impossible to increase the duplicate count without using the ViewCollection screen. The button should always be available to increment duplicates.

**How**: Remove `disabled={dupQty > 0}` from the "Repetir" button.

### Decision 4: Search screen "Quitar" uses decrement logic
**Why**: For consistency with ViewCollection's Trash2 button, the "Quitar" button in Search should also decrement duplicates before removing from album.

**How**: Change `onClick={() => unmarkOwned(sticker.id)}` to use the same three-way logic as `handleRemoveFromAlbum`.

### Decision 5: Panel reordering in Export screen
**Why**: Primary functionality (exporting missing stickers checklist) should appear before secondary functionality (backup/restore). This follows the principle of progressive disclosure and matches user expectations.

**How**: Move the "Copia de seguridad" JSX block (currently lines 250-282) to after the "Generar checklist" panel and format cards grid (currently lines 284-449). The preview sidebar remains on the right.

## Risks / Trade-offs

- [Minor] Removing the "Borrar colección" button from Statistics may confuse users who exclusively use that screen. Mitigation: The button remains accessible from the Export screen, which is one navigation click away.
- [Minor] Changing `markDuplicate` from toggle to increment changes the muscle memory for users who relied on the toggle behavior. Mitigation: The new behavior is more intuitive (each click = +1 duplicate).
- [Low] Existing persisted store data (localStorage) with `duplicates` entries will continue to work correctly — only the mutation behavior changes, not the data shape.
