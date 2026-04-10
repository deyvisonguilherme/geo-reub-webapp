export interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  email: string;
  roles: string[];
}

export interface AuthResponse {
  token: string;
  user: UserProfile;
}

export interface AuthState {
  user: UserProfile | null;
  token: string | null;
}
