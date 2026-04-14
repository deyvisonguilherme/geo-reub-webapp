# Research: Skeleton Screens for SSR

## Decision: Base Primitive Selection

**Decision**: Use PrimeNG `p-skeleton` as the foundation for the custom skeleton components.

**Rationale**: 
- Leverages existing well-tested accessibility features of PrimeNG.
- Reduces boilerplate for generating shapes (circles, rectangles).
- Easily stylable via CSS variables and Tailwind classes.

**Alternatives considered**: 
- Pure CSS Skeletons: Rejected because PrimeNG is already a project dependency and provides better structure for accessibility.

---

## Decision: CSS Shimmer Implementation

**Decision**: Implement the shimmer animation as a global SCSS utility class in `src/assets/layout/_utils.scss` (or equivalent global file).

**Rationale**: Ensures consistency across different skeleton types (Statistics, Tables, Cards) and avoids duplicating animation logic in multiple components.

---

## Decision: SSR Hydration Strategy

**Decision**: Skeletons will be rendered server-side. The transition will be triggered by the `loading` signal in the respective feature stores.

**Rationale**: By rendering skeletons on the server, we eliminate layout shift during the initial browser paint. The Signal-based state management ensures a smooth replacement once data arrives on the client.
