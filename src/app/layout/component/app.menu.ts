import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [AppMenuitem, RouterModule],
  template: `<ul class="layout-menu">
    @for (item of model; track item.label) {
      @if (!item.separator) {
        <li app-menuitem [item]="item" [root]="true"></li>
      } @else {
        <li class="menu-separator"></li>
      }
    }
  </ul> `,
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
            routerLink: ['/'],
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
            label: 'Documentos',
            icon: 'pi pi-fw pi-folder-open',
            routerLink: ['/documents'],
          },
          {
            label: 'Configurações',
            icon: 'pi pi-fw pi-cog',
            routerLink: ['/settings'],
          },
          { label: 'Relatórios', icon: 'pi pi-fw pi-flag', routerLink: ['/reports'] },
          { label: 'Usuários', icon: 'pi pi-fw pi-user', routerLink: ['/users'] },
          {
            label: 'Ajuda',
            icon: 'pi pi-fw pi-question-circle',
            routerLink: ['/uikit/formlayout'],
          },
        ],
      },
    ];
  }
}
