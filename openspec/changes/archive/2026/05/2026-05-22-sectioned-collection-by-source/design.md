## Context

The GUI currently computes filters and statistics directly from sticker data plus collection state (`owned`, `duplicates`), but it has no first-class concept of section/source. The requested behavior introduces section-aware filtering in collection view and section-aware progress metrics in statistics, while preserving existing interaction patterns and Spanish UI labels.

Constraints:
- No data persistence changes; section must be derived at runtime.
- Existing `<ID_FIX> - <TEAM>` dropdown in collection must remain, but options become section-scoped.
- Statistics "Por Grupo" must use only the Panini prefixes list and be sorted alphabetically.

## Goals / Non-Goals

**Goals:**
- Define a single source of truth to classify a cromo into Panini, Coca Cola, McDonald's, or Extras.
- Apply section filter in collection view with default selection `Panini`.
- Limit `<ID_FIX> - <TEAM>` options to values present in the selected section.
- Add section completion charts: Total, Panini, Extras, Coca Cola, McDonald's.
- Recompute Por Grupo using only Panini prefixes and alphabetical order.

**Non-Goals:**
- No change to persistence schema or storage adapter.
- No change to command/query contracts in domain/application layers.
- No implementation of unrelated UI redesigns.

## Decisions

### 1. Centralized section classifier
**Decision:** Implement a pure helper function (for example `getStickerSection(id: string)`) and reuse it in both ViewCollection and Statistics.

**Rationale:** Avoid duplicated regex/prefix logic and guarantee that collection filters and stats always classify cromos the same way.

**Alternatives considered:**
- Inline classification in each screen: rejected due to drift risk.
- Persist section in storage: rejected because section is derivable and does not need migration.

### 2. Rule precedence for classification
**Decision:** Apply rules in this order:
1) Panini explicit IDs/prefixes list (including cromo `0`)
2) Coca Cola IDs beginning with `CC-`
3) McDonald's IDs ending with `mc`
4) Extras fallback

**Rationale:** The request explicitly declares Panini by exact/prefix list and cromo 0, then defines Coca Cola and McDonald's patterns, with all remaining as Extras.

**Alternatives considered:**
- Check suffix `mc` before Panini: rejected because request gives Panini mapping as explicit primary membership.

### 3. Collection filtering pipeline
**Decision:** Keep current filter pipeline and insert section filter before rendering and before team option derivation.

**Rationale:** This ensures list content and `<ID_FIX> - <TEAM>` dropdown stay consistent with one selected section.

**Alternatives considered:**
- Section filter only on list, not team dropdown: rejected because requirement explicitly scopes team options too.

### 4. Statistics model extension
**Decision:** Extend derived `stats` object with completion metrics per section (`ownedUnique`, `total`, `percentage`) and render one chart per section plus total.

**Rationale:** Reuses current memoized approach and keeps all computed metrics in one place.

**Alternatives considered:**
- Build charts from pre-aggregated static data: rejected because owned state is dynamic.

### 5. Panini-only Por Grupo source
**Decision:** Build Por Grupo from the declared Panini prefix set only, sorted alphabetically by prefix key.

**Rationale:** Matches requested behavior and decouples group chart from non-Panini promotional IDs.

**Alternatives considered:**
- Keep current GROUPS array A-L: rejected because it no longer represents required Panini group definition.

## Risks / Trade-offs

- **[Risk]** Misclassification edge cases from mixed ID formats -> **Mitigation**: define explicit tests for each rule family and precedence.
- **[Risk]** UI confusion from defaulting to Panini (hides other sections by default) -> **Mitigation**: clear dropdown label and include `Todas` option.
- **[Risk]** Performance regression from repeated filtering on every render -> **Mitigation**: memoize section-classified subsets and derived dropdown options.
- **[Risk]** Inconsistent prefix parsing in `<ID_FIX> - <TEAM>` with special IDs (e.g., `CC-EU07`) -> **Mitigation**: use existing ID_FIX derivation utility where available; otherwise normalize with a dedicated parser.

## Migration Plan

1. Add section classification helper and unit tests.
2. Integrate section dropdown and section-scoped filtering in collection screen.
3. Update statistics derivations and render section completion charts.
4. Replace Por Grupo source with Panini prefix list and alphabetical ordering.
5. Validate UI behavior manually and run project checks (`bun test`, `bun run typecheck`, `bun run lint`) during implementation phase.

## Open Questions

- Should `CC-` cromos ever be counted as Panini in Por Grupo if their team prefix matches a Panini prefix? Current proposal says no.
- For the `<ID_FIX> - <TEAM>` dropdown, should sorting be alphabetical by TEAM, by ID_FIX, or keep existing order? (Default assumption for implementation: preserve current ordering unless explicitly defined.)