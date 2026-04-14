# Research: Permission-based Route Guards

## Decision: Functional Guard Pattern

**Decision**: Implement `PermissionGuard` as a functional guard using `canActivateFn`.

**Rationale**: Angular has moved away from class-based guards. Functional guards are more concise, easier to test, and perfectly compatible with the `inject()` function used in this project.

**Alternatives considered**: 
- Class-based guards: Rejected as they are deprecated/legacy.

---

## Decision: Integration with AuthStore

**Decision**: The guard will use `inject(AuthStore)` to access the current user's state.

**Rationale**: `AuthStore` is already the central source of truth for authentication. Accessing it via `inject()` ensures the guard can react to Signal-based state changes if necessary (though route guards typically execute once per navigation).

---

## Decision: Route Metadata (Data Property)

**Decision**: Required roles and permissions will be defined in the `data` property of the route configuration.

**Rationale**: This is the standard Angular way to pass static data to guards. We will define a clear structure:
```typescript
{
  path: 'admin',
  component: AdminComponent,
  canActivate: [permissionGuard],
  data: { roles: ['ADMIN'], permissions: ['system:write'] }
}
```

---

## Decision: Redirection and Feedback

**Decision**: On denial, the guard will redirect to `/dashboard` and trigger a global notification via the `GlobalFeedbackService`.

**Rationale**: Provides immediate feedback to the user without needing a dedicated "Access Denied" page initially, maintaining flow.
