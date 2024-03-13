#!/bin/sh
set -e

echo "Le docker-entrepoint s'execute"

# il faudrait mettre le npm install dans un if env=dev
npm install

npx prisma migrate deploy

echo "Le docker-entrepoint a terminé"

exec "$@"