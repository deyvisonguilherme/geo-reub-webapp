# Data Model: Repository Layer

## Repository Registry

Repositories are Angular services provided in the root or feature scope.

### Entity Relationships

- **Store**: Depends on **Repository**.
- **Repository**: Depends on **HttpClient**.
- **Component**: Depends on **Store** (never Repository directly).

### State Shape (Implicit in Stores)

Stores using these repositories should adopt a standard state pattern:

```typescript
export interface StoreState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastUpdated?: Date;
}
```

### Mapping Rules

- **Request Mapping**: Convert domain objects (with `Date` objects) to JSON-compatible structures if needed.
- **Response Mapping**: Ensure raw JSON responses are cast to the correct TypeScript interfaces.
