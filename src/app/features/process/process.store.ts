import { Injectable, computed, signal, inject } from '@angular/core';
import {
  Beneficiario,
  BeneficiarioDocumento,
  CertidaoCrf,
  EstudoTecnico,
  LevantamentoTopografico,
  ObraInfraestrutura,
  PesquisaDominialidade,
  ProcessRecord,
  ProjetoUrbanistico,
  RegistroTitulo,
  TermoCompromisso,
  TitularConfrontante,
} from './process.types';
import { ProcessRepository } from './process.repository';
import { GlobalFeedbackService } from '../../core/feedback/global-feedback.service';

@Injectable({ providedIn: 'root' })
export class ProcessStore {
  private repository = inject(ProcessRepository);
  private feedback = inject(GlobalFeedbackService);
  private readonly records = signal<ProcessRecord[]>([]);
  readonly processes = computed(() => this.records());

  constructor() {
    this.loadProcesses();
  }

  loadProcesses(): void {
    this.repository.getAll().subscribe({
      next: (items) => this.records.set(items),
      error: (err) => {
        console.error('Erro ao carregar processos:', err);
        this.feedback.notifyError('Erro ao carregar processos', err.message);
      },
    });
  }

  list(): ProcessRecord[] {
    return this.records();
  }

  getById(id: string): ProcessRecord | undefined {
    return this.records().find((item) => item.id === id);
  }

  createProcess(): string {
    const id = this.generateId();
    const now = new Date().toISOString().slice(0, 10);
    const process = this.buildEmptyProcess(id, now);
    
    this.repository.create(process).subscribe({
      next: (newProcess) => {
        this.records.update((items) => [newProcess, ...items]);
        this.feedback.notifySuccess('Processo criado', `O processo ${newProcess.numeroProcesso || id} foi criado com sucesso.`);
      },
      error: (err) => {
        console.error('Erro ao criar processo:', err);
        this.feedback.notifyError('Erro ao criar processo', err.message);
      },
    });
    
    return id;
  }

  deleteProcess(id: string): void {
    this.repository.delete(id).subscribe({
      next: () => {
        this.records.update((items) => items.filter((item) => item.id !== id));
        this.feedback.notifySuccess('Processo excluído', 'O processo foi removido com sucesso.');
      },
      error: (err) => {
        console.error('Erro ao excluir processo:', err),
        this.feedback.notifyError('Erro ao excluir processo', err.message);
      }
    });
  }

  updateProcess(id: string, changes: Partial<ProcessRecord>): void {
    const updatedChanges = {
      ...changes,
      atualizadoEm: new Date().toISOString().slice(0, 10),
    };

    this.repository.update(id, updatedChanges).subscribe({
      next: (updatedProcess) => {
        this.records.update((items) =>
          items.map((item) => (item.id === id ? updatedProcess : item)),
        );
        this.feedback.notifySuccess('Processo atualizado', 'As alterações foram salvas com sucesso.');
      },
      error: (err) => {
        console.error('Erro ao atualizar processo:', err);
        this.feedback.notifyError('Erro ao atualizar processo', err.message);
      },
    });
  }

  savePesquisaDominialidade(processId: string, value: PesquisaDominialidade | null): void {
    this.updateProcess(processId, { pesquisaDominialidade: value });
  }

  saveTitulares(processId: string, value: TitularConfrontante[]): void {
    this.updateProcess(processId, { titularesConfrontantes: value });
  }

  saveEstudoTecnico(processId: string, value: EstudoTecnico | null): void {
    this.updateProcess(processId, { estudoTecnico: value });
  }

  saveLevantamentos(processId: string, value: LevantamentoTopografico[]): void {
    this.updateProcess(processId, { levantamentosTopograficos: value });
  }

  saveProjetoUrbanistico(processId: string, value: ProjetoUrbanistico | null): void {
    this.updateProcess(processId, { projetoUrbanistico: value });
  }

  saveObras(processId: string, value: ObraInfraestrutura[]): void {
    this.updateProcess(processId, { obrasInfraestrutura: value });
  }

  saveTermos(processId: string, value: TermoCompromisso[]): void {
    this.updateProcess(processId, { termosCompromisso: value });
  }

  saveBeneficiarios(processId: string, value: Beneficiario[]): void {
    this.updateProcess(processId, { beneficiarios: value });
  }

  saveBeneficiarioDocumentos(processId: string, value: BeneficiarioDocumento[]): void {
    this.updateProcess(processId, { beneficiarioDocumentos: value });
  }

  saveCertidaoCrf(processId: string, value: CertidaoCrf | null): void {
    this.updateProcess(processId, { certidaoCrf: value });
  }

  saveRegistrosTitulos(processId: string, value: RegistroTitulo[]): void {
    this.updateProcess(processId, { registrosTitulos: value });
  }

  private buildEmptyProcess(id: string, today: string): ProcessRecord {
    return {
      id,
      numeroProcesso: '',
      nucleoId: '',
      modalidade: '',
      status: 'REQUERIMENTO_PROTOCOLADO',
      legitimadoRequerenteId: '',
      tipoLegitimado: '',
      dataInstauracao: today,
      prazoAnaliseAdmissibilidade: '',
      prazoConclusaoEstimado: '',
      dataConclusao: '',
      arquivoRequerimentoId: '',
      observacoes: '',
      criadoPor: 'usuario-atual',
      criadoEm: today,
      atualizadoPor: '',
      atualizadoEm: '',
      pesquisaDominialidade: null,
      titularesConfrontantes: [],
      estudoTecnico: null,
      levantamentosTopograficos: [],
      projetoUrbanistico: null,
      obrasInfraestrutura: [],
      termosCompromisso: [],
      beneficiarios: [],
      beneficiarioDocumentos: [],
      certidaoCrf: null,
      registrosTitulos: [],
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
