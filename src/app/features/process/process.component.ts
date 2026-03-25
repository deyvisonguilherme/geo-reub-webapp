import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProcessStore } from './process.store';
import { ProcessRecord } from './process.types';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, TagModule],
  templateUrl: './process.component.html',
  styleUrl: './process.component.scss',
})
export class ProcessComponent {
  private readonly router = inject(Router);
  private readonly store = inject(ProcessStore);

  readonly rowSizeOptions = [5, 10, 20, 50];
  searchTerm = '';
  rows = 10;
  currentPage = 1;

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

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredProcesses.length / this.rows));
  }

  get paginatedProcesses(): ProcessRecord[] {
    const start = (this.currentPage - 1) * this.rows;
    return this.filteredProcesses.slice(start, start + this.rows);
  }

  get pageStart(): number {
    if (!this.filteredProcesses.length) {
      return 0;
    }

    return (this.currentPage - 1) * this.rows + 1;
  }

  get pageEnd(): number {
    return Math.min(this.currentPage * this.rows, this.filteredProcesses.length);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  createProcess(): void {
    const id = this.store.createProcess();
    void this.router.navigate(['/process', id]);
  }

  editProcess(process: ProcessRecord): void {
    void this.router.navigate(['/process', process.id]);
  }

  deleteProcess(process: ProcessRecord): void {
    this.store.deleteProcess(process.id);
    this.currentPage = Math.min(this.currentPage, this.totalPages);
  }

  goToPage(page: number): void {
    this.currentPage = Math.min(Math.max(page, 1), this.totalPages);
  }

  onRowsChange(value: number): void {
    this.rows = Number(value);
    this.currentPage = 1;
  }

  onSearchTermChange(value: string): void {
    this.searchTerm = value;
    this.currentPage = 1;
  }

  getCompletionLabel(process: ProcessRecord): string {
    const score = [
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

    return `${score}/5 etapas`;
  }
}
