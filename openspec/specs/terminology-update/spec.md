# terminology-update Specification

## Purpose
Legacy synchronized capability specification for terminology-update.

## Requirements
### Requirement: terminology-update capability behavior
The system SHALL implement the capability behavior described in this specification.

#### Scenario: Capability behavior is used as baseline
- **WHEN** this capability is implemented, tested, or reviewed
- **THEN** the behavior captured in this specification MUST be treated as the baseline
- **AND** legacy archived notes MUST remain available for reference

## Legacy Notes

## ADDED Requirements

### Requirement: Terminology change from "duplicado" to "repetido"
The system SHALL update all user-facing text to replace "duplicado"/"duplicada"/"duplicados"/"duplicadas" with "repetido"/"repetida"/"repetidos"/"repetidas".

#### Scenario: CLI MarkDuplicateMenu text update
- **WHEN** the CLI MarkDuplicateMenu is displayed
- **THEN** it SHALL use "repetido" instead of "duplicado" in all prompts and messages

#### Scenario: CLI StatisticsDisplay text update
- **WHEN** the CLI StatisticsDisplay shows duplicate count
- **THEN** it SHALL display "Repetidas" instead of "Duplicadas"

#### Scenario: CLI ViewCollectionMenu filter text update
- **WHEN** the CLI ViewCollectionMenu shows the duplicate filter option
- **THEN** it SHALL display "Ver repetidas" instead of "Ver duplicadas"

#### Scenario: CLI ExportMenu text update
- **WHEN** the CLI ExportMenu references duplicates
- **THEN** it SHALL use "repetido" terminology

#### Scenario: CLI SearchInterface text update
- **WHEN** the CLI SearchInterface displays duplicate-related results
- **THEN** it SHALL use "repetido" terminology

#### Scenario: CLI MainMenu text update
- **WHEN** the CLI MainMenu displays duplicate-related options
- **THEN** it SHALL use "repetido" terminology

### Requirement: GUI terminology update
The system SHALL update all GUI screens to use "repetido" terminology.

#### Scenario: MarkDuplicate screen text update
- **WHEN** the GUI MarkDuplicate screen is displayed
- **THEN** it SHALL display "Repetida" instead of "Duplicada" in:
  - Title text
  - Placeholder text
  - Button labels
  - Empty state messages

#### Scenario: Statistics screen text update
- **WHEN** the GUI Statistics screen is displayed
- **THEN** it SHALL display "Repetidas" instead of "Duplicadas"

#### Scenario: ViewCollection screen filter update
- **WHEN** the GUI ViewCollection screen shows the duplicate filter
- **THEN** it SHALL display "Repetidas" as filter option

#### Scenario: Sidebar navigation update
- **WHEN** the GUI Sidebar displays the Mark Duplicate option
- **THEN** it SHALL use "Marcar Repetida" instead of "Marcar Duplicada"

### Requirement: Terminology consistency
The system SHALL ensure terminology is consistent across CLI and GUI.

#### Scenario: Consistency check
- **WHEN** any component references duplicate stickers
- **THEN** it SHALL use "repetido"/"repetida"/"repetidos"/"repetidas" exclusively
- **AND** it SHALL NOT use "duplicado"/"duplicada"/"duplicados"/"duplicadas"