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
        
        // Simple logic: check if user has any of the required permissoes
        const userPerms = user.permissoes || [];

        hasAccess = requiredArray.some(req => 
          userPerms.includes(req)
        );
      }

      this.viewContainer.clear();
      if (hasAccess) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }
}
