import { Injectable, computed, signal, inject } from '@angular/core';
import { NucleusFormModel } from './nucleus.types';
import { NucleusRepository } from './nucleus.repository';

@Injectable({ providedIn: 'root' })
export class NucleusStore {
  private repository = inject(NucleusRepository);
  private readonly records = signal<NucleusFormModel[]>([]);
  readonly nuclei = computed(() => this.records());

  constructor() {
    this.loadNuclei();
  }

  loadNuclei(): void {
    this.repository.getAll().subscribe({
      next: (items) => this.records.set(items),
      error: (err) => console.error('Erro ao carregar núcleos:', err),
    });
  }

  list(): NucleusFormModel[] {
    return this.records();
  }

  getById(id: string): NucleusFormModel | undefined {
    return this.records().find((item) => item.id === id);
  }

  createNucleus(nucleus: Partial<NucleusFormModel>): string {
    const id = this.generateId();
    const payload = {
      ...this.buildEmptyNucleus(id),
      ...nucleus,
      criadoEm: new Date().toISOString(),
    } as NucleusFormModel;

    this.repository.create(payload).subscribe({
      next: (newItem) => {
        this.records.update((items) => [newItem, ...items]);
      },
      error: (err) => console.error('Erro ao criar núcleo:', err),
    });

    return id;
  }

  updateNucleus(id: string, changes: Partial<NucleusFormModel>): void {
    const updatedChanges = {
      ...changes,
      atualizadoEm: new Date().toISOString(),
    };

    this.repository.update(id, updatedChanges).subscribe({
      next: (updatedItem) => {
        this.records.update((items) =>
          items.map((item) => (item.id === id ? updatedItem : item)),
        );
      },
      error: (err) => console.error('Erro ao atualizar núcleo:', err),
    });
  }

  deleteNucleus(id: string): void {
    this.repository.delete(id).subscribe({
      next: () => {
        this.records.update((items) => items.filter((item) => item.id !== id));
      },
      error: (err) => console.error('Erro ao excluir núcleo:', err),
    });
  }

  private buildEmptyNucleus(id: string): NucleusFormModel {
    return {
      id,
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

  private generateId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
      const rand = Math.floor(Math.random() * 16);
      const value = char === 'x' ? rand : (rand & 0x3) | 0x8;
      return value.toString(16);
    });
  }
}
