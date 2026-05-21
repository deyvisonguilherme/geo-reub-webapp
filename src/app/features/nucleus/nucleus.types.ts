export interface NucleoResponse {
  id: string;
  codigo: string;
  nome: string;
  descricao: string | null;
  situacao_geografica: string | null;
  area_total_m2: number | null;
  perimetro_m: number | null;
  poligonal_georreferenciada: string | null;
  centroide: string | null;
  consolidado: boolean;
  data_ocupacao_inicial: string | null;
  numero_familias_estimado: number | null;
  municipio_id: string | null;
  criado_por: string;
  criado_em: string;
  atualizado_por: string | null;
  atualizado_em: string | null;
}

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
