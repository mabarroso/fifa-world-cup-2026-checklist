# Spec: GUI Export Configuration

Fix Tauri plugin configuration and permissions for proper file exports.

## ADDED Requirements

### Requirement: Tauri plugin permissions

The system SHALL have proper file system permissions configured for export operations.

#### Scenario: fs permission for file writing
- **WHEN** Tauri app starts
- **THEN** fs plugin has write permissions for Downloads folder
- **AND** export operations can save files

#### Scenario: Permissions in capabilities
- **WHEN** capabilities are loaded
- **THEN** fs:default and dialog:default permissions are included
- **AND** export commands can execute

### Requirement: "Abrir Carpeta" button functionality

The system SHALL open the Downloads folder when user clicks "Abrir Carpeta" button.

#### Scenario: Open folder on button click
- **WHEN** user clicks "Abrir Carpeta" button in Export screen
- **THEN** system opens the Downloads folder in system file explorer

#### Scenario: Button shows after successful export
- **WHEN** export completes successfully
- **THEN** "Abrir Carpeta" button is visible and clickable

## Breaking Changes

None — this is a bug fix for missing configuration.