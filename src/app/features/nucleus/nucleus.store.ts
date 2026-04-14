import { Injectable, computed, signal, inject } from '@angular/core';
import { NucleusFormModel } from './nucleus.types';
import { NucleusRepository } from './nucleus.repository';
import { GlobalFeedbackService } from '../../core/feedback/global-feedback.service';

@Injectable({ providedIn: 'root' })
export class NucleusStore {
  private repository = inject(NucleusRepository);
  private feedback = inject(GlobalFeedbackService);
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
        this.feedback.notifySuccess('Núcleo criado', `O núcleo ${newItem.nome} foi criado com sucesso.`);
      },
      error: (err) => {
        console.error('Erro ao criar núcleo:', err);
        this.feedback.notifyError('Erro ao criar núcleo', err.message);
      },
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
        this.feedback.notifySuccess('Núcleo atualizado', 'As informações foram salvas com sucesso.');
      },
      error: (err) => {
        console.error('Erro ao atualizar núcleo:', err);
        this.feedback.notifyError('Erro ao atualizar núcleo', err.message);
      },
    });
  }

  deleteNucleus(id: string): void {
    const nucleus = this.getById(id);
    this.feedback.confirmAction({
      header: 'Confirmar Exclusão',
      message: `Deseja realmente excluir o núcleo ${nucleus?.nome || id}?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.repository.delete(id).subscribe({
          next: () => {
            this.records.update((items) => items.filter((item) => item.id !== id));
            this.feedback.notifySuccess('Núcleo excluído', 'O registro foi removido com sucesso.');
          },
          error: (err) => {
            console.error('Erro ao excluir núcleo:', err);
            this.feedback.notifyError('Erro ao excluir núcleo', err.message);
          },
        });
      },
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
