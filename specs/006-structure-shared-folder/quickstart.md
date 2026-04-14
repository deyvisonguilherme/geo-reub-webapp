# Quickstart: Using Shared Elements

## 1. Using the Shared Button

Import the component directly into your standalone component:

```typescript
import { ButtonComponent } from '../../shared/ui/button/button.component';

@Component({
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <app-button label="Salvar Processo" icon="pi pi-save" (onClick)="save()" />
  `
})
```

## 2. Formatting CPF/CNPJ with Pipes

```typescript
import { CpfCnpjPipe } from '../../shared/pipes/cpf-cnpj.pipe';

@Component({
  standalone: true,
  imports: [CpfCnpjPipe],
  template: `
    <span>CPF: {{ rawValue | cpfCnpj }}</span>
  `
})
```

## 3. Protecting Elements with ACL

```typescript
import { HasPermissionDirective } from '../../shared/directives/has-permission.directive';

@Component({
  standalone: true,
  imports: [HasPermissionDirective],
  template: `
    <button *hasPermission="'process:delete'" (click)="delete()">
      Excluir (Só Admin)
    </button>
  `
})
```
