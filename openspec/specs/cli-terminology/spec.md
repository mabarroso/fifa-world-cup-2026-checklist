# cli-terminology Specification

## Purpose
Legacy synchronized capability specification for cli-terminology.

## Requirements
### Requirement: cli-terminology capability behavior
The system SHALL implement the capability behavior described in this specification.

#### Scenario: Capability behavior is used as baseline
- **WHEN** this capability is implemented, tested, or reviewed
- **THEN** the behavior captured in this specification MUST be treated as the baseline
- **AND** legacy archived notes MUST remain available for reference

## Legacy Notes

## CLI Terminology Update

### Requirement

All user-facing text in CLI menus must use "cromo" (singular) / "cromos" (plural) instead of "figurita"/"figuritas".

### Acceptance Criteria

- [ ] All 7 CLI menu files updated
- [ ] No remaining occurrences of "figurita" or "figuritas" in UI text
- [ ] All functionality preserved (no logic changes)
- [ ] `bun run typecheck` passes
- [ ] `bun test` passes