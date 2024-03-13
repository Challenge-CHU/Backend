FROM node:20.11-alpine3.18 AS build

WORKDIR /app
COPY package* ./
RUN npm i


COPY src src/
COPY prisma prisma
COPY next.config.mjs next.config.mjs 
COPY postcss.config.js postcss.config.js
COPY jsconfig.json jsconfig.json
COPY tailwind.config.js tailwind.config.js
COPY public public/

RUN npx prisma generate
RUN npx prisma migrate deploy

RUN npm run build

FROM node:20.11-alpine3.18 AS next

WORKDIR /app
COPY --from=build /app/package.json /app/
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/.next /app/.next

EXPOSE 3000

CMD ["npm" ,"run", "start"]
