# Data Model: Authentication and Authorization

## Core Entities

### UserProfile
Information about the authenticated user.

| Field | Type | Description |
|---|---|---|
| id | string | Unique identifier |
| username | string | User's handle |
| fullName | string | Full name of the user |
| email | string | Primary email address |
| roles | string[] | Assigned roles (e.g., 'ADMIN', 'USER') |

### AuthSession
In-memory representation of the active session.

| Field | Type | Description |
|---|---|---|
| token | string | JWT Access Token |
| user | UserProfile | The authenticated user |
| authenticated | boolean | Computed state |

## State Management (Signals)

`AuthStore` will expose:
- `user`: `Signal<UserProfile | null>`
- `token`: `Signal<string | null>`
- `isAuthenticated`: `Signal<boolean>`
- `hasRole(role: string)`: Function to check if the user has a specific role.

## State Transitions
- **Login**: Unauthenticated -> Authenticated
- **Logout**: Authenticated -> Unauthenticated
- **Token Expired**: Authenticated -> Unauthenticated (via interceptor or manual check)
