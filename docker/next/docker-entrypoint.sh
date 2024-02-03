#!/bin/sh
set -e

echo "Le docker-entrepoint s'execute"

# il faudrait mettre le npm install dans un if env=dev
npm install

echo "Le docker-entrepoint a terminé"

exec "$@"