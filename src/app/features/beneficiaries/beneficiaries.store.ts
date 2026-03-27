import { Injectable, computed, signal } from '@angular/core';
import { Beneficiario } from '../process/process.types';

@Injectable({ providedIn: 'root' })
export class BeneficiariesStore {
  private readonly records = signal<Beneficiario[]>(this.buildSeedData());
  readonly beneficiaries = computed(() => this.records());

  list(): Beneficiario[] {
    return this.records();
  }

  getById(id: string): Beneficiario | undefined {
    return this.records().find((item) => item.id === id);
  }

  createBeneficiary(beneficiary: Partial<Beneficiario>): string {
    const id = this.generateId();
    const newBeneficiary = {
      ...this.buildEmptyBeneficiary(id),
      ...beneficiary,
    } as Beneficiario;
    this.records.update((items) => [newBeneficiary, ...items]);
    return id;
  }

  updateBeneficiary(id: string, changes: Partial<Beneficiario>): void {
    this.records.update((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              ...changes,
            }
          : item,
      ),
    );
  }

  deleteBeneficiary(id: string): void {
    this.records.update((items) => items.filter((item) => item.id !== id));
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

  private buildSeedData(): Beneficiario[] {
    return [
      {
        id: this.generateId(),
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
        id: this.generateId(),
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
  }

  private generateId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
      const rand = Math.floor(Math.random() * 16);
      const value = char === 'x' ? rand : (rand & 0x3) | 0x8;
      return value.toString(16);
    });
  }
}
