/*
  Warnings:

  - The primary key for the `Cell` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id,sheetId]` on the table `Cell` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Cell" DROP CONSTRAINT "Cell_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "Cell_id_sheetId_key" ON "Cell"("id", "sheetId");
