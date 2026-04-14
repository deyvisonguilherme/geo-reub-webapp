import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'processStatus',
  standalone: true
})
export class ProcessStatusPipe implements PipeTransform {
  private readonly statusMap: Record<string, string> = {
    'REQUERIMENTO_PROTOCOLADO': 'Protocolado',
    'ANALISE_ADMISSIBILIDADE': 'Admissibilidade',
    'ESTUDOS_TECNICOS': 'Estudos Técnicos',
    'LEVANTAMENTO_TOPOGRAFICO': 'Topografia',
    'PROJETO_URBANISTICO': 'Projeto Urbanístico',
    'CLASSIFICACAO_CONCLUIDA': 'Classificação Concluída',
    'CERTIDAO_CRF_EMITIDA': 'CRF Emitida',
    'REGISTRO_CARTORIO': 'Registro em Cartório',
    'FINALIZADO': 'Finalizado'
  };

  transform(value: string | null | undefined): string {
    if (!value) return 'Pendente';
    return this.statusMap[value] || value;
  }
}
