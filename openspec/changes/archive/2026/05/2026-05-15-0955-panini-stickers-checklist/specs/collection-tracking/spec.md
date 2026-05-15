## ADDED Requirements

### Requirement: Mark sticker as owned
The system SHALL allow marking a sticker as owned with a quantity (default: 1). The owned count for the sticker ID SHALL be incremented by the specified amount.

#### Scenario: Mark sticker owned with default quantity
- **WHEN** user marks sticker `MEX-01` as owned
- **THEN** `owned["MEX-01"]` is set to 1

#### Scenario: Mark sticker owned with custom quantity
- **WHEN** user marks sticker `MEX-02` as owned with quantity 3
- **THEN** `owned["MEX-02"]` is set to 3

#### Scenario: Increment existing owned quantity
- **WHEN** `owned["MEX-02"]` is 2 and user marks it owned with quantity 1
- **THEN** `owned["MEX-02"]` becomes 3

### Requirement: Unmark sticker (decrement owned)
The system SHALL allow decreasing the owned quantity of a sticker. If the quantity reaches 0, the sticker entry SHALL be removed from the owned map.

#### Scenario: Decrement owned quantity
- **WHEN** `owned["MEX-02"]` is 3 and user removes 1
- **THEN** `owned["MEX-02"]` becomes 2

#### Scenario: Remove sticker when quantity reaches zero
- **WHEN** `owned["MEX-02"]` is 1 and user removes 1
- **THEN** `owned["MEX-02"]` is deleted from the map

### Requirement: Mark sticker as duplicate
The system SHALL allow marking a sticker as duplicated with a quantity (default: 1). The duplicate count for the sticker ID SHALL be incremented by the specified amount.

#### Scenario: Mark sticker as duplicate
- **WHEN** user marks sticker `MEX-02` as duplicate with quantity 2
- **THEN** `duplicates["MEX-02"]` is set to 2

#### Scenario: Increment existing duplicate quantity
- **WHEN** `duplicates["MEX-02"]` is 1 and user marks it duplicate with quantity 1
- **THEN** `duplicates["MEX-02"]` becomes 2

### Requirement: Unmark duplicate (decrement)
The system SHALL allow decreasing the duplicate quantity of a sticker. If the quantity reaches 0, the sticker entry SHALL be removed from the duplicates map.

#### Scenario: Decrement duplicate quantity
- **WHEN** `duplicates["MEX-02"]` is 2 and user removes 1
- **THEN** `duplicates["MEX-02"]` becomes 1

#### Scenario: Remove sticker when duplicate quantity reaches zero
- **WHEN** `duplicates["MEX-02"]` is 1 and user removes 1
- **THEN** `duplicates["MEX-02"]` is deleted from the map

### Requirement: Reset collection
The system SHALL allow resetting all collection progress, clearing both `owned` and `duplicates` maps.

#### Scenario: Reset clears all progress
- **WHEN** user resets the collection
- **THEN** `owned` is empty `{}` and `duplicates` is empty `{}`

### Requirement: Owned quantity accessible
The system SHALL provide a way to query the owned quantity for any sticker ID, returning 0 if not owned.

#### Scenario: Query owned sticker
- **WHEN** `owned["MEX-02"]` is 3
- **THEN** querying the owned quantity returns 3

#### Scenario: Query unowned sticker
- **WHEN** sticker `MEX-03` has never been marked
- **THEN** querying the owned quantity returns 0

### Requirement: Duplicate quantity accessible
The system SHALL provide a way to query the duplicate count for any sticker ID, returning 0 if none.

#### Scenario: Query duplicate sticker
- **WHEN** `duplicates["MEX-02"]` is 2
- **THEN** querying the duplicate count returns 2

#### Scenario: Query non-duplicate sticker
- **WHEN** sticker `MEX-03` has no duplicates
- **THEN** querying the duplicate count returns 0