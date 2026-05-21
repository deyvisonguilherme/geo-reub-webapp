# GEMINI.md - Project Context

## Project Overview
**GeoReubWebapp** is a modern management system for REURB (Regularização Fundiária Urbana - Urban Land Regularization) processes in Brazil. The application facilitates the tracking and management of land regularization workflows, including technical studies, topographic surveys, urban projects, and beneficiary documentation.

### Core Technologies
- **Framework:** Angular 21 (Zoneless Change Detection)
- **UI Components:** PrimeNG 21 (Lara theme)
- **Styling:** Tailwind CSS 4, SCSS
- **State Management:** Angular Signals (Store pattern)
- **Rendering:** SSR (Server-Side Rendering) / Angular Universal
- **Language:** TypeScript
- **Package Manager:** Bun (preferred, based on `bun.lock`) or npm

### Key Features
- **Process Management:** Workflow tracking for REURB-S (Social) and REURB-E (Specific) modalities.
- **Beneficiary Management:** Social registration and document validation.
- **Technical Modules:** Dominial research, topographic surveys, technical studies, and urban projects.
- **Reporting & Certification:** Emission of CRF (Certidão de Regularização Fundiária).

## Architecture
- **Feature-Based Routing:** Routes are organized by functional domain in `src/app/features/`.
- **Repository Pattern:** HTTP logic is isolated in Domain Repositories (e.g., `ProcessRepository`, `NucleusRepository`, `AlertRepository`). Stores MUST inject Repositories instead of `HttpClient`.
- **Zoneless Design:** Uses `provideZonelessChangeDetection` for performance and modern Angular alignment.
- **Centralized Stores:** State is managed via Signal-based stores (e.g., `ProcessStore` in `src/app/features/process/process.store.ts`).
- **Layout:** Standard application layout is managed in `src/app/layout/`.

## Design System & UI Patterns

### 1. Master-Detail Layout (Standard)
- **Layout Grid:** Use a 2-column grid (`display: grid`) with `grid-template-columns: 1fr 380px`.
- **Table Card:** Occupies the primary column (`1fr`). Wraps the PrimeNG table with `.table-card` and `.waiting-card`/`.nucleus-card`.
- **Detail Sidebar:** A fixed-width (`380px`) sticky column (`position: sticky; top: 1.5rem`).
- **Empty State:** When no record is selected, display an `.empty-state` with a central icon and instruction text.
- **Responsiveness:** At `max-width: 1200px`, switch to a single column (`1fr`) with the sidebar moving below the table.

### 2. Typography & Hierarchy
- **Page Headers:**
  - `.page-title`: `font-size: 1.5rem; font-weight: 700; color: #111827`.
  - `.page-subtitle`: `font-size: 0.875rem; color: #6b7280`.
- **Detail Views:**
  - `.detail-kicker`: Small uppercase text above titles (`0.75rem`, bold, gray).
  - `.detail-section-title`: Small uppercase text for grouping fields (`0.75rem`, bold, light gray).
  - `.detail-label`: Small descriptive label (`0.75rem`, gray).
  - `.detail-item strong`: Main data point (`0.875rem`, semibold, dark gray).

### 3. Unified Dialog Workflow
- **Structure:** Separate CRUD logic into a parent management component and a dedicated form-dialog component.
- **Header Pattern:** Use `pTemplate="header"` to separate the title/subtitle from form fields.
- **Close Button:** Include an explicit close button in the top-right corner of dialog headers.
- **State Handling:** Use `@if (model)` in the dialog template to ensure data is present before rendering the form.

### 4. PrimeNG Global Overrides (Local SCSS)
- **Table Header:** Light gray background (`#f9fafb`), uppercase bold text (`0.75rem`), and subtle borders.
- **Selection:** Use `#eff6ff` (light blue) for highlighted rows (`.p-highlight`).
- **Tags:** Rounded pills with bold text (`0.7rem`) and specific project severities:
  - `success`: Finalized/Valid.
  - `warn`: In-progress/Pending.
  - `info`: Identification/Codes.
  - `danger`: Critical/Nota Devolutiva.

### 5. Responsive Form Grids
- **CSS Grid:** Use `.form-grid` with `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))`.
- **Gaps:** Standard `1.25rem` gap between fields.
- **Spans:** Use `.field-span-full` or `.field-span-2` for wider fields like addresses or descriptions.

### 8. Route Protection (Authorization)
- **Permission Guard**: `src/app/core/auth/permission.guard.ts`.
- **Usage**: Apply `permissionGuard` to routes and define access requirements in the `data` object.
- **Roles (OR logic)**: `data: { roles: ['ADMIN', 'TECNICO'] }` - Access if user has *either* role.
- **Permissions (AND logic)**: `data: { permissions: ['process:delete'] }` - Access if user has *all* listed permissions.
- **Redirection**: Denied access redirects to `/dashboard` with an error notification.

### 9. State Management (Centralized Store State)
- **Pattern**: All asynchronous data in feature stores must use the `AsyncState<T>` object.
- **Structure**: `{ data: T | null, loading: boolean, error: string | null }`.
- **Helpers**: Use `createInitialAsyncState`, `updateAsyncLoading`, `updateAsyncSuccess`, and `updateAsyncError` from `src/app/core/models/repository.types.ts`.
- **Consistency**: This avoids repetitive standalone signals for loading and error states across the codebase.

## Building and Running

### Prerequisites
- Node.js (v20+) or Bun

### Development Server
```bash
# Using Bun
bun run start
# Using npm
npm start
# Direct Angular CLI
ng serve
```
Access at `http://localhost:4200/`.

### Building for Production
```bash
# Using Bun
bun run build
# Using npm
npm run build
```
Artifacts are stored in `dist/geo-reub-webapp/`.

### Running Unit Tests
```bash
# Using Bun
bun run test
# Using npm
npm test
```

## Development Conventions

### Coding Style & Standards
- **Feature Modules:** Group related logic (components, types, stores) under `src/app/features/<feature-name>/`.
- **State Management:** Prefer Angular Signals over RxJS for simple UI state. Use `computed` and `signal` within service-based stores.
- **Types:** Define domain-specific interfaces in `<feature-name>.types.ts`.
- **Styling:** Use Tailwind utility classes for spacing/layout and PrimeNG components for UI primitives.

### Code Formatting
Prettier is configured in `package.json` with the following settings:
- `printWidth`: 100
- `singleQuote`: true
- `parser`: angular (for HTML files)

### Folder Structure
- `src/app/core/`: Singleton services and global configuration.
- `src/app/features/`: Domain-specific features.
- `src/app/layout/`: Global layout components.
- `src/app/shared/`: Shared components and utilities.

## Recent Changes
- 010-integrate-nucleus-api: Added [if applicable, e.g., PostgreSQL, CoreData, files or N/A]
- 009-centralized-store-state: Added TypeScript 5.6+ / Angular 21 (Zoneless) + `@ngrx/signals`, `rxjs`, `@angular/common/http`
- 008-permission-route-guards: Added TypeScript 5.6+ / Angular 21 (Zoneless) + `@angular/router`, `AuthStore`, `GlobalFeedbackService`

## Active Technologies
