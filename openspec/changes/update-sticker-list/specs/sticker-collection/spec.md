## ADDED Requirements

### Requirement: Sticker data structure
The system SHALL store stickers with exactly four fields: id, name, team, and type.

#### Scenario: Sticker creation with required fields
- **WHEN** a sticker is created
- **THEN** it SHALL have: id (string), name (string), team (string), type (StickerType)

### Requirement: Sticker ID format
The system SHALL accept sticker IDs in various formats from the source data.

#### Scenario: Logo ID format
- **WHEN** a sticker has ID "0"
- **THEN** it SHALL be valid and processed correctly

#### Scenario: FWC ID format
- **WHEN** a sticker has ID like "FWC1", "FWC2", etc.
- **THEN** it SHALL be valid and processed correctly

#### Scenario: Team ID format
- **WHEN** a sticker has ID like "MEX1", "RSA2", "KOR20"
- **THEN** it SHALL be valid and processed correctly

#### Scenario: Panini Extra ID format
- **WHEN** a sticker has ID like "MEX1s", "RSA2s"
- **THEN** it SHALL be valid and processed as panini_extra type

#### Scenario: Coca-Cola ID format
- **WHEN** a sticker has ID like "CC-US1", "CC-LAM14", "CC-RW12", "CC-EU8"
- **THEN** it SHALL be valid and processed with appropriate Coca-Cola type

#### Scenario: McDonald's ID format
- **WHEN** a sticker has ID like "MC-1", "MC-7"
- **THEN** it SHALL be valid and processed as mcdonalds type

#### Scenario: Extra ID format with variants
- **WHEN** a sticker has ID like "ARG1", "ARG1b", "ARG1s", "ARG1g"
- **THEN** it SHALL be valid and processed with appropriate extra variant type

### Requirement: Sticker immutability
The system SHALL make sticker data immutable after creation.

#### Scenario: Immutability check
- **WHEN** code attempts to modify sticker properties after creation
- **THEN** it SHALL not be possible as properties are readonly

### Requirement: Sticker string representation
The system SHALL provide a string representation of stickers for display.

#### Scenario: String format
- **WHEN** a sticker's toString() is called
- **THEN** it SHALL return "[id] name - team" format

### Requirement: Sticker JSON serialization
The system SHALL support JSON serialization and deserialization of stickers.

#### Scenario: JSON serialization
- **WHEN** a sticker is serialized to JSON
- **THEN** it SHALL produce { id, name, team, type } object

#### Scenario: JSON deserialization
- **WHEN** a JSON object with sticker data is deserialized
- **THEN** it SHALL create a valid Sticker instance