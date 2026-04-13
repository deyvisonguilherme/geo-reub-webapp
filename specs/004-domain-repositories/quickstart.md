# Quickstart: Implementing a New Domain Repository

## 1. Create the Repository

Create a file in your feature directory (e.g., `src/app/features/process/process.repository.ts`):

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProcessRecord } from './process.types';
import { IRepository } from '../../core/repositories/repository.interface';

@Injectable({ providedIn: 'root' })
export class ProcessRepository implements IRepository<ProcessRecord> {
  private http = inject(HttpClient);
  private readonly baseUrl = '/api/v1/processes';

  getAll(): Observable<ProcessRecord[]> {
    return this.http.get<ProcessRecord[]>(this.baseUrl);
  }
  // ... other IRepository methods
}
```

## 2. Inject into the Store

Update your Store (e.g., `process.store.ts`) to consume the Repository:

```typescript
import { inject } from '@angular/core';
import { ProcessRepository } from './process.repository';

// ... in your SignalStore or Signal-based service
private repository = inject(ProcessRepository);

loadAll() {
  this.repository.getAll().subscribe(data => {
    // update signals
  });
}
```

## 3. Mock for Unit Tests

In your spec file:

```typescript
const mockRepository = jasmine.createSpyObj('ProcessRepository', ['getAll']);
mockRepository.getAll.and.returnValue(of([]));

TestBed.configureTestingModule({
  providers: [
    { provide: ProcessRepository, useValue: mockRepository }
  ]
});
```
