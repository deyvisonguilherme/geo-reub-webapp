import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertStore } from './alert.store';
import { AlertaPrazo } from './alert.types';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule,
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  alertStore = inject(AlertStore);
  selectedAlert = signal<AlertaPrazo | null>(null);

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

  selectAlert(alert: any): void {
    if (!alert || Array.isArray(alert)) return;
    
    const alertData = alert as AlertaPrazo;
    this.selectedAlert.set(alertData);
    if (!alertData.visualizado) {
      this.alertStore.markAsRead(alertData.id);
    }
  }

  markAsRead(alert: AlertaPrazo): void {
    if (!alert.visualizado) {
      this.alertStore.markAsRead(alert.id);
    }
  }

  deleteAlert(id: string): void {
    if (this.selectedAlert()?.id === id) {
      this.selectedAlert.set(null);
    }
    this.alertStore.deleteAlert(id);
  }
}
