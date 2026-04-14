export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'text';

export interface BadgeConfig {
  label: string;
  severity: 'success' | 'warn' | 'info' | 'danger' | 'secondary';
}

export interface UserPermissions {
  roles: string[];
  permissions: string[];
}
