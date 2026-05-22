# sticker-data Specification

## Purpose
Legacy synchronized capability specification for sticker-data.

## Requirements
### Requirement: sticker-data capability behavior
The system SHALL implement the capability behavior described in this specification.

#### Scenario: Capability behavior is used as baseline
- **WHEN** this capability is implemented, tested, or reviewed
- **THEN** the behavior captured in this specification MUST be treated as the baseline
- **AND** legacy archived notes MUST remain available for reference

## Legacy Notes

## ADDED Requirements

### Requirement: Embedded sticker dataset
The system SHALL embed a complete dataset of 1072 stickers in `src/data/stickers.ts` covering all album sections: Logo Panini (1), FWC pre-team stickers (8), 48 national teams × 20 stickers (960), FWC history stickers (11), Extra stickers × 4 variants (80), and Coca-Cola Spain edition (12).

#### Scenario: Sticker dataset loads successfully
- **WHEN** the application starts
- **THEN** the sticker dataset is loaded from `src/data/stickers.ts` with 1072 entries

#### Scenario: All sticker categories present
- **WHEN** the sticker dataset is queried
- **THEN** all categories are available: logo (1), fwc_special (19), team_badge (48), player (912), special (80), coca_cola (12)

#### Scenario: Team stickers grouped correctly
- **WHEN** stickers are filtered by team
- **THEN** each of the 48 teams returns exactly 20 stickers

### Requirement: Sticker identification system
Each sticker SHALL have a unique composite ID following the pattern `{TEAM}-{NN}` for team stickers, `FWC-{NN}` for FIFA World Cup specials, `LOGO-00` for the album logo, `EXTRA-{name}-{variant}` for Extra stickers, and `CC-{NN}` for Coca-Cola edition stickers.

#### Scenario: Team sticker ID format
- **WHEN** a team sticker is retrieved
- **THEN** its ID follows the format `{TEAMCODE}-{NUMBER}` (e.g., `MEX-01`, `RSA-05`, `ARG-20`)

#### Scenario: Extra sticker ID format
- **WHEN** an Extra sticker variant is retrieved
- **THEN** its ID follows the format `EXTRA-{playername}-{variant}` (e.g., `EXTRA-messi-purple`, `EXTRA-ronaldo-gold`)

#### Scenario: FWC sticker ID format
- **WHEN** a FWC special sticker is retrieved
- **THEN** its ID follows the format `FWC-{NN}` (e.g., `FWC-01`, `FWC-15`)

### Requirement: Sticker type classification
Each sticker SHALL have a `type` field classifying it as `logo`, `fwc_special`, `team_badge`, `player`, `special`, or `coca_cola`.

#### Scenario: Team badge type assignment
- **WHEN** the first sticker (Escudo) of any team is retrieved
- **THEN** its type is `team_badge`

#### Scenario: Player sticker type assignment
- **WHEN** any sticker from position 2-20 of a team is retrieved
- **THEN** its type is `player`

#### Scenario: FWC special type assignment
- **WHEN** a FWC-01 through FWC-19 sticker is retrieved
- **THEN** its type is `fwc_special`

#### Scenario: Extra sticker type assignment
- **WHEN** any Extra sticker variant is retrieved
- **THEN** its type is `special`

#### Scenario: Coca-Cola sticker type assignment
- **WHEN** a CC-01 through CC-12 sticker is retrieved
- **THEN** its type is `coca_cola`

### Requirement: Extra sticker variant tracking
Each Extra sticker SHALL store its variant (`purple`, `bronze`, `silver`, `gold`) in the `extraVariant` field.

#### Scenario: Extra variant stored per sticker
- **WHEN** an Extra sticker is retrieved
- **THEN** its `extraVariant` field contains exactly one of: `purple`, `bronze`, `silver`, `gold`

#### Scenario: Non-Extra stickers have no variant
- **WHEN** a non-Extra sticker is retrieved
- **THEN** its `extraVariant` field is `null`

### Requirement: Group assignment
Team stickers SHALL be assigned to their corresponding group (A through L). Special stickers (FWC, Extra, Coca-Cola, Logo) SHALL have `null` as their group.

#### Scenario: Group A team stickers
- **WHEN** team stickers for Mexico, South Africa, Korea Republic, or Czechia are retrieved
- **THEN** their group is `A`

#### Scenario: Group L team stickers
- **WHEN** team stickers for England, Croatia, Ghana, or Panama are retrieved
- **THEN** their group is `L`

#### Scenario: Special stickers have null group
- **WHEN** FWC, Extra, or Coca-Cola stickers are retrieved
- **THEN** their group is `null`