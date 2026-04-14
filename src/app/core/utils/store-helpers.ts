import { Observable, tap, catchError, of } from 'rxjs';
import { AsyncState, updateAsyncError, updateAsyncLoading, updateAsyncSuccess } from '../models/repository.types';
import { WritableSignal } from '@angular/core';

/**
 * Helper to automatically handle loading and error states for an Observable
 * that updates a specific AsyncState signal.
 */
export function connectAsyncState<T>(
  obs$: Observable<T>,
  signal: WritableSignal<AsyncState<T>>,
  onError?: (err: any) => void
): Observable<T> {
  signal.update(state => updateAsyncLoading(state));
  
  return obs$.pipe(
    tap(data => {
      signal.set(updateAsyncSuccess(data));
    }),
    catchError(err => {
      const message = err.message || 'Ocorreu um erro inesperado';
      signal.set(updateAsyncError(message, signal().data));
      if (onError) onError(err);
      return of(null as any);
    })
  );
}
