# Data Model: Nucleus Integration

## Interfaces

### Backend Response (`NucleoResponse`)
Reflects the exact structure of the Go backend endpoint.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` (UUID) | Unique identifier |
| `codigo` | `string` | Technical code |
| `nome` | `string` | Name of the nucleus |
| `descricao` | `string` \| `null` | Detailed description |
| `situacao_geografica` | `string` \| `null` | Geographical situation |
| `area_total_m2` | `number` \| `null` | Total area |
| `perimetro_m` | `number` \| `null` | Total perimeter |
| `poligonal_georreferenciada` | `string` \| `null` | Georeferenced polygon |
| `centroide` | `string` \| `null` | Central coordinate |
| `consolidado` | `boolean` | Is consolidated? |
| `data_ocupacao_inicial` | `string` \| `null` | ISO date string |
| `numero_familias_estimado` | `number` \| `null` | Family count estimate |
| `municipio_id` | `string` (UUID) \| `null` | Municipality reference |
| `criado_por` | `string` (UUID) | Creator ID |
| `criado_em` | `string` (ISO Date) | Creation timestamp |
| `atualizado_por` | `string` (UUID) \| `null` | Updater ID |
| `atualizado_em` | `string` (ISO Date) \| `null` | Update timestamp |

### Frontend Model (`NucleusFormModel`)
Reflects the structure used in Angular components and stores.

| Field | Type | Mapping from Backend |
|-------|------|----------------------|
| `id` | `string` | `id` |
| `codigo` | `string` | `codigo` |
| `nome` | `string` | `nome` |
| `descricao` | `string` | `descricao || ''` |
| `situacaoGeografica` | `string` | `situacao_geografica || ''` |
| `areaTotalM2` | `number \| null` | `area_total_m2` |
| `perimetroM` | `number \| null` | `perimetro_m` |
| `poligonalGeorreferenciada` | `string` | `poligonal_georreferenciada || ''` |
| `centroide` | `string` | `centroide || ''` |
| `consolidado` | `boolean` | `consolidado` |
| `dataOcupacaoInicial` | `string \| null` | `data_ocupacao_inicial` |
| `numeroFamiliasEstimado` | `number \| null` | `numero_familias_estimado` |
| `municipioId` | `string` | `municipio_id || ''` |
| `criadoPor` | `string` | `criado_por` |
| `criadoEm` | `string` | `criado_em` |
| `atualizadoPor` | `string` | `atualizado_por || ''` |
| `atualizadoEm` | `string` | `atualizado_em || ''` |

## Mapping Logic
A mapper function in `NucleusRepository` will transform `NucleoResponse` into `NucleusFormModel`.
