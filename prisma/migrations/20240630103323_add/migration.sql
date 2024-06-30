/*
  Warnings:

  - You are about to drop the column `faculty` on the `Store` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Store" DROP COLUMN "faculty";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "prefix" TEXT;
