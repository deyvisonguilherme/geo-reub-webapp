import { Directive, input, inject, TemplateRef, ViewContainerRef, effect } from '@angular/core';
import { AuthStore } from '../../core/auth/auth.store';

@Directive({
  selector: '[hasPermission]',
  standalone: true
})
export class HasPermissionDirective {
  private authStore = inject(AuthStore);
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);

  hasPermission = input.required<string | string[]>();

  constructor() {
    effect(() => {
      const required = this.hasPermission();
      const user = this.authStore.user();
      
      let hasAccess = false;

      if (user) {
        const requiredArray = Array.isArray(required) ? required : [required];
        
        // Simple logic: check if user has any of the required roles or permissions
        // Assuming user.roles and user.permissions are available based on spec
        const userRoles = user.roles || [];
        const userPerms = (user as any).permissions || []; // Cast to any if permissions field not yet in type

        hasAccess = requiredArray.some(req => 
          userRoles.includes(req) || userPerms.includes(req)
        );
      }

      this.viewContainer.clear();
      if (hasAccess) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }
}
