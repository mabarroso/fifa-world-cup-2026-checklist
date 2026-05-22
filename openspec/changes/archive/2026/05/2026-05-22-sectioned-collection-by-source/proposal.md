## Why

The collection view and statistics currently treat all cromos as a single set, which makes tracking progress harder when users want to follow Panini, promotional sets, and extras separately. We need a consistent section model and section-aware UI so users can monitor and operate on the relevant subset faster.

## What Changes

- Add deterministic section classification rules for every cromo ID: Panini, Coca Cola, McDonald's, and Extras.
- Add a new section dropdown in collection view, placed to the right of Repetidas, with options: Todas, Panini, Coca Cola, McDonald's, Extras.
- Set Panini as the default selected option when opening collection view.
- Apply selected section filter to both:
  - the visible cromo list
  - the existing <ID_FIX> - <TEAM> dropdown options, limiting options to the selected section
- Extend statistics with completion charts for: Total (existing), Panini, Extras, Coca Cola, McDonald's.
- Update Por Grupo calculation to use only Panini groups identified by these prefixes:
  - FWC, MEX, RSA, KOR, CZE, CAN, BIH, QAT, SUI, BRA, MAR, HAI, SCO, USA, PAR, AUS, TUR, GER, CUW, CIV, ECU, NED, JPN, SWE, TUN, BEL, EGY, IRN, NZL, ESP, CPV, KSA, URU, FRA, SEN, IRQ, NOR, ARG, ALG, AUT, JOR, POR, COD, UZB, COL, ENG, CRO, GHA, PAN
- Ensure Por Grupo ordering is alphabetical.

## Capabilities

### New Capabilities
- `collection-section-filtering`: Section classification and section dropdown behavior in collection view, including section-scoped <ID_FIX> - <TEAM> options.
- `section-statistics`: Section completion charts and Panini-only group progress behavior.

### Modified Capabilities
- None.

## Impact

- **Modified files (expected during implementation):**
  - `src/gui/src/screens/ViewCollection.tsx`
  - `src/gui/src/screens/Statistics.tsx`
  - `src/gui/src/data/stickers.ts` (or equivalent helper location for section classification)
  - optional shared utility under `src/gui/src/lib/` for section parsing
- **No storage migration required:** section is derived from cromo ID and naming rules.
- **No external dependencies required:** implementation can use existing React and local utilities.