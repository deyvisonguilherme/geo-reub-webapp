# Feature Specification: Implement Domain Repositories for HTTP Isolation

**Feature Branch**: `003-domain-repositories`  
**Created**: 2026-04-13  
**Status**: Draft  
**Input**: User description: "Atualmente, tenho lidando diretamente com o estado, crie repositories ou data-services especializados para cada domínio (ex: ProcessRepository) isolando a lógica de chamadas HTTP, facilitando o mocking em testes e a manutenção caso a API mude."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Refactoring Process Domain for Isolation (Priority: P1)

As a developer, I want to move all HTTP communication logic related to "Processes" into a dedicated `ProcessRepository` so that the `ProcessStore` only manages state and is shielded from API implementation details.

**Why this priority**: This is the core requirement. Isolating the most critical domain (Process) proves the architectural pattern and immediately improves maintainability.

**Independent Test**: Can be tested by verifying that `ProcessStore` no longer imports `HttpClient` and that all data fetching/sending is done via `ProcessRepository` calls.

**Acceptance Scenarios**:

1. **Given** a new `ProcessRepository`, **When** the `ProcessStore` needs to fetch processes, **Then** it calls `processRepository.getAll()` instead of using `HttpClient.get()`.
2. **Given** the `ProcessRepository`, **When** the backend API endpoint for processes changes, **Then** only the repository file needs modification to restore functionality.

---

### User Story 2 - Simplified Unit Testing via Mocking (Priority: P2)

As a developer, I want to write unit tests for the `ProcessStore` by providing a mock implementation of the `ProcessRepository` so that tests are fast, reliable, and don't depend on the Angular HTTP testing infrastructure.

**Why this priority**: One of the main goals of the refactor is to facilitate mocking in tests.

**Independent Test**: Create a spec file for `ProcessStore` that uses a manual mock or spy for `ProcessRepository` and verify state updates without `HttpClientTestingModule`.

**Acceptance Scenarios**:

1. **Given** a unit test for `ProcessStore`, **When** the `ProcessRepository` is mocked to return a fixed list of processes, **Then** the store's state reflects that list immediately upon initialization.

---

### User Story 3 - Pattern Standardization for New Features (Priority: P3)

As a developer, I want to have a clear template and example (via `ProcessRepository`) so that when I create new features like "Documents" or "Legal Analysis", I can implement their data access layer consistently.

**Why this priority**: Ensures long-term project health and team alignment.

**Independent Test**: Create a new repository for a secondary domain (e.g., `BeneficiaryRepository`) following the established pattern and verify it integrates correctly with its respective store.

**Acceptance Scenarios**:

1. **Given** the `ProcessRepository` as a reference, **When** I create a `BeneficiaryRepository`, **Then** it should follow the same interface patterns and dependency injection style.

### Edge Cases

- **How does system handle network errors?**: The Repository should catch HTTP errors and return them in a standardized format or re-throw them so the Store can update the UI error state.
- **What happens when multiple stores need the same data?**: Repositories should remain stateless, allowing multiple consumers (Stores or Components) to call the same methods without side effects.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST isolate all `HttpClient` calls within Domain Repository classes (e.g., `ProcessRepository`).
- **FR-002**: Repositories MUST return typed domain objects or Observables of typed objects, never raw HTTP responses.
- **FR-003**: Stores MUST NOT inject `HttpClient` directly; they MUST use the corresponding Repository.
- **FR-004**: Repositories MUST be registered as injectable services (singleton or feature-scoped).
- **FR-005**: System MUST include a standardized error handling pattern within repositories to ensure consistent failure reporting.

### Key Entities *(include if feature involves data)*

- **ProcessRepository**: A service that encapsulates all CRUD operations for the "Process" domain via HTTP.
- **BeneficiaryRepository**: A service that encapsulates all CRUD operations for the "Beneficiary" domain via HTTP.
- **Domain Model**: The TypeScript interfaces (e.g., `Process`, `Beneficiary`) that define the data structure passed between Repositories and Stores.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of HTTP logic for the `Process` and `Beneficiary` domains is moved from Stores to Repositories.
- **SC-002**: Unit tests for `ProcessStore` can be executed using simple object mocks for the Repository, reducing test setup code by 30%.
- **SC-003**: A new developer can understand where to update an API endpoint in under 5 minutes by looking at the file structure.

## Assumptions

- **Existing Infrastructure**: The project continues to use Angular's `HttpClient` as the underlying transport layer.
- **State Management**: Angular Signals (Store pattern) remains the primary method for UI state management, but now consumes Repositories.
- **Scope**: The initial refactor focuses on the `Process` and `Beneficiary` domains to establish the pattern.
- **Mapping**: Basic data mapping (e.g., date string to Date object) will be handled in the Repository layer if necessary.
