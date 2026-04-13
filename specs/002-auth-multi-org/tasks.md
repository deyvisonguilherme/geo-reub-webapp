# Tasks: Multiple Organization Authentication

**Input**: Design documents from `/specs/002-auth-multi-org/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Unit tests are included as per the implementation plan for technical integrity.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Review existing state and prepare for changes.

- [x] T001 Review and confirm current auth implementation state in `src/app/core/auth/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure updates that MUST be complete before ANY user story can be implemented.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T002 Update `AuthResponse`, `UserProfile`, and add `Organization` interfaces in `src/app/core/auth/auth.types.ts`
- [x] T003 [P] Update `AuthStore` to handle extended `UserProfile` (organization context) in `src/app/core/auth/auth.store.ts`
- [x] T004 Update `AuthService` login method to support optional `organizacao_id` parameter in `src/app/core/auth/auth.service.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Single Organization Login (Priority: P1) 🎯 MVP

**Goal**: Ensure users associated with exactly one organization can log in directly without interruption.

**Independent Test**: Login with credentials for a single-org user and verify immediate redirection to dashboard.

### Tests for User Story 1

- [x] T005 [P] [US1] Add unit tests for successful single organization login in `src/app/core/auth/auth.service.spec.ts`

### Implementation for User Story 1

- [x] T006 [US1] Update `LoginComponent.onLogin` to handle the updated `AuthResponse` structure in `src/app/features/auth/login.component.ts`
- [x] T007 [US1] Verify user profile in `AuthStore` contains correct organization context after login

**Checkpoint**: User Story 1 (MVP) is functional and testable independently.

---

## Phase 4: User Story 2 - Multiple Organization Selection (Priority: P1)

**Goal**: Enable users with multiple organizations to select their context during login.

**Independent Test**: Login with multi-org credentials, select an organization from the list, and verify successful completion.

### Tests for User Story 2

- [x] T008 [P] [US2] Add unit tests for `MULTIPLE_ORGANIZATIONS` error handling in `src/app/features/auth/login.component.spec.ts`
- [x] T009 [P] [US2] Add unit tests for final login submission with `organizacao_id` in `src/app/features/auth/login.component.spec.ts`

### Implementation for User Story 2

- [x] T010 [US2] Implement component state for organization selection (signals: `organizations`, `showOrgSelection`) in `src/app/features/auth/login.component.ts`
- [x] T011 [US2] Enhance `onLogin` error handling to detect `MULTIPLE_ORGANIZATIONS` and display selection view in `src/app/features/auth/login.component.ts`
- [x] T012 [P] [US2] Implement organization selection UI using PrimeNG Dropdown/Select in `src/app/features/auth/login.component.html`
- [x] T013 [P] [US2] Add styles for the organization selection view in `src/app/features/auth/login.component.scss`
- [x] T014 [US2] Implement `onConfirmOrganization` to re-submit login with the selected `organizacao_id` in `src/app/features/auth/login.component.ts`

**Checkpoint**: User Story 2 is fully functional and integrates with the authentication flow.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories.

- [x] T015 [P] Refactor `LoginComponent` for better readability and separation of login/selection concerns
- [x] T016 [P] Update JSDoc documentation for updated auth methods and types
- [x] T017 Run final validation against all cases in `specs/002-auth-multi-org/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Phase 1 completion - BLOCKS all user stories.
- **User Stories (Phase 3 & 4)**: Depend on Phase 2 completion. US1 (P1) is prioritized as MVP.
- **Polish (Phase 5)**: Depends on completion of all user stories.

### Parallel Opportunities

- T003 (Store) can run in parallel with T002 (Types) if types are defined first or simultaneously.
- T012 (HTML) and T013 (SCSS) for the organization selection UI can run in parallel.
- All test tasks ([P]) can run in parallel with their corresponding implementation tasks.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Foundational Phase (Types, Service, Store).
2. Update `LoginComponent` to maintain current flow with new response structures (US1).
3. Validate that single-org users are unaffected.

### Incremental Delivery

1. Once US1 is verified, implement the `MULTIPLE_ORGANIZATIONS` error trap.
2. Add the selection UI and the final re-submission logic (US2).
3. Test with multi-org credentials using the mocking strategy in `quickstart.md`.
