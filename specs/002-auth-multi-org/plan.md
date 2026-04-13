# Implementation Plan: Multiple Organization Authentication

**Branch**: `002-auth-multi-org` | **Date**: 2026-04-10 | **Spec**: [specs/002-auth-multi-org/spec.md](spec.md)
**Input**: Feature specification from `/specs/002-auth-multi-org/spec.md`

## Summary
Implement a multi-step authentication process that handles users associated with multiple organizations. When the backend detects multiple organizations for a user, the frontend will prompt the user to select one before completing the login. This ensures the user session is initialized with the correct organization context and permissions.

## Technical Context

**Language/Version**: TypeScript / Angular 21 (Zoneless)  
**Primary Dependencies**: PrimeNG (Select/Dropdown, Message, Button), RxJS, HttpClient  
**Storage**: localStorage (for final JWT and user profile)  
**Testing**: Jasmine/Karma (unit tests for AuthService, AuthStore, and LoginComponent)  
**Target Platform**: Web Browser (Desktop focus, responsive for mobile)  
**Project Type**: Web Application  
**Performance Goals**: <500ms for organization list retrieval, <2s for total login flow (standard network)  
**Constraints**: Secure re-submission of login request without password re-entry.  
**Scale/Scope**: Support for users with up to 50+ organizations.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] I. Library-First: Not applicable (core feature update).
- [x] II. CLI Interface: Not applicable (web frontend feature).
- [x] III. Test-First: Planned unit tests for new logic.
- [x] IV. Integration Testing: Contract validation with backend.
- [x] V. Observability: Structured logging for auth failures.

## Project Structure

### Documentation (this feature)

```text
specs/002-auth-multi-org/
├── plan.md              # This file
├── research.md          # Research findings and decisions
├── data-model.md        # Data interfaces and state definition
├── quickstart.md        # Testing and verification guide
├── contracts/           # API contract definitions
└── checklists/          # Quality and requirements checklists
```

### Source Code (repository root)

```text
src/app/
├── core/
│   └── auth/
│       ├── auth.service.ts      # Updated for organizacao_id
│       ├── auth.store.ts        # Updated UserProfile
│       └── auth.types.ts        # New Organization and multi-org response types
└── features/
    └── auth/
        ├── login.component.ts   # New state for organization selection
        ├── login.component.html # New template section for selection
        └── login.component.scss # Styling for organization selection view
```

**Structure Decision**: Adaptation of the existing auth feature structure. Logic is kept within `core/auth` and `features/auth` to maintain consistency with the current codebase.

## Complexity Tracking

*No violations identified.*

## Implementation Phases

### Phase 1: Core Types & Service Updates
1.  **Update `auth.types.ts`**: Add `Organization` interface and update `AuthResponse` and `UserProfile`.
2.  **Update `auth.service.ts`**: Add `organizacao_id` to the login request payload.
3.  **Update `auth.store.ts`**: Ensure the store correctly handles the extended `UserProfile`.

### Phase 2: Login Component Enhancement
1.  **State Management**: Add `organizations` signal and `showOrgSelection` boolean signal to `LoginComponent`.
2.  **Error Handling**: Update `onLogin` to catch `MULTIPLE_ORGANIZATIONS` error and update state.
3.  **UI Implementation**: Add organization selection dropdown to `login.component.html`.
4.  **Finalization**: Implement `onConfirmOrganization` to re-trigger login with the selected ID.

### Phase 3: Validation & Testing
1.  **Unit Tests**: Add tests for the new error handling and organization selection logic.
2.  **Manual Verification**: Follow `quickstart.md` cases to verify end-to-end functionality.
