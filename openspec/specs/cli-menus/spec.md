# cli-menus Specification

## Purpose
Legacy synchronized capability specification for cli-menus.

## Requirements
### Requirement: cli-menus capability behavior
The system SHALL implement the capability behavior described in this specification.

#### Scenario: Capability behavior is used as baseline
- **WHEN** this capability is implemented, tested, or reviewed
- **THEN** the behavior captured in this specification MUST be treated as the baseline
- **AND** legacy archived notes MUST remain available for reference

## Legacy Notes

## ADDED Requirements

### Requirement: Main menu navigation
The system SHALL display a main menu with the following options: 1) Ver colección completa, 2) Marcar cromo como obtenido, 3) Marcar cromo como repetido, 4) Estadísticas de progreso, 5) Buscar cromo, 6) Exportar faltantes, 7) Salir.

#### Scenario: Main menu displayed on startup
- **WHEN** the application starts
- **THEN** the main menu is displayed with all 7 options

#### Scenario: Menu option selection
- **WHEN** user selects option 4
- **THEN** the statistics view is shown

### Requirement: View collection menu
The system SHALL provide a submenu for viewing the collection with filter options: 1) Ver todos, 2) Ver faltantes, 3) Ver obtenidos, 4) Ver repetidos, 5) Volver.

#### Scenario: Collection view with all stickers
- **WHEN** user selects "Ver todos"
- **THEN** all 1072 stickers are displayed with their current status

#### Scenario: Collection view filtered by missing
- **WHEN** user selects "Ver faltantes"
- **THEN** only stickers not in the owned map are displayed

#### Scenario: Collection view filtered by owned
- **WHEN** user selects "Ver obtenidos"
- **THEN** only stickers with `owned[ID] > 0` are displayed

#### Scenario: Collection view filtered by duplicates
- **WHEN** user selects "Ver repetidos"
- **THEN** only stickers with `duplicates[ID] > 0` are displayed

### Requirement: Mark sticker as owned submenu
The system SHALL provide an interactive way to mark stickers as owned by entering the sticker ID.

#### Scenario: Mark sticker by ID input
- **WHEN** user selects "Marcar cromo como obtenido" and enters `MEX-15`
- **THEN** `owned["MEX-15"]` is incremented

#### Scenario: Mark with quantity input
- **WHEN** user marks a sticker
- **THEN** the system prompts for quantity (default: 1)

#### Scenario: Remove sticker by ID input
- **WHEN** user selects "Desmarcar cromo" and enters `MEX-15`
- **THEN** `owned["MEX-15"]` is decremented (or removed if 0)

### Requirement: Mark sticker as duplicate submenu
The system SHALL provide an interactive way to mark stickers as duplicate by entering the sticker ID.

#### Scenario: Mark sticker as duplicate by ID input
- **WHEN** user selects "Marcar cromo como repetido" and enters `MEX-15`
- **THEN** `duplicates["MEX-15"]` is incremented

#### Scenario: Remove duplicate sticker by ID input
- **WHEN** user selects "Desmarcar cromo como repetido" and enters `MEX-15`
- **THEN** `duplicates["MEX-15"]` is decremented (or removed if 0)

### Requirement: Statistics display
The system SHALL display collection statistics in a clear format with progress indicators.

#### Scenario: Statistics display format
- **WHEN** statistics are displayed
- **THEN** the output includes: total stickers, obtenidos, faltantes, repetidos, porcentaje completado

#### Scenario: Progress bar display
- **WHEN** statistics are displayed
- **THEN** a visual progress bar is shown using ASCII characters

### Requirement: Search interface
The system SHALL provide an interactive search interface with input field and results display.

#### Scenario: Search input and results
- **WHEN** user enters a search term
- **THEN** matching stickers are displayed with their ID, name, team, and owned status

### Requirement: Export menu
The system SHALL provide an export submenu with format selection: 1) PDF, 2) CSV, 3) TXT, 4) Volver.

#### Scenario: Export format selection
- **WHEN** user selects "Exportar faltantes"
- **THEN** the export submenu is displayed with PDF, CSV, TXT options

#### Scenario: Export confirmation
- **WHEN** user selects a format
- **THEN** the system confirms the file was created successfully with the path

### Requirement: Exit confirmation
The system SHALL confirm before exiting if there are unsaved changes (none in this case, saves are immediate).

#### Scenario: Exit application
- **WHEN** user selects "Salir" from main menu
- **THEN** the application closes with a farewell message

### Requirement: All UI in Spanish
The system SHALL display all labels, prompts, messages, and menus in Spanish.

#### Scenario: Main menu labels in Spanish
- **WHEN** the main menu is displayed
- **THEN** all option labels are in Spanish

#### Scenario: Error messages in Spanish
- **WHEN** an error occurs
- **THEN** the error message is displayed in Spanish