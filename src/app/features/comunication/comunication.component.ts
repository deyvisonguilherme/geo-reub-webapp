import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

import { PendingNotification, TacitAgreement, RegistryDeadline } from './comunication.types';
import { ComunicationStore } from './comunication.store';
import { PendingNotificationsComponent } from './components/pending-notifications/pending-notifications.component';
import { TacitAgreementsComponent } from './components/tacit-agreements/tacit-agreements.component';
import { RegistryDeadlinesComponent } from './components/registry-deadlines/registry-deadlines.component';

@Component({
  selector: 'app-comunication',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TabsModule,
    BadgeModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    PendingNotificationsComponent,
    TacitAgreementsComponent,
    RegistryDeadlinesComponent
  ],
  templateUrl: './comunication.component.html',
  styleUrl: './comunication.component.scss',
})
export class ComunicationComponent {
  private readonly store = inject(ComunicationStore);

  readonly notifications = this.store.notifications;
  readonly tacitAgreements = this.store.tacitAgreements;
  readonly registryDeadlines = this.store.registryDeadlines;
  readonly stats = this.store.stats;

  // UI State
  displayArDialog = false;
  selectedNotification: PendingNotification | null = null;
  arCodeInput = '';

  updateArTracking(notif: PendingNotification) {
    this.selectedNotification = { ...notif };
    this.arCodeInput = notif.codigo_rastreio || '';
    this.displayArDialog = true;
  }

  saveArTracking() {
    if (this.selectedNotification) {
      this.store.updateArTracking(this.selectedNotification.id, this.arCodeInput);
      this.displayArDialog = false;
    }
  }

  convertToEdital(notif: PendingNotification) {
    this.store.convertToEdital(notif.id);
  }

  consolidateTacit(tacit: TacitAgreement) {
    this.store.consolidateTacit(tacit.id);
  }
}
