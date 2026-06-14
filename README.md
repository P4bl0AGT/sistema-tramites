# Portal de Trámites Municipales — I. Municipalidad de Santo Domingo

**Entrega Parcial 2 — Backend, API REST y conexión con frontend**
Asignatura: Ingeniería Web y Móvil · ICI 4247
Stack: Ionic + React + TypeScript (frontend) · Node.js + Express + PostgreSQL + Prisma (backend)

🔗 **Repositorio:** https://github.com/P4bl0AGT/sistema-tramites

---

## Integrantes

| Nombre            | RUT           |
|-------------------|---------------|
| Pablo Aguilera    | 21.712.853-6  |
| Benjamin Gomez    | 21.039.315-3  |
| Joaquin Garrido   | 20.882.540-2  |

---

## 1) ¿Qué hace este proyecto?

Permite gestionar trámites municipales en línea entre ciudadanos y funcionarios de la I. Municipalidad de Santo Domingo, con:

- Ingreso de trámites con expediente electrónico y ticket único
- Trazabilidad en tiempo real con línea de tiempo progresiva
- Notificaciones multicanal con vista tipo correo
- Bandeja de gestión y alertas de vencimiento para funcionarios
- Revisión, observación y cambio de estado por parte del funcionario
- Subsanación y rectificación de documentos por el ciudadano
- Autenticación con JWT, bcrypt y soporte simulado de ClaveÚnica

---

## 2) Estructura general del repositorio

```
sistema-tramites/
├── backend/                 # API REST Node.js + Express + Prisma
│   ├── prisma/
│   │   ├── migrations/       # migraciones de esquema e indices
│   │   └── schema.prisma
│   ├── src/
│   │   ├── lib/              # cliente Prisma singleton
│   │   ├── middleware/       # auth, upload, security
│   │   ├── routes/           # auth, tramites, notificaciones, usuarios, servicios
│   │   └── utils/            # sanitizacion y utilidades de input
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   ├── seed.js               # crea el funcionario de prueba
│   └── server.js
├── frontend/                # App Ionic + React + TypeScript
│   ├── public/
│   │   └── assets/
│   ├── src/
│   │   ├── components/       # header, footer y sidebars
│   │   ├── pages/            # auth, ciudadano y funcionario
│   │   ├── routes/           # AppRouter y PrivateRoute por rol
│   │   ├── services/         # api, auth, tramites, notificaciones, storage
│   │   └── theme/
│   ├── .env.example
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── vite.config.ts
├── otros/                   # documentacion, evidencias y diagramas
│   ├── documentacion-tecnica-final.md
│   ├── postman-collection.json
│   ├── evidencia-api-completa.json
│   ├── evidencia-api-parcial.json
│   ├── evidencia-api-parcial.json
│   ├── reporte-pruebas-ep2.md
│   ├── arquitectura-navegacion.md
│   ├── task-flows.md
│   ├── diagrama-componentes.md
│   └── diagrama-erd.md
├── .dockerignore
├── docker-compose.yml
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
└── README.md
```

---

## 3) Arquitecturas usadas

### 3.1 Arquitectura por capas (frontend)

El frontend organiza cada página siguiendo separación por responsabilidades:

- **services**: acceso a API, lógica de negocio y persistencia (`auth.service.ts`, `tramites.service.ts`, `notificaciones.service.ts`, `storage.service.ts`)
- **pages**: vistas por rol y funcionalidad (`ciudadano/`, `funcionario/`, `auth/`)
- **components**: piezas reutilizables (`PageHeader`, `PageFooter`, `CiudadanoSidebar`, `FuncionarioSidebar`)
- **routes**: control de acceso por rol mediante `PrivateRoute`

La UI no contiene lógica de negocio pesada; los servicios encapsulan las llamadas a la API y las transformaciones de datos.

### 3.2 Arquitectura por feature (frontend)

El sistema se separa por dominios funcionales:

