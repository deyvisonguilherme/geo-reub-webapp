import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

import { PendingNotification, TacitAgreement, RegistryDeadline } from './comunication.types';
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
  // Mock data representing Supabase views
  notifications = signal<PendingNotification[]>([
    {
      id: '1',
      processo_id: 'proc-1',
      numero_processo: 'REURB-2026-001',
      destinatario: 'João Silva',
      tipo: 'TITULAR',
      status_ar: 'PENDENTE',
      prazo_vencimento: '2026-04-15',
    },
    {
      id: '2',
      processo_id: 'proc-2',
      numero_processo: 'REURB-2026-005',
      destinatario: 'Maria Oliveira',
      tipo: 'CONFRONTANTE',
      status_ar: 'RECUSADO',
      codigo_rastreio: 'AR123456789BR',
      data_envio: '2026-03-20',
      prazo_vencimento: '2026-04-05',
    },
  ]);

  tacitAgreements = signal<TacitAgreement[]>([
    {
      id: '1',
      numero_processo: 'REURB-2026-010',
      notificado: 'Pedro Santos',
      data_entrega_ar: '2026-03-10',
      prazo_dias: 15,
      data_vencimento: '2026-03-25',
      status: 'CONSOLIDADO',
    },
    {
      id: '2',
      numero_processo: 'REURB-2026-012',
      notificado: 'Ana Paula',
      data_entrega_ar: '2026-03-25',
      prazo_dias: 15,
      data_vencimento: '2026-04-10',
      status: 'AGUARDANDO',
    },
  ]);

  registryDeadlines = signal<RegistryDeadline[]>([
    {
      id: '1',
      numero_processo: 'REURB-2026-020',
      cartorio: '1º Ofício de Registro',
      data_prenotacao: '2026-03-15',
      prazo_vencimento: '2026-04-15',
      possui_nota_devolutiva: true,
      dias_restantes: 10,
    },
  ]);

  // UI State
  displayArDialog = false;
  selectedNotification: PendingNotification | null = null;
  arCodeInput = '';

  // Statistics
  stats = computed(() => ({
    pending: this.notifications().filter(n => n.status_ar === 'PENDENTE').length,
    recused: this.notifications().filter(n => n.status_ar === 'RECUSADO' || n.status_ar === 'AUSENTE').length,
    tacitWaiting: this.tacitAgreements().filter(t => t.status === 'AGUARDANDO').length,
    criticalDeadlines: this.registryDeadlines().filter(r => r.dias_restantes < 5).length
  }));

  updateArTracking(notif: PendingNotification) {
    this.selectedNotification = { ...notif };
    this.arCodeInput = notif.codigo_rastreio || '';
    this.displayArDialog = true;
  }

  saveArTracking() {
    if (this.selectedNotification) {
      this.notifications.update(prev => 
        prev.map(n => n.id === this.selectedNotification?.id 
          ? { ...n, codigo_rastreio: this.arCodeInput, status_ar: 'ENVIADO', data_envio: new Date().toISOString() } 
          : n
        )
      );
      this.displayArDialog = false;
    }
  }

  convertToEdital(notif: PendingNotification) {
    this.notifications.update(prev => 
      prev.map(n => n.id === notif.id ? { ...n, status_ar: 'EDITAL' } : n)
    );
  }

  consolidateTacit(tacit: TacitAgreement) {
    this.tacitAgreements.update(prev =>
      prev.map(t => t.id === tacit.id ? { ...t, status: 'CONSOLIDADO' } : t)
    );
  }
}
