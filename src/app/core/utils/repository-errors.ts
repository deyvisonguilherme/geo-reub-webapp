import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { RepositoryError } from '../models/repository.types';

export function handleRepositoryError(error: HttpErrorResponse) {
  let errorMessage = 'Ocorreu um erro inesperado.';

  if (error.error instanceof ErrorEvent) {
    // Erro do lado do cliente
    errorMessage = `Erro: ${error.error.message}`;
  } else {
    // Erro do lado do servidor
    errorMessage = error.error?.message || `Código do erro: ${error.status}\nMensagem: ${error.message}`;
  }

  const repoError: RepositoryError = {
    message: errorMessage,
    status: error.status,
    code: error.error?.code,
  };

  return throwError(() => repoError);
}
