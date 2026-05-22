# sticker-type-enum Specification

## Purpose
Legacy synchronized capability specification for sticker-type-enum.

## Requirements
### Requirement: sticker-type-enum capability behavior
The system SHALL implement the capability behavior described in this specification.

#### Scenario: Capability behavior is used as baseline
- **WHEN** this capability is implemented, tested, or reviewed
- **THEN** the behavior captured in this specification MUST be treated as the baseline
- **AND** legacy archived notes MUST remain available for reference

## Legacy Notes

## ADDED Requirements

### Requirement: StickerType enum values
The system SHALL define a StickerType enum with the following values representing all sticker categories.

#### Scenario: Enum completeness
- **WHEN** the application loads sticker types
- **THEN** the enum SHALL contain all 14 values:
  - logo
  - fwc_special
  - team_badge
  - player
  - panini_extra
  - cocacola_us
  - cocacola_lam
  - cocacola_rw
  - cocacola_eu
  - mcdonalds
  - extra_base
  - extra_bronze
  - extra_silver
  - extra_gold

### Requirement: StickerType labels in Spanish
The system SHALL provide Spanish labels for each StickerType value.

#### Scenario: Spanish label mapping
- **WHEN** the UI needs to display a sticker type
- **THEN** it SHALL use the following Spanish labels:
  - logo → "Logo Panini"
  - fwc_special → "Especial FIFA"
  - team_badge → "Escudo"
  - player → "Jugador"
  - panini_extra → "Panini Extra"
  - cocacola_us → "Coca-Cola USA/Canada"
  - cocacola_lam → "Coca-Cola Latin America"
  - cocacola_rw → "Coca-Cola Rest of World"
  - cocacola_eu → "Coca-Cola Europe"
  - mcdonalds → "McDonald's"
  - extra_base → "Extra Base"
  - extra_bronze → "Extra Bronze"
  - extra_silver → "Extra Silver"
  - extra_gold → "Extra Gold"

### Requirement: StickerType validation
The system SHALL validate that sticker type values are one of the defined enum values.

#### Scenario: Valid type assignment
- **WHEN** a sticker is created with type "cocacola_us"
- **THEN** it SHALL be accepted as a valid StickerType

#### Scenario: Invalid type rejection
- **WHEN** a sticker is created with type "invalid_type"
- **THEN** it SHALL throw an InvalidStickerTypeError

### Requirement: StickerType is immutable
The sticker type SHALL be immutable once a sticker is created.

#### Scenario: Type immutability attempt
- **WHEN** code attempts to change a sticker's type after creation
- **THEN** it SHALL not be possible as type is a readonly property