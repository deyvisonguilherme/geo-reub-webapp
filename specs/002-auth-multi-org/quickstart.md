# Quickstart: Multiple Organization Authentication

## Verifying Authentication Flow

### Case 1: Single Organization User
1. Enter credentials for a user belonging to only one organization.
2. Verify that the user is redirected to the dashboard immediately upon login.
3. Check `AuthStore` (via browser tools or temporary log) to confirm `organizationId` is populated in the user profile.

### Case 2: Multiple Organization User
1. Enter credentials for a user belonging to multiple organizations.
2. Verify that the login form switches to the "Select Organization" view.
3. Select an organization from the dropdown and click "Login" (or "Confirm").
4. Verify redirection to the dashboard and correct `organizationId` in the `AuthStore`.

### Case 3: Error Handling
1. Enter invalid credentials.
2. Verify the standard unauthorized error message is displayed.
3. Attempt to bypass organization selection by sending a manual request with an organization the user does not belong to (backend validation).

## Local Development Mocking
To mock the `MULTIPLE_ORGANIZATIONS` error locally, update your interceptor or a local development service to return a 400 with the specific error code and organization list:

```typescript
if (credentials.username === 'multi-user') {
  return of({
    status: 400,
    error: {
      error: 'MULTIPLE_ORGANIZATIONS',
      organizations: [
        { id: '1', name: 'Org 1' },
        { id: '2', name: 'Org 2' }
      ]
    }
  });
}
```
