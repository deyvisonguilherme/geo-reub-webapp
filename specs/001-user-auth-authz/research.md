# Research: Authentication and Authorization with JWT

## Decision: Technical Implementation Details

- **Store Pattern**: Use Angular Signals for state management in `src/app/core/auth/auth.store.ts`.
- **Interceptors**: Use functional interceptors (standard in modern Angular) to add the JWT to requests.
- **Guards**: Use functional route guards.
- **JWT Storage**: Use `localStorage` for browser persistence. Note: Need to handle SSR (Server Side Rendering) since the project uses `provideClientHydration()`.
- **Backend Communication**: Use `HttpClient` with a base API URL constant.

## Rationale
- **Signals**: Matches the project's state management preference (`GEMINI.md`).
- **Functional Interceptors/Guards**: Modern Angular standard (v17+).
- **LocalStorage**: Simple and effective for SPAs, though SSR requires care (checking for `window` or using `PLATFORM_ID`).

## Alternatives Considered
- **RxJS for state**: Rejected in favor of Signals as per project conventions.
- **Cookies**: Rejected for simplicity in this initial implementation, unless the backend specifically requires them.

## Technical Context Refinement
- **Language/Version**: Angular 21, TypeScript
- **Primary Dependencies**: `HttpClientModule`, `Router`, Signals
- **Storage**: `localStorage` (Client-side)
- **Testing**: Jasmine/Karma (Standard Angular)
- **Target Platform**: Web (SSR enabled)
