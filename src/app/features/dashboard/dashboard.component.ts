import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TimelineModule } from 'primeng/timeline';
import { MessageModule } from 'primeng/message';

type TagSeverity = 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast';
type MessageSeverity = 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast';

interface DashboardKpi {
  label: string;
  value: string;
  icon: string;
  color: string;
  delta: string;
  deltaUp: boolean;
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
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  kpis: DashboardKpi[] = [
    {
      label: 'Processos ativos',
      value: '347',
      icon: 'pi-file',
      color: 'blue',
      delta: '8% vs mês anterior',
      deltaUp: true,
      severity: 'info',
    },
    {
      label: 'Lotes regularizados',
      value: '1.284',
      icon: 'pi-check-circle',
      color: 'green',
      delta: '14% vs mês anterior',
      deltaUp: true,
      severity: 'success',
    },
    {
      label: 'Pendências críticas',
      value: '23',
      icon: 'pi-exclamation-triangle',
      color: 'red',
      delta: 'Requer atenção imediata',
      deltaUp: false,
      severity: 'danger',
    },
    {
      label: 'Beneficiários',
      value: '3.891',
      icon: 'pi-users',
      color: 'amber',
      delta: '5% vs mês anterior',
      deltaUp: true,
      severity: 'warn',
    },
  ];

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
