# Feature Specification: Implement Skeleton Screens for SSR

**Feature Branch**: `007-ssr-skeleton-screens`  
**Created**: 2026-04-13  
**Status**: Draft  
**Input**: User description: "Implementação de \"Skeleton Screens\" para SSR: Como utilizo SSR, o \"layout shift\" durante a hidratação pode ser um problema. Crie componentes de skeleton que espelham o layout de cartões de estatísticas e tabelas de processos melhorando a percepção de performance (LCP)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Statistics Cards Skeleton (Priority: P1)

As a user accessing the GeoReub dashboard, I want to see placeholder skeletons for the statistics cards while the data is being hydrated from the server, so that the layout remains stable and I don't experience frustrating shifts once the numbers appear.

**Why this priority**: Statistics cards are at the top of the dashboard and contribute significantly to initial visual stability and LCP.

**Independent Test**: Can be tested by throttling the network or delaying the data signal in the DashboardStore and verifying that placeholders perfectly match the final card dimensions.

**Acceptance Scenarios**:

1. **Given** the dashboard is loading, **When** the statistics cards are not yet hydrated, **Then** a skeleton component mirroring the card's shape and icon placement should be visible.
2. **Given** the skeleton is visible, **When** the data arrives, **Then** the transition from skeleton to actual content should happen with zero pixel-level layout shift.

---

### User Story 2 - Process Table Skeleton (Priority: P2)

As a user viewing the list of REURB processes, I want to see a skeleton representation of the table rows while the list is being fetched, so that I can understand the page structure immediately and the table doesn't "jump" into view.

**Why this priority**: The process table is the primary data display area. Skeletons here improve perceived performance during navigation.

**Independent Test**: Verify that the table skeleton displays a configurable number of rows (e.g., 5 or 10) that match the column widths of the actual process table.

**Acceptance Scenarios**:

1. **Given** the process list page is requested, **When** the server-side hydration or client-side fetch is in progress, **Then** a table skeleton with shimmering rows should be displayed.
2. **Given** the table skeleton is active, **When** data is loaded, **Then** the rows should be replaced by actual data without changing the table's overall height or width.

---

### User Story 3 - Shimmer Animation for Perceived Speed (Priority: P3)

As a user, I want the skeleton components to have a subtle "shimmer" animation so that I know the application is active and data is being processed, rather than being frozen.

**Why this priority**: Enhances UX by providing visual feedback that the "loading" state is dynamic.

**Independent Test**: Visual inspection of the skeleton components to ensure the animation is smooth and consistent across different components.

**Acceptance Scenarios**:

1. **Given** any skeleton component is rendered, **When** visible on screen, **Then** it must display a left-to-right shimmering gradient animation.

### Edge Cases

- **Empty States**: If no data is returned, the system should transition from the skeleton to the existing `.empty-state` layout without a layout jump.
- **Different Screen Sizes**: Skeletons must be responsive and mirror the grid/flex behavior of the actual components at all breakpoints (mobile, tablet, desktop).
- **Fast Connections**: If data loads nearly instantly, the skeleton should either not flicker or have a minimal display time to avoid visual noise.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a standalone `StatisticCardSkeletonComponent`.
- **FR-002**: System MUST provide a standalone `TableSkeletonComponent` with configurable row count.
- **FR-003**: Skeletons MUST exactly match the CSS grid/flex properties of the target components (`.stat-card` and `.table-card` defined in `GEMINI.md`).
- **FR-004**: System MUST implement a reusable "shimmer" CSS animation for all skeleton components.
- **FR-005**: Skeletons MUST be compatible with Angular SSR (Server-Side Rendering) and avoid using `window` or `document` directly without `isPlatformBrowser` checks.
- **FR-006**: The statistic card skeleton MUST mirror the `icon-wrapper` and hierarchical text layout (label and value).

### Key Entities *(include if feature involves data)*

- **Skeleton Placeholder**: A visual-only component with no business logic, used to represent loading state.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Layout shift (Cumulative Layout Shift - CLS) related to statistics and table rendering is reduced to < 0.1 during hydration.
- **SC-002**: Perceived performance improvement: users can see the structure of the page within 500ms of navigation.
- **SC-003**: 100% of skeletons match the final component dimensions within a 2px margin of error.

## Assumptions

- **PrimeNG Usage**: We may use PrimeNG's `p-skeleton` as a base primitive to accelerate development while applying custom styles to match our design system.
- **Zoneless Hydration**: The skeletons will work correctly within the `provideZonelessChangeDetection` environment of the project.
- **Style Overrides**: Custom SCSS will be used to ensure the skeletons match the specific `.stat-card` and `.table-card` layouts mentioned in the project instructions.
