# Validation

## Purpose
Define release/acceptance checks before changes are considered done.

## Baseline gates
- Build/lint/type checks pass (if applicable).
- Critical user path smoke-tested.
- No known P0/P1 regressions introduced.
- Docs updated when behavior/process changed.

## Evidence
Attach or link evidence for each significant run/release in `docs/RUN_LOG.md`.

## Project-specific validation scope

- Template render parity across EN/DE/ES/PL.
- Generator package integration tests for core paths.
- Build artifacts deployable to Cloudflare Pages without manual patching.
