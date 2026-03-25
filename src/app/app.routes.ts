import { Routes } from '@angular/router';
import { AppLayout } from './layout/component/app.layout';

export const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
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
        loadComponent: () =>
          import('./features/settings/settings.component').then((m) => m.SettingsComponent),
      },
      {
        path: 'documents',
        loadComponent: () =>
          import('./features/documents/documents.component').then((m) => m.DocumentsComponent),
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./features/reports/reports.component').then((m) => m.ReportsComponent),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/users/users.component').then((m) => m.UsersComponent),
      },
    ],
  },
  // Rotas fora do layout (ex: login)
  // { path: 'auth/login', loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent) },
  { path: '**', redirectTo: 'dashboard' },
];
