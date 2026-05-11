# Portal de Trámites Municipales — I. Municipalidad de Santo Domingo

> **Entrega Parcial 1 — Diseño y Estructura Inicial**  
> Asignatura: Ingeniería Web y Móvil · ICI 4247  
> Frontend desarrollado con **Ionic + React + TypeScript**

---

## Integrantes

| Nombre | Rut|
|---|---|
| Pablo Aguilera | 21.712.853-6 |
| Benjamin Gomez | 21.039.315-3 |
| Joaquin Garrido | 20.882.540-2 |

---

## Pasos para ejecutar el proyecto

```bash
# 1. Clonar el repositorio
git clone https://github.com/P4bl0AGT/sistema-tramites
cd sistema-tramites

# 2. Instalar dependencias
npm install

# 3. Iniciar la aplicación en modo desarrollo
ionic serve
```

La aplicación se abrirá en `http://localhost:8100`.

### Credenciales de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Funcionario | `admin@gmail.com` | `admin` |
| Ciudadano | Registrarse desde `/registro` | — |

---

## EP 1.1 — Requerimientos Funcionales y No Funcionales

### Requerimientos Funcionales

El sistema contempla dos roles: **Ciudadano** y **Funcionario**.

| ID | Rol | Nombre | Descripción |
|---|---|---|---|
| RF-01 | Ciudadano | Ingreso de trámite y expediente electrónico | El ciudadano selecciona el tipo de trámite, completa un formulario (asunto, descripción) y adjunta documentos. El sistema genera automáticamente un ticket único de trazabilidad (ej. `SD-2026-001`). |
| RF-02 | Ciudadano | Línea de tiempo y trazabilidad | El ciudadano visualiza el estado de su trámite mediante una línea de tiempo progresiva de 5 etapas: Ingresado → Recepcionado → En revisión → Resolución → Notificación, con indicadores visuales diferenciados por estado. |
| RF-03 | Funcionario | Bandeja de gestión y control de plazos | El funcionario accede a un panel con todos los trámites activos, incluyendo métricas de solicitudes activas, próximas a vencer (≤ 3 días hábiles) y resueltas. |
| RF-04 | Funcionario | Alertas de vencimiento | El sistema identifica y agrupa los trámites con 3 días hábiles o menos antes de su fecha límite, permitiendo al funcionario priorizar su atención mediante una vista de alertas críticas. |
| RF-05 | Funcionario | Revisión, observación y cambio de estado | El funcionario revisa el expediente de un trámite (documentos adjuntos, descripción, datos del ciudadano) y emite una evaluación: **Aprobar**, **Rechazar** u **Observar**, registrando un motivo explícito que queda en el historial. |
| RF-06 | Ciudadano | Subsanación y rectificación | Cuando un trámite es observado, el ciudadano puede adjuntar documentos corregidos y un comentario para el funcionario. El sistema devuelve el trámite al estado "En revisión" automáticamente. |
| RF-07 | Ciudadano | Notificaciones multicanal | El ciudadano dispone de un centro de mensajes que muestra notificaciones tipo correo para cada cambio de estado significativo de sus trámites (recepcionado, observado, aprobado, rechazado), con acciones directas desde la notificación. |

### Requerimientos No Funcionales

| ID | Categoría | Descripción |
|---|---|---|
| RNF-01 | Seguridad | Las rutas privadas están protegidas mediante el componente `PrivateRoute`, que verifica la sesión activa antes de renderizar la vista. El acceso está diferenciado por rol (ciudadano/funcionario): un ciudadano no puede acceder a vistas de funcionario y viceversa. Los usuarios no autenticados son redirigidos automáticamente a `/login`. |
| RNF-02 | Usabilidad | La interfaz es responsive y coherente en ambos contextos de uso: en **web** se despliega un menú lateral (sidebar) con navegación jerárquica; en **móvil**, una barra de tabs inferior. La identidad visual sigue la paleta y tipografía oficial del gobierno de Chile, garantizando consistencia y accesibilidad. |
| RNF-03 | Rendimiento | Los datos de cada pantalla se recargan automáticamente en cada visita mediante el hook `useIonViewWillEnter` de Ionic (en lugar de `useEffect` con dependencias vacías), asegurando que la información siempre esté actualizada sin necesidad de refrescar manualmente el navegador. |

