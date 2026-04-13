# Implementation Plan: Implement Domain Repositories for HTTP Isolation

**Branch**: `003-domain-repositories` | **Date**: 2026-04-13 | **Spec**: [specs/003-domain-repositories/spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-domain-repositories/spec.md`

## Summary

The goal of this feature is to decouple the state management layer (Signal Stores) from the network communication layer (HttpClient). By introducing a Repository Pattern, we isolate HTTP calls, simplify unit testing through easier mocking, and centralize API interactions within each feature domain (Process, Beneficiary).

## Technical Context

**Language/Version**: TypeScript 5.6+ / Angular 21 (Zoneless)
**Primary Dependencies**: `@angular/common/http`, `rxjs`, `@ngrx/signals`
**Storage**: N/A (Client-side API consumption)
**Testing**: Jasmine / Karma (Standard Angular unit tests)
**Target Platform**: Web (SSR / Universal support required)
**Project Type**: Single Page Application (Angular)
**Performance Goals**: Minimal overhead; no extra change detection cycles (Zoneless compliant)
**Constraints**: Must follow feature-based structure as per `GEMINI.md`.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Feature follows feature-based modularity.
- [x] Uses modern Angular primitives (Signals, inject).
- [x] Standardizes error handling.

## Project Structure

### Documentation (this feature)

```text
specs/003-domain-repositories/
├── plan.md              # This file
├── research.md          # Research on Repository Pattern & Zoneless compatibility
├── data-model.md        # Interface relationships (Store -> Repository -> HttpClient)
├── quickstart.md        # Developer guide for the new pattern
├── contracts/           # Interface definitions for the repositories
│   └── process-repository.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
src/app/features/
├── process/
│   ├── process.repository.ts   # NEW: HTTP isolation for Process domain
│   ├── process.store.ts        # UPDATED: Injects Repository instead of HttpClient
│   └── ...
├── beneficiaries/
│   ├── beneficiaries.repository.ts # NEW: HTTP isolation for Beneficiary domain
│   ├── beneficiaries.store.ts      # UPDATED: Injects Repository instead of HttpClient
│   └── ...
```

**Structure Decision**: Option 1 (Single Project) - Repositories will live within their respective feature folders to maintain high cohesion and encapsulation.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Repository pattern | Improving testability and isolation | Direct HttpClient usage in Stores is difficult to mock and leads to bloated store files. |
