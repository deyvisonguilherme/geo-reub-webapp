# Data Model: Domain Repositories Refactor

## Dependency Hierarchy

```text
Component
  └── Store (Signal-based)
        └── Repository (HTTP-based)
              └── HttpClient (Angular core)
```

## Entity Relationships

- **Repository**: Single source of truth for all domain-specific HTTP requests.
- **Store**: Manages domain state using Signals, consuming data from the Repository.
- **MockRepository**: Implements the same interface as the Repository for use in unit tests.

## Key Interfaces

- `BaseRepository<T>`: A generic interface (optional) to ensure consistency across domains.
- `ProcessRepository`: Concrete implementation for the "Process" domain.
- `BeneficiaryRepository`: Concrete implementation for the "Beneficiary" domain.