---

## EP 1.2 — Justificación del Problema y Análisis del Usuario Objetivo

### Problema

Los procesos de atención ciudadana en municipios medianos y pequeños de Chile presentan graves deficiencias en cuanto a transparencia, trazabilidad y control de plazos. Los ciudadanos deben asistir presencialmente para conocer el estado de sus solicitudes, mientras que los funcionarios gestionan expedientes en papel o planillas sin alertas automatizadas. Esto genera:

- **Pérdida de información** al no existir un expediente digital centralizado.
- **Incumplimiento de plazos legales**, ya que no hay sistema de alerta que notifique a los funcionarios sobre vencimientos.
- **Falta de transparencia** hacia el ciudadano, quien desconoce en qué etapa se encuentra su trámite.
- **Doble trabajo** al tener que gestionar observaciones y correcciones de forma presencial o por correo informal.

### Propuesta de Solución

Un **Portal de Trámites Municipales** que digitaliza el ciclo completo de un trámite: desde el ingreso del ciudadano hasta la resolución del funcionario, con trazabilidad en tiempo real, alertas automáticas de vencimiento y un flujo formal de subsanación de observaciones.

### Usuario Objetivo

| Perfil | Descripción |
|---|---|
| **Ciudadano** | Persona mayor de 18 años, vecino de la comuna, con acceso a internet (móvil o PC). Puede tener poca experiencia con plataformas digitales, por lo que la interfaz debe ser simple, guiada y visualmente clara. Necesita ingresar solicitudes, adjuntar documentos y saber en qué estado está su trámite sin tener que acudir a la municipalidad. |
| **Funcionario municipal** | Empleado de la municipalidad que procesa y evalúa trámites ciudadanos. Accede principalmente desde PC. Necesita una vista de bandeja organizada, acceso rápido al expediente de cada trámite, y alertas que le indiquen cuáles son urgentes. |

---

## EP 1.3 — Bocetos UI/UX y Prototipo Figma

### Enlace al prototipo

