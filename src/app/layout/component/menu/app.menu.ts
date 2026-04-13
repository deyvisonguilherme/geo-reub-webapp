import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from '../menuitem/app.menuitem';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [AppMenuitem, RouterModule],
  templateUrl: './app.menu.html',
})
export class AppMenu {
  model: MenuItem[] = [];

  ngOnInit() {
    this.model = [
      {
        label: 'Gestão',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            routerLink: [''],
            items: [
              {
                label: 'Geral',
                icon: 'pi pi-fw pi-home',
                routerLink: ['/dashboard/general'],
              },
              {
                label: 'Aguardando',
                icon: 'pi pi-fw pi-clock',
                routerLink: ['/dashboard/waiting'],
              },
              {
                label: 'Aprovados',
                icon: 'pi pi-fw pi-check-circle',
                routerLink: ['/dashboard/approved'],
              },
              {
                label: 'Beneficiários',
                icon: 'pi pi-fw pi-users',
                routerLink: ['/dashboard/beneficiaries'],
              },
              {
                label: 'Processos Ativos',
                icon: 'pi pi-fw pi-play-circle',
                routerLink: ['/dashboard/active'],
              },
            ],
          },
          {
            label: 'Processos REURB',
            icon: 'pi pi-fw pi-file-o',
            routerLink: ['/process'],
          },
          {
            label: 'Núcleos',
            icon: 'pi pi-fw pi-map',
            routerLink: ['/nucleus'],
          },
          {
            label: 'Beneficiários',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/beneficiaries'],
          },
          {
            label: 'Comunicação',
            icon: 'pi pi-fw pi-megaphone',
            routerLink: ['/comunication'],
          },
          {
            label: 'Alertas',
            icon: 'pi pi-fw pi-bell',
            routerLink: ['/alerts'],
          },
          {
            label: 'Configurações',
            icon: 'pi pi-fw pi-cog',
            routerLink: ['/settings'],
          },
          { label: 'Usuários', icon: 'pi pi-fw pi-user', routerLink: ['/users'] },
        ],
      },
    ];
  }
}
