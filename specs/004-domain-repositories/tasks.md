# Tasks: Implement Domain Repositories for HTTP Isolation

**Input**: Design documents from `/specs/004-domain-repositories/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Testing is explicitly mentioned in US2 ("Simplified Testing with Mocking"). We will include tasks for unit tests with mocks.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Verify project structure and feature directory locations in `src/app/features/`
- [X] T002 [P] Create `IRepository` contract interface in `src/app/core/repositories/repository.interface.ts` (if generic approach is chosen) or document standard pattern

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Ensure `HttpClientModule` (or `provideHttpClient`) is correctly configured in `src/app/app.config.ts`
- [X] T004 Identify all features requiring repositories (Process, Beneficiary, etc.) based on `src/app/features/`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Centralized Data Access (Priority: P1) 🎯 MVP

**Goal**: Isolate HTTP logic for the Process domain into a dedicated repository.

**Independent Test**: `ProcessStore` calls `ProcessRepository` methods instead of `HttpClient`, and the application still fetches/saves data correctly.

### Implementation for User Story 1

- [X] T005 [P] [US1] Create `ProcessRepository` in `src/app/features/process/process.repository.ts`
- [X] T006 [US1] Implement `getAll()`, `getById()`, `create()`, `update()`, and `delete()` in `src/app/features/process/process.repository.ts`
- [X] T007 [US1] Refactor `ProcessStore` in `src/app/features/process/process.store.ts` to inject `ProcessRepository` and replace `HttpClient` calls
- [X] T008 [US1] Validate that `ProcessComponent` still functions correctly with the new repository layer

**Checkpoint**: User Story 1 (Process domain isolation) is fully functional and testable independently.

---

## Phase 4: User Story 2 - Simplified Testing with Mocking (Priority: P2)

**Goal**: Enable easy unit testing by mocking the repositories.

**Independent Test**: Unit tests for `ProcessStore` pass using a mock repository without making real HTTP calls.

### Tests for User Story 2

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T009 [P] [US2] Create mock repository implementation in `src/app/features/process/process.repository.mock.ts`
- [X] T010 [US2] Implement unit tests for `ProcessStore` in `src/app/features/process/process.store.spec.ts` using the mock repository

**Checkpoint**: User Story 2 is verified - testing with mocks is established.

---

## Phase 5: User Story 3 - Domain Model Consistency (Priority: P3)

**Goal**: Ensure consistency by refactoring the Beneficiary domain.

**Independent Test**: `BeneficiaryStore` uses `BeneficiaryRepository` and all data is correctly typed.

### Implementation for User Story 3

- [X] T011 [P] [US3] Create `BeneficiaryRepository` in `src/app/features/beneficiaries/beneficiaries.repository.ts`
- [X] T012 [US3] Implement CRUD methods in `src/app/features/beneficiaries/beneficiaries.repository.ts` returning typed objects
- [X] T013 [US3] Refactor `BeneficiariesStore` in `src/app/features/beneficiaries/beneficiaries.store.ts` to use `BeneficiaryRepository`
- [X] T014 [US3] Create mock and unit tests for `BeneficiariesStore` in `src/app/features/beneficiaries/beneficiaries.store.spec.ts`

**Checkpoint**: User Story 3 is complete - architectural consistency achieved across main domains.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T015 [P] Update documentation in `specs/004-domain-repositories/quickstart.md` with final implementation details
- [X] T016 Code cleanup: remove any unused `HttpClient` imports from stores and components
- [X] T017 Run all unit tests to ensure no regressions across the application
- [X] T018 [P] Validate naming conventions across all new repository files

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1.
- **User Stories (Phase 3+)**: All depend on Phase 2.
  - US1 (P1) is the MVP.
  - US2 (P2) depends on US1 implementation (for testing it).
  - US3 (P3) can run in parallel with US1/US2 after the pattern is established.
- **Polish (Final Phase)**: After all user stories.

### User Story Dependencies

- **User Story 1**: Foundation for the pattern.
- **User Story 2**: Demonstrates the benefit of User Story 1.
- **User Story 3**: Applies the pattern to other domains.

### Parallel Opportunities

- T005 and T011 (Creating different repositories) can run in parallel.
- All mock creation tasks can run in parallel.
- Documentation updates can start as soon as US1 is stable.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2.
2. Implement `ProcessRepository`.
3. Refactor `ProcessStore`.
4. **STOP and VALIDATE**: Verify the Process feature works.

### Incremental Delivery

1. Add US2 (Testing) to ensure the refactor is solid.
2. Add US3 (Beneficiaries) to scale the pattern.
3. Final polish and verification.

---

## Notes

- [P] tasks = different files, no dependencies.
- [Story] label maps task to specific user story.
- Each repository must handle its own baseUrl and type mapping.
