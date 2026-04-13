export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'TECNICO' | 'JURIDICO' | 'CONVIDADO';
  status: 'ATIVO' | 'INATIVO';
  lastLogin?: string;
}
