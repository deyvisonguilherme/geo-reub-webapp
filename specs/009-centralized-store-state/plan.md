# Implementation Plan: Centralize store error and loading states

**Branch**: `009-centralized-store-state` | **Date**: 2026-04-13 | **Spec**: [specs/009-centralized-store-state/spec.md](./spec.md)
**Input**: Feature specification from `/specs/009-centralized-store-state/spec.md`

## Summary

The goal of this refactor is to standardize how loading and error states are managed in feature stores. By adopting the `AsyncState<T>` interface globally, we reduce code duplication, improve consistency, and simplify the integration with UI feedback components like skeletons and toast notifications.

## Technical Context

**Language/Version**: TypeScript 5.6+ / Angular 21 (Zoneless)  
**Primary Dependencies**: `@ngrx/signals`, `rxjs`, `@angular/common/http`  
**Storage**: N/A  
**Testing**: Jasmine / Karma (Unit tests for stores ensuring state transitions)  
**Target Platform**: Web (SSR-compatible)
**Project Type**: Angular Web Application
**Performance Goals**: Minimal state object overhead; reactive updates via Signals.
**Constraints**: MUST use the existing `AsyncState` definition in `src/app/core/models/repository.types.ts`.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Feature follows the project's state management conventions.
- [x] Reuses existing core types.
- [x] Simplifies developer experience.

## Project Structure

### Documentation (this feature)

```text
specs/009-centralized-store-state/
├── plan.md              # This file
├── research.md          # State pattern research
├── data-model.md        # AsyncState entity and helpers
├── quickstart.md        # Integration guide for stores
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
src/app/core/
└── models/
    └── repository.types.ts   # UPDATED: Add state update helpers
src/app/features/
├── process/process.store.ts  # UPDATED: Refactored to AsyncState
├── beneficiaries/beneficiaries.store.ts # UPDATED: Refactored to AsyncState
└── ... (other stores)
```

**Structure Decision**: Standard Angular feature-based structure with centralized core types.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Single State Object | Better cohesion of metadata | Multiple signals are harder to manage and assert upon in tests. |
