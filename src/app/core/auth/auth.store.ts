import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthState, UserProfile } from './auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'auth_state';

  private state = signal<AuthState>({ user: null, token: null });
  isHydrated = signal(false);

  constructor() {
    this.rehydrate();
  }

  // Selectors
  user = computed(() => this.state().user);
  token = computed(() => this.state().token);
  isAuthenticated = computed(() => !!this.state().token);
  isAdmin = computed(() => this.hasRole('ADMIN'));

  // Actions
  rehydrate() {
    if (isPlatformBrowser(this.platformId)) {
      const storedState = localStorage.getItem(this.STORAGE_KEY);
      if (storedState) {
        try {
          const parsed = JSON.parse(storedState);
          this.state.set(parsed);
        } catch (e) {
          console.error('Error parsing stored auth state', e);
        }
      }
      this.isHydrated.set(true);
    }
  }

  setAuth(user: UserProfile, token: string) {
    this.state.set({ user, token });
    this.saveStateToStorage();
  }

  clearAuth() {
    this.state.set({ user: null, token: null });
    this.removeStateFromStorage();
  }

  hasRole(role: string): boolean {
    const user = this.user();
    return !!user && user.permissoes.includes(role);
  }

  private saveStateToStorage() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state()));
    }
  }

  private removeStateFromStorage() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }
}
