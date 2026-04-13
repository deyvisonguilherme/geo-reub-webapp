# Research: Domain Repositories for HTTP Isolation

## Decision: Repository Pattern Implementation in Angular 21 (Zoneless)

**Decision**: Implement a Repository Layer within each feature directory (e.g., `src/app/features/process/process.repository.ts`).

**Rationale**: 
- **Zoneless Alignment**: Since the project uses Angular 21 with Zoneless change detection (`provideZonelessChangeDetection`), repositories will return Observables (from `HttpClient`) which are easily converted to Signals in the Store using `toSignal` or handled via `effect` and `computed`.
- **Feature-Based Routing**: Keeping repositories within feature folders maintains the "Feature-Based Routing" and "Feature Modules" conventions specified in `GEMINI.md`.
- **Testing**: Using specialized repository classes allows for simple object mocking in store unit tests, fulfilling the P2 user story.

**Alternatives considered**:
- **Services only**: Direct `HttpClient` usage in stores (current state). *Evaluation*: Makes stores complex and difficult to unit test without `HttpClientTestingModule`.
- **Global Data Access Layer**: A single `services/` folder for all API calls. *Evaluation*: Breaks the feature-encapsulation principle of the project.

---

## Decision: Error Handling Strategy

**Decision**: Repositories will use a standardized `Result<T>` or `AsyncState<T>` wrapper or re-throw typed errors.

**Rationale**: 
- Stores (Signals) need to know about loading, success, and error states. 
- Repositories will return `Observable<T>`, and the Store will handle the state transition (e.g., updating a signal `{ data, loading, error }`).

**Alternatives considered**:
- **Direct catch in Store**: *Evaluation*: Leads to duplicated error handling logic across multiple stores.

---

## Decision: Repository Structure

**Decision**: 
- Repositories will be provided in the root (`providedIn: 'root'`) for singleton domains or feature-scoped if they depend on local state.
- Methods will be named after business actions (e.g., `getOpenProcesses()`, `submitAnalysis()`) rather than generic CRUD (e.g., `get(id)`), although basic CRUD is acceptable for simple entities.

**Rationale**: Improves code readability and intent alignment with the business domain (REURB).
