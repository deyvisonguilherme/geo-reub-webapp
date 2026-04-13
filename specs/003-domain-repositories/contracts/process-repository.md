# Process Repository Contract

## Interface: `ProcessRepository`

The `ProcessRepository` is responsible for all HTTP interactions related to the "Process" domain.

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getAll()` | `Observable<Process[]>` | Fetches all processes from the API. |
| `getById(id: string)` | `Observable<Process>` | Fetches a single process by its ID. |
| `create(process: Partial<Process>)` | `Observable<Process>` | Sends a POST request to create a new process. |
| `update(id: string, updates: Partial<Process>)` | `Observable<Process>` | Sends a PATCH request to update an existing process. |
| `delete(id: string)` | `Observable<void>` | Sends a DELETE request to remove a process. |

### Constraints
- Must NOT depend on UI state or Stores.
- MUST handle raw HTTP errors and map them to domain-specific errors if needed.
- MUST use `HttpClient` from `@angular/common/http`.
