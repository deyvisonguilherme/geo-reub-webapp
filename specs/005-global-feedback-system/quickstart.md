# Quickstart: Using Global Feedback

## 1. Setup in Root Layout

The components are already set up in `src/app/app.html` and `src/app/app.ts`:

```html
<p-toast />
<p-confirmDialog />
<router-outlet />
```

## 2. Triggering from a Feature Store

Inject `GlobalFeedbackService` and call notification methods:

```typescript
import { inject } from '@angular/core';
import { GlobalFeedbackService } from '../../core/feedback/global-feedback.service';

@Injectable({ providedIn: 'root' })
export class MyStore {
  private feedback = inject(GlobalFeedbackService);

  save() {
    // ... logic
    this.feedback.notifySuccess('Sucesso', 'Operação realizada com êxito.');
  }

  handleError(err: any) {
    this.feedback.notifyError('Erro', err.message);
  }
}
```

## 3. Using Confirmation

```typescript
deleteItem(id: string) {
  this.feedback.confirmAction({
    header: 'Confirmar Exclusão',
    message: 'Deseja realmente excluir este item?',
    icon: 'pi pi-exclamation-triangle',
    accept: () => this.executeDelete(id)
  });
}
```