```
src/
├── pages/
│   ├── auth/          # Login, Registro
│   ├── ciudadano/     # RF01 Ingreso, RF02 Trazabilidad, RF06 Subsanación, RF07 Notificaciones
│   └── funcionario/   # RF03 Bandeja, RF04 Alertas, RF05 Revisión
├── services/          # api, auth, tramites, notificaciones, storage
├── components/        # Componentes compartidos
└── routes/            # AppRouter, PrivateRoute
```

### 3.3 Arquitectura REST (backend)

El backend expone una API REST organizada por recurso, con middleware de autenticación y autorización por rol:

```
src/
├── routes/       # auth.routes, tramites.routes, notificaciones.routes, servicios.routes, usuarios.routes
├── middleware/   # auth.js (JWT), upload.js (multer), security.js
├── utils/        # input.js (sanitización y validación auxiliar)
└── lib/          # prisma.js (cliente Prisma singleton)
```

---

## 4) Frontend 

### 4.1 Organización principal

```
frontend/src/
├── components/
│   ├── PageHeader.tsx
│   ├── PageFooter.tsx
│   ├── CiudadanoSidebar.tsx
│   └── FuncionarioSidebar.tsx
├── pages/
│   ├── auth/
│   │   ├── Login.tsx
│   │   └── Registro.tsx
│   ├── ciudadano/
│   │   ├── RF01Ingreso.tsx
│   │   ├── RF02Trazabilidad.tsx
│   │   ├── RF06Subsanacion.tsx
│   │   └── RF07Notificaciones.tsx
│   └── funcionario/
│       ├── RF03Bandeja.tsx
│       ├── RF04Alertas.tsx
│       └── RF05Revision.tsx
├── routes/
│   ├── AppRouter.tsx
│   └── PrivateRoute.tsx
├── services/
│   ├── api.ts
│   ├── auth.service.ts
│   ├── notificaciones.service.ts
│   ├── storage.service.ts
│   ├── storage.service.test.ts
│   └── tramites.service.ts
└── theme/
    ├── variables.css
    └── municipal.css
```

### 4.2 Runtime actual del frontend

El frontend trabaja 100% contra el backend remoto en todas las features:

| Feature          | DataSource |
|------------------|------------|
| auth             | remoto     |
| tramites         | remoto     |
| notificaciones   | remoto     |
| usuarios         | remoto     |

### 4.3 Flujo funcional general

1. El ciudadano se registra o inicia sesión en `/login`.
2. Ingresa un trámite desde `/ciudadano/ingreso`, adjunta documentos y obtiene un ticket único.
3. Consulta el estado desde `/ciudadano/trazabilidad` con línea de tiempo progresiva.
4. Si el trámite es observado, subsana desde `/ciudadano/subsanacion`.
5. Recibe notificaciones en `/ciudadano/notificaciones`.
6. El funcionario gestiona la bandeja desde `/funcionario/bandeja`.
7. Revisa, cambia estado u observa desde `/funcionario/revision`.
8. Monitorea vencimientos desde `/funcionario/alertas`.

### 4.4 Sesión y seguridad en frontend

- Usa token bearer en headers (`Authorization: Bearer <token>`) en todas las rutas protegidas.
- Si el backend devuelve `401`, el interceptor de axios limpia el token y redirige a `/login`.
- El rol del usuario determina la redirección post-login (`ciudadano` → ingreso, `funcionario` → bandeja).

---

## 5) Backend 

### 5.1 Organización principal

```
backend/
├── src/
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── tramites.routes.js
│   │   ├── notificaciones.routes.js
│   │   ├── servicios.routes.js
│   │   └── usuarios.routes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── security.js
│   │   └── upload.js
│   ├── utils/
│   │   └── input.js
│   └── lib/
│       └── prisma.js
├── prisma/
│   ├── migrations/
│   │   ├── 20260527210425_init/
│   │   ├── 20260603075012_init/
│   │   └── 20260614165000_add_performance_indexes/
│   └── schema.prisma
├── Dockerfile
├── seed.js
└── server.js
```

