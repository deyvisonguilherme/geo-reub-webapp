# Research: Shared Folder Structure and Utilities

## Decision: Standalone Components over SharedModule

**Decision**: We will not use a `SharedModule`. Instead, all components, pipes, and directives in `src/app/shared` will be **standalone**.

**Rationale**: Angular 21 (and modern Angular best practices) favors standalone components for better tree-shaking and simpler dependency management. Feature modules will import only the specific shared elements they need.

**Alternatives considered**: 
- `SharedModule`: Rejected as it is a legacy pattern that increases bundle size by importing unused elements.

---

## Decision: ACL Directive Implementation

**Decision**: The `HasPermissionDirective` will inject the `AuthStore` (from `src/app/core/auth/auth.store.ts`) and use a signal-based check.

**Rationale**: Since the project is Zoneless and uses Signals, the directive should reactively hide/show elements based on the current user's state in the `AuthStore`.

---

## Decision: Masking Strategy

**Decision**: The `MaskDirective` will be a thin wrapper around native input events or PrimeNG's `pInputMask` if suitable, but for simple masks like CPF/CNPJ, a custom lightweight directive using regex is preferred to minimize external dependencies.

**Rationale**: Keeps the core dependencies light and ensures full control over formatting behavior in a Zoneless environment.

---

## Decision: Component Design

**Decision**: Shared components (Button, Badge) will wrap PrimeNG components to provide a consistent look and feel while enforcing project-specific styles (from `GEMINI.md`).

**Rationale**: Leverages the power of PrimeNG while abstracting away repetitive configuration (like severities and icons).
