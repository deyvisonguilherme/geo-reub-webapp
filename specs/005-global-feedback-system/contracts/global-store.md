# Global Store Contract

## Service: `GlobalStore`

### Notification Methods

| Method | Arguments | Description |
|--------|-----------|-------------|
| `notifySuccess` | `summary: string, detail?: string` | Triggers a success toast. |
| `notifyError` | `summary: string, detail?: string` | Triggers an error toast. |
| `notifyWarn` | `summary: string, detail?: string` | Triggers a warning toast. |
| `notifyInfo` | `summary: string, detail?: string` | Triggers an info toast. |

### Confirmation Methods

| Method | Arguments | Description |
|--------|-----------|-------------|
| `confirmAction` | `config: ConfirmationRequest` | Opens the global confirmation dialog. |

### Constraints
- Implementation MUST use PrimeNG `MessageService` and `ConfirmationService` internally.
- MUST be provided in `'root'`.
