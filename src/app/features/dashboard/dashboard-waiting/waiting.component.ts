import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { RouterModule, RouterLink } from '@angular/router';

interface WaitingProcess {
  processo_id: string;
  numero_processo: string;
  modalidade: string;
  status: string;
  nucleo_nome: string;
  tipo_aguardo: string;
  dias_aguardando: number;
  responsavel_acao: string;
  prazo_critico: boolean;
  data_instauracao: string;
  ultima_atualizacao: string;
  cartorio_registro_imoveis?: string;
  possui_nota_devolutiva: boolean;
  notificacoes_vencidas: number;
}

@Component({
  selector: 'app-waiting',
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
    RouterLink
  ],
  templateUrl: './waiting.component.html',
  styleUrl: './waiting.component.scss'
})
export class WaitingComponent {
  processes = signal<WaitingProcess[]>([
    {
      processo_id: '1',
      numero_processo: 'REURB-2026-001',
      modalidade: 'REURB-S',
      status: 'AGUARDANDO_CARTORIO',
      nucleo_nome: 'Vale Verde',
      tipo_aguardo: 'Registro de Títulos',
      dias_aguardando: 15,
      responsavel_acao: 'Cartório do 1º Ofício',
      prazo_critico: true,
      data_instauracao: '2026-01-10',
      ultima_atualizacao: '2026-03-15T10:00:00Z',
      cartorio_registro_imoveis: '1º CRI Municipal',
      possui_nota_devolutiva: true,
      notificacoes_vencidas: 0,
    },
    {
      processo_id: '2',
      numero_processo: 'REURB-2026-002',
      modalidade: 'REURB-E',
      status: 'PENDENCIA_TECNICA',
      nucleo_nome: 'Colina Azul',
      tipo_aguardo: 'Estudo Ambiental',
      dias_aguardando: 8,
      responsavel_acao: 'Consultor Técnico',
      prazo_critico: false,
      data_instauracao: '2026-02-05',
      ultima_atualizacao: '2026-03-22T14:30:00Z',
      possui_nota_devolutiva: false,
      notificacoes_vencidas: 1,
    },
    {
      processo_id: '3',
      numero_processo: 'REURB-2026-005',
      modalidade: 'REURB-S',
      status: 'AGUARDANDO_MANIFESTACAO',
      nucleo_nome: 'Jardim Primavera',
      tipo_aguardo: 'Resposta à Notificação',
      dias_aguardando: 22,
      responsavel_acao: 'Confrontantes',
      prazo_critico: true,
      data_instauracao: '2025-12-15',
      ultima_atualizacao: '2026-03-10T09:00:00Z',
      possui_nota_devolutiva: false,
      notificacoes_vencidas: 3,
    }
  ]);

  selectedProcess = signal<WaitingProcess | null>(null);

  selectProcess(data: any): void {
    if (data && !Array.isArray(data)) {
      this.selectedProcess.set(data as WaitingProcess);
    }
  }

  getStatusSeverity(status: string): any {
    switch (status) {
      case 'AGUARDANDO_CARTORIO':
        return 'warn';
      case 'PENDENCIA_TECNICA':
        return 'danger';
      case 'AGUARDANDO_MANIFESTACAO':
        return 'info';
      default:
        return 'secondary';
    }
  }

  getModalidadeSeverity(modalidade: string): any {
    return modalidade === 'REURB-S' ? 'success' : 'info';
  }
}
