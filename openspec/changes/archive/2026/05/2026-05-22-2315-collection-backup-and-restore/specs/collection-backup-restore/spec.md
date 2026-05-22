## ADDED Requirements

### Requirement: Save collection backup with version metadata
The system SHALL allow the user to save the current collection state to an external backup file and SHALL include the application version that produced the backup.

#### Scenario: Save includes app version and collection payload
- **WHEN** the user confirms the save operation
- **THEN** the system writes a backup file containing `appVersion` and `collection` fields
- **AND** `collection` includes `owned` and `duplicates` maps from the current collection state

#### Scenario: Save writes selected output file
- **WHEN** the user selects a directory and file name in the save flow
- **THEN** the system writes the backup to the selected location

#### Scenario: Save uses fixed backup extension
- **WHEN** the user saves a backup file
- **THEN** the resulting backup file extension is `.fwc26`

### Requirement: Open collection backup with compatibility validation
The system SHALL allow opening a backup file only when the backup `appVersion` is less than or equal to the running app version.

#### Scenario: Compatible backup is accepted
- **WHEN** the user opens a backup file with `appVersion` less than or equal to the current app version
- **THEN** the system validates the file and continues with import

#### Scenario: Newer backup is rejected
- **WHEN** the user opens a backup file with `appVersion` greater than the current app version
- **THEN** the system rejects the import
- **AND** shows a descriptive compatibility error

### Requirement: Import replaces active collection
The system SHALL replace the active collection with the imported collection after successful validation.

#### Scenario: Successful import replaces current state
- **WHEN** a compatible and valid backup file is opened
- **THEN** the imported `owned` and `duplicates` values become the active collection
- **AND** the new active collection is persisted as the current local state

#### Scenario: Invalid backup does not alter current state
- **WHEN** the opened file is invalid JSON or missing required fields
- **THEN** the system rejects the import
- **AND** keeps the existing active collection unchanged

#### Scenario: Import warns when current collection is non-empty
- **WHEN** the user starts import and the current collection has owned or duplicate stickers
- **THEN** the system shows an explicit warning that current data will be replaced

### Requirement: Save/Open flows support directory navigation and file selection
The system SHALL provide save and open flows where the user can browse directories and select files through a file-picker experience.

#### Scenario: Save flow supports directory browsing and filename selection
- **WHEN** the user starts the save operation
- **THEN** the system presents a save file picker that allows directory navigation and file name selection

#### Scenario: Open flow supports directory browsing and existing file selection
- **WHEN** the user starts the open operation
- **THEN** the system presents an open file picker that allows directory navigation and selecting an existing backup file