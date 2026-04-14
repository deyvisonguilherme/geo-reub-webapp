# Data Model: Centralized Store State

## Entities

### `AsyncState<T>`
Represents the state of an asynchronous operation in a Store.

| Field | Type | Description |
|-------|------|-------------|
| `data` | `T \| null` | The payload returned by the operation. |
| `loading` | `boolean` | Indicates if an operation is in progress. |
| `error` | `string \| null` | Error message if the operation failed. |
| `lastUpdated` | `string \| undefined` | ISO date string of the last successful update. |

## Utility Functions

### `createInitialAsyncState<T>(initialData?: T)`
Returns an `AsyncState` object with `loading: false` and `error: null`.

### `updateAsyncLoading<T>(state: AsyncState<T>)`
Returns a copy of the state with `loading: true` and `error: null`.

### `updateAsyncSuccess<T>(data: T)`
Returns a new `AsyncState` with the provided data and `loading: false`.

### `updateAsyncError<T>(error: string)`
Returns a new `AsyncState` with the error message and `loading: false`.
