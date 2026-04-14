import { Injectable, computed, signal, inject } from '@angular/core';
import { AlertaPrazo } from './alert.types';
import { AlertRepository } from './alert.repository';
import { GlobalFeedbackService } from '../../core/feedback/global-feedback.service';
import { AsyncState, createInitialAsyncState, updateAsyncError, updateAsyncLoading, updateAsyncSuccess } from '../../core/models/repository.types';

@Injectable({ providedIn: 'root' })
export class AlertStore {
  private repository = inject(AlertRepository);
  private feedback = inject(GlobalFeedbackService);
  
  private readonly _alerts = signal<AsyncState<AlertaPrazo[]>>(createInitialAsyncState([]));
  readonly alertsState = computed(() => this._alerts());
  readonly alerts = computed(() => this._alerts().data || []);
  readonly recentAlerts = computed(() => (this._alerts().data || []).slice(0, 10));
  readonly loading = computed(() => this._alerts().loading);

  constructor() {
    this.loadAlerts();
  }

  loadAlerts(): void {
    this._alerts.update(state => updateAsyncLoading(state));
    this.repository.getAll().subscribe({
      next: (items) => {
        const sortedItems = [...items].sort((a, b) => new Date(b.criado_em).getTime() - new Date(a.criado_em).getTime());
        this._alerts.set(updateAsyncSuccess(sortedItems));
      },
      error: (err) => {
        console.error('Erro ao carregar alertas:', err);
        const errorMessage = err.message || 'Erro ao carregar alertas';
        this._alerts.set(updateAsyncError(errorMessage, this._alerts().data));
        this.feedback.notifyError('Erro ao carregar alertas', errorMessage);
      },
    });
  }

  markAsRead(id: string): void {
    const changes = { visualizado: true, data_visualizacao: new Date().toISOString() };
    this.repository.update(id, changes).subscribe({
      next: (updatedItem) => {
        this._alerts.update(state => ({
          ...state,
          data: (state.data || []).map((item) => (item.id === id ? updatedItem : item))
        }));
        this.feedback.notifyInfo('Alerta lido', 'O alerta foi marcado como visualizado.');
      },
      error: (err) => {
        console.error('Erro ao marcar alerta como lido:', err);
        this.feedback.notifyError('Erro ao atualizar alerta', err.message);
      },
    });
  }

  deleteAlert(id: string): void {
    const alert = this.alerts().find(a => a.id === id);
    this.feedback.confirmAction({
      header: 'Excluir Alerta',
      message: `Deseja realmente remover o alerta: "${alert?.titulo || id}"?`,
      icon: 'pi pi-trash',
      accept: () => {
        this.repository.delete(id).subscribe({
          next: () => {
            this._alerts.update(state => ({
              ...state,
              data: (state.data || []).filter((item) => item.id !== id)
            }));
            this.feedback.notifySuccess('Alerta excluído', 'O alerta foi removido com sucesso.');
          },
          error: (err) => {
            console.error('Erro ao excluir alerta:', err);
            this.feedback.notifyError('Erro ao excluir alerta', err.message);
          },
        });
      },
    });
  }
}
