export type TagSeverity = 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast';

export interface Nucleus {
  id: string;
  codigo: string;
  nome: string;
  descricao: string;
  situacaoGeografica: string;
  areaTotalM2: number | null;
  perimetroM: number | null;
  poligonalGeorreferenciada: string;
  centroide: string;
  consolidado: boolean;
  dataOcupacaoInicial: Date | null;
  numeroFamiliasEstimado: number | null;
  municipioId: string;
  criadoPor: string;
  criadoEm: Date;
  atualizadoPor: string;
  atualizadoEm: Date | null;
}

export type NucleusFormModel = Omit<Nucleus, 'criadoEm' | 'atualizadoEm'>;
