# Implementation Plan: Implement Skeleton Screens for SSR

**Branch**: `007-ssr-skeleton-screens` | **Date**: 2026-04-13 | **Spec**: [specs/007-ssr-skeleton-screens/spec.md](./spec.md)
**Input**: Feature specification from `/specs/007-ssr-skeleton-screens/spec.md`

## Summary

This feature introduces custom standalone skeleton components to eliminate layout shifts during SSR hydration and client-side data fetching. By mirroring the layout of statistics cards and process tables, we improve LCP and visual stability.

## Technical Context

**Language/Version**: TypeScript 5.6+ / Angular 21 (Zoneless)  
**Primary Dependencies**: PrimeNG 21 (`p-skeleton`), Tailwind CSS 4  
**Storage**: N/A  
**Testing**: Jasmine / Karma  
**Target Platform**: Web (SSR / Angular Universal)
**Project Type**: Angular Single Page Application
**Performance Goals**: CLS < 0.1; structure visible within 500ms.
**Constraints**: MUST exactly match `.stat-card` and `.table-card` styles from `GEMINI.md`.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Feature follows standalone component pattern.
- [x] Uses modern Signals for state-driven rendering.
- [x] Compatible with SSR/Zoneless.

## Project Structure

### Documentation (this feature)

```text
specs/007-ssr-skeleton-screens/
├── plan.md              # This file
├── research.md          # PrimeNG vs Pure CSS decision
├── data-model.md        # Skeleton component inputs
├── quickstart.md        # Integration examples
├── contracts/           # Layout requirements
│   ├── statistic-card-skeleton.md
│   └── table-skeleton.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
src/app/shared/ui/skeletons/
├── statistic-card-skeleton/
│   ├── statistic-card-skeleton.component.ts
│   └── statistic-card-skeleton.component.scss
└── table-skeleton/
    ├── table-skeleton.component.ts
    └── table-skeleton.component.scss
```

**Structure Decision**: Option 1: Single project. Components are added to the new `shared/ui/skeletons` directory to maintain organization.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Custom SCSS Shimmer | Matching high-fidelity layout | Default PrimeNG shimmer is too generic for the specific `.stat-card` styling required. |
