import { Injectable, inject, signal, computed } from '@angular/core';
import { PendingNotification, TacitAgreement, RegistryDeadline } from './comunication.types';
import { ComunicationRepository } from './comunication.repository';

@Injectable({ providedIn: 'root' })
export class ComunicationStore {
  private repository = inject(ComunicationRepository);

  private readonly _notifications = signal<PendingNotification[]>([]);
  private readonly _tacitAgreements = signal<TacitAgreement[]>([]);
  private readonly _registryDeadlines = signal<RegistryDeadline[]>([]);
  readonly loading = signal<boolean>(false);

  readonly notifications = computed(() => this._notifications());
  readonly tacitAgreements = computed(() => this._tacitAgreements());
  readonly registryDeadlines = computed(() => this._registryDeadlines());

  readonly stats = computed(() => ({
    pending: this._notifications().filter(n => n.status_ar === 'PENDENTE').length,
    recused: this._notifications().filter(n => n.status_ar === 'RECUSADO' || n.status_ar === 'AUSENTE').length,
    tacitWaiting: this._tacitAgreements().filter(t => t.status === 'AGUARDANDO').length,
    criticalDeadlines: this._registryDeadlines().filter(r => r.dias_restantes < 5).length
  }));

  constructor() {
    this.loadAll();
  }

  loadAll() {
    this.loading.set(true);
    // Loading from multiple collections in the repository
    this.repository.getAll().subscribe(data => this._notifications.set(data));
    this.repository.getTacitAgreements().subscribe(data => this._tacitAgreements.set(data));
    this.repository.getRegistryDeadlines().subscribe(data => {
      this._registryDeadlines.set(data);
      this.loading.set(false);
    });
  }

  updateArTracking(id: string, arCode: string) {
    const changes: Partial<PendingNotification> = { 
      codigo_rastreio: arCode, 
      status_ar: 'ENVIADO', 
      data_envio: new Date().toISOString() 
    };
    this.repository.update(id, changes).subscribe(updated => {
      this._notifications.update(prev => prev.map(n => n.id === id ? updated : n));
    });
  }

  convertToEdital(id: string) {
    this.repository.update(id, { status_ar: 'EDITAL' }).subscribe(updated => {
      this._notifications.update(prev => prev.map(n => n.id === id ? updated : n));
    });
  }

  consolidateTacit(id: string) {
    // Note: Assuming TacitAgreement would also have a repository update if it were a full CRUD entity
    this._tacitAgreements.update(prev =>
      prev.map(t => t.id === id ? { ...t, status: 'CONSOLIDADO' } : t)
    );
  }
}
