/*
  Warnings:

  - You are about to drop the column `reservePhone1` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `reservePhone2` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "firstPhone" TEXT,
ADD COLUMN     "secondPhone" TEXT,
ADD COLUMN     "thirdPhone" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "reservePhone1",
DROP COLUMN "reservePhone2";
