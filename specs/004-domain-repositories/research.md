# Research: Domain Repositories Refactor

## Decision: Repository Location

**Decision**: Repositories will be located within their respective feature folders (e.g., `src/app/features/process/process.repository.ts`).

**Rationale**: Aligns with the project's "Feature-Based Routing" and "Feature Module" conventions mentioned in `GEMINI.md`. This ensures high cohesion within features. Global repositories (like Auth) will remain in `src/app/core/auth`.

**Alternatives considered**: 
- `src/app/core/repositories`: Rejected to avoid a bloated core directory and maintain feature encapsulation.

---

## Decision: Error Handling Pattern

**Decision**: Repositories will return `Observable<T>` (standard for `HttpClient`) but the mapping to Signal states (loading, error, data) will be handled in the Stores. We will use a standardized `Result<T>` wrapper or typed errors for consistency.

**Rationale**: Maintains compatibility with Angular's `HttpClient` while allowing Stores to manage the UI state via Signals.

---

## Decision: Mocking Strategy

**Decision**: Use manual class-based mocks or `jasmine.SpyObj` in unit tests. 

**Rationale**: Simple, standard, and highly effective for isolating stores from network concerns.

---

## Decision: Dependency Injection

**Decision**: Repositories will be marked with `@Injectable({ providedIn: 'root' })` or provided at the feature level if necessary.

**Rationale**: Standard Angular pattern for singleton services.
