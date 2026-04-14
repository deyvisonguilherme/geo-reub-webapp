# Feature Specification: Structure Shared folder with UI components, pipes and directives

**Feature Branch**: `006-structure-shared-folder`  
**Created**: 2026-04-13  
**Status**: Draft  
**Input**: User description: "Estruturação da Pasta Shared: O diretório src/app/shared parece subutilizado. Crie UI Componentes como Botões customizados, badges de status REURB-S/E, Pipes: Formatadores de CPF/CNPJ, áreas (m²), e status de processos, Directives: Máscaras de input e controle de permissões (ACL)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Reusable UI Elements (Priority: P1)

As a developer, I want to use standardized buttons and badges across the application so that the UI remains consistent and I don't have to rewrite the same styling logic in every component.

**Why this priority**: High. Consistency is key for a professional application, and reusable components speed up development of new features.

**Independent Test**: Verify that the new button and badge components can be imported and used in any feature module with consistent appearance and behavior.

**Acceptance Scenarios**:

1. **Given** a new page requires a primary action button, **When** I use the shared `app-button`, **Then** it should follow the design system styles (spacing, typography, states).
2. **Given** a process list, **When** I use the shared status badge, **Then** it should automatically color-code correctly based on REURB-S/E modality or process status.

---

### User Story 2 - Automated Data Formatting (Priority: P2)

As a developer, I want to use pipes to format sensitive or technical data (like CPF/CNPJ and land areas) in templates so that the presentation layer is decoupled from the raw data structure.

**Why this priority**: Medium. Improves readability for users and reduces boilerplate code in components.

**Independent Test**: Use the pipes in a test component with various input values (formatted and unformatted) and verify the output matches expectations.

**Acceptance Scenarios**:

1. **Given** a raw numeric string `12345678901`, **When** I apply the `cpf` pipe, **Then** it should display `123.456.789-01`.
2. **Given** a numeric area value `500.5`, **When** I apply the `area` pipe, **Then** it should display `500,50 m²`.

---

### User Story 3 - Input Control and Security (Priority: P3)

As a developer, I want to apply input masks and access control (ACL) via directives so that I can enforce data quality and security directly in the HTML templates.

**Why this priority**: Medium. Critical for data integrity and basic front-end security enforcement.

**Independent Test**: Verify that the mask directive restricts invalid characters and that the ACL directive hides elements based on mock user roles.

**Acceptance Scenarios**:

1. **Given** an input field for CPF, **When** I apply the `mask` directive, **Then** the user should only be able to type numbers and the formatting should appear as they type.
2. **Given** a "Delete" button, **When** I apply the `hasPermission` directive for a 'guest' user, **Then** the button should not be rendered in the DOM.

---

### Edge Cases

- What happens when a pipe receives `null` or `undefined`? (Should handle gracefully, returning empty string or placeholder).
- How does the ACL directive handle roles that are not yet defined? (Should default to 'denied').
- What happens if multiple masks are applied to the same input? (Should be prevented or priority defined).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a `SharedModule` or use standalone components exported from the `shared` folder.
- **FR-002**: System MUST include a reusable `ButtonComponent` with variants (primary, secondary, danger).
- **FR-003**: System MUST include a `StatusBadgeComponent` supporting REURB modalities and process status colors.
- **FR-004**: System MUST include pipes for: `CpfCnpjPipe`, `AreaPipe` (square meters), and `ProcessStatusPipe`.
- **FR-005**: System MUST include a `MaskDirective` for common patterns (CPF, CNPJ, CEP).
- **FR-006**: System MUST include a `HasPermissionDirective` for role-based access control (ACL) in templates.

### Key Entities *(include if feature involves data)*

- **Permission**: A string or object representing a specific capability (e.g., 'process:delete').
- **Role**: A collection of permissions assigned to a user (e.g., 'ADMIN', 'TECNICO').

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of existing hardcoded buttons in the `process` and `beneficiaries` features are replaced with the shared component.
- **SC-002**: All data presentation for CPF/CNPJ across the app uses the shared pipes.
- **SC-003**: No direct role checks (e.g., `*ngIf="user.role === 'ADMIN'"`) remain in templates; all must use the directive.

## Assumptions

- **Angular Version**: The project uses Angular 21 (Zoneless), so shared elements should be standalone where possible.
- **Design System**: PrimeNG is used as the base, so shared components should wrap or extend PrimeNG primitives where appropriate.
- **Global Auth**: An existing `AuthStore` or service provides the current user's roles/permissions for the ACL directive.
