# Research: Multiple Organization Authentication

## Technical Context
The application uses Angular 21 with a signal-based `AuthStore` and a standard `AuthService` for backend communication. Authentication is handled via Keycloak on the backend, which returns a JWT upon success.

## Findings

### Existing Auth Flow
1. `LoginComponent` collects `username` and `password`.
2. `AuthService.login` sends POST to `/api/auth/login`.
3. On success, `AuthStore` persists the user profile and token.

### Proposed Changes
1. **Auth Types**: Update `AuthResponse` to include potential organization selection data or a success state. Define `Organization` interface.
2. **Backend Error Handling**: The backend will return a 400 (or specific status) with an error code `MULTIPLE_ORGANIZATIONS` and a list of organizations.
3. **Frontend Organization Selection**:
    - If `MULTIPLE_ORGANIZATIONS` error is received, `LoginComponent` should switch to a "Select Organization" view.
    - User selects an organization from a dropdown.
    - Re-submit login with `username`, `password`, and `organizacao_id`.
4. **Auth Store**: No major changes needed to the store itself, as it just stores the final result, but `UserProfile` might need an `organizationId` field.

## Decisions
- **Decision**: Reuse `LoginComponent` for organization selection to maintain state (credentials).
- **Rationale**: Keeps the logic centralized and avoids complex state transfers between components.
- **Alternatives considered**: Separate route for organization selection. Rejected because it complicates the credential persistence (re-sending password).

## Dependencies
- PrimeNG `Select` (or `Dropdown`) component for organization selection.
- Backend API update to support `organizacao_id` and return `MULTIPLE_ORGANIZATIONS`.
