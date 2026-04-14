# Implementation Plan: Centralized Global Feedback System

**Branch**: `005-global-feedback-system` | **Date**: 2026-04-13 | **Spec**: [specs/005-global-feedback-system/spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-global-feedback-system/spec.md`

## Summary

This feature implements a centralized Global Feedback System using Angular Signals and PrimeNG. It decouples feature stores and components from UI-specific notification services, allowing for a unified UX across REURB forms and workflows.

## Technical Context

**Language/Version**: TypeScript 5.6+ / Angular 21 (Zoneless)  
**Primary Dependencies**: PrimeNG 21 (`MessageService`, `ConfirmationService`), Angular Signals  
**Storage**: N/A  
**Testing**: Jasmine / Karma (Unit tests for GlobalStore)  
**Target Platform**: Web (SSR / Universal support required)
**Project Type**: Angular Single Page Application
**Performance Goals**: Minimal overhead; reactive notification triggering using Signals.
**Constraints**: Must be compatible with `provideZonelessChangeDetection`.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Decoupling**: Feature stores no longer depend on PrimeNG UI services.
- [x] **Consistency**: Centralized layout ensures uniform placement of feedback components.
- [x] **Modern Primatives**: Uses Signals for state management and `inject()` for DI.

## Project Structure

### Documentation (this feature)

```text
specs/005-global-feedback-system/
├── plan.md              # This file
├── research.md          # Research on Zoneless compatibility and architecture
├── data-model.md        # Notification and Confirmation entities
├── quickstart.md        # Developer guide for store integration
├── contracts/           # GlobalStore interface definition
│   └── global-store.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
src/app/
├── core/
│   └── feedback/
│       └── global-feedback.service.ts  # Centralized store implementation
├── app.component.html                  # Global UI components (p-toast, p-confirmDialog)
└── app.config.ts                       # Service provider registration
```

**Structure Decision**: Repositories/Services related to global infrastructure are placed in `src/app/core/` to ensure singleton availability.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Centralized Store | To avoid multiple service injections | Direct injection leads to boilerplate and makes stores dependent on UI library. |
