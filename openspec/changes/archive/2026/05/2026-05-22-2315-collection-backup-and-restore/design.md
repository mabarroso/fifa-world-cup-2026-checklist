## Context

The application currently persists collection state in a local app-specific file. Users cannot create portable backups through an explicit save/open flow, and there is no version metadata contract for imported collections. The new behavior must enable backup portability while preventing imports created by newer app versions.

## Goals / Non-Goals

**Goals:**
- Define a portable backup file format with version metadata.
- Provide save and open flows that use directory navigation and file selection.
- Enforce compatibility rule: backup version MUST be less than or equal to current app version.
- Replace the active collection with imported data after validation.

**Non-Goals:**
- Cloud synchronization.
- Merging imported data with existing data.
- Supporting backups from future app versions.

## Decisions

1. Backup schema includes metadata and payload.
- Decision: Use a JSON envelope like `{ "appVersion": "x.y.z", "collection": { "owned": {}, "duplicates": {} } }`.
- Rationale: Keeps migration and compatibility checks explicit while preserving existing collection structure.
- Alternative considered: Raw collection-only JSON. Rejected because origin version cannot be validated.

2. Compatibility check is performed before applying imported data.
- Decision: Parse and compare semantic versions; accept only if `backupVersion <= currentVersion`.
- Rationale: Protects against unknown schema/features from newer releases.
- Alternative considered: Best-effort import regardless of version. Rejected due to silent corruption risk.

3. Import is atomic from user perspective.
- Decision: Validate file structure and version first, then replace active collection and persist immediately.
- Rationale: Avoids partially applied state.
- Alternative considered: Incremental field updates. Rejected due to rollback complexity.

4. Save/Open use native file pickers.
- Decision: Use platform-native dialogs for selecting destination (save) and source file (open), allowing directory navigation.
- Rationale: Matches user expectation for browsing directories and selecting file names.
- Alternative considered: Manual text path entry only. Rejected because it does not satisfy navigation requirement.

## Risks / Trade-offs

- [Version parsing mismatch] -> Mitigation: Centralize semver parsing and fail with clear user-facing error.
- [Invalid/corrupted backup files] -> Mitigation: Strict JSON schema validation before applying import.
- [Replacing collection is irreversible] -> Mitigation: Confirm action before apply and recommend creating a backup first.
- [Dialog behavior differences across platforms] -> Mitigation: Normalize accepted extensions and error handling per platform adapter.

## Migration Plan

1. Introduce backup file contract and validation utilities.
2. Add save/open actions in app flow and UI entry points.
3. Persist imported state to standard storage location after successful import.
4. Validate change artifacts and tests before archive.

Rollback strategy:
- Disable the new save/open entry points and keep existing default persistence unchanged.

## Open Questions

- Resolved: backup file extension SHALL be `.fwc26`.
- Resolved: import flow SHALL include an explicit warning when current collection is non-empty.