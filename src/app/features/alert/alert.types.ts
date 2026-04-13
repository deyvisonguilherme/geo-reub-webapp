export interface AlertaPrazo {
  id: string;
  processo_id?: string;
  notificacao_id?: string;
  tipo_alerta: string;
  severidade: string; // 'success' | 'warn' | 'info' | 'danger'
  titulo: string;
  mensagem: string;
  prazo_vencimento?: string;
  dias_restantes?: number;
  visualizado: boolean;
  data_visualizacao?: string;
  visualizado_por?: string;
  acao_tomada: boolean;
  descricao_acao?: string;
  criado_em: string;
}
