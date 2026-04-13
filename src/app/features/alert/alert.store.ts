import { Injectable, computed, signal, inject } from '@angular/core';
import { AlertaPrazo } from './alert.types';
import { AlertRepository } from './alert.repository';

@Injectable({ providedIn: 'root' })
export class AlertStore {
  private repository = inject(AlertRepository);
  private readonly records = signal<AlertaPrazo[]>([]);
  readonly alerts = computed(() => this.records());
  readonly recentAlerts = computed(() => this.records().slice(0, 10));
  readonly loading = signal<boolean>(false);

  constructor() {
    this.loadAlerts();
  }

  loadAlerts(): void {
    this.loading.set(true);
    this.repository.getAll().subscribe({
      next: (items) => {
        this.records.set(items.sort((a, b) => new Date(b.criado_em).getTime() - new Date(a.criado_em).getTime()));
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar alertas:', err);
        this.loading.set(false);
      },
    });
  }

  markAsRead(id: string): void {
    const changes = { visualizado: true, data_visualizacao: new Date().toISOString() };
    this.repository.update(id, changes).subscribe({
      next: (updatedItem) => {
        this.records.update((items) =>
          items.map((item) => (item.id === id ? updatedItem : item))
        );
      },
      error: (err) => console.error('Erro ao marcar alerta como lido:', err),
    });
  }

  deleteAlert(id: string): void {
    this.repository.delete(id).subscribe({
      next: () => {
        this.records.update((items) => items.filter((item) => item.id !== id));
      },
      error: (err) => console.error('Erro ao excluir alerta:', err),
    });
  }
}
