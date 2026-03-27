export interface NucleusFormModel {
  id: string;
  codigo: string;
  nome: string;
  descricao: string;
  situacaoGeografica: string;
  consolidado: boolean;
  areaTotalM2: number | null;
  perimetroM: number | null;
  numeroFamiliasEstimado: number | null;
  dataOcupacaoInicial: string | null;
  municipioId: string;
  poligonalGeorreferenciada: string;
  centroide: string;
  criadoPor: string;
  criadoEm: string;
  atualizadoPor: string;
  atualizadoEm: string;
}

export type TagSeverity = 'success' | 'info' | 'warn' | 'danger' | 'secondary';
