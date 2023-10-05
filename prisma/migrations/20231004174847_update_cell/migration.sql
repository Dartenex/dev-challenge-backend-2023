/*
  Warnings:

  - You are about to drop the column `type` on the `Cell` table. All the data in the column will be lost.
  - Changed the type of `result` on the `Cell` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Cell" DROP COLUMN "type",
DROP COLUMN "result",
ADD COLUMN     "result" DECIMAL(65,30) NOT NULL;
