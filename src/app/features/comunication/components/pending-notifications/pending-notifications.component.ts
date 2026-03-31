import { Component, input, output, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PendingNotification } from '../../comunication.types';

@Component({
  selector: 'app-pending-notifications',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    ButtonModule,
    TooltipModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    DatePipe
  ],
  templateUrl: './pending-notifications.component.html'
})
export class PendingNotificationsComponent {
  notifications = input.required<PendingNotification[]>();
  
  updateAr = output<PendingNotification>();
  convertToEdital = output<PendingNotification>();

  getNotificationSeverity(status: string): any {
    switch (status) {
      case 'PENDENTE': return 'warn';
      case 'ENVIADO': return 'info';
      case 'ENTREGUE': return 'success';
      case 'RECUSADO': return 'danger';
      case 'AUSENTE': return 'danger';
      case 'EDITAL': return 'contrast';
      default: return 'secondary';
    }
  }
}
