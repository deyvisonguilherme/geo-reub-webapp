# Permission Directive Contract

## Directive: `[hasPermission]`

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `hasPermission` | `string \| string[]` | `''` | Required permission(s) or role(s). |

### Behavior
- The directive injects the `AuthStore`.
- It uses a Signal to check if the current user has any of the required permissions.
- If the check fails, the element is removed from the DOM (using `TemplateRef` and `ViewContainerRef`).

### Constraints
- MUST be compatible with Angular 21 Zoneless.
- MUST react to changes in the `AuthStore` state.
