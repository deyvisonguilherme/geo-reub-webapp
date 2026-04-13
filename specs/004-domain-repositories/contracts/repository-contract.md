# Repository Contract: Standard API Interface

## Overview

This contract defines the expected methods and behavior for all domain-specific repositories in the **GeoReubWebapp** project.

## Interface: `IRepository<T>`

| Method | Returns | Description |
|--------|---------|-------------|
| `getAll()` | `Observable<T[]>` | Fetches all records of type `T`. |
| `getById(id: string)` | `Observable<T>` | Fetches a single record by its unique identifier. |
| `create(data: Partial<T>)` | `Observable<T>` | Persists a new record to the backend. |
| `update(id: string, data: Partial<T>)` | `Observable<T>` | Updates an existing record. |
| `delete(id: string)` | `Observable<void>` | Removes a record from the backend. |

## Implementation Rules

1.  **Observables**: Methods MUST return `Observable` from `@angular/common/http`.
2.  **Mapping**: Repositories SHOULD map raw JSON responses to the correct TypeScript interfaces.
3.  **Error Handling**: MUST catch HTTP errors and re-throw them in a standardized way.
