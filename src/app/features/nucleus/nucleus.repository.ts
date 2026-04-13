import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { NucleusFormModel } from './nucleus.types';
import { IRepository } from '../../core/repositories/repository.interface';

@Injectable({ providedIn: 'root' })
export class NucleusRepository implements IRepository<NucleusFormModel> {
  private http = inject(HttpClient);
  private readonly baseUrl = '/api/v1/nuclei';

  private seedData: NucleusFormModel[] = [
    {
      id: 'n1',
      codigo: 'NUC-001',
      nome: 'Vale Verde',
      descricao: 'Núcleo urbano consolidado.',
      situacaoGeografica: 'Urbana',
      consolidado: true,
      areaTotalM2: 25000,
      perimetroM: 850,
      numeroFamiliasEstimado: 120,
      dataOcupacaoInicial: '2005-03-15',
      municipioId: 'm1',
      poligonalGeorreferenciada: '',
      centroide: '',
      criadoPor: 'admin',
      criadoEm: '2026-01-10T10:00:00Z',
      atualizadoPor: 'admin',
      atualizadoEm: '2026-03-20T15:30:00Z',
    },
  ];

  getAll(): Observable<NucleusFormModel[]> {
    return of(this.seedData);
  }

  getById(id: string): Observable<NucleusFormModel> {
    const item = this.seedData.find((n) => n.id === id);
    if (item) return of(item);
    throw new Error('Núcleo não encontrado');
  }

  create(data: Partial<NucleusFormModel>): Observable<NucleusFormModel> {
    const newItem = { ...data, id: Math.random().toString(36).substr(2, 9) } as NucleusFormModel;
    return of(newItem);
  }

  update(id: string, data: Partial<NucleusFormModel>): Observable<NucleusFormModel> {
    const item = this.seedData.find((n) => n.id === id);
    if (item) return of({ ...item, ...data });
    throw new Error('Núcleo não encontrado');
  }

  delete(id: string): Observable<void> {
    return of(undefined);
  }
}
