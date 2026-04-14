# Research: Centralized Store State

## Decision: Standard State Object (AsyncState)

**Decision**: All feature stores will use the `AsyncState<T>` interface already defined in `src/app/core/models/repository.types.ts`.

**Rationale**: 
- **Consistency**: Reuses existing types instead of introducing new ones.
- **Simplicity**: Provides a unified structure (`data`, `loading`, `error`) that covers 90% of feature requirements.
- **Boilerplate Reduction**: Eliminates the need for multiple signals (`isLoading`, `isError`, `data`).

**Alternatives considered**: 
- **Standalone Signals**: (Current approach in some stores). *Rejected* because it's repetitive and harder to maintain as the project grows.
- **Custom Reusable SignalStore Feature**: *Rejected* for now to keep implementation simple and direct, but could be an evolution in the future.

---

## Decision: Helper for State Updates

**Decision**: Create a utility function `tapAsyncState` or similar to handle state transitions within RxJS pipe flows in the Store.

**Rationale**: Automates the `loading = true` -> `loading = false` and `error = message` logic, ensuring developers don't forget to reset flags.

---

## Decision: Error Handling

**Decision**: The `error` property will store the `message` from the `RepositoryError` object.

**Rationale**: Provides a user-friendly string that can be directly rendered in templates or passed to toast notifications.
