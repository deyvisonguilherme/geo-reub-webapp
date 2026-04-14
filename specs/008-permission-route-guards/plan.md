# Implementation Plan: Implement Permission-based Route Guards

**Branch**: `008-permission-route-guards` | **Date**: 2026-04-13 | **Spec**: [specs/008-permission-route-guards/spec.md](./spec.md)
**Input**: Feature specification from `/specs/008-permission-route-guards/spec.md`

## Summary

The goal of this feature is to implement a functional route guard (`permission.guard.ts`) that enforces role and claim-based access control. This will ensure that sensitive modules like configuration and approval are only accessible by users with the appropriate REURB roles (Technical, Legal, Administrative).

## Technical Context

**Language/Version**: TypeScript 5.6+ / Angular 21 (Zoneless)  
**Primary Dependencies**: `@angular/router`, `AuthStore`, `GlobalFeedbackService`  
**Storage**: N/A  
**Testing**: Jasmine / Karma (Unit tests for the functional guard)  
**Target Platform**: Web (Modern Browsers)  
**Project Type**: Angular Web Application  
**Performance Goals**: Guard execution < 50ms per navigation.  
**Constraints**: Must use functional guard pattern and satisfy Zoneless requirements.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Uses modern functional guards instead of legacy classes.
- [x] Integrates with existing state management (AuthStore).
- [x] Provides user-friendly feedback via GlobalFeedbackService.

## Project Structure

### Documentation (this feature)

```text
specs/008-permission-route-guards/
├── plan.md              # This file
├── research.md          # Functional guard and metadata research
├── data-model.md        # Route metadata interface
├── quickstart.md        # Developer guide for guard usage
├── contracts/           # PermissionGuard logic specification
│   └── permission-guard.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
src/app/core/auth/
├── permission.guard.ts       # NEW: Permission-based functional guard
└── permission.guard.spec.ts  # NEW: Unit tests for the guard
src/app/
└── app.routes.ts             # UPDATED: Add guards to protected routes
```

**Structure Decision**: Option 1: Single project. The guard is added to `src/app/core/auth/` alongside existing authentication logic to maintain high cohesion.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Functional Guard Pattern | Industry standard for Angular 15+ | Class-based guards are deprecated and less idiomatic in modern Angular. |
