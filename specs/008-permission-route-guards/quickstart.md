# Quickstart: Using Permission Guard

## 1. Protecting a Route

Add the `permissionGuard` to the `canActivate` array and specify requirements in `data`:

```typescript
import { permissionGuard } from './core/auth/permission.guard';

export const routes: Routes = [
  {
    path: 'configuracoes',
    component: SettingsComponent,
    canActivate: [permissionGuard],
    data: { 
      roles: ['ADMIN'],
      permissions: ['settings:write'] 
    }
  }
];
```

## 2. Dynamic Role Checks

The guard automatically handles multiple roles. If a user has *any* of the roles listed in the array, they will be granted access (subject to permission checks).

```typescript
data: { 
  roles: ['TECNICO', 'ADMINISTRATIVO'] 
}
```

## 3. Unit Testing

Mock the `AuthStore` to return different roles/claims and verify that the guard returns `true` or a `UrlTree` for redirection.
