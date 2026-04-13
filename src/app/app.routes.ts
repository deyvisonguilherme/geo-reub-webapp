import { Routes } from '@angular/router';
import { AppLayout } from './layout/component/layout/app.layout';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        redirectTo: 'dashboard/general',
        pathMatch: 'full',
      },
      {
        path: 'dashboard/general',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'dashboard/waiting',
        loadComponent: () =>
          import('./features/dashboard/dashboard-waiting/waiting.component').then(
            (m) => m.WaitingComponent,
          ),
      },
      {
        path: 'dashboard/beneficiaries',
        loadComponent: () =>
          import('./features/dashboard/dashboard-beneficiarie/dashboard-beneficiarie.component').then(
            (m) => m.DashboardBeneficiarieComponent,
          ),
      },
      {
        path: 'dashboard/active',
        loadComponent: () =>
          import('./features/dashboard/dashboard-active-processes/active-processes.component').then(
            (m) => m.ActiveProcessesComponent,
          ),
      },
      {
        path: 'dashboard/approved',
        loadComponent: () =>
          import('./features/dashboard/dashboard-approved/approved.component').then(
            (m) => m.ApprovedComponent,
          ),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'process',
        loadComponent: () =>
          import('./features/process/process.component').then((m) => m.ProcessComponent),
      },
      {
        path: 'process/:id',
        loadComponent: () =>
          import('./features/process/components/process-workflow/process-workflow.component').then(
            (m) => m.ProcessWorkflowComponent,
          ),
      },
      {
        path: 'beneficiaries',
        loadComponent: () =>
          import('./features/beneficiaries/beneficiaries.component').then(
            (m) => m.BeneficiariesComponent,
          ),
      },
      {
        path: 'nucleus',
        loadComponent: () =>
          import('./features/nucleus/nucleus.component').then((m) => m.NucleusComponent),
      },
      {
        path: 'comunication',
        loadComponent: () =>
          import('./features/comunication/comunication.component').then(
            (m) => m.ComunicationComponent,
          ),
      },
      {
        path: 'settings',
        canActivate: [authGuard],
        data: { role: 'ADMIN' },
        loadComponent: () =>
          import('./features/settings/settings.component').then((m) => m.SettingsComponent),
      },
      {
        path: 'users',
        canActivate: [authGuard],
        data: { role: 'ADMIN' },
        loadComponent: () =>
          import('./features/users/users.component').then((m) => m.UsersComponent),
      },
      {
        path: 'alerts',
        loadComponent: () =>
          import('./features/alert/alert.component').then((m) => m.AlertComponent),
      },
    ],
  },
  // Rotas fora do layout (ex: login)
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login.component').then((m) => m.LoginComponent),
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
