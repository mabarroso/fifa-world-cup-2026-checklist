# Spec: GUI PDF Export

Generate real PDF files with checkboxes for the sticker wish list.

## ADDED Requirements

### Requirement: PDF generation with checkboxes

The system SHALL generate real PDF files containing a checklist of missing stickers with checkbox squares.

#### Scenario: Generate PDF with missing stickers
- **WHEN** user clicks "Export PDF" with missing stickers in collection
- **THEN** system generates a PDF file with checkboxes and sticker information
- **AND** saves to Downloads folder

#### Scenario: PDF contains sticker ID and name
- **WHEN** PDF is generated
- **THEN** each row contains a checkbox followed by sticker ID and name
- **AND** format: `☐ COL08 - Jhon Lucumí`

#### Scenario: PDF uses 2-column layout
- **WHEN** PDF is generated
- **THEN** stickers are arranged in 2 columns per page
- **AND** page size is A4

### Requirement: PDF file naming

The system SHALL name PDF files with date stamp for organization.

#### Scenario: PDF file name format
- **WHEN** PDF is exported
- **THEN** file is named `faltantes_YYYY-MM-DD.pdf`
- **AND** saved to Downloads folder

### Requirement: PDF error handling

The system SHALL handle errors gracefully when PDF generation fails.

#### Scenario: PDF generation failure
- **WHEN** PDF generation fails due to system error
- **THEN** system displays error message to user
- **AND** does not crash the application

## Breaking Changes

None — this is a bug fix replacing placeholder implementation.