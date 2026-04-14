# Tasks: Structure Shared folder with UI components, pipes and directives

**Input**: Design documents from `/specs/006-structure-shared-folder/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: No specific test requirement was requested in the spec, but unit tests for pipes and directives are standard.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and folder structure

- [X] T001 Create shared folder structure: `src/app/shared/ui/`, `src/app/shared/pipes/`, `src/app/shared/directives/`
- [X] T002 Define shared interfaces and types in `src/app/shared/models/shared.types.ts` (BadgeConfig, ButtonVariant, UserPermissions)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared utilities that all stories might depend on

- [X] T003 [P] Create base CSS styles for shared components in `src/app/shared/ui/shared-styles/shared-ui.scss`
- [X] T004 Identify and document existing PrimeNG components to be wrapped

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Reusable UI Elements (Priority: P1) 🎯 MVP

**Goal**: Standardized buttons and badges

**Independent Test**: Use `<app-button>` and `<app-status-badge>` in a feature component and verify design system compliance.

### Implementation for User Story 1

- [X] T005 [P] [US1] Create standalone `ButtonComponent` in `src/app/shared/ui/button/button.component.ts`
- [X] T006 [P] [US1] Create standalone `StatusBadgeComponent` in `src/app/shared/ui/badge/status-badge.component.ts`
- [X] T007 [US1] Implement button variants (primary, secondary, danger) using Tailwind and PrimeNG
- [X] T008 [US1] Implement badge color-coding for REURB-S/E and process status
- [X] T009 [US1] Replace hardcoded buttons in `src/app/features/process/process.component.html` with `<app-button>`

**Checkpoint**: US1 complete - buttons and badges are reusable

---

## Phase 4: User Story 2 - Automated Data Formatting (Priority: P2)

**Goal**: Technical data formatting pipes

**Independent Test**: Pass numeric strings to `cpfCnpj` pipe and verify formatted output in template.

### Implementation for User Story 2

- [X] T010 [P] [US2] Create standalone `CpfCnpjPipe` in `src/app/shared/pipes/cpf-cnpj.pipe.ts`
- [X] T011 [P] [US2] Create standalone `AreaPipe` in `src/app/shared/pipes/area.pipe.ts`
- [X] T012 [P] [US2] Create standalone `ProcessStatusPipe` in `src/app/shared/pipes/process-status.pipe.ts`
- [X] T013 [US2] Implement formatting logic for CPF (11 digits) and CNPJ (14 digits)
- [X] T014 [US2] Implement area formatting with `m²` suffix and pt-BR numeric formatting
- [X] T015 [US2] Apply `cpfCnpj` pipe in `src/app/features/beneficiaries/beneficiaries.component.html`

**Checkpoint**: US2 complete - data formatting is centralized

---

## Phase 5: User Story 3 - Input Control and Security (Priority: P3)

**Goal**: Directives for masking and ACL

**Independent Test**: Apply `*hasPermission` to an element and verify visibility matches current user role.

### Implementation for User Story 3

- [X] T016 [P] [US3] Create standalone `HasPermissionDirective` in `src/app/shared/directives/has-permission.directive.ts`
- [X] T017 [P] [US3] Create standalone `MaskDirective` in `src/app/shared/directives/mask.directive.ts`
- [X] T018 [US3] Implement ACL logic injecting `AuthStore` and using Signals
- [X] T019 [US3] Implement regex-based masking for CPF/CNPJ technical inputs
- [X] T020 [US3] Apply `hasPermission` directive to sensitive actions in `src/app/features/process/process.component.html`

**Checkpoint**: US3 complete - security and input quality improved

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final touches and global verification

- [ ] T021 [P] Update `GEMINI.md` with usage instructions for shared components
- [ ] T022 Audit application for any remaining hardcoded styles that should use shared elements
- [ ] T023 Run project build and verify no standalone import conflicts
- [X] T024 [P] Update `specs/006-structure-shared-folder/quickstart.md` with final API details

---

## Dependencies & Execution Order

...
