import { Injectable, computed, signal } from '@angular/core';
import { AlertaPrazo } from './alert.types';

@Injectable({ providedIn: 'root' })
export class AlertStore {
  private readonly records = signal<AlertaPrazo[]>(this.buildSeedData());
  readonly alerts = computed(() => this.records());
  readonly recentAlerts = computed(() => this.records().slice(0, 10));
  readonly loading = signal<boolean>(false);

  markAsRead(id: string): void {
    this.records.update((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, visualizado: true, data_visualizacao: new Date().toISOString() }
          : item
      )
    );
  }

  deleteAlert(id: string): void {
    this.records.update((items) => items.filter((item) => item.id !== id));
  }

  private buildSeedData(): AlertaPrazo[] {
    const today = new Date().toISOString();
    return [
      {
        id: '1',
        titulo: 'Prazo Admissibilidade Vencendo',
        mensagem: 'O prazo para análise de admissibilidade do processo REURB-2026-002 expira em breve.',
        tipo_alerta: 'PRAZO_LEGAL',
        severidade: 'danger',
        dias_restantes: 2,
        visualizado: false,
        criado_em: today,
        acao_tomada: false
      },
      {
        id: '2',
        titulo: 'Impugnação Registrada',
        mensagem: 'Uma nova impugnação foi registrada no cartório para o núcleo Vale Verde.',
        tipo_alerta: 'IMPUGNACAO',
        severidade: 'warn',
        visualizado: false,
        criado_em: new Date(Date.now() - 3600000).toISOString(),
        acao_tomada: false
      },
      {
        id: '3',
        titulo: 'CRF Emitido',
        mensagem: 'A CRF do processo REURB-2026-001 foi emitida com sucesso.',
        tipo_alerta: 'EVENTO_PROCESSO',
        severidade: 'success',
        visualizado: true,
        criado_em: new Date(Date.now() - 86400000).toISOString(),
        acao_tomada: false
      },
      {
        id: '4',
        titulo: 'Nota Devolutiva Cartório',
        mensagem: 'Recebida nota devolutiva do cartório referente ao registro de títulos do núcleo Esperança.',
        tipo_alerta: 'PENDENCIA_REGISTRAL',
        severidade: 'danger',
        dias_restantes: 15,
        visualizado: false,
        criado_em: new Date(Date.now() - 172800000).toISOString(),
        acao_tomada: false
      },
      {
        id: '5',
        titulo: 'Vencimento Termo de Compromisso',
        mensagem: 'O termo de compromisso TC-2026-004 entrará na fase final de vigência em 30 dias.',
        tipo_alerta: 'VIGENCIA',
        severidade: 'info',
        dias_restantes: 30,
        visualizado: true,
        criado_em: new Date(Date.now() - 259200000).toISOString(),
        acao_tomada: false
      },
      {
        id: '6',
        titulo: 'Relatório Técnico Pendente',
        mensagem: 'O relatório técnico do núcleo Jardim das Flores está pendente há 5 dias.',
        tipo_alerta: 'PENDENCIA_TECNICA',
        severidade: 'warn',
        visualizado: false,
        criado_em: new Date(Date.now() - 432000000).toISOString(),
        acao_tomada: false
      }
    ].sort((a, b) => new Date(b.criado_em).getTime() - new Date(a.criado_em).getTime());
  }
}
