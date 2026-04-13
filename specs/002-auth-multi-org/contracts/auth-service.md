# Auth Service Contracts: Multiple Organizations

## Authentication API

### `POST /api/auth/login`
Authenticates a user and establishes a session.

**Request Payload**:
```json
{
  "username": "jdoe",
  "password": "secretPassword",
  "organizacao_id": "optional-uuid"
}
```

**Response (200 OK - Successful Login)**:
Returns the JWT and user profile when credentials are valid and organization is determined.
```json
{
  "token": "eyJhbG...",
  "user": {
    "id": "user-uuid",
    "username": "jdoe",
    "fullName": "John Doe",
    "email": "jdoe@example.com",
    "roles": ["USER"],
    "organizationId": "org-uuid",
    "organizationName": "Organization A"
  }
}
```

**Response (400 Bad Request - Multiple Organizations)**:
Returned when a user has more than one organization and no `organizacao_id` was provided.
```json
{
  "error": "MULTIPLE_ORGANIZATIONS",
  "organizations": [
    {
      "id": "org-uuid-1",
      "name": "Organization A"
    },
    {
      "id": "org-uuid-2",
      "name": "Organization B"
    }
  ]
}
```

**Response (401 Unauthorized)**:
Returned when credentials are invalid.
```json
{
  "error": "Credenciais inválidas."
}
```
