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
- **Zoneless Design:** Uses `provideZonelessChangeDetection` for performance and modern Angular alignment.
- **Centralized Stores:** State is managed via Signal-based stores (e.g., `ProcessStore` in `src/app/features/process/process.store.ts`).
- **Layout:** Standard application layout is managed in `src/app/layout/`.

## Design Thinking & UI Patterns

### 1. Master-Detail Layout
- **Structure:** List pages (Nucleus, Beneficiaries, Process) follow a master-detail split.
- **Table View:** Left side features a PrimeNG `p-table` with pagination, sorting, and global search.
- **Detail Sidebar:** Right side features a sticky `aside` card providing a high-level summary of the selected record.
- **Responsiveness:** On smaller screens (max-width: 1200px), the layout collapses to a single column with the sidebar moving below the table.

### 2. Unified Dialog Workflow
- **Component Separation:** CRUD operations are separated into a parent management component and a reusable form-dialog component.
- **Custom Headers:** Dialogs (`p-dialog`) use `pTemplate="header"` to separate the title and subtitle from the form content, including an explicit close button.
- **State Cleanup:** Form data is wrapped in `@if (model)` checks to prevent null-reference errors during store initialization.

### 3. Responsive Form Grids
- **Grid System:** Forms utilize a CSS Grid (`form-grid`) with `auto-fit` logic and standardized gaps (`1.25rem`).
- **Column Spans:** Specific fields can span multiple columns using utility classes like `field-span-2` or `field-span-full`.
- **Logical Sectioning:** Complex forms are divided into semantic blocks with secondary headers (`section-title text-sm`) and subtle bottom borders.

### 4. Visual Language & Feedback
- **Status Tags:** Consistent use of `p-tag` with severities:
  - `success`: Completed, valid, or active status.
  - `warn`: Pending, in-progress, or partial status.
  - `info`: Identification codes and neutral attributes.
  - `danger`: Critical alerts or negative outcomes.
- **Auditoria Blocks:** Forms and detail views always include an "Auditoria" section displaying creation and update metadata.

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
