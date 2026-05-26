## MODIFIED Requirements

### Requirement: Export screen panel ordering
The export screen SHALL present panels in the following order: (1) "Generar checklist de faltantes" with source scope, sort order, and PDF mode controls, followed by format selection cards (PDF/CSV/TXT); (2) "Copia de seguridad" with backup save/open and reset collection buttons.

#### Scenario: Checklist generation panel appears first
- **WHEN** user opens the export screen
- **THEN** the "Generar checklist de faltantes" panel and format cards are displayed before the "Copia de seguridad" panel

#### Scenario: Backup panel appears last
- **WHEN** user opens the export screen
- **THEN** the "Copia de seguridad" panel is displayed after all checklist generation and format selection controls
