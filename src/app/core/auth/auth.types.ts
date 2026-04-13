export interface Organization {
  id: string;
  name: string;
}

export interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  email: string;
  roles: string[];
  organizationId: string;
  organizationName: string;
}

export interface AuthResponse {
  token: string;
  user: UserProfile;
  error?: string;
  organizations?: Organization[];
}

export interface AuthState {
  user: UserProfile | null;
  token: string | null;
}
