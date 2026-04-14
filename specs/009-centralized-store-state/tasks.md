# Tasks: Centralize store error and loading states

**Input**: Design documents from `/specs/009-centralized-store-state/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Tests**: Unit tests for stores to ensure correct state transitions using the new `AsyncState` pattern.

**Organization**: Tasks are grouped by component and user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Enhance core types with state transition helpers.

- [x] T001 Implement state transition helpers (`updateAsyncLoading`, `updateAsyncSuccess`, `updateAsyncError`) in `src/app/core/models/repository.types.ts`
- [x] T002 Add unit tests for the new state helpers in `src/app/core/models/repository.types.spec.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Prepare feature stores for refactoring.

- [x] T003 Audit all feature stores (`process`, `beneficiaries`, `nucleus`, `alert`, `comunication`) to map existing signals to `AsyncState` structures.

**Checkpoint**: Foundation ready - store refactoring can now begin in parallel

---

## Phase 3: User Story 1 & 3 - Refactoring Process Store (Priority: P1) 🎯 MVP

**Goal**: Standardize ProcessStore and reduce boilerplate.

**Independent Test**: `ProcessStore` successfully loads data and manages status through a single `AsyncState` object.

### Implementation for User Story 1

- [x] T004 [US1] Define `ProcessState` interface in `src/app/features/process/process.store.ts` using `AsyncState`
- [x] T005 [US1] Refactor `loadProcesses` in `src/app/features/process/process.store.ts` to use state transition helpers
- [x] T006 [US1] Update `ProcessComponent` templates to consume data from `store.processList.data()`
- [x] T007 [US1] Integrate `store.processList.loading()` with `app-table-skeleton` in `src/app/features/process/process.component.html`

**Checkpoint**: US1 complete - Process module now uses centralized state

---

## Phase 4: User Story 2 - Centralized Error Strategy (Priority: P1)

**Goal**: Implement unified error reporting.

**Independent Test**: Fail a repository call and verify the `error` property is populated and visible in the UI.

### Implementation for User Story 2

- [x] T008 [US2] Update `GlobalFeedbackService` or similar to optionally listen to store error signals (or manually trigger from store)
- [x] T009 [US2] Ensure all repository errors are mapped to the `error` property of the `AsyncState` in `src/app/features/process/process.store.ts`

**Checkpoint**: US2 complete - Error reporting is standardized

---

## Phase 5: User Story 3 - Scaling to Other Stores (Priority: P2)

**Goal**: Apply the pattern to all remaining features.

**Independent Test**: All feature modules (`Beneficiaries`, `Nucleus`, `Alert`) use the `AsyncState` pattern.

### Implementation for User Story 3

- [x] T010 [P] [US3] Refactor `BeneficiariesStore` in `src/app/features/beneficiaries/beneficiaries.store.ts` to use `AsyncState`
- [x] T011 [P] [US3] Refactor `NucleusStore` in `src/app/features/nucleus/nucleus.store.ts` to use `AsyncState`
- [x] T012 [P] [US3] Refactor `AlertStore` in `src/app/features/alert/alert.store.ts` to use `AsyncState`
- [x] T013 [P] [US3] Refactor `ComunicationStore` in `src/app/features/comunication/comunication.store.ts` to use `AsyncState`

**Checkpoint**: US3 complete - Entire application uses standardized asynchronous state

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and documentation.

- [x] T014 [P] Update `GEMINI.md` with the new State Management standard
- [x] T015 Remove any obsolete `loading` or `error` signals across the entire project
- [x] T016 Run all project tests to ensure zero regressions in data flow
- [x] T017 [P] Update `specs/009-centralized-store-state/quickstart.md` with final helper API usage

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Must complete helpers before refactoring stores.
- **Foundational (Phase 2)**: Mandatory audit before execution.
- **User Stories (Phase 3 & 4)**: Process Store is the MVP.
- **Scaling (Phase 5)**: Can be done in parallel for different domains.
- **Polish (Final Phase)**: Global cleanup.

### Parallel Opportunities

- T010, T011, T012, T013 (Refactoring different stores) can all run in parallel.
- Documentation updates (T014, T017) can start as soon as the helpers are stable.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Implement core helpers.
2. Refactor `ProcessStore`.
3. Verify skeleton and data display in the browser.

### Incremental Delivery

1. Core Infrastructure (Helpers).
2. Process Module (The Model).
3. System-wide Rollout (Beneficiaries, Nucleus, etc.).
4. Cleanup & Final Docs.
