import { Injectable, computed, signal } from '@angular/core';
import { NucleusFormModel } from './nucleus.types';

@Injectable({ providedIn: 'root' })
export class NucleusStore {
  private readonly records = signal<NucleusFormModel[]>(this.buildSeedData());
  readonly nuclei = computed(() => this.records());

  list(): NucleusFormModel[] {
    return this.records();
  }

  getById(id: string): NucleusFormModel | undefined {
    return this.records().find((item) => item.id === id);
  }

  createNucleus(nucleus: Partial<NucleusFormModel>): string {
    const id = this.generateId();
    const newNucleus = {
      ...this.buildEmptyNucleus(id),
      ...nucleus,
      criadoEm: new Date().toISOString(),
    } as NucleusFormModel;
    this.records.update((items) => [newNucleus, ...items]);
    return id;
  }

  updateNucleus(id: string, changes: Partial<NucleusFormModel>): void {
    this.records.update((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              ...changes,
              atualizadoEm: new Date().toISOString(),
            }
          : item,
      ),
    );
  }

  deleteNucleus(id: string): void {
    this.records.update((items) => items.filter((item) => item.id !== id));
  }

  private buildEmptyNucleus(id: string): NucleusFormModel {
    return {
      id,
      codigo: '',
      nome: '',
      descricao: '',
      situacaoGeografica: '',
      consolidado: false,
      areaTotalM2: null,
      perimetroM: null,
      numeroFamiliasEstimado: null,
      dataOcupacaoInicial: null,
      municipioId: '',
      poligonalGeorreferenciada: '',
      centroide: '',
      criadoPor: 'usuario-atual',
      criadoEm: '',
      atualizadoPor: '',
      atualizadoEm: '',
    };
  }

  private buildSeedData(): NucleusFormModel[] {
    return [
      {
        id: this.generateId(),
        codigo: 'NUC-001',
        nome: 'Vale Verde',
        descricao: 'Núcleo urbano consolidado em área de proteção ambiental parcial.',
        situacaoGeografica: 'Perímetro Urbano',
        consolidado: true,
        areaTotalM2: 25000,
        perimetroM: 850,
        numeroFamiliasEstimado: 120,
        dataOcupacaoInicial: '2005-03-15',
        municipioId: 'MUN-001',
        poligonalGeorreferenciada: 'POLYGON((...))',
        centroide: 'POINT(-46.63 -23.55)',
        criadoPor: 'admin',
        criadoEm: '2026-01-10T10:00:00Z',
        atualizadoPor: 'admin',
        atualizadoEm: '2026-03-20T15:30:00Z',
      },
      {
        id: this.generateId(),
        codigo: 'NUC-002',
        nome: 'Colina Azul',
        descricao: 'Área em processo de expansão com ocupação recente.',
        situacaoGeografica: 'Zona de Expansão Urbana',
        consolidado: false,
        areaTotalM2: 15000,
        perimetroM: 600,
        numeroFamiliasEstimado: 45,
        dataOcupacaoInicial: '2018-11-20',
        municipioId: 'MUN-001',
        poligonalGeorreferenciada: 'POLYGON((...))',
        centroide: 'POINT(-46.65 -23.57)',
        criadoPor: 'admin',
        criadoEm: '2026-02-05T09:00:00Z',
        atualizadoPor: 'admin',
        atualizadoEm: '2026-03-24T11:20:00Z',
      },
    ];
  }

  private generateId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
      const rand = Math.floor(Math.random() * 16);
      const value = char === 'x' ? rand : (rand & 0x3) | 0x8;
      return value.toString(16);
    });
  }
}
