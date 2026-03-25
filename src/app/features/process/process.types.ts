export type ReurbModalidade = 'REURB-S' | 'REURB-E' | '';

export interface PesquisaDominialidade {
  id: string;
  matriculaBase: string;
  cartorioRegistro: string;
  proprietarioIdentificado: boolean;
  areaPublica: boolean;
  areaPrivada: boolean;
  situacaoDominial: string;
  possuiSobreposicao: boolean;
  descricaoSobreposicoes: string;
  arquivoPlantaSobreposicaoId: string;
  arquivoCertidaoMatriculaId: string;
  elaboradoPor: string;
  dataElaboracao: string;
}

export interface TitularConfrontante {
  id: string;
  tipo: string;
  nomeCompleto: string;
  cpfCnpj: string;
  identificado: boolean;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  notificado: boolean;
  dataNotificacao: string;
  formaNotificacao: string;
  impugnou: boolean;
  dataImpugnacao: string;
  arquivoImpugnacaoId: string;
  resultadoImpugnacao: string;
}

export interface EstudoTecnico {
  id: string;
  tipoEstudo: string;
  titulo: string;
  resumoExecutivo: string;
  conclusoes: string;
  recomendacoes: string;
  nivelRisco: string;
  necessitaRemocao: boolean;
  familiasAfetadas: number | null;
  responsavelTecnico: string;
  registroProfissional: string;
  arquivoEstudoId: string;
  dataElaboracao: string;
  dataAprovacao: string;
}

export interface LevantamentoTopografico {
  id: string;
  sistemaReferencia: string;
  datum: string;
  fusoUtm: string;
  precisaoPlanimetricaCm: number | null;
  precisaoAltimetricaCm: number | null;
  responsavelTecnico: string;
  creaArt: string;
  empresaExecutora: string;
  arquivoPlantaId: string;
  arquivoMemorialId: string;
  arquivoShapefileId: string;
  dataLevantamento: string;
  dataAprovacao: string;
}

export interface ProjetoUrbanistico {
  id: string;
  titulo: string;
  descricao: string;
  areaIntervencaoM2: number | null;
  numeroLotes: number | null;
  sistemaViario: boolean;
  redeAgua: boolean;
  redeEsgoto: boolean;
  drenagem: boolean;
  energiaEletrica: boolean;
  iluminacaoPublica: boolean;
  coletaResiduos: boolean;
  areasVerdesM2: number | null;
  areasInstitucionaisM2: number | null;
  responsavelTecnico: string;
  registroProfissional: string;
  arquivoProjetoId: string;
  arquivoMemorialDescritivoId: string;
  arquivoPlantasId: string;
  aprovadoMunicipio: boolean;
  dataAprovacaoMunicipio: string;
  licencaUrbanistica: string;
  licencaAmbiental: string;
  contratoCusteioAnexado: boolean;
  dotacaoOrcamentariaPublica: string;
  isencaoEmolumentosPrimeiroRegistro: boolean;
  fluxoAtoUnico: boolean;
  bemPublico: boolean;
}

export interface ObraInfraestrutura {
  id: string;
  tipoObra: string;
  descricao: string;
  especificacoesTecnicas: string;
  unidadeMedida: string;
  quantidade: number | null;
  custoEstimado: number | null;
  obraEssencial: boolean;
  obraMitigacao: boolean;
  obraCompensacao: boolean;
  prazoExecucaoMeses: number | null;
  dataPrevistaInicio: string;
  dataPrevistaConclusao: string;
}

export interface TermoCompromisso {
  id: string;
  numeroTermo: string;
  descricao: string;
  compromissario: string;
  obrigacoes: string;
  cronograma: string;
  arquivoTermoId: string;
  assinado: boolean;
  dataAssinatura: string;
  vigenciaInicio: string;
  vigenciaFim: string;
}

export interface Beneficiario {
  id: string;
  nomeCompleto: string;
  cpf: string;
  rg: string;
  orgaoExpedidor: string;
  dataNascimento: string;
  nacionalidade: string;
  naturalidade: string;
  nomePai: string;
  nomeMae: string;
  estadoCivil: string;
  regimeCasamento: string;
  nomeConjuge: string;
  cpfConjuge: string;
  telefone: string;
  email: string;
  logradouro: string;
  numeroLote: string;
  quadra: string;
  complemento: string;
  areaOcupadaM2: number | null;
  coordenadasLote: string;
  rendaFamiliarMensal: number | null;
  numeroDependentes: number | null;
  tempoOcupacaoAnos: number | null;
  dataOcupacaoInicial: string;
  rendaFamiliarAte5Sm: boolean;
  direitoRealConferido: string;
  idoso: boolean;
  deficiente: boolean;
  mulherChefeFamilia: boolean;
  possuiDocumentacaoCompleta: boolean;
  observacoes: string;
}

export interface BeneficiarioDocumento {
  id: string;
  beneficiarioId: string;
  tipoDocumento: string;
  arquivoId: string;
  validado: boolean;
  dataValidacao: string;
  validadoPor: string;
}

export interface CertidaoCrf {
  id: string;
  numeroCrf: string;
  descricaoNucleo: string;
  areaTotalM2: number | null;
  numeroBeneficiarios: number | null;
  modalidadeReurb: ReurbModalidade;
  arquivoCrfId: string;
  arquivoMemorialDescritivoId: string;
  arquivoProjetoUrbanisticoId: string;
  arquivoListaBeneficiariosId: string;
  arquivoPlantaId: string;
  dataEmissao: string;
  emitidoPor: string;
  valida: boolean;
  dataCancelamento: string;
  motivoCancelamento: string;
}

export interface RegistroTitulo {
  id: string;
  beneficiarioId: string;
  numeroItem: number | null;
  identificacaoLote: string;
  areaLoteM2: number | null;
  frenteM: number | null;
  fundosM: number | null;
  lateralDireitaM: number | null;
  lateralEsquerdaM: number | null;
  confrontacoes: string;
}

export interface ProcessRecord {
  id: string;
  numeroProcesso: string;
  nucleoId: string;
  modalidade: ReurbModalidade;
  status: string;
  legitimadoRequerenteId: string;
  tipoLegitimado: string;
  dataInstauracao: string;
  prazoAnaliseAdmissibilidade: string;
  prazoConclusaoEstimado: string;
  dataConclusao: string;
  arquivoRequerimentoId: string;
  observacoes: string;
  criadoPor: string;
  criadoEm: string;
  atualizadoPor: string;
  atualizadoEm: string;
  pesquisaDominialidade: PesquisaDominialidade | null;
  titularesConfrontantes: TitularConfrontante[];
  estudoTecnico: EstudoTecnico | null;
  levantamentosTopograficos: LevantamentoTopografico[];
  projetoUrbanistico: ProjetoUrbanistico | null;
  obrasInfraestrutura: ObraInfraestrutura[];
  termosCompromisso: TermoCompromisso[];
  beneficiarios: Beneficiario[];
  beneficiarioDocumentos: BeneficiarioDocumento[];
  certidaoCrf: CertidaoCrf | null;
  registrosTitulos: RegistroTitulo[];
}
