import { Injectable, computed, signal, inject } from '@angular/core';
import { Beneficiario } from '../process/process.types';
import { BeneficiaryRepository } from './beneficiaries.repository';
import { GlobalFeedbackService } from '../../core/feedback/global-feedback.service';
import { AsyncState, createInitialAsyncState, updateAsyncError, updateAsyncLoading, updateAsyncSuccess } from '../../core/models/repository.types';

@Injectable({ providedIn: 'root' })
export class BeneficiariesStore {
  private repository = inject(BeneficiaryRepository);
  private feedback = inject(GlobalFeedbackService);
  
  private readonly _beneficiaries = signal<AsyncState<Beneficiario[]>>(createInitialAsyncState([]));
  readonly beneficiariesState = computed(() => this._beneficiaries());
  readonly beneficiaries = computed(() => this._beneficiaries().data || []);

  constructor() {
    this.loadBeneficiaries();
  }

  loadBeneficiaries(): void {
    this._beneficiaries.update(state => updateAsyncLoading(state));
    this.repository.getAll().subscribe({
      next: (items) => this._beneficiaries.set(updateAsyncSuccess(items)),
      error: (err) => {
        console.error('Erro ao carregar beneficiários:', err);
        const errorMessage = err.message || 'Erro ao carregar beneficiários';
        this._beneficiaries.set(updateAsyncError(errorMessage, this._beneficiaries().data));
        this.feedback.notifyError('Erro ao carregar beneficiários', errorMessage);
      },
    });
  }

  list(): Beneficiario[] {
    return this.beneficiaries();
  }

  getById(id: string): Beneficiario | undefined {
    return this.beneficiaries().find((item) => item.id === id);
  }

  createBeneficiary(beneficiary: Partial<Beneficiario>): string {
    const id = this.generateId();
    const payload = {
      ...this.buildEmptyBeneficiary(id),
      ...beneficiary,
    } as Beneficiario;

    this.repository.create(payload).subscribe({
      next: (newBeneficiary) => {
        this._beneficiaries.update(state => ({
          ...state,
          data: [newBeneficiary, ...(state.data || [])]
        }));
        this.feedback.notifySuccess('Beneficiário criado', `O beneficiário ${newBeneficiary.nomeCompleto} foi cadastrado com sucesso.`);
      },
      error: (err) => {
        console.error('Erro ao criar beneficiário:', err);
        this.feedback.notifyError('Erro ao criar beneficiário', err.message);
      },
    });

    return id;
  }

  updateBeneficiary(id: string, changes: Partial<Beneficiario>): void {
    this.repository.update(id, changes).subscribe({
      next: (updatedBeneficiary) => {
        this._beneficiaries.update(state => ({
          ...state,
          data: (state.data || []).map((item) => (item.id === id ? updatedBeneficiary : item))
        }));
        this.feedback.notifySuccess('Beneficiário atualizado', 'As informações foram salvas com sucesso.');
      },
      error: (err) => {
        console.error('Erro ao atualizar beneficiário:', err);
        this.feedback.notifyError('Erro ao atualizar beneficiário', err.message);
      },
    });
  }

  deleteBeneficiary(id: string): void {
    const beneficiary = this.getById(id);
    this.feedback.confirmAction({
      header: 'Confirmar Exclusão',
      message: `Deseja realmente excluir o beneficiário ${beneficiary?.nomeCompleto || id}?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.repository.delete(id).subscribe({
          next: () => {
            this._beneficiaries.update(state => ({
              ...state,
              data: (state.data || []).filter((item) => item.id !== id)
            }));
            this.feedback.notifySuccess('Beneficiário excluído', 'O registro foi removido com sucesso.');
          },
          error: (err) => {
            console.error('Erro ao excluir beneficiário:', err);
            this.feedback.notifyError('Erro ao excluir beneficiário', err.message);
          },
        });
      },
    });
  }

  private buildEmptyBeneficiary(id: string): Beneficiario {
    return {
      id,
      nomeCompleto: '',
      cpf: '',
      rg: '',
      orgaoExpedidor: '',
      dataNascimento: '',
      nacionalidade: '',
      naturalidade: '',
      nomePai: '',
      nomeMae: '',
      estadoCivil: '',
      regimeCasamento: '',
      nomeConjuge: '',
      cpfConjuge: '',
      telefone: '',
      email: '',
      logradouro: '',
      numeroLote: '',
      quadra: '',
      complemento: '',
      areaOcupadaM2: null,
      coordenadasLote: '',
      rendaFamiliarMensal: null,
      numeroDependentes: null,
      tempoOcupacaoAnos: null,
      dataOcupacaoInicial: '',
      rendaFamiliarAte5Sm: false,
      direitoRealConferido: '',
      idoso: false,
      deficiente: false,
      mulherChefeFamilia: false,
      possuiDocumentacaoCompleta: false,
      observacoes: '',
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
