## ADDED Requirements

### Requirement: Section classification rules for cromos
The system SHALL classify each cromo into exactly one section using these rules:
- `Panini`: cromo `0`, or IDs starting with one of:
  `FWC, MEX, RSA, KOR, CZE, CAN, BIH, QAT, SUI, BRA, MAR, HAI, SCO, USA, PAR, AUS, TUR, GER, CUW, CIV, ECU, NED, JPN, SWE, TUN, BEL, EGY, IRN, NZL, ESP, CPV, KSA, URU, FRA, SEN, IRQ, NOR, ARG, ALG, AUT, JOR, POR, COD, UZB, COL, ENG, CRO, GHA, PAN`
- `Coca Cola`: IDs starting with `CC-` (including subgroups `CC-US`, `CC-LAM`, `CC-RW`, `CC-EU`)
- `McDonald's`: IDs ending with `mc`
- `Extras`: all remaining IDs

#### Scenario: Classify Panini cromo by explicit rule
- **WHEN** a cromo ID is `0` or starts with a listed Panini prefix
- **THEN** the system classifies it as `Panini`
- **AND** the cromo MUST NOT be assigned to any other section

#### Scenario: Classify Coca Cola cromo by prefix
- **WHEN** a cromo ID begins with `CC-`
- **THEN** the system classifies it as `Coca Cola`
- **AND** the cromo MUST NOT be assigned to any other section

#### Scenario: Classify McDonald's cromo by suffix
- **WHEN** a cromo ID ends with `mc`
- **THEN** the system classifies it as `McDonald's`
- **AND** the cromo MUST NOT be assigned to any other section

#### Scenario: Classify fallback cromo as Extras
- **WHEN** a cromo ID does not satisfy Panini, Coca Cola, or McDonald's rules
- **THEN** the system classifies it as `Extras`

### Requirement: Section dropdown in collection view
The collection view SHALL provide a section dropdown to the right of `Repetidas` with values:
`Todas`, `Panini`, `Coca Cola`, `McDonald's`, `Extras`.

#### Scenario: Default section selection is Panini
- **WHEN** the collection view is opened
- **THEN** the selected section is `Panini`

#### Scenario: Section dropdown filters visible cromos
- **WHEN** a user selects a section value other than `Todas`
- **THEN** the cromo list displays only IDs classified in that section

#### Scenario: Todas shows all sections
- **WHEN** a user selects `Todas`
- **THEN** the cromo list includes cromos from all sections

### Requirement: Team dropdown options are section-scoped
The existing `<ID_FIX> - <TEAM>` dropdown SHALL only show options that exist within the currently selected section.

#### Scenario: Team options restricted by selected section
- **WHEN** section `Panini` is selected
- **THEN** `<ID_FIX> - <TEAM>` options only include Panini-classified cromos

#### Scenario: Team options updated after section change
- **WHEN** the user changes section from one value to another
- **THEN** the `<ID_FIX> - <TEAM>` options are recalculated for the new section before rendering results