# Research: Centralized Global Feedback System

## Decision: Global Feedback Architecture

**Decision**: Implement a `GlobalStore` as a Signal-based service that acts as a proxy for PrimeNG's `MessageService` and `ConfirmationService`.

**Rationale**: 
- **Decoupling**: Feature stores (like `ProcessStore`) shouldn't know about UI-specific services like PrimeNG. They should just "announce" results.
- **Zoneless Compliance**: By using Signals in the `GlobalStore`, we ensure that any component listening to these signals (or the central layout) will react correctly under Angular 21's Zoneless detection.
- **DX**: Simplifies feature code by reducing boilerplate injections.

**Alternatives considered**:
- **Direct Injection**: Injecting `MessageService` in every component. *Rejected*: High maintenance and code duplication.
- **RxJS Subject**: Using a shared observable stream. *Rejected*: Less idiomatic in a project moving towards Signals (Angular 21).

---

## Decision: UI Integration Point

**Decision**: Place the `<p-toast />` and `<p-confirmDialog />` components in the `AppComponent` or the primary shell layout.

**Rationale**: Ensures these components are always present in the DOM regardless of the active route, allowing for continuous feedback during navigation.

---

## Decision: Event Handling in Zoneless

**Decision**: The `GlobalStore` will expose methods like `showSuccess(summary, detail)` which internally call PrimeNG services. 

**Rationale**: PrimeNG 21 services are designed to work with Angular's modern change detection. In a Zoneless environment, the components (`p-toast`) will listen to service events and trigger their own local detection via Signals or `markForCheck` (which PrimeNG handles internally).
