import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthStore } from './auth.store';
import { GlobalFeedbackService } from '../feedback/global-feedback.service';

export const permissionGuard: CanActivateFn = (route) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  const feedback = inject(GlobalFeedbackService);

  const requiredRoles = route.data?.['roles'] as string[] | undefined;
  const requiredPermissions = route.data?.['permissions'] as string[] | undefined;

  // 1. Check if user is authenticated
  if (!authStore.isAuthenticated()) {
    return router.createUrlTree(['/auth/login']);
  }

  // 2. If user is ADMIN, they have access to everything
  if (authStore.isAdmin()) {
    return true;
  }

  const user = authStore.user();
  if (!user) {
    return router.createUrlTree(['/auth/login']);
  }

  // 3. Check for roles (OR logic: user must have at least one of the required roles)
  let hasRole = true;
  if (requiredRoles && requiredRoles.length > 0) {
    hasRole = requiredRoles.some(role => user.roles.includes(role));
  }

  // 4. Check for permissions (AND logic: user must have all required permissions)
  // Note: user.permissions might be undefined in the current type, using any for now
  let hasPermission = true;
  if (requiredPermissions && requiredPermissions.length > 0) {
    const userPermissions = (user as any).permissions || [];
    hasPermission = requiredPermissions.every(perm => userPermissions.includes(perm));
  }

  if (hasRole && hasPermission) {
    return true;
  }

  // 5. Handle denial
  feedback.notifyError('Acesso Negado', 'Você não tem permissão para acessar esta área.');
  return router.createUrlTree(['/dashboard']);
};
