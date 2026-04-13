import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ProcessRecord } from './process.types';
import { handleRepositoryError } from '../../core/utils/repository-errors';

@Injectable({ providedIn: 'root' })
export class ProcessRepository {
  private http = inject(HttpClient);
  private readonly baseUrl = '/api/v1/processes';

  // Seed data for demonstration/initial state
  private seedData: ProcessRecord[] = [
    {
      id: '1',
      numeroProcesso: 'REURB-2026-001',
      nucleoId: 'nucleo-vale-verde',
      modalidade: 'REURB-S',
      status: 'CLASSIFICACAO_CONCLUIDA',
      legitimadoRequerenteId: 'assoc-001',
      tipoLegitimado: 'Associação de moradores',
      dataInstauracao: '2026-01-12',
      prazoAnaliseAdmissibilidade: '2026-07-12',
      prazoConclusaoEstimado: '2026-11-30',
      dataConclusao: '',
      arquivoRequerimentoId: 'file-req-001',
      observacoes: 'Núcleo consolidado em área pública com prioridade social.',
      criadoPor: 'tec-01',
      criadoEm: '2026-01-12',
      atualizadoPor: 'tec-02',
      atualizadoEm: '2026-03-20',
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
    },
    {
      id: '2',
      numeroProcesso: 'REURB-2026-002',
      nucleoId: 'nucleo-colina',
      modalidade: 'REURB-E',
      status: 'REQUERIMENTO_PROTOCOLADO',
      legitimadoRequerenteId: 'adv-008',
      tipoLegitimado: 'Proprietário',
      dataInstauracao: '2026-03-11',
      prazoAnaliseAdmissibilidade: '2026-09-11',
      prazoConclusaoEstimado: '2027-02-15',
      dataConclusao: '',
      arquivoRequerimentoId: '',
      observacoes: 'Aguardando pesquisa dominial e contrato de custeio.',
      criadoPor: 'tec-03',
      criadoEm: '2026-03-11',
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
    },
  ];

  getAll(): Observable<ProcessRecord[]> {
    // In a real scenario, this would be:
    // return this.http.get<ProcessRecord[]>(this.baseUrl).pipe(catchError(handleRepositoryError));
    return of(this.seedData);
  }

  getById(id: string): Observable<ProcessRecord> {
    const record = this.seedData.find((r) => r.id === id);
    if (record) {
      return of(record);
    }
    // Simulate 404
    throw new Error('Processo não encontrado');
  }

  create(process: Partial<ProcessRecord>): Observable<ProcessRecord> {
    const newRecord = { ...process, id: Math.random().toString(36).substr(2, 9) } as ProcessRecord;
    return of(newRecord);
  }

  update(id: string, updates: Partial<ProcessRecord>): Observable<ProcessRecord> {
    const record = this.seedData.find((r) => r.id === id);
    if (record) {
      return of({ ...record, ...updates });
    }
    throw new Error('Processo não encontrado');
  }

  delete(id: string): Observable<void> {
    return of(undefined);
  }
}
