## MODIFIED Requirements

### Requirement: Mark sticker as duplicate
The system SHALL allow marking a sticker as duplicated with a quantity (default: 1). The duplicate count for the sticker ID SHALL be incremented by the specified amount. This behavior MUST be consistent across CLI and GUI.

#### Scenario: Mark non-owned non-duplicate sticker as duplicate
- **WHEN** user marks sticker `MEX-02` as duplicate with quantity 1 and `owned["MEX-02"]` is 0
- **THEN** `owned["MEX-02"]` is set to 1 AND `duplicates["MEX-02"]` is set to 1

#### Scenario: Mark owned non-duplicate sticker as duplicate
- **WHEN** user marks sticker `MEX-02` as duplicate with quantity 2 and `owned["MEX-02"]` is 1 and `duplicates["MEX-02"]` is 0
- **THEN** `duplicates["MEX-02"]` becomes 2

#### Scenario: Increment existing duplicate quantity
- **WHEN** `duplicates["MEX-02"]` is 1 and user marks it duplicate with quantity 1
- **THEN** `duplicates["MEX-02"]` becomes 2

### Requirement: Unmark duplicate (decrement)
The system SHALL allow decreasing the duplicate quantity of a sticker. If the quantity reaches 0, the sticker entry SHALL be removed from the duplicates map. This behavior MUST be consistent across CLI and GUI.

#### Scenario: Decrement duplicate quantity
- **WHEN** `duplicates["MEX-02"]` is 2 and user removes 1
- **THEN** `duplicates["MEX-02"]` becomes 1

#### Scenario: Remove sticker when duplicate quantity reaches zero
- **WHEN** `duplicates["MEX-02"]` is 1 and user removes 1
- **THEN** `duplicates["MEX-02"]` is deleted from the map

#### Scenario: Remove non-duplicate owned sticker
- **WHEN** `owned["MEX-02"]` is 1 and `duplicates["MEX-02"]` is 0 and user removes the sticker
- **THEN** `owned["MEX-02"]` is deleted from the map
