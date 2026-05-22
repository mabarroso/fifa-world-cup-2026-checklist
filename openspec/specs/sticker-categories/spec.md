# sticker-categories Specification

## Purpose
Legacy synchronized capability specification for sticker-categories.

## Requirements
### Requirement: sticker-categories capability behavior
The system SHALL implement the capability behavior described in this specification.

#### Scenario: Capability behavior is used as baseline
- **WHEN** this capability is implemented, tested, or reviewed
- **THEN** the behavior captured in this specification MUST be treated as the baseline
- **AND** legacy archived notes MUST remain available for reference

## Legacy Notes

## ADDED Requirements

### Requirement: Sticker categories define classification
The system SHALL classify each sticker into exactly one category based on its ID prefix or pattern.

#### Scenario: Panini Logo classification
- **WHEN** a sticker has ID "0"
- **THEN** it SHALL be classified as "Logo Panini" (type: logo)

#### Scenario: FIFA World Cup special classification
- **WHEN** a sticker ID starts with "FWC"
- **THEN** it SHALL be classified as "Especial FIFA" (type: fwc_special)

#### Scenario: Team badge classification
- **WHEN** a sticker ID matches pattern "{TEAM}1" in Panini section
- **THEN** it SHALL be classified as "Escudo" (type: team_badge)

#### Scenario: Player classification
- **WHEN** a sticker ID matches pattern "{TEAM}2" to "{TEAM}20" in Panini section
- **THEN** it SHALL be classified as "Jugador" (type: player)

#### Scenario: Panini Extra classification
- **WHEN** a Panini sticker ID ends with "s" (e.g., MEX1s)
- **THEN** it SHALL be classified as "Panini Extra" (type: panini_extra)

#### Scenario: Coca-Cola USA/Canada classification
- **WHEN** a sticker ID starts with "CC-US"
- **THEN** it SHALL be classified as "Coca-Cola USA/Canada" (type: cocacola_us)

#### Scenario: Coca-Cola Latin America classification
- **WHEN** a sticker ID starts with "CC-LAM"
- **THEN** it SHALL be classified as "Coca-Cola Latin America" (type: cocacola_lam)

#### Scenario: Coca-Cola Rest of World classification
- **WHEN** a sticker ID starts with "CC-RW"
- **THEN** it SHALL be classified as "Coca-Cola Rest of World" (type: cocacola_rw)

#### Scenario: Coca-Cola Europe classification
- **WHEN** a sticker ID starts with "CC-EU"
- **THEN** it SHALL be classified as "Coca-Cola Europe" (type: cocacola_eu)

#### Scenario: McDonald's classification
- **WHEN** a sticker ID starts with "MC-"
- **THEN** it SHALL be classified as "McDonald's" (type: mcdonalds)

#### Scenario: Extra Base classification
- **WHEN** an Extra sticker ID has no suffix (e.g., ARG1)
- **THEN** it SHALL be classified as "Extra Base" (type: extra_base)

#### Scenario: Extra Bronze classification
- **WHEN** an Extra sticker ID ends with "-b"
- **THEN** it SHALL be classified as "Extra Bronze" (type: extra_bronze)

#### Scenario: Extra Silver classification
- **WHEN** an Extra sticker ID ends with "-s"
- **THEN** it SHALL be classified as "Extra Silver" (type: extra_silver)

#### Scenario: Extra Gold classification
- **WHEN** an Extra sticker ID ends with "-g"
- **THEN** it SHALL be classified as "Extra Gold" (type: extra_gold)

### Requirement: Category display order
The system SHALL display sticker categories in a predefined order for UI presentation.

#### Scenario: Category ordering for display
- **WHEN** categories are displayed in collection view
- **THEN** they SHALL appear in this order:
  1. Logo Panini
  2. Especial FIFA
  3. Equipos (team badges + players)
  4. Panini Extra
  5. Coca-Cola USA/Canada
  6. Coca-Cola Latin America
  7. Coca-Cola Rest of World
  8. Coca-Cola Europe
  9. McDonald's
  10. Extra Base
  11. Extra Bronze
  12. Extra Silver
  13. Extra Gold