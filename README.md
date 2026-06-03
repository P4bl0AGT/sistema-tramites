# Portal de Trámites Municipales — I. Municipalidad de Santo Domingo

**Entrega Parcial 2 — Backend, API REST y conexión con frontend**  
Asignatura: Ingeniería Web y Móvil · ICI 4247  
Stack: Ionic + React + TypeScript (frontend) · Node.js + Express + PostgreSQL + Prisma (backend)

---

## Integrantes

| Nombre            | RUT           |
|-------------------|---------------|
| Pablo Aguilera    | 21.712.853-6  |
| Benjamin Gomez    | 21.039.315-3  |
| Joaquin Garrido   | 20.882.540-2  |

---

## Estructura del repositorio

```
sistema-tramites/
├── frontend/          # App Ionic + React + TypeScript
├── backend/           # API REST Node.js + Express + Prisma
│   ├── src/
│   │   ├── routes/       # auth, tramites, notificaciones, usuarios
│   │   └── middleware/   # authenticateToken, requireRole
│   ├── prisma/
│   │   └── schema.prisma
│   ├── .env.example
│   ├── seed.js           # crea el funcionario de prueba
│   └── server.js
├── otros/
│   ├── postman-collection.json
│   ├── evidencia-api-completa.json
│   ├── reporte-pruebas-ep2.md
│   ├── arquitectura-navegacion.md
│   ├── task-flows.md
│   ├── diagrama-componentes.md
│   └── diagrama-erd.md
├── pnpm-workspace.yaml
└── README.md
```

---

## Requisitos previos

- Node.js 18+
- PostgreSQL 15+ corriendo en `localhost:5432`
- pnpm 11+: `corepack enable` o instalar desde https://pnpm.io/installation

---

## Configuración inicial (solo la primera vez)

**1. Instalar dependencias:**
```powershell
pnpm install
```

**2. Crear y editar el archivo de entorno:**
```powershell
Copy-Item backend\.env.example backend\.env
```
Luego abrir `backend/.env` y reemplazar `TU_PASSWORD` con la contraseña de PostgreSQL:
```
DATABASE_URL="postgresql://postgres:TU_PASSWORD@localhost:5432/tramites_db"
JWT_SECRET="una_clave_secreta_larga_y_aleatoria"
PORT=3001
```

**3. Crear la base de datos `tramites_db` en pgAdmin:**

Abre pgAdmin → click derecho en **Databases** → **Create → Database** → nombre: `tramites_db` → Save.

**4. Aplicar migraciones y cargar datos iniciales:**
```powershell
pnpm --dir backend run setup
```

> Este comando crea las tablas y el usuario funcionario. Es seguro ejecutarlo varias veces.

---

## Uso diario (arrancar el proyecto)

```powershell
pnpm --dir backend run dev    # API en http://localhost:3001
pnpm --dir frontend run dev   # App en http://localhost:8100
```

Los datos se conservan en PostgreSQL entre reinicios. No es necesario volver a migrar ni ejecutar el seed.

---

## Credenciales de prueba

| Rol         | Correo                | Contraseña |
|-------------|-----------------------|------------|
| Funcionario | `admin@municipio.cl`  | `admin123` |
| Ciudadano   | Registrarse en `/registro` desde la app | — |

> El funcionario se crea ejecutando `pnpm --dir backend exec node seed.js` desde la raíz del proyecto.

---

## Endpoints de la API

| Método | Endpoint                           | Descripción                                        | Rol         |
|--------|------------------------------------|----------------------------------------------------|-------------|
| POST   | `/api/auth/registro`               | Registra un ciudadano, devuelve JWT                | Público     |
| POST   | `/api/auth/login`                  | Autentica usuario, devuelve JWT + datos            | Público     |
| GET    | `/api/tramites`                    | Lista trámites (ciudadano: solo suyos)             | Autenticado |
| GET    | `/api/tramites/:id`                | Detalle del trámite con observaciones              | Autenticado |
| POST   | `/api/tramites`                    | Crea trámite con ticket TRK-XXXX                   | CIUDADANO   |
| PATCH  | `/api/tramites/:id/estado`         | Cambia estado del trámite                          | FUNCIONARIO |
| POST   | `/api/tramites/:id/observacion`    | Agrega observación (estado → OBSERVADO)            | FUNCIONARIO |
| PATCH  | `/api/tramites/:id/subsanacion`    | Ciudadano responde observación (estado → EN_REVISION) | CIUDADANO |
| DELETE | `/api/tramites/:id`                | Elimina un trámite y sus datos asociados           | FUNCIONARIO |
| GET    | `/api/notificaciones`              | Lista notificaciones del usuario autenticado       | Autenticado |
| PATCH  | `/api/notificaciones/:id/leer`     | Marca notificación como leída                      | Autenticado |
| GET    | `/api/usuarios/me`                 | Perfil del usuario autenticado                     | Autenticado |

