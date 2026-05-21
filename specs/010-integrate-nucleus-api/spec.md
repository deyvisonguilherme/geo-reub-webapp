# Feature Specification: Integrate Nucleus Screen with Backend

**Feature Branch**: `010-integrate-nucleus-api`  
**Created**: sábado, 25 de abril de 2026  
**Status**: Draft  
**Input**: User description: "Integre a tela @src/app/features/nucleus/nucleus.component.html ao backend pelo endpoint /nucleos via método get sabendo que é necessário passar o token jwt"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Nuclei List (Priority: P1)

As an administrator, I want to see a list of urban nuclei on the screen so that I can manage land regularization processes.

**Why this priority**: Core functionality of the screen; without data, the screen is unusable.

**Independent Test**: Can be tested by navigating to the "Núcleos Urbanos" page. If data is displayed in the table, it delivers value.

**Acceptance Scenarios**:

1. **Given** the user is authenticated and on the "Núcleos Urbanos" page, **When** the component initializes, **Then** a GET request is sent to `/nucleos` with the JWT token.
2. **Given** a successful response from `/nucleos`, **When** the data arrives, **Then** the table is populated with the nuclei records.

---

### User Story 2 - Authenticated Data Retrieval (Priority: P1)

As a security-conscious user, I want the system to ensure that only authorized personnel can access nuclei data.

**Why this priority**: Security requirement to protect sensitive land regularization data.

**Independent Test**: Can be tested by attempting to access the endpoint without a token (should fail) and with a valid token (should succeed).

**Acceptance Scenarios**:

1. **Given** an unauthenticated user, **When** they attempt to access the nuclei page, **Then** the request to `/nucleos` should fail with a 401 Unauthorized error.
2. **Given** an authenticated user, **When** they access the page, **Then** the `Authorization: Bearer <token>` header is included in the GET request.

---

### User Story 3 - Error Feedback (Priority: P2)

As a user, I want to be informed if the system fails to load the data so that I know there is a problem.

**Why this priority**: Important for user experience and troubleshooting.

**Independent Test**: Can be tested by simulating a network failure or a 500 error from the backend.

**Acceptance Scenarios**:

1. **Given** the backend is unavailable, **When** the page is loaded, **Then** an error message is displayed to the user.

---

### Edge Cases

- **Empty List**: How does the system handle a successful response with an empty list? (UI should show "Nenhum núcleo urbano encontrado").
- **Token Expiry**: How does the system handle the scenario where the JWT token expires during the request? (Should redirect to login or show auth error).
- **Network Latency**: How does the system handle slow responses? (Should show a loading indicator).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST fetch Nucleus data from the `/nucleos` endpoint using a GET method.
- **FR-002**: System MUST include the user's JWT token in the `Authorization` header of the request.
- **FR-003**: System MUST populate the `filteredNuclei` signal/property in `NucleusComponent` with the retrieved data.
- **FR-004**: System MUST display a loading state while the request is in progress.
- **FR-005**: System MUST handle 401 Unauthorized responses by notifying the user or triggering a re-authentication flow.

### Key Entities *(include if feature involves data)*

- **Nucleus**: Represents an informal urban settlement.
  - Attributes:
    - `id`: Unique identifier (UUID).
    - `codigo`: Technical code or identifier.
    - `nome`: Name of the nucleus.
    - `descricao`: Detailed description (optional).
    - `situacao_geografica`: Current geographical/legal situation (optional).
    - `area_total_m2`: Total area in square meters (optional).
    - `perimetro_m`: Total perimeter in meters (optional).
    - `poligonal_georreferenciada`: Georeferenced coordinates/polygon (optional).
    - `centroide`: Central coordinate (optional).
    - `consolidado`: Boolean flag indicating if the settlement is consolidated.
    - `data_ocupacao_inicial`: Date of initial occupation (optional).
    - `numero_familias_estimado`: Estimated number of families (optional).
    - `municipio_id`: Reference to the municipality (optional).
    - `criado_por`: UUID of the creator.
    - `criado_em`: Timestamp of creation.
    - `atualizado_por`: UUID of the last user to update (optional).
    - `atualizado_em`: Timestamp of last update (optional).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Nuclei data is displayed in the table within 2 seconds under normal network conditions.
- **SC-002**: 100% of data requests to `/nucleos` include the `Authorization` header.
- **SC-003**: Users receive feedback (loading indicator or error message) for every data fetch attempt.

## Assumptions

- A `NucleusRepository` or similar service will be used to encapsulate the HTTP logic.
- The `AuthStore` or a similar service already manages the JWT token.
- The backend endpoint `/nucleos` is ready and follows the expected contract (returning an array of nuclei).
- The existing `Nucleus` type in the frontend matches the backend response structure.
