## Context

The collection view exposes a team filter dropdown with options rendered as <ID_FIX> - <TEAM>. The current specification and behavior sort these options by team name, but users requested sorting by ID_FIX to align with the first token shown in each option.

## Goals / Non-Goals

**Goals:**
- Sort dropdown options alphabetically by ID_FIX.
- Preserve the existing label format <ID_FIX> - <TEAM>.
- Preserve existing filtering semantics and default Todos selection.

**Non-Goals:**
- Changing the source of team metadata.
- Changing option label format or introducing additional fields.
- Changing filter behavior once an option is selected.

## Decisions

1. Sort key will be ID_FIX normalized as uppercase string.
- Decision: compare option idFix values using localeCompare on uppercase values.
- Rationale: deterministic alphabetical order independent of input casing.

2. Generate unique options before sorting.
- Decision: keep one option per ID_FIX, then sort the resulting option list.
- Rationale: avoids unstable ordering caused by duplicate entries in sticker data.

3. Keep the selection value model unchanged.
- Decision: continue using existing selected team/filter value flow and only update option ordering.
- Rationale: reduces regression risk and limits change scope.

## Risks / Trade-offs

- [ID_FIX values with unexpected formatting] -> Mitigation: normalize casing and trim whitespace before comparison.
- [Regression in existing team filter tests] -> Mitigation: update/add ordering tests specifically asserting ID_FIX order.
- [Assumption conflict with existing spec text] -> Mitigation: deliver spec delta in this change and validate before apply.

## Migration Plan

1. Update spec delta for team-filter-dropdown ordering requirement.
2. Update dropdown option sort implementation to use ID_FIX.
3. Update tests that currently expect team-name ordering.
4. Run test and typecheck verification during apply phase.

Rollback strategy:
- Revert sorting comparator to previous team-name ordering if needed.

## Open Questions

- None.
