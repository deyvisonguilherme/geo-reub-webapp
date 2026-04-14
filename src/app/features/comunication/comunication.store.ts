import { Injectable, inject, signal, computed } from '@angular/core';
import { PendingNotification, TacitAgreement, RegistryDeadline } from './comunication.types';
import { ComunicationRepository } from './comunication.repository';
import { AsyncState, createInitialAsyncState, updateAsyncError, updateAsyncLoading, updateAsyncSuccess } from '../../core/models/repository.types';

@Injectable({ providedIn: 'root' })
export class ComunicationStore {
  private repository = inject(ComunicationRepository);

  private readonly _notifications = signal<AsyncState<PendingNotification[]>>(createInitialAsyncState([]));
  private readonly _tacitAgreements = signal<AsyncState<TacitAgreement[]>>(createInitialAsyncState([]));
  private readonly _registryDeadlines = signal<AsyncState<RegistryDeadline[]>>(createInitialAsyncState([]));

  readonly notificationsState = computed(() => this._notifications());
  readonly tacitAgreementsState = computed(() => this._tacitAgreements());
  readonly registryDeadlinesState = computed(() => this._registryDeadlines());

  readonly notifications = computed(() => this._notifications().data || []);
  readonly tacitAgreements = computed(() => this._tacitAgreements().data || []);
  readonly registryDeadlines = computed(() => this._registryDeadlines().data || []);

  readonly loading = computed(() => 
    this._notifications().loading || 
    this._tacitAgreements().loading || 
    this._registryDeadlines().loading
  );

  readonly stats = computed(() => ({
    pending: this.notifications().filter(n => n.status_ar === 'PENDENTE').length,
    recused: this.notifications().filter(n => n.status_ar === 'RECUSADO' || n.status_ar === 'AUSENTE').length,
    tacitWaiting: this.tacitAgreements().filter(t => t.status === 'AGUARDANDO').length,
    criticalDeadlines: this.registryDeadlines().filter(r => r.dias_restantes < 5).length
  }));

  constructor() {
    this.loadAll();
  }

  loadAll() {
    this._notifications.update(state => updateAsyncLoading(state));
    this._tacitAgreements.update(state => updateAsyncLoading(state));
    this._registryDeadlines.update(state => updateAsyncLoading(state));

    this.repository.getAll().subscribe({
      next: (data) => this._notifications.set(updateAsyncSuccess(data)),
      error: (err) => this._notifications.set(updateAsyncError(err.message, []))
    });

    this.repository.getTacitAgreements().subscribe({
      next: (data) => this._tacitAgreements.set(updateAsyncSuccess(data)),
      error: (err) => this._tacitAgreements.set(updateAsyncError(err.message, []))
    });

    this.repository.getRegistryDeadlines().subscribe({
      next: (data) => this._registryDeadlines.set(updateAsyncSuccess(data)),
      error: (err) => this._registryDeadlines.set(updateAsyncError(err.message, []))
    });
  }

  updateArTracking(id: string, arCode: string) {
    const changes: Partial<PendingNotification> = { 
      codigo_rastreio: arCode, 
      status_ar: 'ENVIADO', 
      data_envio: new Date().toISOString() 
    };
    this.repository.update(id, changes).subscribe(updated => {
      this._notifications.update(state => ({
        ...state,
        data: (state.data || []).map(n => n.id === id ? updated : n)
      }));
    });
  }

  convertToEdital(id: string) {
    this.repository.update(id, { status_ar: 'EDITAL' }).subscribe(updated => {
      this._notifications.update(state => ({
        ...state,
        data: (state.data || []).map(n => n.id === id ? updated : n)
      }));
    });
  }

  consolidateTacit(id: string) {
    this._tacitAgreements.update(state => ({
      ...state,
      data: (state.data || []).map(t => t.id === id ? { ...t, status: 'CONSOLIDADO' } : t)
    }));
  }
}
