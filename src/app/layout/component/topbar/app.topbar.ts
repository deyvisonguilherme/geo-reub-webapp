import { Component, inject, viewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { StyleClassModule } from 'primeng/styleclass';
import { PopoverModule } from 'primeng/popover';
import { Popover } from 'primeng/popover';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { LayoutService } from '../../service/layout.service';
import { AlertListComponent } from '../../../features/alert/components/alert-list.component';
import { AlertStore } from '../../../features/alert/alert.store';
import { computed } from '@angular/core';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    RouterModule,
    StyleClassModule,
    PopoverModule,
    BadgeModule,
    OverlayBadgeModule,
    AlertListComponent,
    CommonModule,
  ],
  templateUrl: './app.topbar.html',
})
export class AppTopbar {
  items!: MenuItem[];

  layoutService = inject(LayoutService);
  alertStore = inject(AlertStore);

  op = viewChild<Popover>('op');

  unreadCount = computed(() => this.alertStore.recentAlerts().filter((a) => !a.visualizado).length);

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme,
    }));
  }

  toggleNotifications(event: Event) {
    this.op()?.toggle(event);
  }
}
