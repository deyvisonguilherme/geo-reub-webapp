import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthStore } from './auth.store';

export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (!authStore.isAuthenticated()) {
    // Redirect to the login page
    return router.createUrlTree(['/auth/login'], {
      queryParams: { returnUrl: state.url },
    });
  }

  // Check for required roles
  const requiredRole = route.data?.['role'];
  if (requiredRole && !authStore.hasRole(requiredRole)) {
    // Redirect to unauthorized or home if role doesn't match
    console.warn(`User does not have required role: ${requiredRole}`);
    return router.createUrlTree(['/']);
  }

  return true;
};
