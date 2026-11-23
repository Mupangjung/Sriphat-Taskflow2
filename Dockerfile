# syntax=docker/dockerfile:1
FROM oven/bun:1.4.5 AS bun
FROM node:24-bookworm-slim AS base
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app

FROM base AS build
COPY --from=bun /usr/local/bin/bun /usr/local/bin/bun
COPY package.json bun.lock ./
COPY prisma/schema.prisma prisma/schema.prisma
RUN bun install --frozen-lockfile
COPY . .
RUN npm run db:generate && npm run build

# Keep Prisma CLI and tsx for migrations and the idempotent source-data seed.
FROM base AS api
ENV NODE_ENV=production HOST=0.0.0.0 PORT=3001 DATABASE_URL=file:/data/nursefocus.db
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/build/server ./build/server
COPY --from=build --chown=node:node /app/package.json ./package.json
COPY --from=build --chown=node:node /app/prisma ./prisma
COPY --from=build --chown=node:node /app/src/data ./src/data
COPY --from=build --chown=node:node /app/src/types ./src/types
COPY --from=build --chown=node:node /app/scripts/prepare-db.mjs ./scripts/prepare-db.mjs
COPY --chmod=755 docker/entrypoint.sh /usr/local/bin/nursefocus-entrypoint
RUN mkdir /data && chown node:node /data
USER node
EXPOSE 3001
HEALTHCHECK --interval=15s --timeout=5s --start-period=60s --retries=5 \
  CMD node -e "fetch('http://127.0.0.1:3001/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
ENTRYPOINT ["nursefocus-entrypoint"]
CMD ["node", "build/server/index.js"]

FROM nginx:stable-alpine AS web
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/api/health || exit 1
