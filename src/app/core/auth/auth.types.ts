export interface Organization {
  id: string;
  nome: string;
  perfil: string;
}

export interface UserProfile {
  id: string;
  organizacao: Organization;
  permissoes: string[];
}

export interface AuthResponseData {
  access_token: string;
  refresh_token: string;
  usuario: UserProfile;
}

export interface AuthResponse {
  success: boolean;
  data: AuthResponseData;
  error?: string;
  organizations?: any[]; // For multi-org handling if needed
}

export interface AuthState {
  user: UserProfile | null;
  token: string | null;
}