### 5.2 Endpoints principales

```
GET    /api/health

POST   /api/auth/registro
POST   /api/auth/login
POST   /api/auth/claveunica

GET    /api/tramites?estado=&search=&urgentes=&page=&pageSize=
GET    /api/tramites/:id
GET    /api/tramites/:id/archivo
GET    /api/tramites/:id/archivo-correccion
POST   /api/tramites
PATCH  /api/tramites/:id
PATCH  /api/tramites/:id/estado
POST   /api/tramites/:id/observacion
PATCH  /api/tramites/:id/subsanacion
DELETE /api/tramites/:id

GET    /api/notificaciones
PATCH  /api/notificaciones/:id/leer
PATCH  /api/notificaciones/leer-todas
DELETE /api/notificaciones/:id

GET    /api/usuarios/me

GET    /api/servicios/feriados?year=2026
GET    /api/servicios/feriados/:fecha
```

### 5.3 Seguridad implementada

- Hash de contraseñas con `bcryptjs` (`saltRounds: 10`). El campo `password` nunca se devuelve en respuestas.
- JWT con payload `{ id, correo, rol }`, expiración 8h, firmado con `JWT_SECRET`.
- CORS restringido a orígenes `http://localhost:*` en desarrollo.
- SQL Injection prevenido automáticamente por Prisma ORM (consultas parametrizadas).
- Autorización por rol con middleware `requireRole('CIUDADANO' | 'FUNCIONARIO')`.
- Carga de archivos con `multer`: extensiones permitidas (pdf, png, jpg, docx, xlsx, etc.) y límite de 10 MB.

---

## 6) Base de datos y modelo relacional

El backend usa PostgreSQL con Prisma como ORM. Las tablas se crean automáticamente con `prisma migrate deploy`.

```mermaid
erDiagram
    USUARIO {
        int id PK
        string nombre
        string rut UK
        string correo UK
        string region
        string comuna
        string password
        enum rol "CIUDADANO | FUNCIONARIO"
        datetime creadoEn
    }
    TRAMITE {
        int id PK
        string ticket UK
        string tipo
        string asunto
        string descripcion
        enum estado
        string archivoNombre
        string archivoPath
        datetime creadoEn
        int ciudadanoId FK
    }
    OBSERVACION {
        int id PK
        string motivo
        string respuesta
        datetime creadoEn
        int tramiteId FK
        int funcionarioId FK
    }
    NOTIFICACION {
        int id PK
        string mensaje
        boolean leida
        datetime creadoEn
        int usuarioId FK
        int tramiteId FK
    }
    HISTORIALESTADO {
        int id PK
        enum estado
        string motivo
        string actor
        datetime creadoEn
        int tramiteId FK
    }
    USUARIO ||--o{ TRAMITE : "crea (ciudadano)"
    USUARIO ||--o{ OBSERVACION : "emite (funcionario)"
    USUARIO ||--o{ NOTIFICACION : "recibe"
    TRAMITE ||--o{ OBSERVACION : "tiene"
    TRAMITE ||--o{ NOTIFICACION : "genera"
    TRAMITE ||--o{ HISTORIALESTADO : "registra"
```

> Detalle completo de constraints en [`otros/diagrama-erd.md`](otros/diagrama-erd.md).
> Para explorar el modelo interactivamente: `pnpm --dir backend exec prisma studio`

---

## 7) Configuración mínima para correr el proyecto

### Requisitos

- Node.js 18+
- pnpm 11+: `corepack enable` o instalar desde https://pnpm.io/installation
- PostgreSQL 15+ corriendo en `localhost:5432`

### 7.1 Backend

```powershell
cd sistema-tramites
pnpm install

# Copiar y configurar variables de entorno
Copy-Item backend\.env.example backend\.env
# Editar backend/.env y reemplazar TU_PASSWORD con la contraseña de PostgreSQL

# Crear base de datos en pgAdmin: nombre "tramites_db"

# Aplicar migraciones y cargar datos iniciales
pnpm --dir backend run setup

# Levantar servidor
pnpm --dir backend run dev
```

