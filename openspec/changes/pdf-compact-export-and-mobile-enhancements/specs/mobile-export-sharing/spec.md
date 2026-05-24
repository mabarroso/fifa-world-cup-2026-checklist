# mobile-export-sharing Specification

## Purpose
Share exported files via Android share sheet or save to device documents.

## ADDED Requirements

### Requirement: Post-export share dialog on mobile
The system SHALL display a share dialog after any successful export on mobile platforms (Android).

#### Scenario: Share dialog shown after PDF export
- **WHEN** a PDF export completes successfully on Android
- **THEN** a dialog is displayed with 3 options: "Compartir", "Guardar en documentos", "Cerrar"

#### Scenario: Share dialog shown after backup save
- **WHEN** a backup (.fwc26) save completes successfully on Android
- **THEN** a dialog is displayed with 3 options: "Compartir", "Guardar en documentos", "Cerrar"

#### Scenario: Share dialog NOT shown on desktop
- **WHEN** an export completes successfully on desktop (Linux/Windows/macOS)
- **THEN** the existing success panel is shown without the share dialog
- **AND** the "Abrir Carpeta" button is displayed

### Requirement: Share uses Android share sheet
The system SHALL open the Android system share sheet when the user chooses "Compartir".

#### Scenario: Share sheet opens with file
- **WHEN** the user taps "Compartir" after an export
- **THEN** the Android share sheet opens with the exported file attached
- **AND** the user can choose email, WhatsApp, or any other sharing app

### Requirement: Save to device documents folder
The system SHALL copy the exported file to the device's public Documents folder when the user chooses "Guardar en documentos".

#### Scenario: File copied to Documents
- **WHEN** the user taps "Guardar en documentos"
- **THEN** the exported file is copied to the device's Documents directory
- **AND** a success message is shown confirming the save location
