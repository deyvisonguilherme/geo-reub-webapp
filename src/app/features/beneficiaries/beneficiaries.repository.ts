import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Beneficiario } from '../process/process.types';
import { IRepository } from '../../core/repositories/repository.interface';

@Injectable({ providedIn: 'root' })
export class BeneficiaryRepository implements IRepository<Beneficiario> {
  private http = inject(HttpClient);
  private readonly baseUrl = '/api/v1/beneficiaries';

  // Seed data for demonstration
  private seedData: Beneficiario[] = [
    {
      id: '1',
      nomeCompleto: 'João Pereira',
      cpf: '111.222.333-44',
      rg: '44.556.677-8',
      orgaoExpedidor: 'SSP/SP',
      dataNascimento: '1985-05-10',
      nacionalidade: 'Brasileira',
      naturalidade: 'São Paulo/SP',
      nomePai: 'Antônio Pereira',
      nomeMae: 'Maria Silva Pereira',
      estadoCivil: 'Casado',
      regimeCasamento: 'Comunhão Parcial de Bens',
      nomeConjuge: 'Ana Souza Pereira',
      cpfConjuge: '555.666.777-88',
      telefone: '(11) 98888-7777',
      email: 'joao.pereira@email.com',
      logradouro: 'Rua das Flores',
      numeroLote: '12',
      quadra: 'B',
      complemento: 'Casa 1',
      areaOcupadaM2: 150.5,
      coordenadasLote: '-23.5505, -46.6333',
      rendaFamiliarMensal: 3500,
      numeroDependentes: 2,
      tempoOcupacaoAnos: 15,
      dataOcupacaoInicial: '2009-03-20',
      rendaFamiliarAte5Sm: true,
      direitoRealConferido: 'Legitimação Fundiária',
      idoso: false,
      deficiente: false,
      mulherChefeFamilia: false,
      possuiDocumentacaoCompleta: true,
      observacoes: 'Residente antigo do núcleo.',
    },
    {
      id: '2',
      nomeCompleto: 'Maria Oliveira',
      cpf: '222.333.444-55',
      rg: '33.444.555-6',
      orgaoExpedidor: 'SSP/SP',
      dataNascimento: '1970-11-25',
      nacionalidade: 'Brasileira',
      naturalidade: 'Campinas/SP',
      nomePai: 'José Oliveira',
      nomeMae: 'Francisca Oliveira',
      estadoCivil: 'Solteira',
      regimeCasamento: '',
      nomeConjuge: '',
      cpfConjuge: '',
      telefone: '(11) 97777-6666',
      email: 'maria.oliveira@email.com',
      logradouro: 'Avenida Principal',
      numeroLote: '45',
      quadra: 'D',
      complemento: '',
      areaOcupadaM2: 200,
      coordenadasLote: '-23.5510, -46.6340',
      rendaFamiliarMensal: 2800,
      numeroDependentes: 1,
      tempoOcupacaoAnos: 20,
      dataOcupacaoInicial: '2004-06-15',
      rendaFamiliarAte5Sm: true,
      direitoRealConferido: 'Concessão de Uso Especial para Fins de Moradia',
      idoso: true,
      deficiente: false,
      mulherChefeFamilia: true,
      possuiDocumentacaoCompleta: false,
      observacoes: 'Aguardando certidão de nascimento atualizada.',
    },
  ];

  getAll(): Observable<Beneficiario[]> {
    return of(this.seedData);
  }

  getById(id: string): Observable<Beneficiario> {
    const record = this.seedData.find((r) => r.id === id);
    if (record) return of(record);
    throw new Error('Beneficiário não encontrado');
  }

  create(beneficiary: Partial<Beneficiario>): Observable<Beneficiario> {
    const newRecord = { ...beneficiary, id: Math.random().toString(36).substr(2, 9) } as Beneficiario;
    return of(newRecord);
  }

  update(id: string, updates: Partial<Beneficiario>): Observable<Beneficiario> {
    const record = this.seedData.find((r) => r.id === id);
    if (record) return of({ ...record, ...updates });
    throw new Error('Beneficiário não encontrado');
  }

  delete(id: string): Observable<void> {
    return of(undefined);
  }
}
