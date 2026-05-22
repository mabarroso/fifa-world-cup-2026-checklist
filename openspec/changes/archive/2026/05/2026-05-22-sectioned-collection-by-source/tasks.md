## 1. Define section model and utilities

- [x] 1.1 Create shared section classifier utility for cromo IDs with Panini, Coca Cola, McDonald's, and Extras rules
- [x] 1.2 Add unit tests covering classification rules, precedence, and edge cases (`0`, `CC-*`, `*mc`, fallback)
- [x] 1.3 Expose helper(s) for section-based filtering reusable in collection and statistics screens

## 2. Update collection view filtering

- [x] 2.1 Add section dropdown to the right of Repetidas with options: Todas, Panini, Coca Cola, McDonald's, Extras
- [x] 2.2 Set default selected section to Panini on collection screen load
- [x] 2.3 Apply selected section filter to visible cromo list
- [x] 2.4 Limit existing `<ID_FIX> - <TEAM>` dropdown options to IDs within selected section
- [x] 2.5 Add/update UI tests for section switching and section-scoped team options

## 3. Update statistics for section progress

- [x] 3.1 Compute and render completion charts for Total, Panini, Extras, Coca Cola, and McDonald's
- [x] 3.2 Refactor Por Grupo source to Panini prefix list only
- [x] 3.3 Sort Por Grupo rows alphabetically by group key
- [x] 3.4 Add/update tests validating section chart values and Por Grupo inclusion/exclusion rules

## 4. Verify quality gates

- [x] 4.1 Run `bun test` and fix failures related to section filtering/statistics
- [x] 4.2 Run `bun run typecheck` and resolve typing issues
- [x] 4.3 Run `bun run lint` and resolve lint issues
- [x] 4.4 Run `openspec validate --changes sectioned-collection-by-source` and fix validation findings