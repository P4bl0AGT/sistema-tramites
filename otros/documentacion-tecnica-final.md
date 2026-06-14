# Documentacion tecnica final - Portal de Tramites Municipales

## 1. Resumen del proyecto

Sistema web y movil para gestionar tramites municipales entre ciudadanos y funcionarios de la I. Municipalidad de Santo Domingo.

- Frontend: Ionic + React + TypeScript.
- Backend: Node.js + Express + Prisma.
- Base de datos: PostgreSQL.
- Autenticacion: JWT + bcrypt.
- Despliegue local: Docker Compose.

## 2. Arquitectura

### Frontend

Estructura por capas y rol:

- `src/pages/auth`: login y registro.
- `src/pages/ciudadano`: ingreso, trazabilidad, subsanacion y notificaciones.
- `src/pages/funcionario`: bandeja, alertas y revision.
- `src/services`: cliente API, autenticacion, tramites, notificaciones y storage local.
- `src/routes`: rutas publicas, privadas y proteccion por rol.
- `src/components`: header, footer y sidebars.

### Backend

API REST organizada por recursos:

- `auth.routes.js`: registro, login y demo ClaveUnica.
- `tramites.routes.js`: CRUD, estados, archivos, observaciones y subsanaciones.
- `notificaciones.routes.js`: centro de mensajes.
- `usuarios.routes.js`: perfil autenticado.
- `servicios.routes.js`: integracion externa con API de feriados de Chile.
- `middleware/auth.js`: JWT y roles.
- `middleware/security.js`: headers, rate limit y sanitizacion XSS.

## 3. Requerimientos de entrega final

### EF1 - Funcionalidades completas

- CRUD de tramites: `GET`, `POST`, `PATCH` y `DELETE`.
- Observaciones y subsanaciones con archivo opcional.
- Centro de notificaciones: listar, marcar una, marcar todas y eliminar.
- Almacenamiento local centralizado para sesion, seleccion de tramite y preferencias de accesibilidad.

### EF2 - UI/UX y rendimiento

- Rutas por rol en frontend.
- Interceptor Axios para bearer token y salida automatica ante `401`.
- API configurable con `VITE_API_URL`.
- Alertas urgentes consultadas al backend con `urgentes=true`.
- Nginx sirve assets estaticos con cache de 30 dias en Docker.

### EF3 - Seguridad avanzada

- Hash de contrasenas con `bcryptjs`.
- JWT con expiracion.
- ORM Prisma para consultas parametrizadas y mitigacion de SQL injection.
- `helmet` para headers HTTP.
- `express-rate-limit` para limitar abuso de API/auth.
- Sanitizacion XSS de body/query y campos de texto relevantes.
- CORS restringido por `CORS_ORIGINS`.
- Limite JSON de `1mb`.
- Uploads limitados por extension y tamano.

### EF4 - Consultas eficientes

`GET /api/tramites` soporta:

- `page`
- `pageSize`
- `estado`
- `search`
- `urgentes=true`

Indices agregados:

- `Tramite(ciudadanoId, creadoEn)`
- `Tramite(estado, creadoEn)`
- `Tramite(actualizadoEn)`
- `HistorialEstado(tramiteId, creadoEn)`
- `Observacion(tramiteId, creadoEn)`
- `Notificacion(usuarioId, leida, creadoEn)`

### EF5 - Servicio externo

Se integra la API publica de feriados de Chile de Boostr:

- `GET /api/servicios/feriados?year=2026`
- `GET /api/servicios/feriados/:fecha`

Uso funcional:

- Validar feriados chilenos.
- Justificar calculo de plazos habiles municipales.
- Demostrar consumo HTTP externo desde el backend.

El backend incluye fallback local para 2026 si el servicio externo no responde.

### EF6 - Docker

Archivos agregados:

- `backend/Dockerfile`
- `frontend/Dockerfile`
- `frontend/nginx.conf`
- `docker-compose.yml`
- `.dockerignore`

Servicios orquestados:

- `db`: PostgreSQL 15.
- `api`: Express + Prisma.
- `frontend`: build Ionic servido por Nginx.

## 4. Variables de entorno

Backend:

```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/tramites_db"
JWT_SECRET="docker_local_secret_change_me"
PORT=3001
CORS_ORIGINS="http://localhost:8100,http://127.0.0.1:8100"
RATE_LIMIT_MAX=300
AUTH_RATE_LIMIT_MAX=30
FERIADOS_API_URL="https://api.boostr.cl/holidays.json"
FERIADO_DIA_API_URL="https://api.boostr.cl/holidays/is/{date}.json"
```

Frontend:

```env
VITE_API_URL="http://localhost:3001/api"
```

## 5. Ejecucion local sin Docker

```powershell
pnpm install
Copy-Item backend\.env.example backend\.env
pnpm --dir backend run setup
pnpm --dir backend run dev
pnpm --dir frontend run dev
```

URLs:

- Frontend: `http://localhost:8100`
- API: `http://localhost:3001/api`
- Health check: `http://localhost:3001/api/health`

## 6. Despliegue local con Docker

Desde la raiz:

```powershell
docker compose up --build
```

Verificar servicios:

```powershell
docker compose ps
Invoke-RestMethod http://localhost:3001/api/health
```

Abrir:

- `http://localhost:8100`

Credenciales:

- Funcionario: `admin@municipio.cl`
- Contrasena: `admin123`

Detener:

```powershell
docker compose down
```

Eliminar datos locales:

```powershell
docker compose down -v
```

## 7. Pruebas recomendadas

```powershell
pnpm --dir frontend run lint
pnpm --dir frontend run build
pnpm --dir backend exec prisma validate
pnpm --dir backend exec prisma migrate status
```

Flujo manual:

1. Registrar ciudadano.
2. Crear tramite con archivo.
3. Revisar trazabilidad.
4. Entrar como funcionario.
5. Cambiar estado.
6. Crear observacion.
7. Volver como ciudadano y subsanar.
8. Revisar notificaciones.
9. Editar datos de tramite no finalizado.
10. Eliminar tramite como funcionario.

## 8. Evidencia sugerida

Guardar capturas o exportaciones de:

- `docker compose ps`.
- Health check de API.
- Login ciudadano/funcionario.
- CRUD de tramite.
- Notificaciones leidas.
- Servicio externo de feriados.
- Ejecucion de Postman.
