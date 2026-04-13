import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NucleusStore } from './nucleus.store';
import { NucleusFormModel, TagSeverity } from './nucleus.types';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { NucleusFormDialogComponent } from './components/nucleus-form-dialog/nucleus-form-dialog.component';

@Component({
  selector: 'app-nucleus',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TagModule,
    TableModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule,
    NucleusFormDialogComponent,
  ],
  templateUrl: './nucleus.component.html',
  styleUrl: './nucleus.component.scss',
})
export class NucleusComponent {
  private readonly store = inject(NucleusStore);

  searchTerm = '';
  rows = 10;
  displayDialog = false;
  nucleusToEdit: NucleusFormModel | null = null;
  
  readonly situacaoOptions = [
    { label: 'Perímetro Urbano', value: 'Perímetro Urbano' },
    { label: 'Zona de Expansão Urbana', value: 'Zona de Expansão Urbana' },
    { label: 'Zona Rural (em processo)', value: 'Zona Rural' },
  ];

  private readonly selectedId = signal<string | null>(null);
  readonly selectedNucleus = computed(() => {
    const id = this.selectedId();
    return id ? this.store.nuclei().find(n => n.id === id) : null;
  });

  readonly nuclei = computed(() => this.store.nuclei());

  get filteredNuclei(): NucleusFormModel[] {
    const term = this.searchTerm.trim().toLocaleLowerCase('pt-BR');
    if (!term) {
      return this.nuclei();
    }

    return this.nuclei().filter((n) =>
      [
        n.codigo,
        n.nome,
        n.descricao,
        n.situacaoGeografica,
      ]
        .filter(Boolean)
        .some((value) => value.toLocaleLowerCase('pt-BR').includes(term)),
    );
  }

  selectNucleus(data: any): void {
    if (data && 'id' in data) {
      this.selectedId.set(data.id);
    }
  }

  createNucleus(): void {
    this.nucleusToEdit = this.buildEmptyNucleus();
    this.displayDialog = true;
  }

  editNucleus(nucleus: NucleusFormModel): void {
    this.nucleusToEdit = { ...nucleus };
    this.displayDialog = true;
  }

  onSaveNucleus(): void {
    if (this.nucleusToEdit) {
      if (this.nucleusToEdit.id) {
        this.store.updateNucleus(this.nucleusToEdit.id, this.nucleusToEdit);
      } else {
        this.store.createNucleus(this.nucleusToEdit);
      }
    }
    this.displayDialog = false;
    this.nucleusToEdit = null;
  }

  deleteNucleus(nucleus: NucleusFormModel): void {
    this.store.deleteNucleus(nucleus.id);
    if (this.selectedId() === nucleus.id) {
      this.selectedId.set(null);
    }
  }

  onSearchTermChange(value: string): void {
    this.searchTerm = value;
  }

  getConsolidadoSeverity(nucleus: NucleusFormModel): TagSeverity {
    return nucleus.consolidado ? 'success' : 'warn';
  }

  private buildEmptyNucleus(): NucleusFormModel {
    return {
      id: '',
      codigo: '',
      nome: '',
      descricao: '',
      situacaoGeografica: '',
      consolidado: false,
      areaTotalM2: null,
      perimetroM: null,
      numeroFamiliasEstimado: null,
      dataOcupacaoInicial: null,
      municipioId: '',
      poligonalGeorreferenciada: '',
      centroide: '',
      criadoPor: 'usuario-atual',
      criadoEm: '',
      atualizadoPor: '',
      atualizadoEm: '',
    };
  }
}
