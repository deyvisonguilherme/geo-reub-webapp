import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PendingNotification, TacitAgreement, RegistryDeadline } from './comunication.types';
import { IRepository } from '../../core/repositories/repository.interface';

@Injectable({ providedIn: 'root' })
export class ComunicationRepository implements IRepository<PendingNotification> {
  private http = inject(HttpClient);
  private readonly baseUrl = '/api/v1/comunication/notifications';

  private seedData: PendingNotification[] = [
    {
      id: '1',
      processo_id: 'p1',
      numero_processo: 'REURB-2026-001',
      destinatario: 'Maria de Souza',
      tipo: 'TITULAR',
      status_ar: 'PENDENTE'
    }
  ];

  getAll(): Observable<PendingNotification[]> {
    return of(this.seedData);
  }

  getById(id: string): Observable<PendingNotification> {
    const item = this.seedData.find((n) => n.id === id);
    if (item) return of(item);
    throw new Error('Notificação não encontrada');
  }

  create(data: Partial<PendingNotification>): Observable<PendingNotification> {
    const newItem = { ...data, id: Math.random().toString(36).substr(2, 9) } as PendingNotification;
    return of(newItem);
  }

  update(id: string, data: Partial<PendingNotification>): Observable<PendingNotification> {
    const item = this.seedData.find((n) => n.id === id);
    if (item) return of({ ...item, ...data });
    throw new Error('Notificação não encontrada');
  }

  delete(id: string): Observable<void> {
    return of(undefined);
  }

  // Specialized methods for other collections in this domain
  getTacitAgreements(): Observable<TacitAgreement[]> {
    return of([
      {
        id: '1',
        numero_processo: 'REURB-2026-001',
        notificado: 'João Silva',
        data_entrega_ar: '2026-03-10',
        prazo_dias: 15,
        data_vencimento: '2026-03-25',
        status: 'AGUARDANDO'
      }
    ]);
  }

  getRegistryDeadlines(): Observable<RegistryDeadline[]> {
    return of([
      {
        id: '1',
        numero_processo: 'REURB-2026-001',
        cartorio: '1º CRI Municipal',
        data_prenotacao: '2026-03-15',
        prazo_vencimento: '2026-04-15',
        possui_nota_devolutiva: true,
        dias_restantes: 20
      }
    ]);
  }
}
