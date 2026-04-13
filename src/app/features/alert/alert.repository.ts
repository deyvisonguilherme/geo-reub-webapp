import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AlertaPrazo } from './alert.types';
import { IRepository } from '../../core/repositories/repository.interface';

@Injectable({ providedIn: 'root' })
export class AlertRepository implements IRepository<AlertaPrazo> {
  private http = inject(HttpClient);
  private readonly baseUrl = '/api/v1/alerts';

  private seedData: AlertaPrazo[] = [
    {
      id: '1',
      titulo: 'Prazo Admissibilidade Vencendo',
      mensagem: 'O prazo para análise de admissibilidade do processo REURB-2026-002 expira em breve.',
      tipo_alerta: 'PRAZO_LEGAL',
      severidade: 'danger',
      dias_restantes: 2,
      visualizado: false,
      criado_em: new Date().toISOString(),
      acao_tomada: false
    }
  ];

  getAll(): Observable<AlertaPrazo[]> {
    return of(this.seedData);
  }

  getById(id: string): Observable<AlertaPrazo> {
    const item = this.seedData.find((a) => a.id === id);
    if (item) return of(item);
    throw new Error('Alerta não encontrado');
  }

  create(data: Partial<AlertaPrazo>): Observable<AlertaPrazo> {
    const newItem = { ...data, id: Math.random().toString(36).substr(2, 9) } as AlertaPrazo;
    return of(newItem);
  }

  update(id: string, data: Partial<AlertaPrazo>): Observable<AlertaPrazo> {
    const item = this.seedData.find((a) => a.id === id);
    if (item) return of({ ...item, ...data });
    throw new Error('Alerta não encontrado');
  }

  delete(id: string): Observable<void> {
    return of(undefined);
  }
}
