# collection-state Specification

## Purpose
Legacy synchronized capability specification for collection-state.

## Requirements
### Requirement: collection-state capability behavior
The system SHALL implement the capability behavior described in this specification.

#### Scenario: Capability behavior is used as baseline
- **WHEN** this capability is implemented, tested, or reviewed
- **THEN** the behavior captured in this specification MUST be treated as the baseline
- **AND** legacy archived notes MUST remain available for reference

## Legacy Notes

## ADDED Requirements

### Requirement: Collection state structure
The system SHALL maintain collection state with two maps: owned and duplicates.

#### Scenario: Initial state
- **WHEN** a new collection is created
- **THEN** it SHALL have empty owned and duplicates maps

### Requirement: Mark sticker as owned
The system SHALL allow marking a sticker as owned in the album.

#### Scenario: Mark new sticker as owned
- **WHEN** markOwned("MEX1", 1) is called
- **AND** the sticker is not currently owned
- **THEN** owned["MEX1"] SHALL equal 1

#### Scenario: Increment owned quantity
- **WHEN** markOwned("MEX1", 1) is called
- **AND** the sticker is already owned with quantity 1
- **THEN** owned["MEX1"] SHALL equal 2

### Requirement: Unmark sticker from album
The system SHALL allow removing a sticker from the album.

#### Scenario: Unmark with quantity available
- **WHEN** unmarkOwned("MEX1", 1) is called
- **AND** the sticker is owned with quantity >= 1
- **THEN** the quantity SHALL be decremented

#### Scenario: Unmark removes from map when quantity reaches zero
- **WHEN** unmarkOwned("MEX1", 1) is called
- **AND** the sticker is owned with quantity exactly 1
- **THEN** owned["MEX1"] SHALL be undefined (removed from map)

### Requirement: Mark sticker as repeated
The system SHALL allow marking a sticker as repeated (duplicate).

#### Scenario: Mark as repeated
- **WHEN** markDuplicate("MEX1", 1) is called
- **AND** the sticker is owned
- **THEN** duplicates["MEX1"] SHALL equal 1

#### Scenario: Repeated requires ownership
- **WHEN** markDuplicate("MEX1", 1) is called
- **AND** the sticker is NOT owned
- **THEN** duplicates["MEX1"] SHALL NOT be set (repeated requires ownership)

#### Scenario: Marking one repeated sticker preserves existing repeated stickers
- **WHEN** duplicates already contains entries for other sticker IDs
- **AND** markDuplicate("MEX1", 1) is called
- **THEN** the repeated entries for other sticker IDs SHALL remain unchanged
- **AND** only the repeated state for "MEX1" MAY be updated

### Requirement: Unmark repeated sticker
The system SHALL allow removing a sticker from the repeated list.

#### Scenario: Unmark repeated
- **WHEN** unmarkDuplicate("MEX1", 1) is called
- **AND** the sticker is repeated
- **THEN** the repeated quantity SHALL be decremented

### Requirement: Collection statistics
The system SHALL provide accurate statistics about the collection.

#### Scenario: Total owned count
- **WHEN** getTotalOwned() is called
- **THEN** it SHALL return the sum of all owned quantities

#### Scenario: Total repeated count
- **WHEN** getTotalDuplicates() is called
- **THEN** it SHALL return the sum of all repeated quantities

#### Scenario: Unique owned count
- **WHEN** counting unique owned stickers
- **THEN** it SHALL count sticker IDs in owned map (regardless of quantity)

#### Scenario: Missing stickers calculation
- **WHEN** missing count is calculated
- **THEN** it SHALL equal total stickers minus unique owned count

### Requirement: Reset collection
The system SHALL allow resetting the collection to empty state.

#### Scenario: Reset clears all data
- **WHEN** reset() is called
- **THEN** owned SHALL be empty
- **AND** duplicates SHALL be empty

### Requirement: Collection persistence
The system SHALL support JSON serialization for persistence.

#### Scenario: JSON serialization
- **WHEN** collection state is serialized to JSON
- **THEN** it SHALL produce { owned: {...}, duplicates: {...} }

#### Scenario: JSON deserialization
- **WHEN** collection state is loaded from JSON
- **THEN** it SHALL restore owned and duplicates maps

### Requirement: Repeating state inference
The system SHALL determine if a sticker is repeated based on owned quantity.

#### Scenario: Sticker is repeated when owned >= 2
- **WHEN** a sticker has owned quantity >= 2
- **THEN** it SHALL be considered repeated

#### Scenario: Sticker is not repeated when owned == 1
- **WHEN** a sticker has owned quantity exactly 1
- **THEN** it SHALL NOT be considered repeated

#### Scenario: Sticker is not repeated when not owned
- **WHEN** a sticker has no owned entry
- **THEN** it SHALL NOT be considered repeated