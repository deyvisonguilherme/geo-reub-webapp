# Quickstart: Authentication and Authorization

## Local Development Setup

### 1. Backend Mock (Optional)
Ensure the backend API at `/api/auth/login` is available or mock it using an interceptor during development.

### 2. Provider Registration
Register the `AuthInterceptor` and `provideHttpClient` in `app.config.ts`:

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    // ... other providers
  ]
};
```

### 3. Usage in Components

To protect a route, add the `authGuard` to `app.routes.ts`:
```typescript
{
  path: 'dashboard',
  canActivate: [authGuard],
  loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
}
```

To access the user profile:
```typescript
@Component({ ... })
export class MyComponent {
  private authStore = inject(AuthStore);
  user = this.authStore.user;
  isAuthenticated = this.authStore.isAuthenticated;
}
```

## Running Tests
Run standard unit tests for auth services and guards:
```bash
bun test
```
