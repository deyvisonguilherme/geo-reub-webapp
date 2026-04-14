# Quickstart: Centralized Store State

## 1. Define State using AsyncState

In your feature store (e.g., `process.store.ts`), use `AsyncState`:

```typescript
import { signalStore, withState, patchState } from '@ngrx/signals';
import { AsyncState, createInitialAsyncState, updateAsyncLoading, updateAsyncSuccess, updateAsyncError } from '../../core/models/repository.types';
import { ProcessRecord } from './process.types';

export interface ProcessState {
  processList: AsyncState<ProcessRecord[]>;
}

const initialState: ProcessState = {
  processList: createInitialAsyncState([]),
};

export const ProcessStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, repository = inject(ProcessRepository)) => ({
    loadProcesses() {
      // Use helper to set loading: true
      patchState(store, (state) => ({ 
        processList: updateAsyncLoading(state.processList) 
      }));

      repository.getAll().subscribe({
        // Use helper to set data and loading: false
        next: (data) => patchState(store, { 
          processList: updateAsyncSuccess(data) 
        }),
        // Use helper to set error and loading: false
        error: (err) => patchState(store, (state) => ({ 
          processList: updateAsyncError(err.message, state.processList.data) 
        })),
      });
    }
  }))
);
```

## 2. Usage in Templates

```html
@if (store.processList().loading) {
  <app-table-skeleton />
} @else if (store.processList().error) {
  <div class="error">{{ store.processList().error }}</div>
} @else {
  <p-table [value]="store.processList().data || []">
    <!-- ... -->
  </p-table>
}
```
