-- Indexes used by final-delivery list, filter and notification workflows.
-- The guards keep this migration compatible with older local databases.
DO $$
BEGIN
  IF to_regclass('"Tramite"') IS NOT NULL THEN
    CREATE INDEX IF NOT EXISTS "Tramite_ciudadanoId_creadoEn_idx" ON "Tramite"("ciudadanoId", "creadoEn");
    CREATE INDEX IF NOT EXISTS "Tramite_estado_creadoEn_idx" ON "Tramite"("estado", "creadoEn");
    CREATE INDEX IF NOT EXISTS "Tramite_actualizadoEn_idx" ON "Tramite"("actualizadoEn");
  END IF;

  IF to_regclass('"HistorialEstado"') IS NOT NULL THEN
    CREATE INDEX IF NOT EXISTS "HistorialEstado_tramiteId_creadoEn_idx" ON "HistorialEstado"("tramiteId", "creadoEn");
  END IF;

  IF to_regclass('"Observacion"') IS NOT NULL THEN
    CREATE INDEX IF NOT EXISTS "Observacion_tramiteId_creadoEn_idx" ON "Observacion"("tramiteId", "creadoEn");
    CREATE INDEX IF NOT EXISTS "Observacion_funcionarioId_idx" ON "Observacion"("funcionarioId");
  END IF;

  IF to_regclass('"Notificacion"') IS NOT NULL THEN
    CREATE INDEX IF NOT EXISTS "Notificacion_usuarioId_leida_creadoEn_idx" ON "Notificacion"("usuarioId", "leida", "creadoEn");
    CREATE INDEX IF NOT EXISTS "Notificacion_tramiteId_idx" ON "Notificacion"("tramiteId");
  END IF;
END $$;
