# Implementation Plan: Add Authentication and Authorization with JWT

**Branch**: `001-user-auth-authz` | **Date**: 2026-04-06 | **Spec**: [specs/001-user-auth-authz/spec.md](spec.md)
**Input**: Feature specification from `/specs/001-user-auth-authz/spec.md`

## Summary
The goal is to implement a robust authentication and authorization system using JWT. This includes a `LoginComponent` for user credentials, an `AuthService` for backend communication, an `AuthStore` using Angular Signals for state management, and functional Guards/Interceptors to secure the application.

## Technical Context

**Language/Version**: TypeScript, Angular 21 (Zoneless)
**Primary Dependencies**: `HttpClient`, `Router`, `Signal`, `PrimeNG 21`
**Storage**: `localStorage` for JWT persistence
**Testing**: Angular Testing Utilities (Standard)
**Target Platform**: Web (Modern Browsers, SSR enabled)
**Project Type**: SPA (Single Page Application)
**Performance Goals**: Login completion < 3s, instantaneous state updates via Signals
**Constraints**: Must handle SSR compatibility (checking for `PLATFORM_ID`)
**Scale/Scope**: Core security module for the entire application

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Follows Signal-based store pattern.
- [x] Adheres to feature-based routing (core auth in `src/app/core/auth/`).
- [x] Uses modern functional guards and interceptors.

## Project Structure

### Documentation (this feature)

```text
specs/001-user-auth-authz/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── auth-service.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
src/app/
├── core/
│   └── auth/
│       ├── auth.service.ts      # API communication
│       ├── auth.store.ts        # Signal-based state
│       ├── auth.guard.ts        # Route protection
│       ├── auth.interceptor.ts  # JWT injection
│       └── auth.types.ts        # Interfaces
├── features/
│   └── auth/
│       ├── login.component.ts   # UI Logic
│       ├── login.component.html # UI Template
│       └── login.component.scss # UI Styles
└── app.config.ts                # Provider registration
```

**Structure Decision**: Option 2 (Web application) style, but adapted to Angular feature structure. Core auth logic in `core/auth` and login UI in `features/auth`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A       | N/A        | N/A                                 |
