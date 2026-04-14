# Permission Guard Contract

## Interface: `permissionGuard`

A functional `CanActivateFn` that evaluates route access based on user authorization state.

### Logic Flow

1.  **Extract Metadata**: Retrieve `roles` and `permissions` from `ActivatedRouteSnapshot.data`.
2.  **Access AuthStore**: Inject `AuthStore`.
3.  **Check Authorization**:
    *   If no roles/permissions are required in metadata → **Allow Access**.
    *   If user is NOT authenticated → **Deny Access** (redirect to login).
    *   If user has `ADMIN` role → **Allow Access**.
    *   Check if user roles intersect with required `roles`.
    *   Check if user has ALL required `permissions`.
4.  **Handle Denial**:
    *   Inject `Router` and `GlobalFeedbackService`.
    *   Notify user: "Acesso Negado: Você não possui as permissões necessárias."
    *   Redirect to `/dashboard`.

### Constraints
- MUST NOT cause infinite redirection loops.
- MUST handle missing metadata gracefully.
