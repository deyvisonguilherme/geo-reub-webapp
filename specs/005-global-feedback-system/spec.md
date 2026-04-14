# Feature Specification: Centralized Global Feedback System

**Feature Branch**: `005-global-feedback-system`  
**Created**: 2026-04-13  
**Status**: Draft  
**Input**: User description: "O sistema possui um módulo de alert, mas para uma UX fluida em formulários de REURB, a integração centralizada com o MessageService e ConfirmationService do PrimeNG via um GlobalStore permitiria disparar notificações de sucesso/erro de qualquer lugar sem injetar múltiplos serviços em cada componente."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Unified Notification Triggering (Priority: P1)

As a developer working on REURB workflows, I want to trigger toast notifications (success, error, warning) directly from domain stores (e.g., ProcessStore) without having to inject PrimeNG's `MessageService` into every individual component.

**Why this priority**: This is the core requirement for improving developer experience and reducing code duplication across the application.

**Independent Test**: Can be tested by calling a centralized notification method from a store and verifying that the toast appears correctly in the UI.

**Acceptance Scenarios**:

1. **Given** a successful process save operation, **When** the store triggers a success notification, **Then** a global toast message appears with the correct "Success" styling and content.
2. **Given** a network failure during data submission, **When** an error occurs, **Then** a global error toast is automatically displayed to the user.

---

### User Story 2 - Centralized Action Confirmation (Priority: P2)

As a developer, I want to request user confirmation for destructive or critical actions (like deleting a REURB process or a beneficiary) using a global confirmation interface, ensuring consistency in the UX.

**Why this priority**: Improves UX consistency and prevents data loss by providing a standard safeguard for critical operations.

**Independent Test**: Can be tested by initiating a delete action and verifying that the global confirmation dialog appears and correctly handles the "Accept" and "Reject" outcomes.

**Acceptance Scenarios**:

1. **Given** a user clicks "Delete Process", **When** the confirmation dialog is requested, **Then** the global PrimeNG `ConfirmDialog` is shown.
2. **Given** the confirmation dialog is visible, **When** the user clicks "Accept", **Then** the original action proceeds and the dialog closes.

---

### User Story 3 - Consistent UI Feedback for REURB Forms (Priority: P3)

As a user filling out complex REURB forms, I want to receive immediate and visually consistent feedback for all my actions so that I am confident in the state of my submissions.

**Why this priority**: Ensures a high-quality user experience and reduces user anxiety during complex data entry tasks.

**Independent Test**: Verify that all forms in the application use the same visual style for notifications and dialogs.

**Acceptance Scenarios**:

1. **Given** multiple form submissions across different modules, **When** they succeed or fail, **Then** the notification UI remains identical in behavior and appearance.

---

### Edge Cases

- **Multiple concurrent notifications**: How does the system handle a flood of messages (e.g., bulk validation errors)?
- **Routing during dialog visibility**: What happens if the user navigates to a different page while a confirmation dialog is open?
- **Server-side errors mapping**: How are raw backend error messages mapped to user-friendly notification content?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST implement a `GlobalStore` (Signal-based) to manage feedback events.
- **FR-002**: System MUST integrate PrimeNG `MessageService` into the global feedback lifecycle.
- **FR-003**: System MUST integrate PrimeNG `ConfirmationService` into the global feedback lifecycle.
- **FR-004**: Developers MUST be able to trigger notifications from any Signal-based Store without direct dependency on PrimeNG services.
- **FR-005**: The root layout MUST contain the necessary PrimeNG components (`p-toast` and `p-confirmDialog`) to render global feedback.
- **FR-006**: Notifications MUST support standard severity levels: Success, Info, Warn, and Error.

### Key Entities *(include if feature involves data)*

- **Notification Event**: Data structure containing severity, summary, detail, and optional duration for a toast message.
- **Confirmation Request**: Data structure containing message, header, icon, and the logic to be executed upon acceptance or rejection.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Developer effort to add a notification to a new feature is reduced to a single method call in a store.
- **SC-002**: Number of `MessageService` and `ConfirmationService` injections in feature components is reduced to zero (except for the central layout).
- **SC-003**: 100% of critical actions (deletes, resets) in the REURB module trigger a confirmation dialog.

## Assumptions

- **PrimeNG Core**: The project will continue to use PrimeNG as its primary UI library.
- **Signals Usage**: The implementation will leverage Angular Signals for state management in the `GlobalStore`.
- **Centralized Layout**: There is a single entry point (like `AppComponent` or a `MainLayoutComponent`) where the toast and dialog components can be placed.
