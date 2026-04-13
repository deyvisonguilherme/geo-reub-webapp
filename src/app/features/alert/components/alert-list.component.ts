import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertaPrazo } from '../alert.types';
import { AlertStore } from '../alert.store';
import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert-list',
  standalone: true,
  imports: [CommonModule, TagModule],
  templateUrl: './alert-list.component.html',
  styleUrl: './alert-list.component.scss',
})
export class AlertListComponent {
  alertStore = inject(AlertStore);
  router = inject(Router);

  onAlertClick(alert: AlertaPrazo): void {
    if (!alert.visualizado) {
      this.alertStore.markAsRead(alert.id);
    }
    this.router.navigate(['/alerts']);
  }

  goToAll(): void {
    this.router.navigate(['/alerts']);
  }

  getSeverity(severity: string): any {
    switch (severity.toLowerCase()) {
      case 'danger':
        return 'danger';
      case 'warn':
        return 'warn';
      case 'info':
        return 'info';
      case 'success':
        return 'success';
      default:
        return 'info';
    }
  }

  getIcon(severity: string): string {
    switch (severity.toLowerCase()) {
      case 'danger':
        return 'pi pi-exclamation-circle';
      case 'warn':
        return 'pi pi-exclamation-triangle';
      case 'info':
        return 'pi pi-info-circle';
      case 'success':
        return 'pi pi-check-circle';
      default:
        return 'pi pi-bell';
    }
  }
}
