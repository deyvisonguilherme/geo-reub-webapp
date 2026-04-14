import { Component, signal, computed } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TimelineModule } from 'primeng/timeline';
import { MessageModule } from 'primeng/message';
import { DashboardSummary } from './dashboard.types';
import { StatisticCardSkeletonComponent } from '../../shared/ui/skeletons/statistic-card-skeleton/statistic-card-skeleton.component';

type TagSeverity = 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast';
type MessageSeverity = 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast';

interface DashboardKpi {
  label: string;
  value: string | number | null;
  icon: string;
  color: string;
  delta?: string;
  deltaUp?: boolean;
  severity: TagSeverity;
}

interface DashboardProcess {
  id: string;
  nucleo: string;
  etapa: string;
  etapaClass: string;
  etapaSeverity: TagSeverity;
  prazo: string;
  prioridade: string;
  prioClass: string;
  prioridadeSeverity: TagSeverity;
}

interface DashboardStep {
  num: number;
  name: string;
  sub: string;
  status: 'done' | 'active' | 'todo';
  statusLabel: string;
  severity: TagSeverity;
  last: boolean;
}

interface DashboardAlert {
  type: 'danger' | 'warn' | 'info';
  icon: string;
  title: string;
  desc: string;
  severity: MessageSeverity;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CardModule,
    ButtonModule,
    TagModule,
    TimelineModule,
    MessageModule,
    DecimalPipe,
    StatisticCardSkeletonComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  loading = signal<boolean>(false);
  summary = signal<DashboardSummary>({
    total_processos: 452,
    processos_ativos: 347,
    processos_concluidos: 105,
    total_reurb_s: 320,
    total_reurb_e: 132,
    total_beneficiarios: 3891,
    beneficiarios_baixa_renda: 2850,
    crfs_emitidas: 84,
    registros_concluidos: 72,
    prazos_classificacao_vencidos: 12,
    tempo_medio_conclusao_dias: 145,
    area_total_regularizada_m2: 45800.5,
  });

  kpis = computed<DashboardKpi[]>(() => [
    {
      label: 'Processos ativos',
      value: this.summary().processos_ativos,
      icon: 'pi-file',
      color: 'blue',
      delta: `${this.summary().total_processos} no total`,
      deltaUp: true,
      severity: 'info',
    },
    {
      label: 'Beneficiários',
      value: this.summary().total_beneficiarios,
      icon: 'pi-users',
      color: 'amber',
      delta: `${this.summary().beneficiarios_baixa_renda} de baixa renda`,
      deltaUp: true,
      severity: 'warn',
    },
    {
      label: 'CRFs Emitidas',
      value: this.summary().crfs_emitidas,
      icon: 'pi-check-circle',
      color: 'green',
      delta: `${this.summary().registros_concluidos} registrados`,
      deltaUp: true,
      severity: 'success',
    },
    {
      label: 'Área Regularizada',
      value: this.summary().area_total_regularizada_m2,
      icon: 'pi-map',
      color: 'purple',
      delta: `${this.summary().tempo_medio_conclusao_dias} dias médios`,
      deltaUp: false,
      severity: 'secondary',
    },
    {
      label: 'REURB-S / REURB-E',
      value: `${this.summary().total_reurb_s} / ${this.summary().total_reurb_e}`,
      icon: 'pi-list',
      color: 'cyan',
      severity: 'contrast',
    },
    {
      label: 'Prazos Vencidos',
      value: this.summary().prazos_classificacao_vencidos,
      icon: 'pi-exclamation-triangle',
      color: 'red',
      delta: 'Requer atenção imediata',
      deltaUp: false,
      severity: 'danger',
    },
  ]);

  processos: DashboardProcess[] = [
    {
      id: 'RU-2025-0482',
      nucleo: 'Vila Nova Esperança',
      etapa: 'Análise',
      etapaClass: 'analise',
      etapaSeverity: 'info',
      prazo: '12 abr',
      prioridade: 'Alta',
      prioClass: 'alta',
      prioridadeSeverity: 'danger',
    },
    {
      id: 'RU-2025-0391',
      nucleo: 'Jardim Primavera II',
      etapa: 'Instrução',
      etapaClass: 'instrucao',
      etapaSeverity: 'warn',
      prazo: '30 abr',
      prioridade: 'Média',
      prioClass: 'media',
      prioridadeSeverity: 'warn',
    },
    {
      id: 'RU-2025-0317',
      nucleo: 'Bairro Santa Luzia',
      etapa: 'Registro',
      etapaClass: 'registro',
      etapaSeverity: 'success',
      prazo: '05 mai',
      prioridade: 'Baixa',
      prioClass: 'baixa',
      prioridadeSeverity: 'success',
    },
    {
      id: 'RU-2025-0298',
      nucleo: 'Comunidade Boa Vista',
      etapa: 'Pendente',
      etapaClass: 'pendente',
      etapaSeverity: 'danger',
      prazo: '08 abr',
      prioridade: 'Alta',
      prioClass: 'alta',
      prioridadeSeverity: 'danger',
    },
  ];

  etapas: DashboardStep[] = [
    {
      num: 1,
      name: 'Instrução processual',
      sub: 'Documentos e requerimentos',
      status: 'done',
      statusLabel: 'Concluída',
      severity: 'success',
      last: false,
    },
    {
      num: 2,
      name: 'Levantamento topográfico',
      sub: 'Planta e memorial descritivo',
      status: 'done',
      statusLabel: 'Concluída',
      severity: 'success',
      last: false,
    },
    {
      num: 3,
      name: 'Análise urbanística',
      sub: 'Aprovação técnica municipal',
      status: 'active',
      statusLabel: 'Em curso',
      severity: 'info',
      last: false,
    },
    {
      num: 4,
      name: 'Notificação / CRF',
      sub: 'Comunicação aos beneficiários',
      status: 'todo',
      statusLabel: 'Pendente',
      severity: 'secondary',
      last: false,
    },
    {
      num: 5,
      name: 'Registro em cartório',
      sub: 'Titulação definitiva',
      status: 'todo',
      statusLabel: 'Pendente',
      severity: 'secondary',
      last: true,
    },
  ];

  alertas: DashboardAlert[] = [
    {
      type: 'danger',
      icon: 'pi-clock',
      title: 'RU-2025-0298 — Prazo vencendo hoje',
      desc: 'Comunidade Boa Vista · 38 beneficiários',
      severity: 'error',
    },
    {
      type: 'warn',
      icon: 'pi-exclamation-circle',
      title: 'RU-2025-0482 — Documentação incompleta',
      desc: 'Vila Nova Esperança · Faltam 3 documentos',
      severity: 'warn',
    },
    {
      type: 'info',
      icon: 'pi-info-circle',
      title: 'RU-2025-0355 — Aguardando parecer jurídico',
      desc: 'Residencial São João · há 5 dias',
      severity: 'info',
    },
  ];
}
