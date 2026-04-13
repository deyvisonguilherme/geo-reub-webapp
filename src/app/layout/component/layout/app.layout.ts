import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppTopbar } from '../topbar/app.topbar';
import { AppSidebar } from '../sidebar/app.sidebar';
import { AppFooter } from '../footer/app.footer';
import { LayoutService } from '../../service/layout.service';
import { AilegalComponent } from '../../../features/ailegal/ailegal.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, AppTopbar, AppSidebar, RouterModule, AppFooter, AilegalComponent],
  templateUrl: './app.layout.html',
})
export class AppLayout {
  layoutService = inject(LayoutService);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      const state = this.layoutService.layoutState();
      if (state.mobileMenuActive) {
        this.document.body.classList.add('blocked-scroll');
      } else {
        this.document.body.classList.remove('blocked-scroll');
      }
    });
  }

  containerClass = computed(() => {
    const config = this.layoutService.layoutConfig();
    const state = this.layoutService.layoutState();
    return {
      'layout-overlay': config.menuMode === 'overlay',
      'layout-static': config.menuMode === 'static',
      'layout-static-inactive': state.staticMenuDesktopInactive && config.menuMode === 'static',
      'layout-overlay-active': state.overlayMenuActive,
      'layout-mobile-active': state.mobileMenuActive,
    };
  });
}
