# Tasks: Implement Domain Repositories for HTTP Isolation

**Input**: Design documents from `/specs/003-domain-repositories/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Unit tests are included as they are a core requirement of User Story 2.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Verify existing feature structure in `src/app/features/process/` and `src/app/features/beneficiaries/`
- [x] T002 [P] Review `HttpClient` usage in current stores to identify all required repository methods

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T003 Define standardized `AsyncState<T>` or `Result<T>` types for repository responses in `src/app/core/models/repository.types.ts`
- [x] T004 Implement base error handling utility for repositories in `src/app/core/utils/repository-errors.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Refactoring Process Domain (Priority: P1) 🎯 MVP

**Goal**: Move HTTP communication logic for Processes into a dedicated repository.

**Independent Test**: `ProcessStore` no longer imports `HttpClient` and all features (list, detail, create, edit) in `ProcessComponent` remain functional.

### Implementation for User Story 1

- [x] T005 [P] [US1] Create `ProcessRepository` service in `src/app/features/process/process.repository.ts`
- [x] T006 [US1] Implement `getAll()`, `getById()`, `create()`, `update()`, and `delete()` in `src/app/features/process/process.repository.ts`
- [x] T007 [US1] Refactor `ProcessStore` in `src/app/features/process/process.store.ts` to inject `ProcessRepository` instead of `HttpClient`
- [x] T008 [US1] Update `loadProcesses` and other state-mutating methods in `ProcessStore` to use the repository
- [x] T009 [US1] Verify UI integration in `src/app/features/process/process.component.ts`

**Checkpoint**: User Story 1 is fully functional and the Process domain is isolated from HTTP implementation details.

---

## Phase 4: User Story 2 - Simplified Unit Testing (Priority: P2)

**Goal**: Enable fast, reliable unit testing for stores without `HttpClientTestingModule`.

**Independent Test**: `ProcessStore` unit tests pass using a manual repository mock.

### Tests for User Story 2

- [x] T010 [P] [US2] Create a mock implementation of `ProcessRepository` for testing purposes
- [x] T011 [US2] Update `src/app/features/process/process.spec.ts` to provide the mock repository instead of `HttpClient`
- [x] T012 [US2] Implement test cases for `loadProcesses` success and failure scenarios in `src/app/features/process/process.spec.ts`
- [x] T013 [US2] Verify tests pass and no longer require `HttpClientTestingModule`

**Checkpoint**: The pattern for simplified testing is established and verified.

---

## Phase 5: User Story 3 - Pattern Standardization (Priority: P3)

**Goal**: Apply the repository pattern to the Beneficiary domain to ensure consistency.

**Independent Test**: `BeneficiariesStore` uses `BeneficiaryRepository` and unit tests pass.

### Implementation for User Story 3

- [x] T014 [P] [US3] Create `BeneficiaryRepository` in `src/app/features/beneficiaries/beneficiaries.repository.ts`
- [x] T015 [US3] Implement required CRUD methods in `src/app/features/beneficiaries/beneficiaries.repository.ts`
- [x] T016 [US3] Refactor `BeneficiariesStore` in `src/app/features/beneficiaries/beneficiaries.store.ts` to use the new repository
- [x] T017 [US3] Update unit tests in `src/app/features/beneficiaries/beneficiaries.spec.ts` to use a mock repository

**Checkpoint**: All specified domains follow the repository pattern consistently.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T018 [P] Remove any remaining unused `HttpClient` imports from `src/app/features/`
- [x] T019 Update `GEMINI.md` with the "Architecture Decision" regarding the Repository Pattern
- [x] T020 [P] Ensure all new repositories follow the naming and structure conventions defined in `research.md`
- [x] T021 Run all project tests to ensure zero regressions

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 completion. Blocks all user stories.
- **User Stories (Phase 3+)**: All depend on Phase 2 completion.
  - US1 (P1) is the priority.
  - US2 (P2) depends on US1 implementation details but focuses on testing.
  - US3 (P3) can run in parallel with US1/US2 after the pattern is settled in US1.

### Parallel Opportunities

- T005, T010, T014 (Creating repository skeletons) can run in parallel.
- US1 and US3 implementation can run in parallel if the foundation (Phase 2) is stable.
- Polish tasks T018, T020 can run in parallel at the end.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Foundational Phase (Standardized types).
2. Implement `ProcessRepository`.
3. Refactor `ProcessStore`.
4. Validate that the Process feature still works in the browser.

### Incremental Delivery

1. Foundation -> Solid base for all features.
2. Process Domain -> Prove the pattern and deliver MVP value.
3. Testing -> Ensure the main benefit (testability) is realized.
4. Beneficiary Domain -> Scale the pattern to other parts of the app.
