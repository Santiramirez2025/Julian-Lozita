-- ============================================================================
-- Migración aditiva: modelo GuiaLead (captura de la guía /criterio)
-- ----------------------------------------------------------------------------
-- Generada con: prisma migrate diff (Prisma 6.2.1, la versión del repo)
-- Estado: SIN APLICAR. Revisá y corré vos.
--
-- Este proyecto usa `prisma db push` (no `prisma migrate`; no hay carpeta
-- prisma/migrations). Para no mezclar los dos enfoques, este archivo es solo
-- el SQL para revisión. Aplicalo de UNA de estas dos formas equivalentes:
--
--   A) El flujo del repo:   npm run db:push
--      (empuja el schema.prisma completo; el único cambio pendiente es este)
--
--   B) Correr este SQL tal cual contra la base:
--      psql "$DATABASE_URL" -f prisma/manual/add-guialead.sql
--
-- Es 100% aditivo (crea una tabla nueva y sus índices). No toca ninguna tabla
-- existente ni borra datos.
-- ============================================================================

-- CreateTable
CREATE TABLE "GuiaLead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT,
    "source" TEXT NOT NULL DEFAULT 'criterio',
    "ipHash" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuiaLead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GuiaLead_email_key" ON "GuiaLead"("email");

-- CreateIndex
CREATE INDEX "GuiaLead_source_idx" ON "GuiaLead"("source");

-- CreateIndex
CREATE INDEX "GuiaLead_createdAt_idx" ON "GuiaLead"("createdAt");
