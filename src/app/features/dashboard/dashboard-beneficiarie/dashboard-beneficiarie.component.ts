import { Component, signal } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { RouterLink } from '@angular/router';

interface BeneficiarieDashboardData {
  processo_id: string;
  numero_processo: string;
  modalidade: string;
  nucleo_nome: string;
  total_beneficiarios: number;
  baixa_renda: number;
  renda_superior: number;
  idosos: number;
  deficientes: number;
  mulheres_chefe_familia: number;
  tempo_medio_ocupacao: number;
  area_total_ocupada: number;
  area_media_lote: number;
  docs_completos: number;
  docs_pendentes: number;
  percentual_docs_completos: number;
}

@Component({
  selector: 'app-dashboard-beneficiarie',
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
    ProgressBarModule,
    RouterLink,
    DecimalPipe
  ],
  templateUrl: './dashboard-beneficiarie.html',
  styleUrl: './dashboard-beneficiarie.scss'
})
export class DashboardBeneficiarieComponent {
  data = signal<BeneficiarieDashboardData[]>([
    {
      processo_id: '1',
      numero_processo: 'REURB-2026-001',
      modalidade: 'REURB-S',
      nucleo_nome: 'Vale Verde',
      total_beneficiarios: 120,
      baixa_renda: 100,
      renda_superior: 20,
      idosos: 15,
      deficientes: 5,
      mulheres_chefe_familia: 45,
      tempo_medio_ocupacao: 12.5,
      area_total_ocupada: 25000,
      area_media_lote: 200,
      docs_completos: 90,
      docs_pendentes: 30,
      percentual_docs_completos: 75
    },
    {
      processo_id: '2',
      numero_processo: 'REURB-2026-002',
      modalidade: 'REURB-E',
      nucleo_nome: 'Colina Azul',
      total_beneficiarios: 45,
      baixa_renda: 10,
      renda_superior: 35,
      idosos: 8,
      deficientes: 2,
      mulheres_chefe_familia: 12,
      tempo_medio_ocupacao: 5.2,
      area_total_ocupada: 15000,
      area_media_lote: 320,
      docs_completos: 40,
      docs_pendentes: 5,
      percentual_docs_completos: 88.8
    }
  ]);

  selectedItem = signal<BeneficiarieDashboardData | null>(null);

  selectItem(item: any): void {
    if (item && !Array.isArray(item)) {
      this.selectedItem.set(item as BeneficiarieDashboardData);
    }
  }

  getModalidadeSeverity(modalidade: string): any {
    return modalidade === 'REURB-S' ? 'success' : 'info';
  }

  getDocPercentageSeverity(percentage: number): any {
    if (percentage >= 90) return 'success';
    if (percentage >= 60) return 'warn';
    return 'danger';
  }
}
