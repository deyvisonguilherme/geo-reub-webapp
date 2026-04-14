import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProcessStore } from './process.store';
import { ProcessRecord } from './process.types';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { TagSeverity } from '../nucleus/nucleus.types';
import { GlobalFeedbackService } from '../../core/feedback/global-feedback.service';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { StatusBadgeComponent } from '../../shared/ui/badge/status-badge.component';
import { HasPermissionDirective } from '../../shared/directives/has-permission.directive';
import { TableSkeletonComponent } from '../../shared/ui/skeletons/table-skeleton/table-skeleton.component';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TagModule,
    TableModule,
    InputTextModule,
    SelectModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule,
    ButtonComponent,
    StatusBadgeComponent,
    HasPermissionDirective,
    TableSkeletonComponent,
  ],
  templateUrl: './process.component.html',
  styleUrl: './process.component.scss',
})
export class ProcessComponent {
  private readonly router = inject(Router);
  protected readonly store = inject(ProcessStore);
  private readonly feedback = inject(GlobalFeedbackService);

  readonly rowSizeOptions = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '50', value: 50 },
  ];

  searchTerm = '';
  rows = 10;
  
  private readonly selectedId = signal<string | null>(null);
  readonly selectedProcess = computed(() => {
    const id = this.selectedId();
    return id ? this.processes().find(p => p.id === id) : null;
  });

  readonly processes = computed(() => this.store.processes());

  get filteredProcesses(): ProcessRecord[] {
    const term = this.searchTerm.trim().toLocaleLowerCase('pt-BR');
    if (!term) {
      return this.processes();
    }

    return this.processes().filter((process) =>
      [
        process.numeroProcesso,
        process.nucleoId,
        process.modalidade,
        process.status,
        process.tipoLegitimado,
      ]
        .filter(Boolean)
        .some((value) => value.toLocaleLowerCase('pt-BR').includes(term)),
    );
  }

  selectProcess(data: any): void {
    if (data && 'id' in data) {
      this.selectedId.set(data.id);
    }
  }

  createProcess(): void {
    const id = this.store.createProcess();
    void this.router.navigate(['/process', id]);
  }

  editProcess(process: ProcessRecord): void {
    void this.router.navigate(['/process', process.id]);
  }

  deleteProcess(process: ProcessRecord): void {
    this.feedback.confirmAction({
      header: 'Confirmar Exclusão',
      message: `Deseja realmente excluir o processo ${process.numeroProcesso || process.id}? Esta ação não pode ser desfeita.`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.deleteProcess(process.id);
        if (this.selectedId() === process.id) {
          this.selectedId.set(null);
        }
      },
    });
  }

  onSearchTermChange(value: string): void {
    this.searchTerm = value;
  }

  getCompletionLabel(process: ProcessRecord): string {
    const score = this.calculateScore(process);
    return `${score}/5 etapas`;
  }

  getSeverity(process: ProcessRecord): TagSeverity {
    const score = this.calculateScore(process);
    if (score === 5) return 'success';
    if (score >= 3) return 'info';
    if (score >= 1) return 'warn';
    return 'secondary';
  }

  private calculateScore(process: ProcessRecord): number {
    return [
      Boolean(
        process.numeroProcesso &&
        process.nucleoId &&
        process.modalidade &&
        process.legitimadoRequerenteId,
      ),
      Boolean(process.pesquisaDominialidade && process.titularesConfrontantes.length),
      Boolean(
        process.estudoTecnico &&
        process.levantamentosTopograficos.length &&
        process.projetoUrbanistico,
      ),
      Boolean(process.beneficiarios.length),
      Boolean(process.certidaoCrf && process.registrosTitulos.length),
    ].filter(Boolean).length;
  }
}
