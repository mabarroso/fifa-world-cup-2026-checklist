## 1. Spec Alignment

- [x] 1.1 Confirm team-filter-dropdown spec delta changes ordering from team name to ID_FIX
- [x] 1.2 Validate OpenSpec change artifacts before implementation

## 2. Dropdown Ordering Update

- [x] 2.1 Update team filter option sorting logic to compare ID_FIX alphabetically
- [x] 2.2 Keep option format <ID_FIX> - <TEAM> and uniqueness constraints unchanged

## 3. Test Updates

- [x] 3.1 Update/add tests to assert dropdown order by ID_FIX
- [x] 3.2 Ensure existing filtering behavior tests still pass

## 4. Verification

- [x] 4.1 Run bun test
- [x] 4.2 Run bun run typecheck
- [x] 4.3 Run openspec validate sort-id-fix-team-dropdown
