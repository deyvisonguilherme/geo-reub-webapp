# Quickstart: Implementing Domain Repositories

## Overview

This guide explains how to implement and use the Repository Pattern in the **GeoReubWebapp** to isolate HTTP logic and improve testability.

## 1. Create the Repository

In your feature folder (e.g., `src/app/features/process/`), create a file `process.repository.ts`:

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Process } from './process.types';

@Injectable({ providedIn: 'root' })
export class ProcessRepository {
  private http = inject(HttpClient);
  private readonly baseUrl = '/api/v1/processes';

  getAll(): Observable<Process[]> {
    return this.http.get<Process[]>(this.baseUrl);
  }
}
```

## 2. Inject into the Store

Update your Store (e.g., `process.store.ts`) to use the repository instead of `HttpClient`:

```typescript
import { inject } from '@angular/core';
import { ProcessRepository } from './process.repository';

export const ProcessStore = signalStore(
  // ... state definition
  withMethods((store, repository = inject(ProcessRepository)) => ({
    loadProcesses() {
      patchState(store, { loading: true });
      repository.getAll().subscribe({
        next: (data) => patchState(store, { data, loading: false }),
        error: (err) => patchState(store, { error: err.message, loading: false })
      });
    }
  }))
);
```

## 3. Mock in Tests

In your store spec file:

```typescript
const mockRepository = {
  getAll: () => of([{ id: '1', name: 'Test Process' }])
};

TestBed.configureTestingModule({
  providers: [
    { provide: ProcessRepository, useValue: mockRepository }
  ]
});
```
