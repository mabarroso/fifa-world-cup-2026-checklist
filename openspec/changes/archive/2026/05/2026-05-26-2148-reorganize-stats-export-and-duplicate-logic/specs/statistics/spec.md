## ADDED Requirements

### Requirement: Statistics screen excludes reset action
The statistics screen SHALL NOT include any "reset collection" or "borrar colección" action. The reset action is exclusively available in the export/backup screen.

#### Scenario: Statistics screen has no reset button
- **WHEN** user views the statistics screen
- **THEN** there is no button or control to reset/delete the collection

## REMOVED Requirements

### Requirement: Reset collection in statistics
**Reason**: Redundant with the same action already available in the export/backup screen. Removed to avoid confusion.
**Migration**: Users can still reset from the export/backup screen.
