# Diagrama de Componentes — Frontend Ionic + React

## Estructura modular

```
src/
├── routes/
│   ├── AppRouter.tsx         # Árbol de rutas principal (públicas + protegidas)
│   └── PrivateRoute.tsx      # HOC: verifica sesión y rol antes de renderizar
│
├── services/
│   ├── auth.service.ts       # Login, logout, isAuthenticated(), getRole()
│   ├── tramites.service.ts   # CRUD de trámites (localStorage en EP1)
│   └── users.service.ts      # Registro y consulta de usuarios
│
├── components/
│   ├── PageHeader.tsx        # Encabezado reutilizable con título y botón volver
│   ├── SidebarCiudadano.tsx  # IonMenu lateral para ciudadano (web)
│   └── SidebarFuncionario.tsx # IonMenu lateral para funcionario (web)
│
├── pages/
│   ├── auth/
│   │   ├── Login.tsx         # Ruta pública /login
│   │   └── Registro.tsx      # Ruta pública /registro
│   ├── ciudadano/
│   │   ├── RF01Ingreso.tsx   # /ciudadano/ingreso
│   │   ├── RF02Trazabilidad.tsx # /ciudadano/trazabilidad
│   │   ├── RF06Subsanacion.tsx  # /ciudadano/subsanacion
│   │   └── RF07Notificaciones.tsx # /ciudadano/notificaciones
│   └── funcionario/
│       ├── RF03Bandeja.tsx   # /funcionario/bandeja
│       ├── RF04Alertas.tsx   # /funcionario/alertas
│       └── RF05Revision.tsx  # /funcionario/revision
│
└── theme/
    ├── variables.css         # Variables CSS de Ionic (colores, fuentes)
    └── municipal.css         # Estilos globales: paleta institucional
```

## Dependencias entre capas

```
AppRouter → PrivateRoute → auth.service (isAuthenticated, getRole)
Pages → services (tramites.service, users.service)
Pages → components (PageHeader, Sidebar*)
PrivateRoute → pages (renderiza el componente si autorizado)
```
