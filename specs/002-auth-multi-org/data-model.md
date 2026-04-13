# Data Model: Multiple Organization Authentication

## UserProfile (Extended)
Information about the authenticated user, now including their organization context.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique user ID |
| username | string | Unique username |
| fullName | string | Full name of the user |
| email | string | Primary email address |
| roles | string[] | Roles assigned to the user |
| organizationId | string | The ID of the organization selected for this session |
| organizationName | string | The Name of the organization selected for this session |

## Organization
Represents an organization a user can belong to.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique organization ID |
| name | string | Display name of the organization |

## AuthResponse
The response returned by the backend authentication service.

### Success Scenario
Returns the full session data.

| Field | Type | Description |
|-------|------|-------------|
| token | string | JWT token for the session |
| user | UserProfile | Full user profile including organization context |

### Multiple Organizations Scenario (Error/Response)
Returned when a user is associated with multiple organizations and no `organizacao_id` was provided.

| Field | Type | Description |
|-------|------|-------------|
| error | string | Must be `MULTIPLE_ORGANIZATIONS` |
| organizations | Organization[] | List of available organizations |

## Auth State
The current authentication state stored in `AuthStore`.

| Field | Type | Description |
|-------|------|-------------|
| user | UserProfile | The currently logged-in user with their context |
| token | string | The active JWT |
| isAuthenticated | boolean | Computed state (true if token exists) |
