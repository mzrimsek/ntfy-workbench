FROM node:18-alpine AS base

LABEL org.opencontainers.image.source https://github.com/mzrimsek/ntfy-workbench

FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci

FROM base AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build && npm cache clean --force

FROM base AS runner

WORKDIR /app

COPY --from=builder /app .

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 remix
USER remix

EXPOSE 3000
ENV PORT 3000

VOLUME /app/config
VOLUME /app/data

CMD ["npm", "run", "start"]