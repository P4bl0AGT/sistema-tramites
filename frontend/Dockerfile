FROM node:22-alpine AS build

WORKDIR /app
ENV CYPRESS_INSTALL_BINARY=0

COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY frontend/package.json ./frontend/package.json

RUN corepack enable && corepack prepare pnpm@11.4.0 --activate && pnpm --dir frontend install --frozen-lockfile

COPY frontend ./frontend

ARG VITE_API_URL=http://localhost:3001/api
ENV VITE_API_URL=$VITE_API_URL

RUN pnpm --dir frontend run build

FROM nginx:1.27-alpine AS runner

COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/frontend/dist /usr/share/nginx/html

EXPOSE 80
