import { Injectable, computed, signal } from '@angular/core';
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

@Injectable({ providedIn: 'root' })
export class ProcessStore {
  private readonly records = signal<ProcessRecord[]>(this.buildSeedData());
  readonly processes = computed(() => this.records());

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
    this.records.update((items) => [process, ...items]);
    return id;
  }

  deleteProcess(id: string): void {
    this.records.update((items) => items.filter((item) => item.id !== id));
  }

  updateProcess(id: string, changes: Partial<ProcessRecord>): void {
    this.records.update((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              ...changes,
              atualizadoEm: new Date().toISOString().slice(0, 10),
            }
          : item,
      ),
    );
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

  private buildSeedData(): ProcessRecord[] {
    return [
      {
        id: this.generateId(),
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
        pesquisaDominialidade: {
          id: this.generateId(),
          matriculaBase: '34.221',
          cartorioRegistro: '1º CRI Municipal',
          proprietarioIdentificado: true,
          areaPublica: true,
          areaPrivada: false,
          situacaoDominial: 'Área pública municipal com sobreposição parcial resolvida.',
          possuiSobreposicao: true,
          descricaoSobreposicoes: 'Sobreposição parcial com matrícula vizinha já conciliada.',
          arquivoPlantaSobreposicaoId: 'file-planta-001',
          arquivoCertidaoMatriculaId: 'file-cert-001',
          elaboradoPor: 'analista-cartorio',
          dataElaboracao: '2026-02-01',
        },
        titularesConfrontantes: [
          {
            id: this.generateId(),
            tipo: 'Proprietário',
            nomeCompleto: 'Maria de Souza',
            cpfCnpj: '12345678901',
            identificado: true,
            logradouro: 'Rua das Flores',
            numero: '45',
            complemento: '',
            bairro: 'Centro',
            cidade: 'Guava',
            uf: 'SP',
            cep: '12345000',
            notificado: true,
            dataNotificacao: '2026-02-05',
            formaNotificacao: 'AR',
            impugnou: false,
            dataImpugnacao: '',
            arquivoImpugnacaoId: '',
            resultadoImpugnacao: '',
          },
        ],
        estudoTecnico: {
          id: this.generateId(),
          tipoEstudo: 'Ambiental e urbanístico',
          titulo: 'Estudo técnico preliminar Vale Verde',
          resumoExecutivo: 'Área passível de regularização com mitigação de drenagem.',
          conclusoes: 'Viável para continuidade com pequenas adequações.',
          recomendacoes: 'Executar drenagem e ampliar iluminação pública.',
          nivelRisco: 'Baixo',
          necessitaRemocao: false,
          familiasAfetadas: 0,
          responsavelTecnico: 'Ana Engenheira',
          registroProfissional: 'CREA 0001',
          arquivoEstudoId: 'file-estudo-001',
          dataElaboracao: '2026-02-12',
          dataAprovacao: '2026-02-20',
        },
        levantamentosTopograficos: [
          {
            id: this.generateId(),
            sistemaReferencia: 'SIRGAS 2000',
            datum: 'SIRGAS 2000',
            fusoUtm: '23S',
            precisaoPlanimetricaCm: 4.5,
            precisaoAltimetricaCm: 6.2,
            responsavelTecnico: 'Carlos Topografia',
            creaArt: 'ART-2211',
            empresaExecutora: 'Geo Base',
            arquivoPlantaId: 'planta-topo-001',
            arquivoMemorialId: 'memorial-topo-001',
            arquivoShapefileId: 'shape-001',
            dataLevantamento: '2026-02-18',
            dataAprovacao: '2026-02-28',
          },
        ],
        projetoUrbanistico: {
          id: this.generateId(),
          titulo: 'Projeto urbanístico Vale Verde',
          descricao: 'Adequação viária, drenagem e demarcação de lotes.',
          areaIntervencaoM2: 18500,
          numeroLotes: 48,
          sistemaViario: true,
          redeAgua: true,
          redeEsgoto: true,
          drenagem: true,
          energiaEletrica: true,
          iluminacaoPublica: true,
          coletaResiduos: true,
          areasVerdesM2: 1200,
          areasInstitucionaisM2: 450,
          responsavelTecnico: 'Julia Urbanista',
          registroProfissional: 'CAU 9988',
          arquivoProjetoId: 'arq-proj-001',
          arquivoMemorialDescritivoId: 'arq-mem-001',
          arquivoPlantasId: 'arq-plantas-001',
          aprovadoMunicipio: true,
          dataAprovacaoMunicipio: '2026-03-10',
          licencaUrbanistica: 'LU-2026-09',
          licencaAmbiental: 'LA-2026-12',
          contratoCusteioAnexado: false,
          dotacaoOrcamentariaPublica: 'Dotação 15.451.002',
          isencaoEmolumentosPrimeiroRegistro: true,
          fluxoAtoUnico: true,
          bemPublico: true,
        },
        obrasInfraestrutura: [
          {
            id: this.generateId(),
            tipoObra: 'Drenagem',
            descricao: 'Instalação de galerias pluviais no eixo central.',
            especificacoesTecnicas: 'PVC 600mm',
            unidadeMedida: 'm',
            quantidade: 420,
            custoEstimado: 145000,
            obraEssencial: true,
            obraMitigacao: true,
            obraCompensacao: false,
            prazoExecucaoMeses: 4,
            dataPrevistaInicio: '2026-04-10',
            dataPrevistaConclusao: '2026-08-10',
          },
        ],
        termosCompromisso: [
          {
            id: this.generateId(),
            numeroTermo: 'TC-2026-004',
            descricao: 'Execução de drenagem e iluminação.',
            compromissario: 'Município de Guava',
            obrigacoes: 'Executar obras essenciais e apresentar medições.',
            cronograma: 'Abr/2026 a Ago/2026',
            arquivoTermoId: 'file-termo-001',
            assinado: true,
            dataAssinatura: '2026-03-15',
            vigenciaInicio: '2026-03-15',
            vigenciaFim: '2026-12-31',
          },
        ],
        beneficiarios: [
          {
            id: this.generateId(),
            nomeCompleto: 'João Pereira',
            cpf: '11122233344',
            rg: '445566',
            orgaoExpedidor: 'SSP',
            dataNascimento: '1988-06-15',
            nacionalidade: 'Brasileira',
            naturalidade: 'Guava',
            nomePai: 'José Pereira',
            nomeMae: 'Ana Pereira',
            estadoCivil: 'Casado',
            regimeCasamento: 'Comunhão parcial',
            nomeConjuge: 'Lúcia Pereira',
            cpfConjuge: '44433322211',
            telefone: '(11) 99999-0000',
            email: 'joao@guava.test',
            logradouro: 'Rua A',
            numeroLote: '12',
            quadra: 'Q1',
            complemento: '',
            areaOcupadaM2: 180,
            coordenadasLote: 'POINT(-46.63 -23.55)',
            rendaFamiliarMensal: 5200,
            numeroDependentes: 2,
            tempoOcupacaoAnos: 11,
            dataOcupacaoInicial: '2015-02-01',
            rendaFamiliarAte5Sm: true,
            direitoRealConferido: 'Legitimação fundiária',
            idoso: false,
            deficiente: false,
            mulherChefeFamilia: false,
            possuiDocumentacaoCompleta: true,
            observacoes: 'Documentação regular.',
          },
        ],
        beneficiarioDocumentos: [
          {
            id: this.generateId(),
            beneficiarioId: '',
            tipoDocumento: 'CPF',
            arquivoId: 'doc-001',
            validado: true,
            dataValidacao: '2026-03-18',
            validadoPor: 'assist-social',
          },
        ],
        certidaoCrf: {
          id: this.generateId(),
          numeroCrf: 'CRF-2026-001',
          descricaoNucleo: 'Vale Verde',
          areaTotalM2: 18500,
          numeroBeneficiarios: 48,
          modalidadeReurb: 'REURB-S',
          arquivoCrfId: 'file-crf-001',
          arquivoMemorialDescritivoId: 'file-crf-mem-001',
          arquivoProjetoUrbanisticoId: 'file-crf-proj-001',
          arquivoListaBeneficiariosId: 'file-crf-benef-001',
          arquivoPlantaId: 'file-crf-planta-001',
          dataEmissao: '2026-03-20',
          emitidoPor: 'procuradoria',
          valida: true,
          dataCancelamento: '',
          motivoCancelamento: '',
        },
        registrosTitulos: [
          {
            id: this.generateId(),
            beneficiarioId: '',
            numeroItem: 1,
            identificacaoLote: 'Q1-L12',
            areaLoteM2: 180,
            frenteM: 8,
            fundosM: 8,
            lateralDireitaM: 22.5,
            lateralEsquerdaM: 22.5,
            confrontacoes: 'Rua A, lote 13 e área verde.',
          },
        ],
      },
      {
        ...this.buildEmptyProcess(this.generateId(), '2026-03-24'),
        numeroProcesso: 'REURB-2026-002',
        nucleoId: 'nucleo-colina',
        modalidade: 'REURB-E',
        status: 'REQUERIMENTO_PROTOCOLADO',
        legitimadoRequerenteId: 'adv-008',
        tipoLegitimado: 'Proprietário',
        dataInstauracao: '2026-03-11',
        prazoAnaliseAdmissibilidade: '2026-09-11',
        prazoConclusaoEstimado: '2027-02-15',
        observacoes: 'Aguardando pesquisa dominial e contrato de custeio.',
        criadoPor: 'tec-03',
        criadoEm: '2026-03-11',
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
