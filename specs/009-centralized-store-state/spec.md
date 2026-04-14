# Feature Specification: Centralize store error and loading states

**Feature Branch**: `009-centralized-store-state`  
**Created**: 2026-04-13  
**Status**: Draft  
**Input**: User description: "Centralização de Erros e \"Loading State\" nas Stores: Padronize um objeto de estado que inclua { data: T, loading: boolean, error: string | null } em todas as stores de features, evitando a criação manual de sinais de carregamento repetitivos."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Standardized Store State (Priority: P1)

As a developer, I want to use a consistent state object `{ data: T, loading: boolean, error: string | null }` across all feature stores so that I can reduce boilerplate code and ensure a predictable pattern for data handling.

**Why this priority**: Essential for codebase maintainability and consistency. It directly addresses the technical debt of repetitive signals.

**Independent Test**: Can be tested by creating a new store using the standardized state and verifying that it correctly handles loading, success, and error transitions with minimal manual signal management.

**Acceptance Scenarios**:

1. **Given** a new feature store, **When** it is initialized, **Then** it should have a single state object containing data, loading, and error fields.
2. **Given** a data fetching operation, **When** it starts, **Then** the `loading` flag should be set to true automatically or via a simple helper.

---

### User Story 2 - Centralized Error Reporting (Priority: P1)

As a developer, I want all stores to expose a standard `error` property so that I can implement a unified UI strategy for showing error messages to users (e.g., using the GlobalFeedbackService).

**Why this priority**: Improves user experience and developer efficiency by standardizing how failures are communicated.

**Independent Test**: Verify that when a store's repository call fails, the `error` property is populated with a meaningful message and the `loading` flag is reset.

**Acceptance Scenarios**:

1. **Given** a failed repository call, **When** the error is caught, **Then** the store's state should reflect the error message and set `loading` to false.

---

### User Story 3 - Boilerplate Reduction (Priority: P2)

As a developer, I want to avoid creating separate signals for `loading` and `error` in every feature store so that my store logic is cleaner and focused only on domain-specific logic.

**Why this priority**: Directly improves developer productivity and code readability.

**Independent Test**: Compare the number of signal declarations before and after refactoring an existing store (e.g., ProcessStore).

**Acceptance Scenarios**:

1. **Given** a refactored store, **When** I check its implementation, **Then** I should find no standalone `loading` or `error` signals.

### Edge Cases

- **Partial updates**: How to handle updating specific parts of the `data` without resetting `loading` or `error` globally if the store manages multiple entities? (Solution: Use nested states or multiple standardized objects if needed).
- **Initial data**: Ensuring the `data` property can have an initial value (like an empty array or null) that matches the domain type.
- **Race conditions**: Ensuring that multiple concurrent requests to the same store correctly manage the `loading` state (last request wins or cumulative loading).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST define a generic `AsyncState<T>` interface in a shared core location.
- **FR-002**: System MUST provide a helper function (e.g., `createInitialAsyncState<T>()`) to initialize the state.
- **FR-003**: All feature stores (Process, Beneficiary, Nucleus, etc.) MUST be refactored to use `AsyncState<T>` for their primary data.
- **FR-004**: System SHOULD provide a utility to update the state from an Observable or Signal result, handling the loading/error transitions automatically.
- **FR-005**: All UI components consuming these stores MUST be updated to read the state from the new structure.

### Key Entities *(include if feature involves data)*

- **AsyncState<T>**: The core state object containing:
  - `data: T | null`: The actual domain data.
  - `loading: boolean`: The loading status.
  - `error: string | null`: The error message if the operation failed.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of feature stores in the application use the `AsyncState` pattern.
- **SC-002**: Total lines of code dedicated to loading/error signals across all stores is reduced by at least 40%.
- **SC-003**: Unit tests for stores can reliably assert on a single state object.

## Assumptions

- **Zoneless compatibility**: The implementation will continue to support Angular 21 Zoneless using Signals.
- **Uniform Error Type**: For now, errors will be represented as strings, but the structure can support more complex `RepositoryError` objects if needed.
- **Existing Repositories**: The feature assumes that repositories are already returning typed data/errors as established in previous refactors.
