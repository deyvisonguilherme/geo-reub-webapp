# Research: Integrate Nucleus Screen with Backend

## Findings & Decisions

### 1. Repository Implementation
- **Decision**: Update `NucleusRepository` to use `HttpClient` for real API calls to `/nucleos`.
- **Rationale**: Follows the existing Repository pattern used in `ProcessRepository`.
- **Details**:
  - The base URL should be `/nucleos` as requested by the user.
  - Method: `GET`.

### 2. Data Transformation (snake_case vs camelCase)
- **Decision**: Perform mapping in the repository layer using a mapping function or manual assignment.
- **Rationale**: The backend returns `snake_case` (e.g., `situacao_geografica`), but the frontend `NucleusFormModel` and UI templates expect `camelCase` (`situacaoGeografica`).
- **Mapping Plan**:
  - `situacao_geografica` -> `situacaoGeografica`
  - `area_total_m2` -> `areaTotalM2`
  - `perimetro_m` -> `perimetroM`
  - `poligonal_georreferenciada` -> `poligonalGeorreferenciada`
  - `data_ocupacao_inicial` -> `dataOcupacaoInicial`
  - `numero_familias_estimado` -> `numeroFamiliasEstimado`
  - `municipio_id` -> `municipioId`
  - `criado_por` -> `criadoPor`
  - `criado_em` -> `criadoEm`
  - `atualizado_por` -> `atualizadoPor`
  - `atualizado_em` -> `atualizadoEm`

### 3. JWT Authentication
- **Decision**: Rely on the existing `authInterceptor`.
- **Rationale**: `src/app/core/auth/auth.interceptor.ts` already automatically injects the Bearer token from `AuthStore` into all HTTP requests. No manual token handling is needed in the repository.

### 4. State Management
- **Decision**: Use `NucleusStore` (Signal-based) with `AsyncState`.
- **Rationale**: Matches the project's centralized store state pattern (009-centralized-store-state). `NucleusStore` is already partially implemented with this pattern.

### 5. UUID Handling
- **Decision**: Ensure the `id` and other UUID fields are handled as strings in the frontend.
- **Rationale**: Standard practice in TypeScript/Angular for UUIDs.

## Unresolved Questions / Needs Clarification
- None. (The user provided the exact backend structure).

## Alternatives Considered
- **Direct HttpClient in Store**: Rejected. Violates project architecture ("Stores MUST inject Repositories instead of HttpClient").
- **Auto-mapping interceptor**: Considered but rejected for this specific task to avoid global changes that might break other features. Local mapping in the repository is safer and more explicit for now.
