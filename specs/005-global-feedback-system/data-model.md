# Data Model: Global Feedback System

## Entities

### `NotificationEvent`
Represents a transient toast message.

| Field | Type | Description |
|-------|------|-------------|
| `severity` | `string` | 'success', 'info', 'warn', 'error' |
| `summary` | `string` | Brief title of the message |
| `detail` | `string` | Detailed explanation |
| `sticky` | `boolean` | If true, the message won't auto-hide |
| `life` | `number` | Duration in milliseconds (default: 3000) |

### `ConfirmationRequest`
Represents a user-facing action verification.

| Field | Type | Description |
|-------|------|-------------|
| `header` | `string` | Dialog title |
| `message` | `string` | Main question for the user |
| `icon` | `string` | PrimeIcons class name |
| `accept` | `Function` | Callback for positive action |
| `reject` | `Function` | Callback for negative action |

## Relationships

- **GlobalStore**: Acts as the orchestrator.
- **Feature Stores**: Producers of `NotificationEvent` and `ConfirmationRequest`.
- **PrimeNG Services**: Consumers of the processed events.
