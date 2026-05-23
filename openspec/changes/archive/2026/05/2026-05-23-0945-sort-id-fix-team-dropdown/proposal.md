## Why

The team filter dropdown currently sorts options by team name, which makes quick lookup by standardized ID_FIX code harder for users. Ordering by ID_FIX improves scanning consistency with the displayed option format.

## What Changes

- Change team filter dropdown ordering from team-name alphabetical sorting to ID_FIX alphabetical sorting.
- Keep option label format as <ID_FIX> - <TEAM>.
- Keep uniqueness rule of one option per ID_FIX.
- Keep default Todos behavior and existing filtering behavior unchanged.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- team-filter-dropdown: dropdown ordering requirement changes from team-name sorting to ID_FIX sorting.

## Impact

- Affected code: team filter option builder/sorting logic in GUI collection view model.
- Affected tests: dropdown ordering assertions in GUI/team filter related tests.
- No API or dependency changes expected.
