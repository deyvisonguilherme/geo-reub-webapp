# Implementation Plan: Integrate Nucleus Screen with Backend

**Branch**: `010-integrate-nucleus-api` | **Date**: sábado, 25 de abril de 2026 | **Spec**: [specs/010-integrate-nucleus-api/spec.md](spec.md)
**Input**: Feature specification from `/specs/010-integrate-nucleus-api/spec.md`

## Summary
Integrate the existing `NucleusComponent` with the backend endpoint `/nucleos` (GET). The implementation involves updating the `NucleusRepository` to make real HTTP calls, mapping the backend's snake_case response to the frontend's camelCase model, and ensuring the JWT token is included via the existing `authInterceptor`.

## Technical Context

**Language/Version**: TypeScript 5.6+, Angular 21 (Zoneless)  
**Primary Dependencies**: `@angular/common/http`, `@ngrx/signals`, `rxjs`, `primeng`  
**Storage**: Backend API (`/nucleos`)  
**Testing**: Jasmine, Karma  
**Target Platform**: Web (SSR enabled)
**Project Type**: Web Application (Angular)  
**Performance Goals**: Data retrieval < 2s  
**Constraints**: Requires JWT authentication  
**Scale/Scope**: Nucleus management module

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Library-First: Nucleus logic is self-contained in its feature folder.
- [x] Test-First: Planned unit tests for Repository and Store.
- [x] Integration Testing: Contract verification for `/nucleos` endpoint.
- [x] Simplicity: Using existing patterns (Repository, Store, Interceptor).

## Project Structure

### Documentation (this feature)

```text
specs/010-integrate-nucleus-api/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── nucleus-repository.md
└── tasks.md             # Phase 2 output (to be created by /speckit.tasks)
```

### Source Code (repository root)

```text
src/app/
├── core/
│   ├── auth/            # authInterceptor and AuthStore
│   └── feedback/        # GlobalFeedbackService
└── features/
    └── nucleus/
        ├── nucleus.repository.ts # Updated to use HttpClient
        ├── nucleus.store.ts      # Verifies AsyncState handling
        ├── nucleus.types.ts      # Defines NucleoResponse and maps to NucleusFormModel
        └── components/           # UI remains largely unchanged
```

**Structure Decision**: Standard feature-based structure within `src/app/features/nucleus/`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Repository pattern | Project standard | Direct HttpClient in store is less maintainable and harder to test. |
