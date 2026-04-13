import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserRecord } from './users.types';
import { IRepository } from '../../core/repositories/repository.interface';

@Injectable({ providedIn: 'root' })
export class UserRepository implements IRepository<UserRecord> {
  private http = inject(HttpClient);
  private readonly baseUrl = '/api/v1/users';

  private seedData: UserRecord[] = [
    {
      id: 'u1',
      name: 'Administrador',
      email: 'admin@georeub.gov',
      role: 'ADMIN',
      status: 'ATIVO'
    }
  ];

  getAll(): Observable<UserRecord[]> {
    return of(this.seedData);
  }

  getById(id: string): Observable<UserRecord> {
    const item = this.seedData.find((u) => u.id === id);
    if (item) return of(item);
    throw new Error('Usuário não encontrado');
  }

  create(data: Partial<UserRecord>): Observable<UserRecord> {
    const newItem = { ...data, id: Math.random().toString(36).substr(2, 9) } as UserRecord;
    return of(newItem);
  }

  update(id: string, data: Partial<UserRecord>): Observable<UserRecord> {
    const item = this.seedData.find((u) => u.id === id);
    if (item) return of({ ...item, ...data });
    throw new Error('Usuário não encontrado');
  }

  delete(id: string): Observable<void> {
    return of(undefined);
  }
}
