# Repository Guidelines

## Project Structure & Module Organization
NurseFocus is a React 19 and TypeScript clinical-reference prototype built with Vite and Tailwind CSS 4. `src/main.tsx` mounts the app; `src/App.tsx` defines routes and the shared layout.

- `src/pages/`: route-level screens for search, disease/focus details, comparison, favorites, and analytics.
- `src/components/`: reusable UI components and status overlays.
- `src/context/AppStateContext.tsx`: favorites persistence, clipboard feedback, and QA simulation state.
- `src/data/`: mock clinical and analytics datasets; shared interfaces live in `src/types/clinical.ts`.
- `src/index.css`: theme tokens and global accessibility styles.

`server/src/` contains the Express API, `server/tests/` integration tests, and `prisma/` the schema, migrations, and seed. There is no asset directory yet. If adding static assets under `src/assets/`, preserve the Vite plugin that copies them into `dist/src/assets/`.

## Build, Test, and Development Commands
Use Bun with the committed `bun.lock`:

- `bun install --frozen-lockfile`: install locked dependencies.
- `bun run dev`: start Vite on port 3000 and the API on localhost:3001.
- `bun run lint`: run TypeScript checking (`tsc --noEmit`); this is not an ESLint check.
- `bun run build`: generate frontend assets in `dist/` and the server in `build/server/`.
- `bun run preview`: serve the production build locally.
- `bun run clean`: remove `dist/` and generated `server.js`.

## Coding Style & Naming Conventions
Follow existing two-space indentation, single-quoted TypeScript strings, semicolons, and double-quoted JSX attributes. Use PascalCase for component files and types, camelCase for functions and variables, and `use` prefixes for hooks. Keep clinical data shapes in `src/types/clinical.ts`. Prefer Tailwind utilities and existing theme tokens. Preserve Thai/English labels, keyboard focus indicators, and reduced-motion support. No dedicated formatter or ESLint configuration is currently present.

## Testing Guidelines
Use `bun run test` for Vitest/Supertest integration tests against a temporary SQLite database. No coverage threshold is configured. Run tests, type checking, and a production build before submitting changes. Manually verify affected routes, search/filter behavior, comparison, favorites after reload, and clipboard fallback. Exercise relevant offline, loading, and error simulations. If introducing tests, document the runner and use descriptive `*.test.ts` or `*.test.tsx` filenames.

## Commit & Pull Request Guidelines
History is limited; the latest commit uses `feat: ...`. Continue concise, imperative messages with prefixes such as `feat:`, `fix:`, or `docs:`. PRs should describe behavior changes, link relevant issues, record validation performed, and include screenshots for UI changes.

## Configuration & Data Safety
Use `.env.example` for configuration names; keep credentials out of source and client bundles. Retain mock-data labels and clinical provenance fields. Preserve the `DISABLE_HMR` handling in `vite.config.ts`.
