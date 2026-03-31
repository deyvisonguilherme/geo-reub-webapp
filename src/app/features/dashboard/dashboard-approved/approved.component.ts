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

interface ApprovedDashboardData {
  processo_id: string;
  numero_processo: string;
  modalidade: string;
  nucleo_nome: string;
  area_total_m2: number;
  numero_crf: string;
  data_emissao_crf: string;
  numero_beneficiarios: number;
  dias_ate_crf: number;
  cartorio_registro_imoveis: string;
  status_registro: string;
  data_prenotacao?: string;
  prazo_registro?: string;
  data_registro?: string;
  dias_no_cartorio: number;
  status_prazo_registro: string;
  possui_nota_devolutiva: boolean;
  pendencias_sanadas: boolean;
  isento_custas: boolean;
  valor_custas: number;
}

@Component({
  selector: 'app-dashboard-approved',
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
    DatePipe
  ],
  templateUrl: './approved.component.html',
  styleUrl: './approved.component.scss'
})
export class ApprovedComponent {
  data = signal<ApprovedDashboardData[]>([
    {
      processo_id: '1',
      numero_processo: 'REURB-2026-001',
      modalidade: 'REURB-S',
      nucleo_nome: 'Vale Verde',
      area_total_m2: 25000,
      numero_crf: 'CRF-2026/001',
      data_emissao_crf: '2026-01-15',
      numero_beneficiarios: 120,
      dias_ate_crf: 180,
      cartorio_registro_imoveis: '1º CRI Municipal',
      status_registro: 'REGISTRADO',
      data_prenotacao: '2026-01-20',
      prazo_registro: '2026-02-20',
      data_registro: '2026-02-10',
      dias_no_cartorio: 20,
      status_prazo_registro: 'CONCLUIDO_NO_PRAZO',
      possui_nota_devolutiva: false,
      pendencias_sanadas: true,
      isento_custas: true,
      valor_custas: 0
    },
    {
      processo_id: '2',
      numero_processo: 'REURB-2026-002',
      modalidade: 'REURB-E',
      nucleo_nome: 'Colina Azul',
      area_total_m2: 15000,
      numero_crf: 'CRF-2026/002',
      data_emissao_crf: '2026-02-10',
      numero_beneficiarios: 45,
      dias_ate_crf: 220,
      cartorio_registro_imoveis: '1º CRI Municipal',
      status_registro: 'EM_PRENOTACAO',
      data_prenotacao: '2026-02-15',
      prazo_registro: '2026-03-15',
      dias_no_cartorio: 15,
      status_prazo_registro: 'DENTRO_DO_PRAZO',
      possui_nota_devolutiva: true,
      pendencias_sanadas: false,
      isento_custas: false,
      valor_custas: 4500.50
    }
  ]);

  selectedItem = signal<ApprovedDashboardData | null>(null);

  selectItem(data: any): void {
    if (data && !Array.isArray(data)) {
      this.selectedItem.set(data as ApprovedDashboardData);
    }
  }

  getModalidadeSeverity(modalidade: string): any {
    return modalidade === 'REURB-S' ? 'success' : 'info';
  }

  getStatusRegistroSeverity(status: string): any {
    switch (status) {
      case 'REGISTRADO':
        return 'success';
      case 'EM_PRENOTACAO':
        return 'info';
      case 'PENDENTE_CARTORIO':
        return 'warn';
      case 'NOTA_DEVOLUTIVA':
        return 'danger';
      default:
        return 'secondary';
    }
  }

  getStatusPrazoSeverity(status: string): any {
    if (status.includes('PRAZO') && status.includes('VENCIDO')) return 'danger';
    if (status.includes('PRAZO') && status.includes('DENTRO')) return 'success';
    return 'info';
  }
}
