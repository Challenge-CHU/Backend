FROM node:20.11-alpine3.18 AS build

WORKDIR /app
COPY package* ./

RUN npm ci
COPY src src/
COPY public public/
RUN npm run build

FROM node:20.11-alpine3.18 AS next

LABEL org.opencontainers.image.source https://github.com/alexispet/intro-to-ci-cd-ChristopherSemard

WORKDIR /app
COPY --from=build /app/package.json /app/
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/.next /app/.next

EXPOSE 3000

COPY ./docker/next/docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

ENTRYPOINT ["docker-entrypoint"]
CMD ["npm" ,"run", "start"]
