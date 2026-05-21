import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { NucleusFormModel, NucleoResponse } from './nucleus.types';
import { IRepository } from '../../core/repositories/repository.interface';

@Injectable({ providedIn: 'root' })
export class NucleusRepository implements IRepository<NucleusFormModel> {
  private http = inject(HttpClient);
  private readonly baseUrl = '/nucleos';

  getAll(): Observable<NucleusFormModel[]> {
    return this.http
      .get<NucleoResponse[]>(this.baseUrl)
      .pipe(map((items) => items.map((item) => this.mapToModel(item))));
  }

  getById(id: string): Observable<NucleusFormModel> {
    return this.http
      .get<NucleoResponse>(`${this.baseUrl}/${id}`)
      .pipe(map((item) => this.mapToModel(item)));
  }

  create(data: Partial<NucleusFormModel>): Observable<NucleusFormModel> {
    const payload = this.mapToResponse(data);
    return this.http
      .post<NucleoResponse>(this.baseUrl, payload)
      .pipe(map((item) => this.mapToModel(item)));
  }

  update(id: string, data: Partial<NucleusFormModel>): Observable<NucleusFormModel> {
    const payload = this.mapToResponse(data);
    return this.http
      .put<NucleoResponse>(`${this.baseUrl}/${id}`, payload)
      .pipe(map((item) => this.mapToModel(item)));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  private mapToModel(resp: NucleoResponse): NucleusFormModel {
    return {
      id: resp.id,
      codigo: resp.codigo,
      nome: resp.nome,
      descricao: resp.descricao || '',
      situacaoGeografica: resp.situacao_geografica || '',
      consolidado: resp.consolidado,
      areaTotalM2: resp.area_total_m2,
      perimetroM: resp.perimetro_m,
      numeroFamiliasEstimado: resp.numero_familias_estimado,
      dataOcupacaoInicial: resp.data_ocupacao_inicial,
      municipioId: resp.municipio_id || '',
      poligonalGeorreferenciada: resp.poligonal_georreferenciada || '',
      centroide: resp.centroide || '',
      criadoPor: resp.criado_por,
      criadoEm: resp.criado_em,
      atualizadoPor: resp.atualizado_por || '',
      atualizadoEm: resp.atualizado_em || '',
    };
  }

  private mapToResponse(model: Partial<NucleusFormModel>): Partial<NucleoResponse> {
    return {
      id: model.id,
      codigo: model.codigo,
      nome: model.nome,
      descricao: model.descricao,
      situacao_geografica: model.situacaoGeografica,
      consolidado: model.consolidado,
      area_total_m2: model.areaTotalM2,
      perimetro_m: model.perimetroM,
      numero_familias_estimado: model.numeroFamiliasEstimado,
      data_ocupacao_inicial: model.dataOcupacaoInicial,
      municipio_id: model.municipioId,
      poligonal_georreferenciada: model.poligonalGeorreferenciada,
      centroide: model.centroide,
      criado_por: model.criadoPor,
      criado_em: model.criadoEm,
      atualizado_por: model.atualizadoPor,
      atualizado_em: model.atualizadoEm,
    };
  }
}