**Códigos HTTP:**  
`200` OK · `201` Creado · `400` Validación fallida · `401` No autenticado · `403` Sin permisos · `404` No encontrado · `500` Error interno

---

## Seguridad

- **Contraseñas:** hash bcrypt con `saltRounds: 10`. El campo `password` nunca se devuelve en respuestas.
- **JWT:** payload `{ id, correo, rol }`, expiración 8h, firmado con `JWT_SECRET`.
- **CORS:** permite cualquier origen `http://localhost:*` en desarrollo.
- **SQL Injection:** prevenido automáticamente por Prisma ORM (consultas parametrizadas).
- **Autorización por rol:** middleware `requireRole('CIUDADANO'|'FUNCIONARIO')` en rutas sensibles.

---

## Diagrama relacional

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
        string archivoCorreccionNombre
        string archivoCorreccionPath
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

> Detalle completo de constraints y restricciones en [`otros/diagrama-erd.md`](otros/diagrama-erd.md).  
> Para explorar el modelo interactivamente: `pnpm --dir backend exec prisma studio`

---

## Colección Postman

### Pasos para ejecutar las pruebas

**1. Importar la colección**

En Postman: _Import_ → seleccionar `otros/postman-collection.json`.

**2. Verificar las variables de entorno**

La colección incluye dos variables de colección preconfiguradas:

| Variable   | Valor predeterminado           | Descripción |
|------------|-------------------------------|-------------|
| `base_url` | `http://localhost:3001/api`   | URL base de la API |
| `token`    | _(vacío al importar)_         | Se llena automáticamente al hacer login |

> Si el backend corre en otro puerto, actualizar `base_url` en _Collection → Variables_.

**3. Obtener token (login)**

1. Abrir la carpeta **Auth** → request `POST /auth/login`.
2. El body ya tiene las credenciales del funcionario de prueba (`admin@municipio.cl` / `admin123`).
3. Ejecutar. El script de test captura el JWT y lo guarda en la variable `token`.
4. Desde este momento todos los requests autenticados usan `{{token}}` automáticamente.

**4. Flujo de prueba recomendado**

Ejecutar en este orden para encadenar los IDs correctamente:

| Paso | Carpeta / Request | Qué verifica |
|------|-------------------|--------------|
| 1 | Auth → `POST /auth/registro` | Crear ciudadano nuevo |
| 2 | Auth → `POST /auth/login` (ciudadano) | Obtener token ciudadano |
| 3 | Trámites → `POST /tramites` | Crear trámite (multipart con archivo opcional) |
| 4 | Trámites → `GET /tramites` | Listar trámites del ciudadano |
| 5 | Trámites → `GET /tramites/:id` | Ver detalle e historial |
| 6 | Auth → `POST /auth/login` (funcionario) | Cambiar a token funcionario |
| 7 | Trámites → `PATCH /tramites/:id/estado` | Cambiar estado a EN_REVISION |
| 8 | Trámites → `POST /tramites/:id/observacion` | Agregar observación → estado OBSERVADO |
| 9 | Auth → `POST /auth/login` (ciudadano) | Volver a token ciudadano |
| 10 | Trámites → `PATCH /tramites/:id/subsanacion` | Subsanar observación → estado EN_REVISION |
| 11 | Notificaciones → `GET /notificaciones` | Ver notificaciones generadas |
| 12 | Notificaciones → `PATCH /:id/leer` | Marcar notificación como leída |
| 13 | Trámites → `DELETE /tramites/:id` | Eliminar trámite (requiere token funcionario) |

**5. Evidencia de pruebas**

Los resultados de una ejecución completa están exportados en:
- [`otros/evidencia-api-completa.json`](otros/evidencia-api-completa.json) — colección con respuestas reales
- [`otros/reporte-pruebas-ep2.md`](otros/reporte-pruebas-ep2.md) — reporte narrativo de las pruebas

---

## Pruebas

Ejecutar desde la raíz del proyecto:

```powershell
pnpm --dir frontend run lint
pnpm --dir frontend exec vitest run
pnpm --dir frontend run build
pnpm --dir backend exec prisma validate
pnpm --dir backend exec prisma migrate status
```

Ver evidencia de pruebas API en la sección [Colección Postman](#colección-postman).

