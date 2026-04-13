# Tasks: Add Authentication and Authorization with JWT

**Input**: Design documents from `/specs/001-user-auth-authz/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create core auth directory in `src/app/core/auth/`
- [X] T002 [P] Define authentication interfaces and types in `src/app/core/auth/auth.types.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Implement `AuthService` for backend communication in `src/app/core/auth/auth.service.ts`
- [X] T004 Implement `AuthStore` using Angular Signals for state management in `src/app/core/auth/auth.store.ts`
- [X] T005 [P] Implement `AuthInterceptor` for JWT injection in `src/app/core/auth/auth.interceptor.ts`
- [X] T006 Register `provideHttpClient` with `AuthInterceptor` in `src/app/app.config.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Secure Login and Session Management (Priority: P1) 🎯 MVP

**Goal**: Allow users to log in with username/password, store JWT, and manage session state.

**Independent Test**: Submit valid credentials to the login form, verify `AuthStore` state is updated, and JWT is in `localStorage`.

### Implementation for User Story 1

- [X] T007 [US1] Implement login logic in `src/app/features/auth/login.component.ts`
- [X] T008 [P] [US1] Refine login template with PrimeNG components in `src/app/features/auth/login.component.html`
- [X] T009 [US1] Register authentication routes in `src/app/app.routes.ts`
- [X] T010 [US1] Implement logout method in `src/app/core/auth/auth.store.ts`

**Checkpoint**: User Story 1 is functional - Login/Logout cycle works.

---

## Phase 4: User Story 2 - Protected and Public Routing (Priority: P1)

**Goal**: Restrict access to private routes for unauthenticated users.

**Independent Test**: Navigate to a protected URL (e.g., `/dashboard`) without a token and verify redirection to `/auth/login`.

### Implementation for User Story 2

- [X] T011 [US2] Implement functional `authGuard` in `src/app/core/auth/auth.guard.ts`
- [X] T012 [US2] Apply `canActivate: [authGuard]` to protected routes in `src/app/app.routes.ts`

**Checkpoint**: User Story 2 is functional - Routing security is enforced.

---

## Phase 5: User Story 3 - Role-Based Access Control (Priority: P2)

**Goal**: Restrict access to specific features/routes based on user roles.

**Independent Test**: Log in with a 'Regular' user and attempt to access an 'Admin' route; verify access is denied.

### Implementation for User Story 3

- [X] T013 [US3] Add `hasRole` helper and `isAdmin` computed signal to `src/app/core/auth/auth.store.ts`
- [X] T014 [US3] Enhance `authGuard` to support role data in `src/app/core/auth/auth.guard.ts`
- [X] T015 [US3] Update `app.routes.ts` to include role requirements for administrative paths

**Checkpoint**: User Story 3 is functional - Role-based access is active.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T016 [P] Implement global 401 error handling in `src/app/core/auth/auth.interceptor.ts`
- [X] T017 Implement automatic session restoration from `localStorage` on app startup in `app.config.ts` or `AppComponent`
- [X] T018 [P] Add visual feedback (loading spinners) to login button in `src/app/features/auth/login.component.html`
- [X] T019 Run validation against `specs/001-user-auth-authz/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Phase 1.
- **User Stories (Phase 3+)**: All depend on Phase 2.
- **Polish (Final Phase)**: Depends on all user stories.

### Parallel Opportunities

- T002 (Types) can be done alongside T001.
- T005 (Interceptor) can be done alongside T003/T004.
- T008 (HTML) can be done alongside T007 (TS).
- T016 and T018 are independent polish tasks.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup and Foundational phases.
2. Complete User Story 1 (Login/Logout).
3. Verify that the JWT is correctly handled and state is updated.

### Incremental Delivery

1. Foundation -> Security infrastructure ready.
2. User Story 1 -> Users can authenticate (MVP).
3. User Story 2 -> Private areas are secure.
4. User Story 3 -> Administrative areas are secure.
