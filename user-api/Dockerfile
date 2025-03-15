FROM node:22 AS builder

ARG ENV_TAG=dev
WORKDIR /app

RUN npm install -g corepack@latest && corepack enable
COPY package.json pnpm-lock.yaml nest-cli.json ./

RUN pnpm install --frozen-lockfile --ignore-scripts

COPY tsconfig.json tsconfig.build.json ./
COPY src ./src
RUN pnpm run build
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

FROM node:22-alpine as runner
ARG ENV_TAG=dev

WORKDIR /app
COPY .env.${ENV_TAG} ./.env
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

USER node
CMD ["node", "dist/main.js"]

EXPOSE 3000 5000
