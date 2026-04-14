export interface NotificationEvent {
  severity: 'success' | 'info' | 'warn' | 'error';
  summary: string;
  detail?: string;
  sticky?: boolean;
  life?: number;
}

export interface ConfirmationRequest {
  header: string;
  message: string;
  icon?: string;
  accept: () => void;
  reject?: () => void;
}
