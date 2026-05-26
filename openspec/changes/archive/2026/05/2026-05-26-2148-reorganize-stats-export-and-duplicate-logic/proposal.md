## Why

The current GUI has UI/UX inconsistencies: the Statistics screen redundantly offers a "Borrar colección" action (already available in Export), the Export screen has backup controls positioned before the primary export functionality, and the duplicate marking logic in the GUI uses a toggle pattern instead of the correct increment/decrement pattern already specified in the domain layer and CLI.

## What Changes

1. **Statistics screen (GUI)** — Remove the "Borrar colección y comenzar de nuevo" button. This action is already available in the Export screen.
2. **Export screen (GUI)** — Reorder panels so "Generar checklist de faltantes" appears first and "Copia de seguridad" appears last.
3. **Duplicate marking logic (GUI store)** — Change `markDuplicate` from toggle (0↔1) to increment (+1). When a sticker is not owned, marking as duplicate also marks it as owned (owned=1, dup=1). When already duplicated, increment dup by 1.
4. **Duplicate removal logic (GUI)** — Change the "remove" action to decrement duplicates instead of clearing all traces: if dup>1 decrement; if dup=1 remove from duplicates; if no dup but owned remove from owned.
5. **CLI (domain layer validation)** — Ensure the CLI domain model (`CollectionState.markDuplicate`, `unmarkDuplicate`) already implements the correct increment/decrement semantics and is not affected by the GUI toggle bug.
6. **GUI Search screen** — Align duplicate marking and removal buttons with the new increment/decrement semantics (remove `disabled` on "Repetir" when already duplicate).

## Capabilities

### New Capabilities
*(None — no new capabilities are introduced; existing behaviors are corrected.)*

### Modified Capabilities
- `collection-tracking`: The duplicate marking scenario SHALL clarify that the behavior MUST be consistent across CLI and GUI: marking duplicate INCREMENTS the counter by the specified quantity; unmarking duplicate DECREMENTS the counter by the specified quantity. The toggle behavior in the GUI violates the existing spec.
- `statistics`: The statistics screen SHALL NOT include a "reset collection" action. That action belongs exclusively in the export/backup screen.
- `export-missing`: The export screen SHALL present the "Generar checklist de faltantes" panel before the "Copia de seguridad" panel.

## Impact

- `src/gui/src/screens/Statistics.tsx` — Remove reset button, clean up unused imports
- `src/gui/src/screens/Export.tsx` — Reorder panels
- `src/gui/src/stores/collectionStore.ts` — Fix `markDuplicate` logic
- `src/gui/src/screens/ViewCollection.tsx` — Fix `handleRemoveFromAlbum` to decrement duplicates
- `src/gui/src/screens/Search.tsx` — Fix duplicate/remove button behavior
- `src/domain/entities/CollectionState.ts` — No change needed (already correct)
- `src/application/commands/MarkStickerDuplicateCommand.ts` — No change needed (already correct)
- Tests — Existing tests should continue to pass; no new tests needed for domain/application layer
