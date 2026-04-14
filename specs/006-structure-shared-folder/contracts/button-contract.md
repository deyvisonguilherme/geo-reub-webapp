# Button Component Contract

## Component: `app-button`

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | `string` | `''` | Text displayed on the button. |
| `icon` | `string` | `''` | PrimeIcons class name. |
| `variant` | `ButtonVariant` | `'primary'` | Visual style. |
| `disabled` | `boolean` | `false` | Disables the button. |
| `loading` | `boolean` | `false` | Shows a loading spinner. |

### Outputs

| Event | Payload | Description |
|-------|---------|-------------|
| `onClick` | `void` | Emitted when the button is clicked and not disabled/loading. |

### Constraints
- MUST wrap PrimeNG `p-button`.
- MUST use Tailwind classes for additional project styling.
