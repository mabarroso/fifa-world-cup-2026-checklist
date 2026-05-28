## MODIFIED Requirements

### Requirement: Theme switching
The GUI SHALL support switching between three theme settings: auto (match device), dark, and light. The default setting SHALL be auto.

#### Scenario: Theme toggle cycles through modes
- **WHEN** the user activates the theme toggle
- **THEN** the GUI SHALL cycle the theme setting in order: auto → light → dark → auto
- **AND** all visual elements SHALL update immediately to match the selected theme

#### Scenario: Default theme setting
- **WHEN** the application loads for the first time
- **THEN** the GUI SHALL use auto as the default theme setting

#### Scenario: Persisted preference
- **WHEN** the user selects a theme setting
- **THEN** the preference SHALL be persisted in localStorage
- **AND** on subsequent loads, the GUI SHALL apply the persisted theme setting preference

#### Scenario: Auto theme matches device
- **WHEN** the theme setting is auto
- **THEN** the actual applied theme SHALL match the device's preferred color scheme via `prefers-color-scheme`
- **AND** when the device preference changes, the actual theme SHALL update accordingly without user interaction

#### Scenario: Light theme setting
- **WHEN** the theme setting is light
- **THEN** the actual applied theme SHALL be light regardless of device preference

#### Scenario: Dark theme setting
- **WHEN** the theme setting is dark
- **THEN** the actual applied theme SHALL be dark regardless of device preference

### Requirement: Theme toggle in menu
The theme toggle SHALL be accessible from the 3-dot menu and SHALL display the current setting.

#### Scenario: Toggle via menu
- **WHEN** the user clicks "Tema" in the 3-dot menu
- **THEN** the theme setting SHALL cycle to the next option (auto → light → dark → auto)
- **AND** the label SHALL show the current setting (e.g. "Tema: Auto", "Tema: Claro", "Tema: Oscuro")
- **AND** a Sun/Moon icon SHALL reflect the actual applied theme
