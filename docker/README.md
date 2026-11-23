# Docker deployment

The web container serves the built React app and proxies `/api` to the Node.js container. SQLite lives in a named volume; the host database, `.env`, and account passwords are never copied into images. Dependencies install from `bun.lock` inside Linux, and Prisma generates the matching Linux engine.

## Start

```sh
cp .env.docker.example .env.docker
# Replace JWT_SECRET in .env.docker with: openssl rand -base64 48
# If .env.docker already exists, preserve its secret and settings.
docker compose --env-file .env.docker up -d --build --wait
```

Open http://localhost:8080. This leaves the existing localhost:3000 development server untouched. For a different port, change both `WEB_PORT` and `APP_ORIGIN`. API startup applies migrations and inserts missing seed content without overwriting existing records. Set `SEED_DATABASE=false` to skip seed on subsequent starts.

The default configuration publishes only to loopback for local HTTP testing and explicitly uses non-Secure cookies. For deployment behind an HTTPS reverse proxy, set `APP_ORIGIN` to the exact HTTPS origin and `COOKIE_SECURE=true`. Do not expose the local HTTP test configuration publicly. Keep a single API instance for SQLite; do not run simultaneous migrations against the volume. The API currently rate-limits per proxy address because Express does not trust forwarded headers; assess trusted proxy configuration before multi-user production deployment.

## Administrator

The Docker database is independent of `prisma/dev.db`; the previous local test login is not copied automatically. Create the first administrator after startup. Enter credentials interactively so the password is not embedded in an image or shell command:

```sh
docker compose --env-file .env.docker exec api sh
read -r -p 'Email: ' ADMIN_EMAIL
printf 'Password: '
stty -echo
read -r ADMIN_PASSWORD
stty echo
printf '\n'
export ADMIN_EMAIL ADMIN_PASSWORD
node build/server/bootstrap.js
unset ADMIN_EMAIL ADMIN_PASSWORD
exit
```

Password requirements: at least 12 characters and at most 72 UTF-8 bytes. Bootstrap refuses to replace an existing administrator. Sign in at `/account` and use the account page to create additional members. No default admin password is installed.

## Operations

```sh
docker compose --env-file .env.docker ps
docker compose --env-file .env.docker logs --tail=100 api
docker compose --env-file .env.docker restart api
docker compose --env-file .env.docker down
```

`down` keeps the named volume. **`down -v` deletes the database and all accounts/favorites.** Rebuild with `up -d --build --wait` after source changes. Health checks exercise the database through `/api/health`. The API runs as the non-root `node` user and receives termination signals through an exec entrypoint.

## Backup and restore

Stop writes before copying the database and its SQLite sidecars together:

```sh
mkdir -m 700 docker-backup
docker compose --env-file .env.docker stop api
docker compose --env-file .env.docker cp api:/data/. ./docker-backup/
docker compose --env-file .env.docker start api
```

Use a new backup directory each time and protect it like the database. For restoration, stop the API, preserve its current `/data` directory first, and restore the entire matching backup set into an **empty** data volume. Never combine an old database with unrelated WAL/SHM files. Ensure ownership is UID/GID 1000 (`node`), then start the API and verify health, login and clinical records. The host-side online backup script in `scripts/backup-db.py` can validate a copied backup. Do not copy the live database alone while writes are in progress.

## Image layout

`Dockerfile` uses a shared build stage and two targets: `api` (Node 24 on Debian with OpenSSL) and `web` (Nginx). The API retains Prisma CLI and tsx to support migrations and the TypeScript seed; it includes only seed data/type sources, not the frontend source tree. `.dockerignore` excludes credentials, local databases, git history and host dependencies.

## Smoke test

With the stack running and host dependencies installed, run `node docker/smoke-test.mjs`. It checks SPA routes, API routing, login cookies and favorite persistence after recreating the API container. It creates a temporary member account and removes it afterward; API recreation briefly interrupts requests. Use only against this local test stack.