Variables necesarias en `backend/.env`:

```env
DATABASE_URL="postgresql://postgres:TU_PASSWORD@localhost:5432/tramites_db"
JWT_SECRET="una_clave_secreta_larga_y_aleatoria"
PORT=3001
```

### 7.2 Frontend

```powershell
pnpm --dir frontend run dev
```

La app queda disponible en `http://localhost:8100`.

---

## 8) Cómo probar rápido el sistema completo

1. Levantar PostgreSQL.
2. Levantar backend: `pnpm --dir backend run dev` → `http://localhost:3001`.
3. Levantar frontend: `pnpm --dir frontend run dev` → `http://localhost:8100`.
4. Abrir `http://localhost:8100`.
5. Probar el flujo completo:
   - Registro de ciudadano en `/registro`
   - Login y navegación al portal
   - Ingreso de trámite con archivo adjunto
   - Consulta de trazabilidad
   - Login como funcionario (ver credenciales abajo)
   - Cambio de estado, observación y eliminación de trámite
   - Subsanación como ciudadano
   - Revisión de notificaciones

### Credenciales de prueba

| Rol         | Correo                | Contraseña |
|-------------|-----------------------|------------|
| Funcionario | `admin@municipio.cl`  | `admin123` |
| Ciudadano   | Registrarse en `/registro` desde la app | — |

> El funcionario se crea ejecutando `pnpm --dir backend run setup` desde la raíz del proyecto.

---

## 9) Pruebas

Ejecutar desde la raíz del proyecto:

```powershell
pnpm --dir frontend run lint
pnpm --dir frontend exec vitest run
pnpm --dir frontend run build
pnpm --dir backend exec prisma validate
pnpm --dir backend exec prisma migrate status
```

### Colección Postman

Importar `otros/postman-collection.json` y ejecutar en este orden:

| Paso | Request                          | Qué verifica |
|------|----------------------------------|--------------|
| 1    | `POST /auth/registro`            | Crear ciudadano nuevo |
| 2    | `POST /auth/login` (ciudadano)   | Obtener token ciudadano |
| 3    | `POST /tramites`                 | Crear trámite |
| 4    | `GET /tramites`                  | Listar trámites del ciudadano |
| 5    | `GET /tramites/:id`              | Ver detalle e historial |
| 6    | `POST /auth/login` (funcionario) | Cambiar a token funcionario |
| 7    | `PATCH /tramites/:id/estado`     | Cambiar estado a EN_REVISION |
| 8    | `POST /tramites/:id/observacion` | Agregar observación |
| 9    | `POST /auth/login` (ciudadano)   | Volver a token ciudadano |
| 10   | `PATCH /tramites/:id/subsanacion`| Subsanar observación |
| 11   | `GET /notificaciones`            | Ver notificaciones generadas |
| 12   | `PATCH /notificaciones/:id/leer` | Marcar notificación como leída |
| 13   | `DELETE /tramites/:id`           | Eliminar trámite (token funcionario) |

Resultados exportados en `otros/evidencia-api-completa.json` y `otros/reporte-pruebas-ep2.md`.

---

## 10) Entrega Final

La documentación técnica de entrega final, incluyendo seguridad avanzada, optimización, integración externa y despliegue Docker, está en:

[`otros/documentacion-tecnica-final.md`](otros/documentacion-tecnica-final.md)

Para probar el despliegue local:

```powershell
docker compose up --build
```

Frontend: `http://localhost:8100`  
API: `http://localhost:3001/api/health`

---

## 11) Mentalidad técnica del proyecto

Este proyecto busca equilibrio entre:

- claridad para aprender la separación frontend/backend
- arquitectura organizada por feature y rol
- separación de responsabilidades entre UI, servicios y API
- seguridad práctica: JWT, bcrypt, autorización por rol y validación de inputs

---
