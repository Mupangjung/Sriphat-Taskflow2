# NurseFocus

React clinical-reference application with an Express/TypeScript API, Prisma 6.19 and SQLite. The seed contains 11 care contexts and 38 nursing focuses, including 12 document-derived entries awaiting institutional review. This application does not store patient records.

## Docker

Use [Docker setup](docker/README.md) to run the built frontend and API at `http://localhost:8080` with persistent SQLite storage. The Docker database is separate from the local development database.

## Local setup

Use Node.js 24 LTS and Bun (the committed lockfile is `bun.lock`).

```sh
bun install --frozen-lockfile
cp .env.example .env
```

Replace `JWT_SECRET` with a random secret of at least 32 characters (`openssl rand -base64 48`). Keep `.env` private. An existing local `.env` must be preserved. `DATABASE_URL="file:./dev.db"` resolves under `prisma/`.

```sh
bun run db:generate
bun run db:migrate
bun run db:seed
bun run dev
```

Open http://localhost:3000. Vite proxies `/api` to the API at `127.0.0.1:3001`. Guest browsing and device-local favorites work without a user account. Content loads from SQLite; mock modules are seed input only and are not bundled into the web app.

## First administrator

Set `ADMIN_EMAIL`, `ADMIN_NAME`, and `ADMIN_PASSWORD` in your private environment, then run `bun run admin:create`. The password must be at least 12 characters and at most 72 UTF-8 bytes. There is no default password. Bootstrap refuses to run if an active administrator already exists. Remove the bootstrap credentials afterward.

Use the **บัญชี** link to sign in, change passwords, or create member accounts as an administrator. Role/status updates are available through the administrator API. Public registration and email password recovery are not enabled. Analytics requires an administrator account.

## Commands

| Command | Purpose |
| --- | --- |
| `bun run dev` | Run Vite and API together; stop both with Ctrl+C |
| `bun run dev:web` / `bun run dev:api` | Run one process |
| `bun run lint` | Type-check frontend, server and seed |
| `bun run test` | Run 14 integration tests against an isolated temporary SQLite database |
| `bun run build` | Build web assets and compile server TypeScript |
| `bun run start` | Run compiled API |
| `bun run db:migrate` | Initialize SQLite file without truncation and apply committed migrations |
| `bun run db:seed` | Insert missing seed records; preserve existing content and accounts |

`npm run ...` can also execute these scripts after dependencies have been installed. Source changes require a reviewed migration/import; repeated seed runs intentionally do not overwrite edited content.

## Data and API

See [API contract](docs/openapi.yaml) and [architecture notes](docs/backend.md). All routes use `/api/v1`, except `/api/health`.

The original source contains a cross-link from `cap-ineffective-breathing-pattern` to AECOPD that is absent from the disease's `focusIds`, plus a duplicate expert order. The seed preserves the link used by the original frontend and assigns a stable, unique position within each disease (stable sorting by source order). It does not alter the clinical text.

Clinical review dates are converted from Thai Buddhist-era strings to ISO dates. Due status is evaluated using the Bangkok calendar. Pending document-derived records retain null dates and null NANDA codes. Imported local Focus labels are never silently treated as validated standard codes.

## Deployment and recovery

Run `db:migrate` and `build` before starting the compiled API. Configure a reverse proxy to serve `dist/` with SPA fallback and route `/api` to localhost:3001. Use HTTPS, set `NODE_ENV=production`, set `APP_ORIGIN` to the exact browser origin, and keep `JWT_SECRET` stable. Do not expose the database or `.env` as static files. The API binds to loopback; configure the proxy on the same host.

Use one API instance and persistent local storage for SQLite. WAL is enabled on API startup. Do not use ephemeral filesystem hosting. Rate limiting is per process and does not trust forwarded IP headers by default. For a proxy setup, audit its IP forwarding and trust configuration before changing it.

Back up using SQLite's online backup API, not a copy of only the main file while WAL writes are active:

```sh
python3 scripts/backup-db.py prisma/dev.db /secure-backups/nursefocus.db
```

The backup script refuses to overwrite an existing file. To restore, stop the API, preserve the current database and any WAL/SHM files together in a separate location, put the backup at the configured database path, run migrations, and start the API. Verify `/api/health`, login and a clinical detail page. Keep backups access-controlled.

## MVP boundaries

Clinical content administration/CMS and audit history remain the explicitly deferred phase of the approved plan. The runtime is read-only for clinical content; account management and favorites are writable. Analytics starts empty, records application usage only, and retains search labels only for exact known catalog terms. Unknown free text contributes to aggregate counts but is never stored, so unmatched-query detail is intentionally incomplete. Analytics is best-effort, not a clinical quality metric.

The frontend caches a database-backed content snapshot for navigation/favorites; search, filtered focus lists, focus detail, comparison, account and analytics requests use dedicated endpoints. Reload to refresh the snapshot after a controlled content import. Full offline reading is not guaranteed.
