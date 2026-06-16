# Reporte de pruebas - Entrega Final

Fecha base: 2026-05-28 · Actualizado para Entrega Final

## Alcance EF

Cubre todos los puntos de la rubrica de entrega final: funcionalidades completas, seguridad avanzada, optimizacion de consultas, integracion con servicio externo y despliegue Docker.

Incluye ademas la evidencia acumulada de EP2: integracion frontend/backend, JWT, rutas protegidas, validacion de inputs y esquema relacional con Prisma.

## Pruebas ejecutadas

| Area | Comando / prueba | Resultado |
|---|---|---|
| Dependencias | `pnpm install` | PASS |
| Frontend lint | `pnpm --dir frontend run lint` | PASS |
| Frontend unit | `pnpm --dir frontend exec vitest run` | PASS, 1 test |
| Frontend build | `pnpm --dir frontend run build` | PASS |
| Backend sintaxis JS | `node --check` en archivos `.js` de `backend` | PASS |
| Prisma schema | `DATABASE_URL=... pnpm --dir backend exec prisma validate` | PASS |
| API validaciones sin BD | Requests HTTP a Express con `JWT_SECRET` y `DATABASE_URL` temporales | PASS |
| API funcional completa | Registro, login, JWT, perfil, CRUD de tramite, observacion, subsanacion y notificaciones | PASS, ver `otros/evidencia-api-completa.json` |
| Cypress e2e | `pnpm --dir frontend exec cypress run --browser electron` | BLOQUEADO por binario Cypress local |
| API CRUD/JWT tipo Postman | Flujo equivalente a la coleccion `otros/postman-collection.json` ejecutado por HTTP | PASS |

## Evidencia API — validaciones sin BD

Casos cubiertos sin depender de PostgreSQL:

| Endpoint | Caso | Esperado | Obtenido |
|---|---|---:|---:|
| `POST /api/auth/registro` | body vacio | 400 | 400 |
| `POST /api/auth/registro` | correo invalido | 400 | 400 |
| `POST /api/auth/login` | body vacio | 400 | 400 |
| `GET /api/tramites` | sin token | 401 | 401 |
| `GET /api/usuarios/me` | sin token | 401 | 401 |
| `GET /api/notificaciones` | sin token | 401 | 401 |
| `DELETE /api/tramites/1` | sin token | 401 | 401 |

## Evidencia API completa con PostgreSQL

Archivo generado:

`otros/evidencia-api-completa.json`

Casos cubiertos con base de datos real:

| Caso | Esperado | Resultado |
|---|---:|---|
| Registro ciudadano | 201 | PASS |
| Login ciudadano | 200 | PASS |
| Perfil ciudadano con JWT | 200 | PASS |
| Crear tramite ciudadano | 201 | PASS |
| Listar tramites ciudadano | 200 | PASS |
| Detalle tramite ciudadano | 200 | PASS |
| Listar notificaciones ciudadano | 200 | PASS |
| Marcar notificacion leida | 200 | PASS |
| Login funcionario | 200 | PASS |
| Bloqueo por rol: funcionario creando tramite | 403 | PASS |
| Cambiar estado funcionario | 200 | PASS |
| Agregar observacion funcionario | 201 | PASS |
| Subsanar observacion ciudadano | 200 | PASS |
| Eliminar tramite funcionario | 200 | PASS |

## Bloqueos encontrados

1. Docker no esta disponible en el equipo.
   - `docker --version` no existe, por lo que no se pudo levantar PostgreSQL en contenedor.

2. Cypress esta instalado, pero su binario local falla al iniciar.
   - Se limpio e instalo nuevamente el cache de Cypress.
   - Sigue fallando con `Cypress.exe: bad option: --smoke-test`.

## Ajustes realizados durante las pruebas

- Se agrego `DELETE /api/tramites/:id` para cubrir el metodo DELETE solicitado por EP 2.3.
- Se actualizo la coleccion Postman con el login correcto del funcionario: `admin@municipio.cl` / `admin123`.
- Se agrego el request `Eliminar tramite (FUNCIONARIO)` en Postman.
- Se corrigio el texto visible del login para mostrar credenciales reales.
- Se actualizo el e2e de Cypress para apuntar a pantallas reales del proyecto, no al template inicial de Ionic.
- Se creo `backend/.env` con PostgreSQL local.
- Se creo la base `tramites_db`, se aplicaron migraciones y se ejecuto seed.

## Comandos usados para preparar base local

1. Crear `backend/.env`:

```env
DATABASE_URL="postgresql://postgres:TU_PASSWORD@localhost:5432/tramites_db"
JWT_SECRET="una_clave_secreta_larga_y_aleatoria"
PORT=3001
```

2. Crear base `tramites_db` en PostgreSQL:

```powershell
$env:PGPASSWORD='123'
& 'C:\Program Files\PostgreSQL\18\bin\createdb.exe' -h localhost -p 5432 -U postgres tramites_db
```

3. Ejecutar:

```powershell
pnpm --dir backend exec prisma migrate deploy
pnpm --dir backend exec node seed.js
pnpm --dir backend run dev
pnpm --dir frontend run dev
```

## Orden sugerido en Postman

Importar `otros/postman-collection.json` y ejecutar:

- Registro de ciudadano
- Login ciudadano
- Crear tramite
- Listar tramites
- Login funcionario
- Cambiar estado
- Agregar observacion
- Login ciudadano
- Responder observacion / Subsanar
- Listar notificaciones
- Marcar notificacion como leida
- Mi perfil
- Login funcionario
- Eliminar tramite
