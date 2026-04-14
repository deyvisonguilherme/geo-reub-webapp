import { Injectable, computed, signal, inject } from '@angular/core';
import { Beneficiario } from '../process/process.types';
import { BeneficiaryRepository } from './beneficiaries.repository';
import { GlobalFeedbackService } from '../../core/feedback/global-feedback.service';

@Injectable({ providedIn: 'root' })
export class BeneficiariesStore {
  private repository = inject(BeneficiaryRepository);
  private feedback = inject(GlobalFeedbackService);
  private readonly records = signal<Beneficiario[]>([]);
  readonly beneficiaries = computed(() => this.records());

  constructor() {
    this.loadBeneficiaries();
  }

  loadBeneficiaries(): void {
    this.repository.getAll().subscribe({
      next: (items) => this.records.set(items),
      error: (err) => console.error('Erro ao carregar beneficiários:', err),
    });
  }

  list(): Beneficiario[] {
    return this.records();
  }

  getById(id: string): Beneficiario | undefined {
    return this.records().find((item) => item.id === id);
  }

  createBeneficiary(beneficiary: Partial<Beneficiario>): string {
    const id = this.generateId();
    const payload = {
      ...this.buildEmptyBeneficiary(id),
      ...beneficiary,
    } as Beneficiario;

    this.repository.create(payload).subscribe({
      next: (newBeneficiary) => {
        this.records.update((items) => [newBeneficiary, ...items]);
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
        this.records.update((items) =>
          items.map((item) => (item.id === id ? updatedBeneficiary : item)),
        );
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
            this.records.update((items) => items.filter((item) => item.id !== id));
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
