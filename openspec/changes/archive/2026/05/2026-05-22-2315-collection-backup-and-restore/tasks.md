## 1. Backup Contract and Validation

- [x] 1.1 Define backup file schema with `appVersion` and `collection` payload
- [x] 1.2 Add semantic version compatibility check (`backupVersion <= currentVersion`)
- [x] 1.3 Add validation for required fields (`owned`, `duplicates`) and invalid JSON handling

## 2. Save/Open Application Flow

- [x] 2.1 Add save use case to export current collection into external backup file
- [x] 2.2 Add open use case to import external backup and replace active collection
- [x] 2.3 Persist imported collection immediately as current local state

## 3. File Picker UX

- [x] 3.1 Add save file picker flow with directory navigation and file name selection
- [x] 3.2 Add open file picker flow with directory navigation and existing file selection
- [x] 3.3 Add user-facing error messages for incompatible version and invalid backup files

## 4. Tests and Verification

- [x] 4.1 Add/adjust tests for backup save format and version metadata
- [x] 4.2 Add/adjust tests for import compatibility acceptance/rejection and state replacement
- [x] 4.3 Run `bun test`, `bun run typecheck`, and `openspec validate collection-backup-and-restore`