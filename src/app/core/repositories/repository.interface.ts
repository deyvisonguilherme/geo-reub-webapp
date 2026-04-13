import { Observable } from 'rxjs';

export interface IRepository<T> {
  getAll(): Observable<T[]>;
  getById(id: string): Observable<T>;
  create(data: Partial<T>): Observable<T>;
  update(id: string, data: Partial<T>): Observable<T>;
  delete(id: string): Observable<void>;
}
