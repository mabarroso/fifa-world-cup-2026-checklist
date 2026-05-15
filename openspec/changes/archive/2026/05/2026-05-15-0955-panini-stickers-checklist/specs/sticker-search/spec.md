## ADDED Requirements

### Requirement: Search by sticker ID
The system SHALL allow searching for stickers by exact or partial ID match.

#### Scenario: Exact ID search
- **WHEN** user searches for `MEX-15`
- **THEN** the result returns exactly the sticker with ID `MEX-15`

#### Scenario: Partial ID search
- **WHEN** user searches for `MEX`
- **THEN** the result returns all stickers whose ID starts with `MEX`

### Requirement: Search by name
The system SHALL allow searching for stickers by name with case-insensitive partial matching.

#### Scenario: Exact name search
- **WHEN** user searches for `Lionel Messi`
- **THEN** the result returns the sticker(s) with name exactly matching `Lionel Messi` (case-insensitive)

#### Scenario: Partial name search
- **WHEN** user searches for `Messi`
- **THEN** the result returns all stickers containing `Messi` in the name (case-insensitive)

#### Scenario: Case-insensitive search
- **WHEN** user searches for `messi`
- **THEN** the result returns all stickers containing `messi` in the name (case-insensitive)

### Requirement: Search by team name
The system SHALL allow searching for stickers by full or partial team name.

#### Scenario: Exact team search
- **WHEN** user searches for `Argentina`
- **THEN** the result returns all 20 stickers of the Argentina team

#### Scenario: Partial team search
- **WHEN** user searches for `Mex`
- **THEN** the result returns all stickers of teams containing `Mex` (e.g., Mexico)

### Requirement: Search by group
The system SHALL allow searching for all stickers in a specific group.

#### Scenario: Search by group letter
- **WHEN** user searches for group `A`
- **THEN** the result returns all stickers belonging to Group A (Mexico, South Africa, Korea Republic, Czechia)

### Requirement: Combined search filters
The system SHALL allow combining multiple search criteria (name + type + group).

#### Scenario: Search with multiple criteria
- **WHEN** user searches for players from Group A
- **THEN** the result returns only player stickers where `type === 'player'` and `group === 'A'`

### Requirement: Search results with owned status
The search results SHALL include the owned quantity for each sticker when applicable.

#### Scenario: Search result includes owned status
- **WHEN** user searches for `MEX`
- **THEN** each result includes `ownedQuantity` showing how many of that sticker are owned (0 if none)