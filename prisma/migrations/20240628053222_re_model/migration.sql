/*
  Warnings:

  - A unique constraint covering the columns `[sdgId]` on the table `Sdg` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[storeId]` on the table `Store` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_nisitId_key";

-- AlterTable
ALTER TABLE "Sdg" ALTER COLUMN "sdgId" DROP DEFAULT;
DROP SEQUENCE "Sdg_sdgId_seq";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Sdg_sdgId_key" ON "Sdg"("sdgId");

-- CreateIndex
CREATE UNIQUE INDEX "Store_storeId_key" ON "Store"("storeId");
