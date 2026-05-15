## ADDED Requirements

### Requirement: Collection statistics
The system SHALL provide real-time statistics including: total stickers in collection, owned count, missing count, duplicate count, and completion percentage.

#### Scenario: Calculate owned count
- **WHEN** statistics are requested
- **THEN** owned count equals the sum of all values in the `owned` map

#### Scenario: Calculate missing count
- **WHEN** statistics are requested
- **THEN** missing count equals stickers with `owned[ID] === undefined` or `owned[ID] === 0`

#### Scenario: Calculate duplicate count
- **WHEN** statistics are requested
- **THEN** duplicate count equals the sum of all values in the `duplicates` map

#### Scenario: Calculate completion percentage
- **WHEN** statistics are requested
- **THEN** completion percentage equals `(owned count / total stickers) × 100` rounded to 1 decimal place

### Requirement: Filter by status
The system SHALL allow filtering stickers by status: owned, missing, or duplicated.

#### Scenario: Filter owned stickers
- **WHEN** user requests owned stickers
- **THEN** the result includes only stickers where `owned[ID] > 0`

#### Scenario: Filter missing stickers
- **WHEN** user requests missing stickers
- **THEN** the result includes only stickers where `owned[ID]` is undefined or 0

#### Scenario: Filter duplicated stickers
- **WHEN** user requests duplicated stickers
- **THEN** the result includes only stickers where `duplicates[ID] > 0`

### Requirement: Filter by group
The system SHALL allow filtering stickers by national team group (A through L).

#### Scenario: Filter by single group
- **WHEN** user requests Group A stickers
- **THEN** the result includes only stickers where `group === 'A'`

#### Scenario: Filter by multiple groups
- **WHEN** user requests Groups A and B stickers
- **THEN** the result includes stickers where `group === 'A'` or `group === 'B'`

### Requirement: Filter by sticker type
The system SHALL allow filtering stickers by type: `logo`, `fwc_special`, `team_badge`, `player`, `special`, `coca_cola`.

#### Scenario: Filter by player type
- **WHEN** user requests player stickers
- **THEN** the result includes only stickers where `type === 'player'`

#### Scenario: Filter by team badge type
- **WHEN** user requests team badge stickers
- **THEN** the result includes only stickers where `type === 'team_badge'`

### Requirement: Statistics by group
The system SHALL provide statistics broken down by group, showing owned/missing/completion per group.

#### Scenario: Group A statistics
- **WHEN** group statistics are requested for Group A
- **THEN** the result shows owned count, missing count, and completion percentage for the 4 teams in Group A

### Requirement: Statistics by type
The system SHALL provide statistics broken down by sticker type.

#### Scenario: Player type statistics
- **WHEN** type statistics are requested
- **THEN** the result shows owned count, missing count, and completion percentage for player stickers