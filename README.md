# Portal de Trámites Municipales — I. Municipalidad de Santo Domingo

**Entrega Parcial 1 — Diseño y Estructura Inicial**  
Asignatura: Ingeniería Web y Móvil · ICI 4247  
Frontend: Ionic + React + TypeScript

---

## Integrantes

| Nombre | RUT |
|---|---|
| Pablo Aguilera | 21.712.853-6 |
| Benjamin Gomez | 21.039.315-3 |
| Joaquin Garrido | 20.882.540-2 |

---

## Pasos para ejecutar el proyecto

```bash
git clone https://github.com/P4bl0AGT/sistema-tramites
cd sistema-tramites
npm install
ionic serve
```

La aplicación se abre en `http://localhost:8100`.

| Rol | Correo | Contraseña |
|---|---|---|
| Funcionario | `admin@gmail.com` | `admin` |
| Ciudadano | Registrarse desde `/registro` | — |

---

## EP 1.1 — Requerimientos

### Funcionales

Roles: **Ciudadano** y **Funcionario**.

| ID | Rol | Funcionalidad | Descripción |
|---|---|---|---|
| RF-01 | Ciudadano | Ingreso de trámite | Completa formulario (tipo, asunto, descripción, adjunto) y recibe ticket único generado automáticamente. |
| RF-02 | Ciudadano | Trazabilidad | Visualiza el estado de sus trámites en una línea de tiempo: Ingresado → Recepcionado → En revisión → Resolución → Notificación. |
| RF-03 | Funcionario | Bandeja de gestión | Panel con trámites activos, métricas de estado y próximos a vencer. |
| RF-04 | Funcionario | Alertas de vencimiento | Vista de trámites con ≤ 3 días hábiles restantes para priorizar atención. |
| RF-05 | Funcionario | Revisión y evaluación | Revisa el expediente y emite Aprobar / Rechazar / Observar con motivo registrado en el historial. |
| RF-06 | Ciudadano | Subsanación | Ante una observación, adjunta documentos corregidos; el trámite vuelve automáticamente a "En revisión". |
| RF-07 | Ciudadano | Notificaciones | Centro de mensajes con notificación por cada cambio de estado significativo. |

### No Funcionales

| ID | Categoría | Descripción |
|---|---|---|
| RNF-01 | Seguridad | Rutas privadas protegidas por `PrivateRoute`; acceso diferenciado por rol; redirección automática a `/login` sin sesión activa. |
| RNF-02 | Usabilidad | Interfaz responsive: sidebar en web, tabs inferiores en móvil. Paleta y tipografía de identidad gubernamental chilena. |
| RNF-03 | Rendimiento | Datos recargados en cada visita mediante `useIonViewWillEnter`, evitando información desactualizada al navegar entre páginas. |

---

## EP 1.2 — Justificación del Problema y Usuario Objetivo

### Problema

Los municipios medianos y pequeños de Chile gestionan trámites ciudadanos en papel o planillas sin trazabilidad ni alertas de vencimiento. Esto produce:

- Expedientes no centralizados y pérdida de información.
- Incumplimiento de plazos legales por falta de alertas.
- Ciudadano sin visibilidad del estado de su solicitud.
- Gestión de observaciones y correcciones por vía presencial o correo informal.

### Propuesta

Portal web/móvil que digitaliza el ciclo completo de un trámite municipal: ingreso, seguimiento, evaluación funcionaria y subsanación, con trazabilidad en tiempo real.

### Usuarios objetivo

| Perfil | Descripción |
|---|---|
| Ciudadano | Vecino mayor de 18 años con acceso a internet (móvil o PC). Necesita ingresar solicitudes y conocer su estado sin acudir presencialmente. Interfaz simple y guiada. |
| Funcionario municipal | Empleado que procesa trámites, accede principalmente desde PC. Necesita bandeja organizada, acceso al expediente y alertas de urgencia. |

---

## EP 1.3 — Prototipo UI/UX

