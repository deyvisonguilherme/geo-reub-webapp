import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';
import { AuthService } from '../../core/auth/auth.service';
import { AuthStore } from '../../core/auth/auth.store';
import { MessageModule } from 'primeng/message';
import { Organization } from '../../core/auth/auth.types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    PasswordModule,
    SelectModule,
    MessageModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private authStore = inject(AuthStore);
  private router = inject(Router);

  username = signal('');
  password = signal('');
  rememberMe = signal(false);
  loading = signal(false);
  errorMessage = signal<string | null>(null);

  // Organization Selection
  organizations = signal<Organization[]>([]);
  showOrgSelection = signal(false);
  selectedOrganization = signal<Organization | null>(null);

  onLogin() {
    if (!this.username() || !this.password()) {
      this.errorMessage.set('Por favor, preencha todos os campos.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    this.authService.login({
      username: this.username(),
      password: this.password(),
      organizacao_id: this.selectedOrganization()?.id
    }).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.authStore.setAuth(response.data.usuario, response.data.access_token);
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.loading.set(false);
        // Map error to correct structure
        const errorData = err.error;
        if (errorData?.error === 'MULTIPLE_ORGANIZATIONS') {
          this.organizations.set(errorData.organizations);
          this.showOrgSelection.set(true);
        } else {
          this.errorMessage.set(errorData?.message || errorData?.error || 'Erro ao realizar login. Verifique suas credenciais.');
        }
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }

  onConfirmOrganization() {
    if (!this.selectedOrganization()) {
      this.errorMessage.set('Por favor, selecione uma organização.');
      return;
    }
    this.onLogin();
  }

  onBackToLogin() {
    this.showOrgSelection.set(false);
    this.selectedOrganization.set(null);
  }
}
