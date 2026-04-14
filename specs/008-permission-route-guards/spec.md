# Feature Specification: Implement Permission-based Route Guards

**Feature Branch**: `008-permission-route-guards`  
**Created**: 2026-04-13  
**Status**: Draft  
**Input**: User description: "Implementação de Guardas de Rota por \"Permissions\" (não apenas Auth): Além do auth.guard.ts, o sistema precisa de um permission.guard.ts. Processos de REURB têm papéis distintos (Técnico, Jurídico, Administrativo). Criar uma guarda baseada em claims/roles evitaria que usuários acessassem módulos de configuração ou aprovação indevidamente."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Role-based Access Control for Modules (Priority: P1)

As a system administrator, I want to restrict access to specific modules (like Configuration or Approval) based on the user's role (Technical, Legal, or Administrative) so that only authorized personnel can perform sensitive actions.

**Why this priority**: Core security requirement. Prevents unauthorized data modification and ensures compliance with REURB process roles.

**Independent Test**: Can be tested by attempting to access a restricted route with different user roles and verifying if the access is granted or denied as expected.

**Acceptance Scenarios**:

1. **Given** a user with the 'TECNICO' role, **When** they attempt to access the 'Configurações' module, **Then** the system should redirect them to the dashboard or an unauthorized access page.
2. **Given** a user with the 'ADMINISTRATIVO' role, **When** they attempt to access the 'Aprovação' module, **Then** the system should allow access.

---

### User Story 2 - Granular Permission Checks (Priority: P2)

As a developer, I want to define specific permissions (claims) for routes so that I can have more granular control than just top-level roles.

**Why this priority**: Increases system flexibility. Allows for overlapping responsibilities or specific "read-only" vs "write" access within the same module.

**Independent Test**: Define a route requiring a specific claim (e.g., 'process:approve') and verify that users without that claim are blocked even if they have a general 'TECNICO' role.

**Acceptance Scenarios**:

1. **Given** a route requires 'process:delete', **When** a user with 'TECNICO' role but without 'process:delete' claim attempts access, **Then** they should be denied.

---

### User Story 3 - Graceful Redirection on Denied Access (Priority: P3)

As a user, when I attempt to access a route I don't have permission for, I want to be redirected to a meaningful page with an informative message so that I understand why I was blocked.

**Why this priority**: Improves UX and prevents dead-ends in the application.

**Independent Test**: Verify that denied access results in a redirection to a specific 403 page or a toast notification on the dashboard.

**Acceptance Scenarios**:

1. **Given** a user is denied access by the `permission.guard.ts`, **When** the guard blocks them, **Then** they should see a message stating "Você não tem permissão para acessar esta área."

### Edge Cases

- **User has no roles/claims**: Access should be denied by default to all protected routes.
- **Session expires while on a protected page**: The `auth.guard.ts` should handle this first, but the permission guard should fail safely if claims are missing.
- **User has multiple roles**: Access should be granted if *any* of the user's roles satisfy the route requirements.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST implement a `permission.guard.ts` using Angular's functional guard pattern.
- **FR-002**: Routes MUST support metadata configuration to specify required roles or permissions (e.g., `data: { roles: ['ADMIN'], permissions: ['config:read'] }`).
- **FR-003**: The guard MUST integrate with the existing `AuthStore` to retrieve the current user's claims/roles.
- **FR-004**: System MUST support OR logic for multiple roles (access granted if user has Role A OR Role B).
- **FR-005**: System MUST redirect unauthorized users to a default "Access Denied" route or the Dashboard.

### Key Entities *(include if feature involves data)*

- **Permission Claim**: A unique string identifier representing a specific action or access level.
- **Role**: A named collection of permission claims.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of routes in the Configuration and Approval modules are protected by the permission guard.
- **SC-002**: Unauthorized access attempts are blocked in under 50ms (guard execution time).
- **SC-003**: Redirection happens automatically without flickering the restricted content.

## Assumptions

- **Existing Auth**: An `AuthStore` exists and already stores user profile information, including roles.
- **Zoneless**: The guard implementation will be zoneless-friendly (using `inject()` and Signals).
- **Static Routes**: Roles and permissions for routes are known at development time and defined in `app.routes.ts`.
