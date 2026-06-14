FROM node:22-alpine AS deps

RUN apk add --no-cache openssl
WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json ./backend/package.json
COPY backend/prisma/schema.prisma ./backend/prisma/schema.prisma

RUN corepack enable && corepack prepare pnpm@11.4.0 --activate && pnpm --dir backend install --frozen-lockfile

FROM node:22-alpine AS runner

ENV NODE_ENV=production
RUN apk add --no-cache openssl
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/backend/node_modules ./backend/node_modules
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend ./backend

RUN corepack enable && corepack prepare pnpm@11.4.0 --activate && pnpm --dir backend exec prisma generate

EXPOSE 3001

CMD ["sh", "-c", "pnpm --dir backend exec prisma migrate deploy && pnpm --dir backend exec node seed.js && pnpm --dir backend start"]
