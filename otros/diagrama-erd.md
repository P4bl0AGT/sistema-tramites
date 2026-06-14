# Diagrama Entidad-Relación — Portal de Trámites Municipales

## Modelo relacional

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
        enum estado "INGRESADO | RECEPCIONADO | EN_REVISION | OBSERVADO | APROBADO | RECHAZADO"
        string archivoNombre
        string archivoPath
        string archivoCorreccionNombre
        string archivoCorreccionPath
        datetime creadoEn
        datetime actualizadoEn
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

## Relaciones y restricciones

| Tabla origen | FK | Tabla destino | Constraint |
|---|---|---|---|
| Tramite | ciudadanoId | Usuario | RESTRICT — no se puede borrar usuario con trámites |
| Observacion | tramiteId | Tramite | RESTRICT — no se puede borrar trámite con observaciones |
| Observacion | funcionarioId | Usuario | RESTRICT — no se puede borrar funcionario con observaciones |
| Notificacion | usuarioId | Usuario | RESTRICT |
| Notificacion | tramiteId | Tramite | DELETE manual — las notificaciones se eliminan explícitamente antes de borrar el trámite |
| HistorialEstado | tramiteId | Tramite | CASCADE — el historial se elimina junto con el trámite |

## Restricciones de unicidad

| Tabla | Campo | Descripción |
|---|---|---|
| Usuario | rut | Un RUT solo puede registrarse una vez |
| Usuario | correo | Un correo solo puede registrarse una vez |
| Tramite | ticket | El número de ticket es único (TRK-XXXX) |
