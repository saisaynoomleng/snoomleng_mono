#=======================================
# Stage 1: Dependencies
#=======================================

ARG NODE_VERSION=24.20-alpine

FROM node:${NODE_VERSION} AS dependencies

WORKDIR /app

COPY package.json pnpm*.yaml ./

RUN corepack enable pnpm && corepack prepare pnpm@11.24.0 --activate

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
pnpm i --frozen-lockfile

#=======================================
# Stage 2: Build
#=======================================

FROM dependencies AS build

WORKDIR /app

COPY . .

ENV NEXT_PUBLIC_LOGO_URL=https://cdn.sanity.io/images/yzx0dd6e/production/e90d6b7323a5de9639c61f76c589fa9f550a4e6d-740x591.png
ENV NEXT_PUBLIC_APP_URL=https://snoomleng.com
ENV NEXT_PUBLIC_SANITY_DATASET=production
ENV NEXT_PUBLIC_SANITY_PROJECT_ID=yzx0dd6e
ENV SKIP_VALIDATION=1

RUN pnpm build

#=======================================
# Stage 3: Runner
#=======================================

FROM node:${NODE_VERSION} AS runner

WORKDIR /app

USER node

ENV NODE_ENV=production

COPY --from=build --chown=node:node ./app/.next/standalone ./
COPY --from=build --chown=node:node ./app/.next/static ./.next/static
COPY --from=build --chown=node:node ./app/public ./public

EXPOSE 3000

CMD [ "node", "server.js" ]