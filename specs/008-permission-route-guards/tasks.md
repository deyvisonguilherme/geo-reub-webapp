# Tasks: Implement Permission-based Route Guards

**Input**: Design documents from `/specs/008-permission-route-guards/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Unit tests for the functional guard are included to ensure correct authorization logic.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare the project for the new guard.

- [x] T001 Verify project structure in `src/app/core/auth/`
- [x] T002 Review existing `auth.guard.ts` for consistency in `src/app/core/auth/auth.guard.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core implementation of the functional guard.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T003 Create functional `permissionGuard` in `src/app/core/auth/permission.guard.ts`
- [x] T004 Implement metadata extraction logic (roles/permissions) in `src/app/core/auth/permission.guard.ts`
- [x] T005 Implement authorization check logic (integrating with `AuthStore`) in `src/app/core/auth/permission.guard.ts`
- [x] T006 [P] Implement unit tests for basic authorization logic in `src/app/core/auth/permission.guard.spec.ts`

**Checkpoint**: Foundation ready - the guard can now be applied to routes.

---

## Phase 3: User Story 1 - Role-based Access Control (Priority: P1) 🎯 MVP

**Goal**: Restrict access to sensitive modules based on user roles.

**Independent Test**: Configure a route with a required role, attempt access with an unauthorized role, and verify blockage.

### Implementation for User Story 1

- [x] T007 [P] [US1] Define protected routes for Configuration/Approval in `src/app/app.routes.ts`
- [x] T008 [US1] Apply `permissionGuard` to the 'Settings' route with `data: { roles: ['ADMIN'] }` in `src/app/app.routes.ts`
- [x] T009 [US1] Verify redirection logic when a non-ADMIN user tries to access Settings

**Checkpoint**: User Story 1 complete - Role-based protection is active for high-level modules.

---

## Phase 4: User Story 2 - Granular Permission Checks (Priority: P2)

**Goal**: Support specific permission claims for more control.

**Independent Test**: Set a route to require a specific permission string and verify the guard correctly evaluates it against the user's claims.

### Implementation for User Story 2

- [x] T010 [US2] Enhance `permissionGuard` to handle `permissions` array from metadata in `src/app/core/auth/permission.guard.ts`
- [x] T011 [US2] Add unit tests for granular permission checks in `src/app/core/auth/permission.guard.spec.ts`
- [x] T012 [US2] Apply a permission-specific check to a nested route in `src/app/app.routes.ts`

**Checkpoint**: User Story 2 complete - Granular claims are now supported.

---

## Phase 5: User Story 3 - Graceful Redirection (Priority: P3)

**Goal**: Inform the user when access is denied.

**Independent Test**: Attempt unauthorized access and verify the global error notification appears.

### Implementation for User Story 3

- [x] T013 [US3] Integrate `GlobalFeedbackService` into the `permissionGuard` denial path in `src/app/core/auth/permission.guard.ts`
- [x] T014 [US3] Implement notification message "Você não tem permissão para acessar esta área" in the guard
- [x] T015 [US3] Verify redirection to `/dashboard` with toast visible

**Checkpoint**: User Story 3 complete - Access denial provides a clear UX feedback.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final touches and global verification.

- [x] T016 [P] Update `GEMINI.md` with instructions on how to protect new routes
- [x] T017 [P] Update `specs/008-permission-route-guards/quickstart.md` with final API details
- [x] T018 Run all project tests to ensure no regressions in routing

---

## Dependencies & Execution Order

...
