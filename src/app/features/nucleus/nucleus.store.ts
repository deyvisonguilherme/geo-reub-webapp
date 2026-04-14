import { Injectable, computed, signal, inject } from '@angular/core';
import { NucleusFormModel } from './nucleus.types';
import { NucleusRepository } from './nucleus.repository';
import { GlobalFeedbackService } from '../../core/feedback/global-feedback.service';
import { AsyncState, createInitialAsyncState, updateAsyncError, updateAsyncLoading, updateAsyncSuccess } from '../../core/models/repository.types';

@Injectable({ providedIn: 'root' })
export class NucleusStore {
  private repository = inject(NucleusRepository);
  private feedback = inject(GlobalFeedbackService);
  
  private readonly _nuclei = signal<AsyncState<NucleusFormModel[]>>(createInitialAsyncState([]));
  readonly nucleiState = computed(() => this._nuclei());
  readonly nuclei = computed(() => this._nuclei().data || []);

  constructor() {
    this.loadNuclei();
  }

  loadNuclei(): void {
    this._nuclei.update(state => updateAsyncLoading(state));
    this.repository.getAll().subscribe({
      next: (items) => this._nuclei.set(updateAsyncSuccess(items)),
      error: (err) => {
        console.error('Erro ao carregar núcleos:', err);
        const errorMessage = err.message || 'Erro ao carregar núcleos';
        this._nuclei.set(updateAsyncError(errorMessage, this._nuclei().data));
        this.feedback.notifyError('Erro ao carregar núcleos', errorMessage);
      },
    });
  }

  list(): NucleusFormModel[] {
    return this.nuclei();
  }

  getById(id: string): NucleusFormModel | undefined {
    return this.nuclei().find((item) => item.id === id);
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
        this._nuclei.update(state => ({
          ...state,
          data: [newItem, ...(state.data || [])]
        }));
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
        this._nuclei.update(state => ({
          ...state,
          data: (state.data || []).map((item) => (item.id === id ? updatedItem : item))
        }));
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
            this._nuclei.update(state => ({
              ...state,
              data: (state.data || []).filter((item) => item.id !== id)
            }));
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
