# Contract: NucleusRepository

## Purpose
The `NucleusRepository` is responsible for all HTTP interactions related to the "Nucleus" domain, specifically communicating with the `/nucleos` backend endpoint.

## Endpoint Details

- **Base URL**: `/nucleos`
- **Authentication**: JWT Bearer Token (handled via `authInterceptor`).

## Methods

### `getAll(): Observable<NucleusFormModel[]>`
- **HTTP Method**: `GET`
- **Path**: `/nucleos`
- **Response Type**: `NucleoResponse[]`
- **Transformation**: Maps `NucleoResponse` fields (snake_case) to `NucleusFormModel` fields (camelCase).

### `getById(id: string): Observable<NucleusFormModel>`
- **HTTP Method**: `GET`
- **Path**: `/nucleos/${id}`
- **Response Type**: `NucleoResponse`
- **Transformation**: Maps `NucleoResponse` to `NucleusFormModel`.

### `create(data: Partial<NucleusFormModel>): Observable<NucleusFormModel>`
- **HTTP Method**: `POST`
- **Path**: `/nucleos`
- **Payload Transformation**: Maps `Partial<NucleusFormModel>` back to snake_case if necessary for the backend `POST` body.
- **Response Type**: `NucleoResponse`

### `update(id: string, data: Partial<NucleusFormModel>): Observable<NucleusFormModel>`
- **HTTP Method**: `PUT`
- **Path**: `/nucleos/${id}`
- **Payload Transformation**: Maps `Partial<NucleusFormModel>` back to snake_case.
- **Response Type**: `NucleoResponse`

### `delete(id: string): Observable<void>`
- **HTTP Method**: `DELETE`
- **Path**: `/nucleos/${id}`
- **Response**: Empty 204 or 200.

## Error Handling
- **401 Unauthorized**: Handled by `authInterceptor` (redirect to login).
- **Other Errors**: Passed through to the caller (Store) to be handled by `GlobalFeedbackService`.