**[Ver prototipo en Figma](https://www.figma.com/design/yrudh4xuRG7oKhovIAOC4o/Proyecto-web--ahora-es-personal-?node-id=2-2&t=d0zWHq5pVkI43tec-0)**

Prototipado en versión **web y móvil** para cada pantalla (sidebar en web, tabs inferiores en móvil).

| # | Pantalla | Rol | RF asociado |
|---|---|---|---|
| 1 | Login | Público | — |
| 2 | Registro | Público | — |
| 3 | Ingreso de trámite | Ciudadano | RF-01 |
| 4 | Trazabilidad | Ciudadano | RF-02 |
| 5 | Bandeja de gestión | Funcionario | RF-03 |
| 6 | Alertas de vencimiento | Funcionario | RF-04 |
| 7 | Revisión de trámite | Funcionario | RF-05 |
| 8 | Subsanación | Ciudadano | RF-06 |
| 9 | Notificaciones | Ciudadano | RF-07 |

Los formularios de Login y Registro incluyen los campos: Nombre de usuario, RUT, Correo Electrónico, Región, Comuna, Contraseña, Confirmación de Contraseña y aceptación de términos y condiciones, con validaciones visuales.

---

## EP 1.4 — Arquitectura de Navegación

### Estructura de rutas

```
/  →  Redirige a /login

[Públicas]
├── /login
└── /registro

[Privadas · Ciudadano]
├── /ciudadano/ingreso
├── /ciudadano/trazabilidad
├── /ciudadano/subsanacion
└── /ciudadano/notificaciones

[Privadas · Funcionario]
├── /funcionario/bandeja
├── /funcionario/alertas
└── /funcionario/revision
```

### Diferenciación por rol

| Evento | Ciudadano | Funcionario |
|---|---|---|
| Login exitoso | `/ciudadano/ingreso` | `/funcionario/bandeja` |
| Sin sesión | `/login` | `/login` |
| Ruta del otro rol | Bloqueado por `PrivateRoute` | Bloqueado por `PrivateRoute` |

### Task flow principal

```
CIUDADANO
  Login → RF-01 Ingreso → RF-02 Trazabilidad
                               ↓ (si observado)
                          RF-06 Subsanación → RF-02 [en_revision]

FUNCIONARIO
  Login → RF-03 Bandeja ←── RF-04 Alertas
               ↓
          RF-05 Revisión → RF-03 [trámite actualizado]
```

### Justificación técnica

- **`IonReactRouter` + React Router v5**: compatibilidad nativa con Ionic y animaciones de transición.
- **`PrivateRoute` como HOC**: centraliza la lógica de autenticación sin duplicar código por página.
- **`useIonViewWillEnter`**: Ionic mantiene páginas montadas; `useEffect(fn,[])` solo corre al primer montaje. Este hook recarga datos en cada entrada a la vista.
- **`localStorage`**: simula persistencia entre roles sin backend (EP1).

---

## EP 1.5 — Proyecto Ionic con React

**Stack:** Ionic v8.5 · React v18 · TypeScript · React Router DOM v5.3.4 · Vite

### Rutas (`src/routes/AppRouter.tsx`)

```tsx
// Públicas
<Route exact path="/login"    component={Login} />
<Route exact path="/registro" component={Registro} />

// Protegidas
<PrivateRoute path="/ciudadano/ingreso"        component={RF01Ingreso} />
<PrivateRoute path="/ciudadano/trazabilidad"   component={RF02Trazabilidad} />
<PrivateRoute path="/ciudadano/subsanacion"    component={RF06Subsanacion} />
<PrivateRoute path="/ciudadano/notificaciones" component={RF07Notificaciones} />
<PrivateRoute path="/funcionario/bandeja"      component={RF03Bandeja} />
<PrivateRoute path="/funcionario/alertas"      component={RF04Alertas} />
<PrivateRoute path="/funcionario/revision"     component={RF05Revision} />

<Redirect exact from="/" to="/login" />
```

### `PrivateRoute` (`src/routes/PrivateRoute.tsx`)

```tsx
const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) =>
    authService.isAuthenticated()
      ? <Component {...props} />
      : <Redirect to="/login" />
  } />
);
```

---

## EP 1.6 — Pantallas e Integración Ionic

### Pantallas implementadas

| Pantalla | Ruta | Componentes Ionic principales |
|---|---|---|
| Login | `/login` | `IonPage`, `IonContent`, `IonInput`, `IonButton` |
| Registro | `/registro` | `IonPage`, `IonContent`, `IonInput`, `IonSelect`, `IonCheckbox` |
| RF-01 Ingreso | `/ciudadano/ingreso` | `IonSelect`, `IonTextarea`, `IonInput`, `IonButton` |
| RF-02 Trazabilidad | `/ciudadano/trazabilidad` | `IonPage`, `IonContent`, `IonButton`, `IonTabBar` |
| RF-03 Bandeja | `/funcionario/bandeja` | `IonPage`, `IonContent`, `IonButton`, `IonTabBar` |
| RF-04 Alertas | `/funcionario/alertas` | `IonPage`, `IonContent`, `IonButton`, `IonTabBar` |
| RF-05 Revisión | `/funcionario/revision` | `IonSelect`, `IonTextarea`, `IonItem`, `IonFooter` |
| RF-06 Subsanación | `/ciudadano/subsanacion` | `IonTextarea`, `IonItem`, `IonButton` |
| RF-07 Notificaciones | `/ciudadano/notificaciones` | `IonPage`, `IonContent`, `IonTabBar` |

### Estructura de carpetas

```
src/
├── components/         # PageHeader, PageFooter, sidebars por rol
├── pages/
│   ├── auth/           # Login.tsx, Registro.tsx
│   ├── ciudadano/      # RF01, RF02, RF06, RF07
│   └── funcionario/    # RF03, RF04, RF05
├── routes/             # AppRouter.tsx, PrivateRoute.tsx
├── services/           # auth.service.ts, users.service.ts, tramites.service.ts
└── theme/              # variables.css, municipal.css
```