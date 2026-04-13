export interface PendingNotification {
  id: string;
  processo_id: string;
  numero_processo: string;
  destinatario: string;
  tipo: 'TITULAR' | 'CONFRONTANTE' | 'OUTRO';
  status_ar: 'PENDENTE' | 'ENVIADO' | 'ENTREGUE' | 'RECUSADO' | 'AUSENTE' | 'EDITAL';
  codigo_rastreio?: string;
  data_envio?: string;
  prazo_vencimento?: string;
}

export interface TacitAgreement {
  id: string;
  numero_processo: string;
  notificado: string;
  data_entrega_ar: string;
  prazo_dias: number;
  data_vencimento: string;
  status: 'AGUARDANDO' | 'CONSOLIDADO';
}

export interface RegistryDeadline {
  id: string;
  numero_processo: string;
  cartorio: string;
  data_prenotacao: string;
  prazo_vencimento: string;
  possui_nota_devolutiva: boolean;
  dias_restantes: number;
}
