import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../core/auth/auth.service';
import { AuthStore } from '../../core/auth/auth.store';
import { MessageModule } from 'primeng/message';

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

  onLogin() {
    if (!this.username() || !this.password()) {
      this.errorMessage.set('Por favor, preencha todos os campos.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    this.authService.login({
      username: this.username(),
      password: this.password()
    }).subscribe({
      next: (response) => {
        this.authStore.setAuth(response.user, response.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err.error?.error || 'Erro ao realizar login. Verifique suas credenciais.');
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }
}
