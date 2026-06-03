# Diagrama de Arquitectura de Navegación

## Estructura de rutas y jerarquía de vistas

```mermaid
graph TD
    ROOT["/"] -->|redirect| LOGIN["/login (pública)"]
    LOGIN -->|registro nuevo usuario| REGISTRO["/registro (pública)"]
    
    LOGIN -->|login exitoso rol=ciudadano| C_INGRESO["/ciudadano/ingreso"]
    LOGIN -->|login exitoso rol=funcionario| F_BANDEJA["/funcionario/bandeja"]
    
    subgraph "Zona Ciudadano (PrivateRoute)"
        C_INGRESO -->|ver mis trámites| C_TRAZA["/ciudadano/trazabilidad"]
        C_TRAZA -->|trámite observado| C_SUB["/ciudadano/subsanacion"]
        C_INGRESO -->|ver notificaciones| C_NOTI["/ciudadano/notificaciones"]
        C_NOTI -->|trámite observado| C_SUB
    end

    subgraph "Zona Funcionario (PrivateRoute)"
        F_BANDEJA -->|ver urgentes| F_ALERTAS["/funcionario/alertas"]
        F_BANDEJA -->|revisar trámite| F_REVISION["/funcionario/revision"]
        F_ALERTAS -->|revisar trámite urgente| F_REVISION
    end

    ANY_PRIVATE[Cualquier ruta privada] -->|sin sesión activa| LOGIN
```

## Diferenciación de acceso por rol

| Evento                    | Ciudadano                    | Funcionario                  |
| ------------------------- | ---------------------------- | ---------------------------- |
| Login exitoso             | `/ciudadano/ingreso`         | `/funcionario/bandeja`       |
| Sin sesión activa         | Redirige a `/login`          | Redirige a `/login`          |
| Intento de ruta ajena     | Bloqueado por `PrivateRoute` | Bloqueado por `PrivateRoute` |
