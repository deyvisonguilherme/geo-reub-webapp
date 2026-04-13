# Auth Service Contracts

## Authentication API

### `POST /api/auth/login`

Accepts user credentials and returns a JWT token if successful.

**Request Body**:
```json
{
  "username": "user1",
  "password": "password123"
}
```

**Response (200 OK)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "username": "user1",
    "fullName": "User One",
    "email": "user1@example.com",
    "roles": ["USER"]
  }
}
```

**Response (401 Unauthorized)**:
```json
{
  "error": "Invalid credentials"
}
```

## Security Headers
All requests to `/api/**` (except login) MUST include:
`Authorization: Bearer <TOKEN>`
