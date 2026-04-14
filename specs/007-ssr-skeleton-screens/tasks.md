# Tasks: Implement Skeleton Screens for SSR

**Input**: Design documents from `/specs/007-ssr-skeleton-screens/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Tests**: Unit tests for components to ensure correct rendering of placeholders.

**Organization**: Tasks are grouped by component and user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and animation styles

- [X] T001 Create component directories: `src/app/shared/ui/skeletons/statistic-card-skeleton/` and `src/app/shared/ui/skeletons/table-skeleton/`
- [X] T002 Implement global shimmer animation in `src/assets/layout/_utils.scss` (or equivalent global SCSS)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Define common skeleton behaviors

- [X] T003 Ensure `p-skeleton` is available via PrimeNG in `app.config.ts` or standalone imports
- [ ] T004 Define shared skeleton styles in `src/app/shared/ui/skeletons/skeleton-shared.scss`

**Checkpoint**: Foundation ready - component implementation can now begin

---

## Phase 3: User Story 1 - Statistics Cards Skeleton (Priority: P1) 🎯 MVP

**Goal**: Mirror the dashboard stats grid loading state

**Independent Test**: Render `<app-statistic-card-skeleton />` and verify it matches the grid layout of real stat cards.

### Implementation for User Story 1

- [X] T005 [P] [US1] Create standalone component `src/app/shared/ui/skeletons/statistic-card-skeleton/statistic-card-skeleton.component.ts`
- [X] T006 [P] [US1] Implement template with `p-skeleton` items mirroring `icon-wrapper` and text in `src/app/shared/ui/skeletons/statistic-card-skeleton/statistic-card-skeleton.component.html`
- [X] T007 [US1] Define CSS grid layout in `src/app/shared/ui/skeletons/statistic-card-skeleton/statistic-card-skeleton.component.scss` to match `.stats-grid`
- [X] T008 [US1] Integrate skeleton into `src/app/features/dashboard/dashboard.component.html` using the store's loading signal

**Checkpoint**: US1 complete - Dashboard structure remains stable during loading

---

## Phase 4: User Story 2 - Process Table Skeleton (Priority: P2)

**Goal**: Mirror the PrimeNG table loading state

**Independent Test**: Render `<app-table-skeleton [rows]="5" />` and verify it matches the process table column distribution.

### Implementation for User Story 2

- [X] T009 [P] [US2] Create standalone component `src/app/shared/ui/skeletons/table-skeleton/table-skeleton.component.ts`
- [X] T010 [P] [US2] Implement template with iterative rows mirroring table columns in `src/app/shared/ui/skeletons/table-skeleton/table-skeleton.component.html`
- [X] T011 [US2] Define table-specific styles in `src/app/shared/ui/skeletons/table-skeleton/table-skeleton.component.scss` to match `.table-card`
- [X] T012 [US2] Integrate skeleton into `src/app/features/process/process.component.html` using the store's loading signal

**Checkpoint**: US2 complete - Process list transition is smooth and jump-free

---

## Phase 5: User Story 3 - Shimmer Animation (Priority: P3)

**Goal**: Visual feedback polish

**Independent Test**: Verify shimmer animation is active on all skeleton elements across statistics and tables.

### Implementation for User Story 3

- [X] T013 [P] [US3] Refine CSS gradients for the global shimmer effect in `src/assets/layout/_utils.scss`
- [X] T014 [US3] Apply animation classes to all `p-skeleton` instances in both components

**Checkpoint**: US3 complete - UI feels "alive" during loading

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and documentation

- [ ] T015 [P] Update `GEMINI.md` Design System section with Skeleton pattern instructions
- [ ] T016 Verify responsiveness of all skeletons on mobile breakpoints
- [ ] T017 Audit CLS (Cumulative Layout Shift) in browser dev tools during simulated loading
- [X] T018 [P] Update `specs/007-ssr-skeleton-screens/quickstart.md` with final API details

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on T001.
- **User Stories (Phase 3 & 4)**: Depend on Phase 2 completion. US1 and US2 can run in parallel.
- **Polish (Final Phase)**: After all user stories are implemented.

### Parallel Opportunities

- T005 and T009 (Component boilerplate) can be created in parallel.
- T006 and T010 (HTML templates) can be worked on simultaneously.
- Documentation tasks (T015, T018) can run alongside implementation.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup & Foundation.
2. Implement Statistic Card Skeleton.
3. Integrate into Dashboard.
4. Verify visual stability.

### Incremental Delivery

1. Dashboard Stats (MVP) -> Immediate visual impact on entry.
2. Process Table -> Core data management stability.
3. Shimmer Polish -> UX refinement.
4. Scale -> The pattern can be extended to other feature tables easily.
