# Tasks: Integrate Nucleus Screen with Backend

**Feature**: Integrate Nucleus screen with `/nucleos` endpoint
**Status**: Ready for implementation
**Priority**: P1 (Core Integration)

## Implementation Strategy

We will follow an incremental approach:
1.  **Foundational**: Update types and repository to handle backend response format and HTTP calls.
2.  **MVP (US1 & US2)**: Integrate the repository into the store and verify authenticated data retrieval.
3.  **UX & Resilience (US3)**: Ensure error feedback and edge cases (empty states) are handled correctly.

## Phase 1: Setup & Types
Goal: Prepare data models for backend communication.

- [x] T001 Define `NucleoResponse` interface in `src/app/features/nucleus/nucleus.types.ts`
- [x] T002 Ensure `NucleusFormModel` in `src/app/features/nucleus/nucleus.types.ts` covers all required fields for mapping

## Phase 2: Foundational (Repository)
Goal: Replace mock logic with real HTTP calls.

- [x] T003 Update `NucleusRepository` base URL to `/nucleos` in `src/app/features/nucleus/nucleus.repository.ts`
- [x] T004 Implement mapping logic from `NucleoResponse` to `NucleusFormModel` in `src/app/features/nucleus/nucleus.repository.ts`
- [x] T005 Update `getAll()` to use `HttpClient.get<NucleoResponse[]>` in `src/app/features/nucleus/nucleus.repository.ts`
- [x] T006 [P] Update `getById()`, `create()`, `update()`, and `delete()` to use real HTTP methods in `src/app/features/nucleus/nucleus.repository.ts`

## Phase 3: User Story 1 & 2 - View List & Authentication (Priority: P1)
Goal: Display real data from the authenticated endpoint.

**Independent Test**: Navigate to the Nucleus page. Verify in the Network tab that a GET request to `/nucleos` is sent with the `Authorization` header and the table is populated.

- [x] T007 [US1] [US2] Verify `NucleusStore` in `src/app/features/nucleus/nucleus.store.ts` correctly calls `repository.getAll()`
- [x] T008 [US1] [US2] Ensure `AsyncState` is properly updated on success in `src/app/features/nucleus/nucleus.store.ts`
- [x] T009 [US1] [US2] Verify table rendering in `src/app/features/nucleus/nucleus.component.html` with real backend data

## Phase 4: User Story 3 - Error Feedback (Priority: P2)
Goal: Handle API failures gracefully.

**Independent Test**: Simulate a 500 error from `/nucleos` and verify that a notification toast appears and the table shows the empty message.

- [x] T010 [US3] Ensure `NucleusStore` catches HTTP errors and notifies `GlobalFeedbackService` in `src/app/features/nucleus/nucleus.store.ts`
- [x] T011 [US3] Verify `emptymessage` template in `src/app/features/nucleus/nucleus.component.html` displays when data is null/empty

## Phase 5: Polish & Validation
Goal: Final checks and cleanup.

- [x] T012 Remove `seedData` and unused mock logic from `src/app/features/nucleus/nucleus.repository.ts`
- [x] T013 Verify zoneless change detection performance during data load in `NucleusComponent`
- [x] T014 [P] Update unit tests in `src/app/features/nucleus/nucleus.repository.spec.ts` (if exists) or verify mock repository matches new interface

## Dependencies

- All US tasks depend on Phase 2 (Repository implementation).
- Phase 4 depends on Phase 3 (Store integration).

## Parallel Execution Examples

- T006 can be done in parallel with UI-only tweaks.
- T014 can be started once the repository interface is stable.
