# Data Model: Permission Guard Metadata

## Route Data Interface

The `data` property in `app.routes.ts` for protected routes should follow this structure:

| Field | Type | Description |
|-------|------|-------------|
| `roles` | `string[]` | List of authorized roles. If user has ANY of these, access is granted. |
| `permissions` | `string[]` | List of required permission claims. |

## Permission Mapping

Permissions follow the format `domain:action`. Examples:
- `process:create`
- `beneficiary:delete`
- `config:write`

## Roles in REURB context

Standard roles supported by the system:
- `ADMIN`: Full access to everything.
- `TECNICO`: Access to technical studies and surveys.
- `JURIDICO`: Access to legal analysis and dominial research.
- `ADMINISTRATIVO`: Access to approvals and workflow management.
