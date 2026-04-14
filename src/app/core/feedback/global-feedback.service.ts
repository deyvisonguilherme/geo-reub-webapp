import { Injectable, inject } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { NotificationEvent, ConfirmationRequest } from './feedback.types';

@Injectable({
  providedIn: 'root'
})
export class GlobalFeedbackService {
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);

  notifySuccess(summary: string, detail?: string): void {
    this.messageService.add({ severity: 'success', summary, detail });
  }

  notifyError(summary: string, detail?: string): void {
    this.messageService.add({ severity: 'error', summary, detail });
  }

  notifyWarn(summary: string, detail?: string): void {
    this.messageService.add({ severity: 'warn', summary, detail });
  }

  notifyInfo(summary: string, detail?: string): void {
    this.messageService.add({ severity: 'info', summary, detail });
  }

  notify(event: NotificationEvent): void {
    this.messageService.add(event);
  }

  confirmAction(request: ConfirmationRequest): void {
    this.confirmationService.confirm({
      header: request.header,
      message: request.message,
      icon: request.icon || 'pi pi-exclamation-triangle',
      accept: request.accept,
      reject: request.reject
    });
  }
}
