## Why

Users need a reliable way to back up their sticker collection and move it to another device without manual file copying. This is needed now to reduce data loss risk and enable multi-device continuity.

## What Changes

- Add a save operation that exports the current collection to an external file.
- Store backup metadata including the app version that created the file.
- Add an open operation that imports a previously saved collection file.
- Accept import files only when the backup version is less than or equal to the current app version.
- Replace the current in-memory and persisted collection with the imported collection after successful validation.
- Add file-selection flows that allow users to navigate directories when saving and opening files.

## Capabilities

### New Capabilities
- `collection-backup-restore`: External save/open flow for collection backups with version compatibility checks and file browser selection.

### Modified Capabilities
- None.

## Impact

- Affected code: application commands/queries for export/import, storage adapters, GUI/CLI menu actions, and validation utilities.
- Affected data contract: new backup file schema with metadata (`appVersion`) plus collection payload.
- Dependencies/systems: file dialog support for directory navigation and file selection, version comparison utility.