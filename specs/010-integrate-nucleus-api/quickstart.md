# Quickstart: Nucleus Backend Integration

## Overview
This feature integrates the Nucleus management screen with the backend API `/nucleos` using JWT authentication.

## Implementation Steps

### 1. Update `NucleusRepository`
Replace seed data logic with real `HttpClient` calls and mapping.

```typescript
// src/app/features/nucleus/nucleus.repository.ts

@Injectable({ providedIn: 'root' })
export class NucleusRepository implements IRepository<NucleusFormModel> {
  private http = inject(HttpClient);
  private readonly baseUrl = '/nucleos';

  getAll(): Observable<NucleusFormModel[]> {
    return this.http.get<NucleoResponse[]>(this.baseUrl).pipe(
      map(items => items.map(this.mapToModel))
    );
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
      dataOcupacaoInicial: resp.data_ocupacao_inicial ? new Date(resp.data_ocupacao_inicial).toISOString() : null,
      municipioId: resp.municipio_id || '',
      poligonalGeorreferenciada: resp.poligonal_georreferenciada || '',
      centroide: resp.centroide || '',
      criadoPor: resp.criado_por,
      criadoEm: resp.criado_em,
      atualizadoPor: resp.atualizado_por || '',
      atualizadoEm: resp.atualizado_em || ''
    };
  }
}
```

### 2. Verify `NucleusStore`
Ensure `NucleusStore` is calling `repository.getAll()` and handling `AsyncState`.

### 3. Testing
- Verify that the `Authorization: Bearer <token>` header is present in the network request to `/nucleos`.
- Confirm that the table displays data returned by the API.
- Test error scenarios (e.g., 401 Unauthorized redirect).
