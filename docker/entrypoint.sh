#!/bin/sh
set -eu
# Management commands supplied with compose run bypass normal startup.
if [ "${1:-}" = "node" ] && [ "${2:-}" = "build/server/index.js" ]; then
  node scripts/prepare-db.mjs
  node node_modules/prisma/build/index.js migrate deploy
  if [ "${SEED_DATABASE:-true}" = "true" ]; then
    node --import tsx prisma/seed.ts
  fi
fi
exec "$@"