> 🎨 **[Ver prototipo en Figma](https://www.figma.com/design/yrudh4xuRG7oKhovIAOC4o/Proyecto-web--ahora-es-personal-?node-id=2-2&t=d0zWHq5pVkI43tec-0)**

### Pantallas prototipadas

El prototipo contempla **versión web y versión móvil** para cada pantalla, con navegación lateral en web y barra inferior en móvil.

| # | Pantalla | Rol | Descripción |
|---|---|---|---|
| 1 | **Login** | Público | Formulario de inicio de sesión con tabs: acceso normal y ClaveÚnica. |
| 2 | **Registro** | Público | Formulario con campos: Nombre, RUT, Correo, Región, Comuna, Contraseña, Confirmación de Contraseña y aceptación de términos. Incluye validaciones visuales. |
| 3 | **RF-01 · Ingreso de Trámite** | Ciudadano | Formulario de 4 campos con selector de tipo de trámite, adjunto de archivo, y pantalla de confirmación con ticket generado. |
| 4 | **RF-02 · Trazabilidad** | Ciudadano | Panel izquierdo con lista de trámites, panel derecho con línea de tiempo, estado actual y acciones disponibles. |
| 5 | **RF-03 · Bandeja** | Funcionario | Tarjetas métricas + grilla de trámites activos con indicadores de urgencia por color. |
| 6 | **RF-04 · Alertas** | Funcionario | Vista exclusiva de trámites próximos a vencer con banner de alerta y cards de acción rápida. |
| 7 | **RF-05 · Revisión** | Funcionario | Vista de dos columnas: expediente (documentos) y formulario de evaluación (estado + motivo). |
| 8 | **RF-06 · Subsanación** | Ciudadano | Vista del motivo de observación + formulario de subida de documentos corregidos. |
| 9 | **RF-07 · Notificaciones** | Ciudadano | Centro de mensajes tipo correo electrónico con lista de notificaciones y vista de detalle. |

### Criterios de diseño aplicados

- **Identidad visual**: paleta oficial del gobierno de Chile (`#006FB3`, `#FE6565`, `#2D717C`), con barra tricolor de acento en cada tarjeta principal.
- **Jerarquía de información**: hero card con contexto de la página → métricas → contenido principal.
- **Densidad adaptada**: en móvil se prioriza el contenido vertical; en web se usa layout de dos columnas con sidebar fijo.
- **Feedback visual**: estados de carga, pantallas de confirmación y mensajes de error inline.

---

## EP 1.4 — Arquitectura de Navegación y Experiencia del Usuario

### Rutas principales y secundarias

```
/                          →  Redirige a /login (redirect raíz)
│
├── [PÚBLICAS]
│   ├── /login             →  Inicio de sesión
│   └── /registro          →  Registro de nuevo ciudadano
│
├── [PRIVADAS · Ciudadano]
│   ├── /ciudadano/ingreso          →  RF-01 · Ingresar trámite
│   ├── /ciudadano/trazabilidad     →  RF-02 · Ver estado del trámite
│   ├── /ciudadano/subsanacion      →  RF-06 · Corregir documentos
│   └── /ciudadano/notificaciones   →  RF-07 · Centro de notificaciones
│
└── [PRIVADAS · Funcionario]
    ├── /funcionario/bandeja    →  RF-03 · Bandeja de gestión
    ├── /funcionario/alertas    →  RF-04 · Alertas de vencimiento
    └── /funcionario/revision   →  RF-05 · Revisar trámite seleccionado
```

### Diferenciación de acceso por rol

| Evento | Ciudadano | Funcionario |
|---|---|---|
| Login exitoso | Redirige a `/ciudadano/ingreso` | Redirige a `/funcionario/bandeja` |
| Acceso sin sesión | Redirige a `/login` | Redirige a `/login` |
| Intento de acceso a ruta del otro rol | Bloqueado por `PrivateRoute` | Bloqueado por `PrivateRoute` |

### Flujo principal de tareas (Task Flow)

```
CIUDADANO
  Registro/Login → Ingreso de trámite (RF-01)
                        ↓
                   Trazabilidad (RF-02) ←── Notificaciones (RF-07)
                        ↓ (si es observado)
                   Subsanación (RF-06)
                        ↓
                   Trazabilidad (RF-02) [estado: en_revision]

FUNCIONARIO
  Login → Bandeja (RF-03) ←── Alertas (RF-04)
               ↓ (clic en "Revisar")
          Revisión (RF-05)
               ↓ (guardar evaluación)
          Bandeja (RF-03) [trámite actualizado]
```

### Ciclo de vida del estado de un trámite

```
ingresado → recepcionado → en_revision → aprobado
                                      ↘ rechazado
                                      ↘ observado → [ciudadano subsana] → en_revision
```

### Puntos críticos de interacción

- **Paso de contexto RF-03/RF-04 → RF-05**: el ID del trámite seleccionado se persiste vía `localStorage` (`tramites_selected`) para que RF-05 cargue el trámite correcto sin necesidad de parámetros en la URL.
- **Paso de contexto RF-02/RF-07 → RF-06**: el mismo mecanismo garantiza que RF-06 cargue el trámite observado del ciudadano autenticado.
- **Actualización al volver a una página**: se usa `useIonViewWillEnter` en lugar de `useEffect` para refrescar los datos cada vez que la vista entra al viewport (Ionic mantiene páginas montadas en memoria para optimizar la navegación).

### Coherencia entre dispositivos

| Elemento | Web | Móvil |
|---|---|---|
| Navegación principal | Sidebar fijo a la izquierda | Barra de tabs en la parte inferior |
| Layout de contenido | Dos columnas (lista + detalle) | Pantalla única con scroll |
| Encabezado | Header completo con logo y nombre de usuario | Header compacto |

### Justificación técnica de decisiones

- **React Router v5 con `IonReactRouter`**: compatibilidad nativa con Ionic React y soporte para animaciones de transición entre páginas (fade).
- **`PrivateRoute` como HOC**: centraliza la lógica de autenticación sin duplicar código en cada página.
- **`useIonViewWillEnter` sobre `useEffect`**: Ionic implementa un stack de navegación que mantiene componentes montados; `useEffect(fn, [])` solo corre al primer montaje, por lo que datos creados en otras páginas no aparecen al volver sin refrescar. `useIonViewWillEnter` resuelve este problema.
- **localStorage como capa de persistencia**: al ser una entrega parcial sin backend, localStorage permite simular la persistencia de trámites y usuarios entre sesiones y entre roles (ciudadano y funcionario ven los mismos datos).
- **Separación `pages/ciudadano` y `pages/funcionario`**: refleja la diferenciación de roles a nivel de carpetas, facilitando la escalabilidad cuando se integre el backend.

---

## EP 1.5 — Creación del Proyecto en Ionic con React

### Tecnologías utilizadas

- **Ionic Framework** v8.5.0
- **React** v18 + **TypeScript**
- **React Router DOM** v5.3.4 (vía `@ionic/react-router`)
- **Vite** como bundler

### Rutas públicas y protegidas

Las rutas están configuradas en `src/routes/AppRouter.tsx`:

```tsx
// Rutas públicas — accesibles sin sesión
<Route exact path="/login"    component={Login} />
<Route exact path="/registro" component={Registro} />

// Rutas protegidas — requieren sesión activa
<PrivateRoute path="/ciudadano/ingreso"        component={RF01Ingreso} />
<PrivateRoute path="/ciudadano/trazabilidad"   component={RF02Trazabilidad} />
<PrivateRoute path="/ciudadano/subsanacion"    component={RF06Subsanacion} />
<PrivateRoute path="/ciudadano/notificaciones" component={RF07Notificaciones} />
<PrivateRoute path="/funcionario/bandeja"      component={RF03Bandeja} />
<PrivateRoute path="/funcionario/alertas"      component={RF04Alertas} />
<PrivateRoute path="/funcionario/revision"     component={RF05Revision} />

// Redirección por defecto
<Redirect exact from="/" to="/login" />
```

### Componente PrivateRoute

```tsx
// src/routes/PrivateRoute.tsx
const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) =>
    authService.isAuthenticated()
      ? <Component {...props} />
      : <Redirect to="/login" />
  } />
);
```

Si el usuario no tiene sesión activa, cualquier intento de acceder a una ruta privada lo redirige automáticamente a `/login`.

---

## EP 1.6 — Diseño de Pantallas e Integración de Componentes Ionic

### Pantallas implementadas (9 vistas)

| Pantalla | Ruta | Componentes Ionic principales |
|---|---|---|
| Login | `/login` | `IonPage`, `IonContent`, `IonInput`, `IonButton`, `IonIcon`, `IonTabBar` |
| Registro | `/registro` | `IonPage`, `IonContent`, `IonInput`, `IonSelect`, `IonButton`, `IonCheckbox` |
| RF-01 Ingreso | `/ciudadano/ingreso` | `IonPage`, `IonContent`, `IonSelect`, `IonTextarea`, `IonInput`, `IonButton`, `IonFooter`, `IonTabBar` |
| RF-02 Trazabilidad | `/ciudadano/trazabilidad` | `IonPage`, `IonContent`, `IonButton`, `IonIcon`, `IonFooter`, `IonTabBar` |
| RF-03 Bandeja | `/funcionario/bandeja` | `IonPage`, `IonContent`, `IonButton`, `IonIcon`, `IonFooter`, `IonTabBar` |
| RF-04 Alertas | `/funcionario/alertas` | `IonPage`, `IonContent`, `IonButton`, `IonIcon`, `IonFooter`, `IonTabBar` |
| RF-05 Revisión | `/funcionario/revision` | `IonPage`, `IonContent`, `IonSelect`, `IonSelectOption`, `IonTextarea`, `IonItem`, `IonFooter` |
| RF-06 Subsanación | `/ciudadano/subsanacion` | `IonPage`, `IonContent`, `IonTextarea`, `IonItem`, `IonButton`, `IonIcon`, `IonFooter` |
| RF-07 Notificaciones | `/ciudadano/notificaciones` | `IonPage`, `IonContent`, `IonButton`, `IonIcon`, `IonFooter`, `IonTabBar` |

### Estructura de carpetas del proyecto

```
sistema-tramites/
├── public/
│   └── assets/                     # Recursos estáticos (logo municipal, etc.)
├── src/
│   ├── components/                 # Componentes reutilizables
│   │   ├── PageHeader.tsx          # Encabezado global: logo, identidad, nombre de usuario y botón salir
│   │   ├── PageFooter.tsx          # Pie de página institucional
│   │   ├── CiudadanoSidebar.tsx    # Menú lateral para rol ciudadano
│   │   └── FuncionarioSidebar.tsx  # Menú lateral para rol funcionario
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.tsx           # Inicio de sesión (ruta pública)
│   │   │   └── Registro.tsx        # Registro de nuevo usuario (ruta pública)
│   │   ├── ciudadano/
│   │   │   ├── RF01Ingreso.tsx     # RF-01 · Ingreso de trámite
│   │   │   ├── RF02Trazabilidad.tsx# RF-02 · Trazabilidad
│   │   │   ├── RF06Subsanacion.tsx # RF-06 · Subsanación
│   │   │   └── RF07Notificaciones.tsx # RF-07 · Notificaciones
│   │   └── funcionario/
│   │       ├── RF03Bandeja.tsx     # RF-03 · Bandeja de gestión
│   │       ├── RF04Alertas.tsx     # RF-04 · Alertas de vencimiento
│   │       └── RF05Revision.tsx    # RF-05 · Revisión de trámite
│   ├── routes/
│   │   ├── AppRouter.tsx           # Configuración central de todas las rutas
│   │   └── PrivateRoute.tsx        # HOC: protección de rutas privadas
│   ├── services/
│   │   ├── auth.service.ts         # Gestión de sesión: login, logout, rol, usuario activo
│   │   ├── users.service.ts        # CRUD de usuarios persistido en localStorage
│   │   └── tramites.service.ts     # CRUD de trámites, historial, cálculo de plazos
│   └── theme/
│       ├── municipal.css           # Estilos de identidad visual municipal
│       └── variables.css           # Variables CSS globales de Ionic
├── package.json
└── README.md
```

### Componentes Ionic utilizados

```
IonApp            →  Contenedor raíz de la aplicación
IonReactRouter    →  Integración de React Router con Ionic
IonRouterOutlet   →  Salida de renderizado de rutas con animaciones
IonPage           →  Contenedor de cada pantalla (ciclo de vida Ionic)
IonContent        →  Área de contenido scrollable de cada página
IonHeader         →  Encabezado de página (usado en componente PageHeader)
IonFooter         →  Pie de página con IonTabBar (navegación inferior móvil)
IonTabBar         →  Barra de navegación inferior con tabs
IonTabButton      →  Botón individual de la barra inferior
IonButton         →  Botones de acción con variantes: fill="solid/outline"
IonIcon           →  Iconos de ionicons (ionicons v7)
IonItem           →  Contenedor de campo de formulario
IonInput          →  Campo de texto
IonTextarea       →  Campo de texto multilínea
IonSelect         →  Selector dropdown
IonSelectOption   →  Opción individual del IonSelect
IonLabel          →  Etiqueta de tab o campo
IonCheckbox       →  Casilla de verificación (términos y condiciones)
```
