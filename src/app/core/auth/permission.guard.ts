import { inject, PLATFORM_ID } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import { AuthStore } from './auth.store';
import { GlobalFeedbackService } from '../feedback/global-feedback.service';

export const permissionGuard: CanActivateFn = (route) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  const feedback = inject(GlobalFeedbackService);
  const platformId = inject(PLATFORM_ID);

  // If on server, allow navigation to let browser restore state from localStorage
  if (isPlatformServer(platformId)) {
    return true;
  }

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
    hasRole = requiredRoles.some(role => user.permissoes.includes(role));
  }

  // 4. Check for permissions (AND logic: user must have all required permissions)
  let hasPermission = true;
  if (requiredPermissions && requiredPermissions.length > 0) {
    hasPermission = requiredPermissions.every(perm => user.permissoes.includes(perm));
  }

  if (hasRole && hasPermission) {
    return true;
  }

  // 5. Handle denial
  feedback.notifyError('Acesso Negado', 'Você não tem permissão para acessar esta área.');
  return router.createUrlTree(['/dashboard']);
};
