# Data Model: Shared Elements

## UI Component Interfaces

### `ButtonVariant`
Used by `ButtonComponent` to define visual style.
- `primary`: Default action.
- `secondary`: Neutral action.
- `danger`: Destructive action.
- `text`: No background, just text.

### `BadgeConfig`
Used by `StatusBadgeComponent`.
- `label`: Display text.
- `severity`: 'success' | 'warn' | 'info' | 'danger' | 'secondary'.

## ACL Structure

The permissions are expected to be provided by the `AuthStore` in the following format:

```typescript
export interface UserPermissions {
  roles: string[]; // e.g., ['ADMIN', 'TECNICO']
  permissions: string[]; // e.g., ['process:create', 'beneficiary:delete']
}
```

## Pipe Inputs

### `CpfCnpjPipe`
- **Input**: Numeric string (11 or 14 digits).
- **Output**: Formatted string `000.000.000-00` or `00.000.000/0000-00`.

### `AreaPipe`
- **Input**: Number.
- **Output**: Formatted string with `m²` suffix and thousands separator.
