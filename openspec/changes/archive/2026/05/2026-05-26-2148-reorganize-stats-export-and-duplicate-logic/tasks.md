## 1. Statistics screen — Remove reset button (GUI)

- [x] 1.1 Open `src/gui/src/screens/Statistics.tsx` and remove the reset button block (lines 26-31: `<Button onClick={handleReset}>`)
- [x] 1.2 Remove `handleReset` function (lines 18-22)
- [x] 1.3 Remove unused imports: `Trash2` from `lucide-react`, `Button` from components, `reset` from `useCollectionStore` destructuring

## 2. Export screen — Reorder panels (GUI)

- [x] 2.1 Open `src/gui/src/screens/Export.tsx` and move the "Copia de seguridad" panel (lines 250-282) to appear after the format cards grid (after the `</div>` closing the format cards at ~line 380)
- [x] 2.2 Verify the "Generar checklist de faltantes" panel (lines 286-349) and format cards grid (lines 351-380) appear before the backup panel

## 3. GUI store — Fix markDuplicate increment logic

- [x] 3.1 Open `src/gui/src/stores/collectionStore.ts` and modify `markDuplicate` to increment instead of toggle
- [x] 3.2 New logic: if `currentOwned === 0`, set `owned=1` and `duplicates=1`; otherwise increment `duplicates` by 1

## 4. ViewCollection — Fix handleRemoveFromAlbum decrement logic

- [x] 4.1 Open `src/gui/src/screens/ViewCollection.tsx` and modify `handleRemoveFromAlbum` to use three-way logic:
  - If `dupQty > 1`: decrement duplicates by 1
  - If `dupQty === 1`: remove from duplicates entirely
  - If no duplicates but owned: call `unmarkOwned`

## 5. Search screen — Fix duplicate marking and removal buttons (GUI)

- [x] 5.1 Open `src/gui/src/screens/Search.tsx` and remove `disabled={dupQty > 0}` from the "Repetir" button
- [x] 5.2 Change "Quitar" button's `onClick` from `unmarkOwned(sticker.id)` to use the same three-way decrement logic (dup > 1 → decrement; dup = 1 → remove from dup; no dup → unmarkOwned)

## 6. Verify — Run typecheck, lint, and tests

- [x] 6.1 Run `bun test` to verify all existing tests pass
- [x] 6.2 Run `bun run typecheck` to verify no type errors
- [x] 6.3 Run `bun run lint` to verify no lint errors
