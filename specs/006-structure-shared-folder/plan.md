# Implementation Plan: Structure Shared folder with UI components, pipes and directives

**Branch**: `006-structure-shared-folder` | **Date**: 2026-04-13 | **Spec**: [specs/006-structure-shared-folder/spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-structure-shared-folder/spec.md`

## Summary

The objective of this feature is to transform the `src/app/shared` directory into a robust library of reusable UI components, pipes, and directives. This will ensure visual consistency across the REURB management system, centralize technical data formatting (CPF/CNPJ, areas), and provide a declarative way to handle ACL and input masking in a Zoneless Angular 21 environment.

## Technical Context

**Language/Version**: TypeScript 5.x / Angular 21 (Zoneless)  
**Primary Dependencies**: PrimeNG 21, Tailwind CSS 4, Angular Signals  
**Storage**: N/A  
**Testing**: Jasmine / Karma (Unit tests for Pipes and Directives)  
**Target Platform**: Web (Modern Browsers)
**Project Type**: UI Library / Shared Utilities
**Performance Goals**: Zero unnecessary change detection cycles; lightweight standalone components.
**Constraints**: MUST follow the styling guidelines from `GEMINI.md`.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Standalone First**: All elements are standalone components/pipes/directives.
- [x] **Zoneless Compatible**: Leverage Signals for reactivity.
- [x] **Design Consistency**: Wrap PrimeNG components to enforce project styles.

## Project Structure

### Documentation (this feature)

```text
specs/006-structure-shared-folder/
├── plan.md              # This file
├── research.md          # Standalone strategy and ACL implementation
├── data-model.md        # Component interfaces and ACL types
├── quickstart.md        # Usage examples for developers
├── contracts/           # Component and Directive specs
│   ├── button-contract.md
│   └── permission-directive-contract.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
src/app/shared/
├── ui/
│   ├── button/
│   │   ├── button.component.ts
│   │   └── button.component.scss
│   └── badge/
│       ├── status-badge.component.ts
│       └── status-badge.component.scss
├── pipes/
│   ├── cpf-cnpj.pipe.ts
│   ├── area.pipe.ts
│   └── process-status.pipe.ts
└── directives/
    ├── mask.directive.ts
    └── has-permission.directive.ts
```

**Structure Decision**: Option 1: Single project. Elements are organized by type (ui, pipes, directives) within the `shared` folder to maintain clear separation of concerns.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Custom ACL Directive | Reactive UI based on AuthStore | Standard *ngIf is repetitive and prone to logic errors across many files. |
| PrimeNG Wrapper | Standardized styling | Direct PrimeNG usage doesn't enforce the specific project design system (colors, spacing). |
