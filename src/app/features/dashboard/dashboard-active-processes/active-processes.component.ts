import { Component, signal } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { RouterModule, RouterLink } from '@angular/router';

interface ActiveProcessDashboardData {
  id: string;
  numero_processo: string;
  modalidade: string;
  status: string;
  nucleo_nome: string;
  nucleo_codigo: string;
  area_total_m2: number;
  numero_familias_estimado: number;
  legitimado: string;
  organizacao: string;
  data_instauracao: string;
  prazo_analise_admissibilidade: string;
  dias_em_andamento: number;
  dias_ate_prazo_classificacao: number;
  status_prazo: string;
  etapa_atual: string;
  total_beneficiarios: number;
  total_estudos: number;
  notificacoes_pendentes: number;
}

@Component({
  selector: 'app-active-processes',
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
    CardModule,
    RouterModule,
    RouterLink,
    DecimalPipe,
    DatePipe,
  ],
  templateUrl: './active-processes.component.html',
  styleUrl: './active-processes.component.scss',
})
export class ActiveProcessesComponent {
  data = signal<ActiveProcessDashboardData[]>([
    {
      id: '1',
      numero_processo: 'REURB-2026-010',
      modalidade: 'REURB-S',
      status: 'EM_ANDAMENTO',
      nucleo_nome: 'Vila Esperança',
      nucleo_codigo: 'NUC-001',
      area_total_m2: 12500.5,
      numero_familias_estimado: 85,
      legitimado: 'ASSOCIAÇÃO DE MORADORES',
      organizacao: 'Secretaria de Habitação',
      data_instauracao: '2026-01-05',
      prazo_analise_admissibilidade: '2026-03-05',
      dias_em_andamento: 85,
      dias_ate_prazo_classificacao: 15,
      status_prazo: 'DENTRO_DO_PRAZO',
      etapa_atual: 'Estudo Técnico Ambiental',
      total_beneficiarios: 42,
      total_estudos: 3,
      notificacoes_pendentes: 12,
    },
    {
      id: '2',
      numero_processo: 'REURB-2026-015',
      modalidade: 'REURB-E',
      status: 'EM_ANDAMENTO',
      nucleo_nome: 'Residencial Aurora',
      nucleo_codigo: 'NUC-015',
      area_total_m2: 4500.0,
      numero_familias_estimado: 22,
      legitimado: 'MUNICÍPIO',
      organizacao: 'Procuradoria Geral',
      data_instauracao: '2026-02-15',
      prazo_analise_admissibilidade: '2026-04-15',
      dias_em_andamento: 44,
      dias_ate_prazo_classificacao: -5,
      status_prazo: 'PRAZO_VENCIDO',
      etapa_atual: 'Análise de Documentação',
      total_beneficiarios: 18,
      total_estudos: 1,
      notificacoes_pendentes: 0,
    },
  ]);

  selectedItem = signal<ActiveProcessDashboardData | null>(null);

  selectItem(data: any): void {
    if (data && !Array.isArray(data)) {
      this.selectedItem.set(data as ActiveProcessDashboardData);
    }
  }

  getModalidadeSeverity(modalidade: string): any {
    return modalidade === 'REURB-S' ? 'success' : 'info';
  }

  getStatusSeverity(status: string): any {
    switch (status) {
      case 'EM_ANDAMENTO':
        return 'info';
      case 'AGUARDANDO':
        return 'warn';
      case 'SUSPENSO':
        return 'danger';
      default:
        return 'secondary';
    }
  }

  getStatusPrazoSeverity(status: string): any {
    if (status.includes('VENCIDO')) return 'danger';
    if (status.includes('ALERTA')) return 'warn';
    if (status.includes('DENTRO')) return 'success';
    return 'info';
  }
}
