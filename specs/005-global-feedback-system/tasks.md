# Tasks: Centralized Global Feedback System

**Input**: Design documents from `/specs/005-global-feedback-system/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Unit tests for the GlobalStore are included to ensure reliability of the centralized feedback mechanism.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the core service and layout components.

- [X] T001 Create `src/app/core/feedback/` directory
- [X] T002 [P] Register `MessageService` and `ConfirmationService` in `src/app/app.config.ts` providers
- [X] T003 Add `<p-toast />` and `<p-confirmDialog />` to `src/app/app.html` (or root layout)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement the core `GlobalStore` logic.

**⚠️ CRITICAL**: No user story implementation can begin until this phase is complete.

- [X] T004 Create `GlobalStore` service in `src/app/core/feedback/global-feedback.service.ts` using `signalStore` or a Signal-based service pattern
- [X] T005 [P] Define `NotificationEvent` and `ConfirmationRequest` types in `src/app/core/feedback/feedback.types.ts`
- [X] T006 Implement basic `notifySuccess`, `notifyError`, `notifyWarn`, and `notifyInfo` methods in `src/app/core/feedback/global-feedback.service.ts`
- [X] T007 Implement `confirmAction` method in `src/app/core/feedback/global-feedback.service.ts`

**Checkpoint**: Foundation ready - global feedback can now be triggered from feature stores.

---

## Phase 3: User Story 1 - Unified Notification Triggering (Priority: P1) 🎯 MVP

**Goal**: Enable feature stores to trigger notifications without PrimeNG dependencies.

**Independent Test**: Inject `GlobalStore` into `ProcessStore`, call `notifySuccess()`, and verify the toast appears in the browser.

### Implementation for User Story 1

- [X] T008 [P] [US1] Create unit test for `notifySuccess` in `src/app/core/feedback/global-feedback.service.spec.ts`
- [X] T009 [US1] Refactor `src/app/features/process/process.store.ts` to inject `GlobalStore` and trigger a success notification on data save
- [X] T010 [US1] Add global error handling in `ProcessStore` using `globalStore.notifyError()` for repository failures

**Checkpoint**: User Story 1 is functional - Process module is now utilizing global notifications.

---

## Phase 4: User Story 2 - Centralized Action Confirmation (Priority: P2)

**Goal**: Provide a consistent UX for critical/destructive actions.

**Independent Test**: Click "Excluir" on a REURB process, verify the confirmation dialog appears, and confirm the action proceeds only after acceptance.

### Implementation for User Story 2

- [X] T011 [P] [US2] Create unit test for `confirmAction` in `src/app/core/feedback/global-feedback.service.spec.ts`
- [X] T012 [US2] Update `src/app/features/process/process.component.ts` (or store) to use `globalStore.confirmAction()` before executing `deleteProcess()`
- [X] T013 [US2] Integrate `confirmAction` into `src/app/features/beneficiaries/beneficiaries.store.ts` for destructive operations

**Checkpoint**: User Story 2 is functional - critical actions are now protected by global confirmation.

---

## Phase 5: User Story 3 - Consistent UI Feedback (Priority: P3)

**Goal**: Ensure all REURB forms provide identical visual feedback.

**Independent Test**: Perform actions in `NucleusStore` or `AlertStore` and verify they use the same `GlobalStore` methods.

### Implementation for User Story 3

- [X] T014 [P] [US3] Audit all existing feature stores and components to replace direct `MessageService` injections with `GlobalStore`
- [X] T015 [US3] Ensure all `AlertStore` operations trigger appropriate global feedback

**Checkpoint**: All specified domains follow the centralized feedback pattern consistently.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Documentation and cleanup.

- [X] T016 [P] Update `specs/005-global-feedback-system/quickstart.md` with final API usage examples
- [ ] T017 Remove any unused `MessageService` or `ConfirmationService` imports from feature modules
- [ ] T018 Run all project tests to ensure no regressions in REURB workflows

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 completion. Blocks all user stories.
- **User Stories (Phase 3+)**: All depend on Phase 2 completion.
  - US1 (P1) is the MVP priority.
  - US2 (P2) can follow US1.
  - US3 (P3) ensures broad coverage.

### Parallel Opportunities

- T002, T003, and T005 can run in parallel within their respective phases.
- T008 and T011 (unit tests) can be developed alongside the implementation.
- T016 and T017 can run in parallel at the end.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2 (Config + GlobalStore implementation).
2. Integrate into `ProcessStore`.
3. Validate toast visibility in the app.

### Incremental Delivery

1. Foundation -> Central point for all feedback.
2. Notifications -> Immediate value for all save/error operations.
3. Confirmation -> Unified safety layer for deletes.
4. Scale -> Full adoption across all REURB modules.
